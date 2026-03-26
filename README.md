# 🎬 Creator Voice Platform

Plataforma para generar contenido usando el voice y estilo de cualquier creator.

**🌐 Producción:** https://isra-skill-ui.vercel.app

## 🆕 What's New (v2.0)

- **🎯 Multi-Creator Support** — Elige entre Isra, Dan Koe, Gary Vee, y más
- **🔍 Auto-Analyzer** — Pega URL de canal de YouTube y extrae voice automáticamente
- **💾 Supabase Integration** — Todos los estilos guardados en base de datos
- **🧠 Claude-Powered Analysis** — Extrae frameworks, patterns, y signature phrases
- **🎨 Dynamic Generation** — Genera guiones usando cualquier creator voice

## 🎯 Features

- **Generación de guiones** usando Claude Sonnet 4.5 + estilo del creator seleccionado
- **Preview editable** antes de guardar
- **Integración Notion** automática (DB: Publicaciones Programadas)
- **Historial de sesión** (últimos 10 guiones)
- **Brand Espacio Cripto** (#F7B11F accent, #111111 black, Inter font)

## 🛠️ Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** (Claude Sonnet 4.5)
- **Notion API**
- **Supabase** (Creator styles database)
- **yt-dlp** (YouTube video extraction)
- **faster-whisper** (Transcription)

## 📋 Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

Sigue las instrucciones en [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) para crear la tabla `creator_styles`.

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Notion Integration
NOTION_TOKEN=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_DATABASE_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=service_role_key
```

**⚠️ IMPORTANTE:** Actualiza todas las keys con valores reales antes de correr.

### 4. Correr desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

### Generar Guión

1. **Selecciona un estilo de creator** (Isra, Dan Koe, Gary Vee, etc.)
2. **Ingresa un tema/pregunta** (ej: "¿Qué es un DEX?")
3. **Selecciona tipo de contenido** (TikTok 60s, Reel 90s, Thread, Artículo corto)
4. **Selecciona nivel técnico** (Principiante, Intermedio, Avanzado)
5. **Click "Generar Guion 🚀"**
6. **Edita el guion** en el preview si es necesario
7. **Guarda en Notion** o **copia al portapapeles**

### Analizar Nuevo Creator

1. Ve a **`/analyzer`** o click "Analizar Nuevo Creator"
2. **Pega la URL del canal de YouTube**
3. (Opcional) Agrega el nombre del creator
4. **Selecciona cuántos videos analizar** (5-15)
5. **Click "Analizar Creator 🔍"**
6. Espera ~10-15 minutos mientras extrae transcripts y analiza
7. El nuevo estilo se guarda automáticamente y está disponible en el generador

## 🔧 Estructura del Proyecto

```
isra-skill-ui/
├── app/
│   ├── layout.tsx                     # Layout principal
│   ├── page.tsx                       # Generador principal
│   ├── analyzer/page.tsx              # Analyzer de nuevos creators
│   └── api/
│       ├── generate-script/route.ts   # Genera guiones con creator style
│       ├── save-to-notion/route.ts    # Guarda en Notion
│       ├── styles/route.ts            # GET creator styles
│       └── analyze-creator/route.ts   # POST analizar canal YouTube
├── components/
│   ├── ScriptForm.tsx                 # Form con StyleSelector
│   ├── ScriptPreview.tsx              # Preview + edición
│   ├── ScriptHistory.tsx              # Historial lateral
│   └── StyleSelector.tsx              # Selector de creator style
├── lib/
│   ├── isra-skill.ts                  # Prompt builders
│   ├── notion.ts                      # Cliente Notion
│   ├── supabase.ts                    # Cliente Supabase
│   └── creator-analyzer.ts            # YouTube extraction + analysis
├── supabase/
│   └── schema.sql                     # Database schema
├── .env.local
├── SUPABASE_SETUP.md                  # Setup guide
└── README.md
```

## 🚀 Deploy

**Estado:** ✅ Deployado en producción

- **URL:** https://isra-skill-ui.vercel.app
- **GitHub:** https://github.com/lalocripto/isra-skill-ui
- **Vercel Project:** eriosfg008-4655s-projects/isra-skill-ui

### Environment Variables Configuradas

✅ `NOTION_TOKEN` — Configurado en producción  
✅ `NOTION_DATABASE_ID` — Configurado en producción  
⚠️ `ANTHROPIC_API_KEY` — **PENDIENTE: Lalo debe agregarlo**

### 🔑 Cómo Agregar ANTHROPIC_API_KEY

1. Ve a [Vercel Dashboard](https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui/settings/environment-variables)
2. Click en **"Add New"**
3. **Name:** `ANTHROPIC_API_KEY`
4. **Value:** Tu API key de Claude (obtener de https://console.anthropic.com)
5. **Environment:** Production, Preview, Development (marcar todas)
6. Click **Save**
7. Ve a la pestaña **Deployments** y click **Redeploy** en el último deployment

### Redeploy Manual (si es necesario)

```bash
cd isra-skill-ui
vercel --prod
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

## 📝 Metodología Isra

Esta app usa los **5 Core Frameworks** de Isra:

1. **Pop Culture Analogy** — Compara con películas/series conocidas
2. **Everyday Object Analogy** — Usa objetos cotidianos (barriles, cajas fuertes)
3. **Breaking News + Data** — Noticias impactantes + datos verificables
4. **Honest Balance** — Siempre muestra pros Y cons ("Y claro que no todo es color rosa")
5. **Engagement Question** — Termina con pregunta abierta (no binaria)

**Signature phrases:**
- "Te explico [X] para cuando salga el tema con tus amigos"
- "Te suena familiar?"
- "Y claro que no todo es color rosa"
- "Puedes verificar en blockchain"

**Anti-patterns (NO hacer):**
- ❌ Predicciones de precio
- ❌ Shillear proyectos
- ❌ Jargon sin explicar
- ❌ Ignorar riesgos
- ❌ Manipulación FOMO

## 🎨 Brand Kit

- **Accent:** `#F7B11F`
- **Black:** `#111111`
- **Font:** Inter (Light/Medium/Bold/Black)
- **Source:** [Espacio Cripto Brand Kit](https://www.espaciocripto.io/idf/brandkit)

## 📄 Licencia

Proyecto interno — Espacio Cripto

## 🐞 Issues

Si encuentras bugs o tienes ideas:
1. Revisa `tasks/lessons.md` para errores conocidos
2. Reporta en GitHub Issues
3. O contacta a @lalocripto

---

**Powered by Claude Sonnet 4.5 + Notion API**
