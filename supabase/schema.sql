-- Creator Styles Table
-- Stores voice signatures, frameworks, and templates for different content creators

CREATE TABLE IF NOT EXISTS creator_styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  youtube_url TEXT,
  voice_signature JSONB NOT NULL,  -- {tone, style, perspective, key_traits, audience}
  frameworks JSONB NOT NULL,        -- Array of content frameworks with examples
  signature_phrases TEXT[],         -- Array of characteristic phrases
  anti_patterns TEXT[],             -- Things the creator never does
  templates JSONB,                  -- Templates by content type (TikTok, Thread, etc)
  metadata JSONB,                   -- Analysis info: videos analyzed, date, stats
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_creator_styles_name ON creator_styles(name);
CREATE INDEX IF NOT EXISTS idx_creator_styles_created_at ON creator_styles(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE creator_styles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON creator_styles
  FOR SELECT USING (true);

-- Create policy to allow authenticated inserts
CREATE POLICY "Allow authenticated inserts" ON creator_styles
  FOR INSERT WITH CHECK (true);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_creator_styles_updated_at
  BEFORE UPDATE ON creator_styles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed Isra Crypto (default creator)
INSERT INTO creator_styles (
  name,
  youtube_url,
  voice_signature,
  frameworks,
  signature_phrases,
  anti_patterns,
  templates,
  metadata
) VALUES (
  'Isra Crypto',
  'https://tiktok.com/@isra.eth',
  '{
    "tone": "anti-hype, conversational, slightly sarcastic",
    "style": "educational, transparent, critical",
    "perspective": "balanced - shows both benefits and risks",
    "key_traits": ["verifiable facts", "on-chain data focus", "analogies over jargon", "empowerment not instructions"],
    "audience": "Spanish-speaking crypto learners (Latin America)"
  }'::jsonb,
  '[
    {
      "name": "Balance Framework",
      "description": "Always show both sides - benefits AND risks",
      "structure": "Benefit → Transition (\"Y claro que no todo es color rosa\") → Risk",
      "example": "DeFi te permite prestar sin banco... Y claro que no todo es color rosa: si el smart contract tiene bugs, pierdes todo."
    },
    {
      "name": "Verification Framework",
      "description": "Point to verifiable sources (blockchain, public records)",
      "structure": "Claim → Verification method",
      "example": "El supply de Bitcoin es 21M. Puedes verificar en blockchain con cualquier explorer."
    },
    {
      "name": "Analogy Framework",
      "description": "Complex concept → everyday comparison",
      "structure": "Technical term → \"Es como...\" → simple analogy",
      "example": "Un smart contract es como una máquina expendedora: pones dinero, eliges opción, ejecuta automático."
    },
    {
      "name": "Social Proof Framework",
      "description": "Make it relatable to audience context",
      "structure": "\"Te suena familiar?\" → situation → crypto solution",
      "example": "Te explico staking para cuando salga el tema con tus amigos."
    },
    {
      "name": "Anti-Authority Framework",
      "description": "Critique politicians, whales, institutions",
      "structure": "Authority claim → sarcastic counter → truth",
      "example": "El parecido con [pyramid scheme] es mera coincidencia (spoiler: no lo es)."
    }
  ]'::jsonb,
  ARRAY[
    'Te explico [X] para cuando salga el tema con tus amigos',
    'Y claro que no todo es color rosa',
    'Te suena familiar?',
    'El parecido con [scam] es mera coincidencia',
    'Puedes verificar en blockchain',
    '¿Tú qué opinas?'
  ],
  ARRAY[
    'NO price predictions',
    'NO shilling projects',
    'NO unexplained jargon',
    'NO ignoring risks',
    'NO FOMO manipulation',
    'NO affiliate links without disclosure'
  ],
  '{
    "TikTok 60s": {
      "structure": "Hook (5-10w) → Definition (1-2 frases) → Analogy (2-3 frases) → Benefit (1-2) → Transition → Risks (2-3) → Question",
      "word_count": "150-180",
      "duration": "60s"
    },
    "Reel 90s": {
      "structure": "Hook → Definition → Analogy → Benefits → Transition → Risks → Question",
      "word_count": "220-280",
      "duration": "90s"
    },
    "Thread": {
      "structure": "Tweet 1: Hook → 2: Context → 3-4: Explanation → 5-6: Benefits → 7: Transition → 8-9: Risks → 10: Question + CTA",
      "word_count": "400-500",
      "duration": "8-10 tweets"
    },
    "Artículo corto": {
      "structure": "Intro (50w) → Explicación (200w) → Beneficios (150w) → Transition → Riesgos (150w) → Conclusión (50w)",
      "word_count": "600-800",
      "duration": "3-4 min read"
    }
  }'::jsonb,
  '{
    "source": "manual",
    "version": "1.0",
    "analyzed_date": "2024-03-26",
    "videos_analyzed": 0,
    "notes": "Original Isra methodology from SKILL.md"
  }'::jsonb
) ON CONFLICT (name) DO NOTHING;

-- Seed placeholder creators (to be analyzed later)
INSERT INTO creator_styles (
  name,
  youtube_url,
  voice_signature,
  frameworks,
  signature_phrases,
  anti_patterns,
  templates,
  metadata
) VALUES 
(
  'Dan Koe',
  'https://youtube.com/@DanKoe',
  '{
    "tone": "philosophical, introspective",
    "style": "personal development, systems thinking",
    "perspective": "holistic life design",
    "key_traits": ["self-awareness", "mental clarity", "skill stacking"],
    "audience": "English-speaking creators and entrepreneurs"
  }'::jsonb,
  '[]'::jsonb,
  ARRAY['Placeholder - pending analysis'],
  ARRAY['Placeholder - pending analysis'],
  '{}'::jsonb,
  '{
    "source": "placeholder",
    "version": "0.1",
    "analyzed_date": null,
    "videos_analyzed": 0,
    "notes": "Placeholder - ready to be analyzed"
  }'::jsonb
),
(
  'Gary Vee',
  'https://youtube.com/@GaryVee',
  '{
    "tone": "aggressive, motivational, high-energy",
    "style": "hustle culture, marketing, entrepreneurship",
    "perspective": "action-oriented, no excuses",
    "key_traits": ["relentless work ethic", "market awareness", "content first"],
    "audience": "English-speaking entrepreneurs"
  }'::jsonb,
  '[]'::jsonb,
  ARRAY['Placeholder - pending analysis'],
  ARRAY['Placeholder - pending analysis'],
  '{}'::jsonb,
  '{
    "source": "placeholder",
    "version": "0.1",
    "analyzed_date": null,
    "videos_analyzed": 0,
    "notes": "Placeholder - ready to be analyzed"
  }'::jsonb
)
ON CONFLICT (name) DO NOTHING;
