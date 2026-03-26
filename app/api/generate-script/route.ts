/**
 * API Route: Generate Script
 * Uses Anthropic Claude to generate educational crypto scripts using Isra's methodology
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildPrompt, calculateMetadata, ScriptRequest } from '@/lib/isra-skill';

export async function POST(request: NextRequest) {
  try {
    const body: ScriptRequest = await request.json();
    const { topic, contentType, technicalLevel } = body;

    // Validate inputs
    if (!topic || !contentType || !technicalLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, contentType, technicalLevel' },
        { status: 400 }
      );
    }

    // Build prompt using Isra's methodology
    const prompt = buildPrompt({ topic, contentType, technicalLevel });

    // Call Anthropic API
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract script from response
    const scriptContent = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    if (!scriptContent) {
      return NextResponse.json(
        { error: 'Failed to generate script' },
        { status: 500 }
      );
    }

    // Calculate metadata
    const metadata = calculateMetadata(scriptContent);

    // Return response
    return NextResponse.json({
      success: true,
      script: scriptContent,
      metadata,
      request: {
        topic,
        contentType,
        technicalLevel,
      },
    });

  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
