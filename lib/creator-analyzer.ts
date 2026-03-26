/**
 * Creator Analyzer
 * Extracts creator voice, frameworks, and patterns from YouTube videos
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import Anthropic from '@anthropic-ai/sdk';

const execAsync = promisify(exec);

export interface VideoMetadata {
  id: string;
  title: string;
  url: string;
  duration: number;
  views: number;
}

export interface CreatorAnalysis {
  voice_signature: {
    tone: string;
    style: string;
    perspective: string;
    key_traits: string[];
    audience: string;
  };
  frameworks: Array<{
    name: string;
    description: string;
    structure: string;
    example: string;
  }>;
  signature_phrases: string[];
  anti_patterns: string[];
  templates: Record<string, any>;
}

/**
 * Extract top videos from YouTube channel
 */
export async function extractTopVideos(
  channelUrl: string,
  count: number = 10
): Promise<VideoMetadata[]> {
  console.log(`📺 Extracting top ${count} videos from ${channelUrl}`);

  try {
    // Use yt-dlp to extract channel info and top videos
    const { stdout } = await execAsync(
      `yt-dlp --flat-playlist --dump-json --playlist-end ${count} "${channelUrl}/videos?sort=p"`,
      { maxBuffer: 1024 * 1024 * 10 } // 10MB buffer
    );

    const lines = stdout.trim().split('\n');
    const videos: VideoMetadata[] = [];

    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        videos.push({
          id: data.id,
          title: data.title,
          url: `https://youtube.com/watch?v=${data.id}`,
          duration: data.duration || 0,
          views: data.view_count || 0,
        });
      } catch (e) {
        console.warn('Failed to parse video metadata:', line);
      }
    }

    console.log(`✅ Extracted ${videos.length} videos`);
    return videos.slice(0, count);
  } catch (error) {
    throw new Error(`Failed to extract videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Transcribe a YouTube video using faster-whisper
 */
export async function transcribeVideo(videoUrl: string): Promise<string> {
  const tempDir = tmpdir();
  const audioFile = join(tempDir, `audio_${Date.now()}.wav`);
  const videoFile = join(tempDir, `video_${Date.now()}.mp4`);

  try {
    console.log(`🎥 Downloading video: ${videoUrl}`);
    
    // Download video
    await execAsync(
      `yt-dlp -f "bestaudio[ext=m4a]/best" -o "${videoFile}" "${videoUrl}"`,
      { maxBuffer: 1024 * 1024 * 50 } // 50MB buffer
    );

    // Extract audio
    console.log('🎵 Extracting audio...');
    await execAsync(
      `ffmpeg -i "${videoFile}" -ar 16000 -ac 1 -y "${audioFile}"`,
      { maxBuffer: 1024 * 1024 * 50 }
    );

    // Transcribe with faster-whisper
    console.log('🗣️  Transcribing...');
    const transcriptScript = `
from faster_whisper import WhisperModel
model = WhisperModel("tiny", device="cpu", compute_type="int8")
segments, _ = model.transcribe("${audioFile}", language="auto")
for s in segments:
    print(s.text, end=" ")
`;

    const scriptFile = join(tempDir, `transcribe_${Date.now()}.py`);
    writeFileSync(scriptFile, transcriptScript);

    const { stdout } = await execAsync(`python3 "${scriptFile}"`, {
      maxBuffer: 1024 * 1024 * 10
    });

    // Cleanup
    [audioFile, videoFile, scriptFile].forEach(file => {
      if (existsSync(file)) unlinkSync(file);
    });

    return stdout.trim();
  } catch (error) {
    // Cleanup on error
    [audioFile, videoFile].forEach(file => {
      if (existsSync(file)) unlinkSync(file);
    });
    throw new Error(`Transcription failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Analyze transcripts with Claude to extract creator voice
 */
export async function analyzeWithClaude(
  transcripts: Array<{ title: string; text: string; views: number }>
): Promise<CreatorAnalysis> {
  console.log('🧠 Analyzing with Claude...');

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Build analysis prompt
  const prompt = `You are a content creator analyst. I will give you transcripts from a content creator's top videos. 

Your task: Extract their unique voice signature, content frameworks, and patterns.

# TRANSCRIPTS

${transcripts.map((t, i) => `
## Video ${i + 1}: ${t.title} (${t.views.toLocaleString()} views)
${t.text}
`).join('\n\n')}

# ANALYSIS TASK

Extract the following as JSON:

1. **voice_signature**: Object with:
   - tone: How they speak (e.g., "casual, humorous", "authoritative, direct")
   - style: Content style (e.g., "educational", "motivational", "storytelling")
   - perspective: Their unique angle (e.g., "contrarian", "data-driven", "personal experience")
   - key_traits: Array of 3-5 key characteristics
   - audience: Who they speak to

2. **frameworks**: Array of 3-5 content frameworks they repeatedly use. Each with:
   - name: Framework name
   - description: What it does
   - structure: The pattern (e.g., "Problem → Solution → Action")
   - example: Real example from transcripts

3. **signature_phrases**: Array of 5-10 phrases they use frequently (verbatim quotes)

4. **anti_patterns**: Array of 5-8 things they NEVER do (e.g., "Never gives price predictions")

5. **templates**: Object with templates for different content types (TikTok, Thread, Article) with:
   - structure: Step-by-step structure
   - word_count: Target word count
   - duration: Estimated duration

Respond ONLY with valid JSON. No markdown, no explanation.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4000,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  // Parse JSON response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from Claude response');
  }

  const analysis = JSON.parse(jsonMatch[0]);
  console.log('✅ Analysis complete');

  return analysis;
}

/**
 * Full pipeline: Analyze a creator from YouTube channel URL
 */
export async function analyzeCreator(
  channelUrl: string,
  videosCount: number = 10,
  onProgress?: (progress: number, status: string) => void
): Promise<CreatorAnalysis> {
  try {
    // Step 1: Extract videos
    onProgress?.(10, 'Extracting channel videos...');
    const videos = await extractTopVideos(channelUrl, videosCount);

    if (videos.length === 0) {
      throw new Error('No videos found on channel');
    }

    // Step 2: Transcribe videos
    const transcripts: Array<{ title: string; text: string; views: number }> = [];
    
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const progress = 10 + ((i + 1) / videos.length) * 60; // 10% to 70%
      
      onProgress?.(progress, `Transcribing video ${i + 1}/${videos.length}: ${video.title.slice(0, 50)}...`);

      try {
        const transcript = await transcribeVideo(video.url);
        transcripts.push({
          title: video.title,
          text: transcript,
          views: video.views,
        });
      } catch (error) {
        console.warn(`Failed to transcribe ${video.url}:`, error);
        // Continue with other videos
      }
    }

    if (transcripts.length === 0) {
      throw new Error('Failed to transcribe any videos');
    }

    // Step 3: Analyze with Claude
    onProgress?.(80, 'Analyzing content with Claude...');
    const analysis = await analyzeWithClaude(transcripts);

    onProgress?.(100, 'Analysis complete!');
    return analysis;

  } catch (error) {
    throw new Error(`Creator analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
