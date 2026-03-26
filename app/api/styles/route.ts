/**
 * API Route: Get Creator Styles
 * Fetches all available creator styles from Supabase
 */

import { NextResponse } from 'next/server';
import { getAllCreatorStyles } from '@/lib/supabase';

export async function GET() {
  try {
    const styles = await getAllCreatorStyles();

    return NextResponse.json({
      success: true,
      styles: styles.map(s => ({
        id: s.id,
        name: s.name,
        youtube_url: s.youtube_url,
        created_at: s.created_at,
        isPlaceholder: s.metadata?.source === 'placeholder',
      })),
    });
  } catch (error) {
    console.error('Error fetching styles:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch creator styles',
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
