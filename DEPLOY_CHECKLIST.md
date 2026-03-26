# 🚀 Deploy Checklist - Creator Voice Platform

## ✅ Completed (Automated)

- [x] Code pushed to GitHub (main branch)
- [x] Build passed locally (`npm run build`)
- [x] TypeScript validation passed
- [x] Documentation updated
- [x] Vercel env vars configured

## 🔲 Manual Steps Required

### 1. Setup Supabase Database

**Time:** ~5 minutes

```bash
# Option A: Copy schema
cat /workspace/isra-skill-ui/supabase/schema.sql | pbcopy

# Then paste in Supabase SQL Editor:
# https://supabase.com/dashboard/project/zlxtwvmswikuqtequfbg/sql/new

# Option B: Run script (if you have psql)
psql "$SUPABASE_CONNECTION_STRING" < supabase/schema.sql
```

**Verify:**
```sql
SELECT name, metadata->>'source' as source 
FROM creator_styles 
ORDER BY created_at;

-- Expected output:
-- Isra Crypto | manual
-- Dan Koe     | placeholder
-- Gary Vee    | placeholder
```

### 2. Verify Vercel Deployment

**URL:** https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui/deployments

**Check:**
- [ ] Latest deployment shows "Ready" status
- [ ] Build logs show no errors
- [ ] Runtime environment variables loaded

**Test endpoints:**
```bash
# Test styles API
curl https://isra-skill-ui.vercel.app/api/styles

# Should return:
# {
#   "success": true,
#   "styles": [
#     { "id": "...", "name": "Isra Crypto", ... },
#     { "id": "...", "name": "Dan Koe", ... },
#     { "id": "...", "name": "Gary Vee", ... }
#   ]
# }
```

### 3. Test Analyzer (Optional but Recommended)

**Time:** ~10-15 minutes

1. Go to: https://isra-skill-ui.vercel.app/analyzer
2. Enter YouTube URL: `https://youtube.com/@DanKoe`
3. Creator Name: `Dan Koe`
4. Videos: `10`
5. Click "Analizar Creator"
6. Wait ~10-15 minutes
7. Should redirect to main page with Dan Koe now available

**Verify in Supabase:**
```sql
SELECT name, frameworks, signature_phrases 
FROM creator_styles 
WHERE name = 'Dan Koe';

-- Should show extracted frameworks and phrases
```

### 4. Test Script Generation

1. Go to: https://isra-skill-ui.vercel.app
2. Select style: "Isra Crypto"
3. Topic: "¿Qué es un DEX?"
4. Content type: "TikTok 60s"
5. Level: "Principiante"
6. Generate
7. Verify output uses Isra's voice

**Then test with Dan Koe:**
1. Select style: "Dan Koe"
2. Topic: "How to build a personal brand"
3. Generate
4. Verify output uses Dan's style (philosophical, introspective)

### 5. Test Notion Integration

1. Generate a script
2. Click "Guardar en Notion"
3. Verify appears in: https://notion.so/Publicaciones-Programadas

---

## 🐛 Troubleshooting

### "Table creator_styles does not exist"
→ Run Supabase schema (step 1)

### "Failed to fetch creator styles"
→ Check Supabase env vars in Vercel:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY

### "Analyzer stuck at 0%"
→ Known issue - no streaming yet. Wait 10-15 min and check Supabase directly.

### "Build failed on Vercel"
→ Check deployment logs. Most common:
  - Missing env vars
  - TypeScript errors (should be caught locally)

---

## 📊 Post-Deploy Validation

Run these checks after deployment:

```bash
# 1. Verify all pages load
curl -I https://isra-skill-ui.vercel.app/
curl -I https://isra-skill-ui.vercel.app/analyzer

# 2. Test API routes
curl https://isra-skill-ui.vercel.app/api/styles

# 3. Check Supabase connection
# (Visit app, select a style, generate script)

# 4. Check Notion integration
# (Generate + save, verify in Notion DB)
```

---

## ✅ Success Criteria

- [ ] Supabase table created with 3 creators
- [ ] Vercel deployment shows "Ready"
- [ ] /api/styles returns 3 creators
- [ ] Can generate scripts with Isra style
- [ ] Can access /analyzer page
- [ ] Notion integration still works

---

## 🎯 Next Actions

Once deployed:
1. **Analyze Dan Koe** - Test full analyzer pipeline
2. **Compare outputs** - Generate same topic with Isra vs Dan Koe
3. **Monitor errors** - Check Vercel logs for issues
4. **Update docs** - If you find bugs, update lessons.md

---

**Ready to ship! 🚢**
