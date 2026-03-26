# Supabase Setup Guide

## 📋 Overview

This app uses Supabase to store creator voice profiles. Follow these steps to set up the database.

## 🔧 Setup Steps

### 1. Create Supabase Table

Go to your Supabase dashboard → SQL Editor and run the schema:

**File:** `supabase/schema.sql`

Or run this command:

```bash
cat supabase/schema.sql | pbcopy
```

Then paste into Supabase SQL Editor and execute.

### 2. Verify Tables

Check that the `creator_styles` table was created:

```sql
SELECT * FROM creator_styles;
```

You should see 3 rows:
- Isra Crypto (complete)
- Dan Koe (placeholder)
- Gary Vee (placeholder)

### 3. Environment Variables

Already configured in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

(Keys already configured in `.env.local` - no need to change)

### 4. Test Connection

```bash
# Install dependencies
npm install

# Test API
curl http://localhost:3000/api/styles
```

## 🗄️ Database Schema

### `creator_styles` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Creator name (unique) |
| `youtube_url` | TEXT | YouTube channel URL |
| `voice_signature` | JSONB | Voice & tone profile |
| `frameworks` | JSONB | Content frameworks array |
| `signature_phrases` | TEXT[] | Characteristic phrases |
| `anti_patterns` | TEXT[] | Things they never do |
| `templates` | JSONB | Templates by content type |
| `metadata` | JSONB | Analysis metadata |
| `created_at` | TIMESTAMP | Created date |
| `updated_at` | TIMESTAMP | Last updated date |

## 🔐 Security

- **RLS (Row Level Security)**: Enabled
- **Public read access**: Anyone can read creator styles
- **Authenticated writes**: Only authenticated users can create/update

## 📊 Default Data

### Isra Crypto
- ✅ **Complete** - Full voice signature and frameworks from existing SKILL.md
- 5 core frameworks
- 6 signature phrases
- Templates for all content types

### Dan Koe & Gary Vee
- ⚠️ **Placeholders** - Basic voice signature, pending full analysis
- Can be analyzed using `/analyzer` page

## 🚀 Next Steps

1. ✅ Run schema in Supabase SQL Editor
2. ✅ Verify 3 creators exist
3. ✅ Test `/api/styles` endpoint
4. 🔄 Deploy to Vercel (auto-syncs env vars)
5. 🎯 Use `/analyzer` to add new creators

## 🧪 Manual Testing

```bash
# Fetch all styles
curl http://localhost:3000/api/styles

# Generate script with Isra style
curl -X POST http://localhost:3000/api/generate-script \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Qué es un DEX",
    "contentType": "TikTok 60s",
    "technicalLevel": "Principiante",
    "styleId": "YOUR_ISRA_STYLE_ID"
  }'
```

## 🐛 Troubleshooting

### "Table does not exist"
- Run `supabase/schema.sql` in SQL Editor
- Check RLS policies are enabled

### "Failed to fetch creator styles"
- Verify Supabase URL and keys in `.env.local`
- Check network connection
- Verify table was created successfully

### "Creator style not found"
- Fetch all styles first: `GET /api/styles`
- Use the correct `id` from the response
