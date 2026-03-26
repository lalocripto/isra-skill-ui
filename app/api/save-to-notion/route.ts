/**
 * API Route: Save to Notion
 * Saves generated scripts to Publicaciones Programadas database
 */

import { NextRequest, NextResponse } from 'next/server';
import { saveScriptToNotion, NotionScriptData } from '@/lib/notion';

export async function POST(request: NextRequest) {
  try {
    const body: NotionScriptData = await request.json();
    
    // Validate inputs
    if (!body.title || !body.content || !body.contentType || !body.technicalLevel || !body.metadata) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Notion
    const pageUrl = await saveScriptToNotion(body);

    return NextResponse.json({
      success: true,
      notionUrl: pageUrl,
    });

  } catch (error) {
    console.error('Error saving to Notion:', error);
    return NextResponse.json(
      { error: 'Failed to save to Notion', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
