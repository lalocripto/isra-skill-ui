/**
 * Supabase Client
 * Simple REST API client for creator_styles table
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface CreatorStyle {
  id: string;
  name: string;
  youtube_url?: string;
  voice_signature: {
    tone: string;
    style: string;
    perspective: string;
    key_traits?: string[];
    audience?: string;
  };
  frameworks: Array<{
    name: string;
    description: string;
    structure: string;
    example: string;
  }>;
  signature_phrases: string[];
  anti_patterns: string[];
  templates?: Record<string, any>;
  metadata?: {
    source?: string;
    version?: string;
    analyzed_date?: string;
    videos_analyzed?: number;
    notes?: string;
  };
  created_at: string;
  updated_at: string;
}

export async function getAllCreatorStyles(): Promise<CreatorStyle[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_styles?select=*&order=created_at.desc`,
    {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch creator styles: ${response.statusText}`);
  }

  return response.json();
}

export async function getCreatorStyle(id: string): Promise<CreatorStyle | null> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_styles?id=eq.${id}&select=*`,
    {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch creator style: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0] || null;
}

export async function createCreatorStyle(
  style: Omit<CreatorStyle, 'id' | 'created_at' | 'updated_at'>
): Promise<CreatorStyle> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_styles`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(style),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create creator style: ${error}`);
  }

  const data = await response.json();
  return data[0];
}

export async function updateCreatorStyle(
  id: string,
  updates: Partial<Omit<CreatorStyle, 'id' | 'created_at' | 'updated_at'>>
): Promise<CreatorStyle> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/creator_styles?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update creator style: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0];
}
