/**
 * API Route: Analyze Creator
 * Analyzes a YouTube channel and extracts voice, frameworks, patterns
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyzeCreator } from '@/lib/creator-analyzer';
import { createCreatorStyle } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { youtubeUrl, creatorName, videosToAnalyze = 10 } = body;

    // Validate inputs
    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'Missing required field: youtubeUrl' },
        { status: 400 }
      );
    }

    // Validate URL
    if (!youtubeUrl.includes('youtube.com/') && !youtubeUrl.includes('youtu.be/')) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // TODO: Implement streaming progress updates
    // For now, we'll do it synchronously

    console.log(`🔍 Starting analysis for: ${youtubeUrl}`);

    // Analyze creator
    const analysis = await analyzeCreator(
      youtubeUrl,
      videosToAnalyze,
      (progress, status) => {
        console.log(`[${progress}%] ${status}`);
      }
    );

    // Extract creator name from analysis or use provided
    const name = creatorName || 'Unknown Creator';

    // Save to Supabase
    const creatorStyle = await createCreatorStyle({
      name,
      youtube_url: youtubeUrl,
      voice_signature: analysis.voice_signature,
      frameworks: analysis.frameworks,
      signature_phrases: analysis.signature_phrases,
      anti_patterns: analysis.anti_patterns,
      templates: analysis.templates,
      metadata: {
        source: 'automated',
        version: '1.0',
        analyzed_date: new Date().toISOString(),
        videos_analyzed: videosToAnalyze,
        notes: 'Automatically analyzed via API',
      },
    });

    return NextResponse.json({
      success: true,
      styleId: creatorStyle.id,
      name: creatorStyle.name,
      status: 'complete',
    });

  } catch (error) {
    console.error('Error analyzing creator:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze creator',
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
