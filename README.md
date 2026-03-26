# 🐸 Isra Crypto Education Generator

Interfaz web para generar guiones educativos crypto usando la metodología anti-hype de Isra.

**🌐 Producción:** https://isra-skill-ui.vercel.app

## 🎯 Features

- **Generación de guiones** usando Claude Sonnet 4.5 + metodología de Isra
- **Preview editable** antes de guardar
- **Integración Notion** automática (DB: Publicaciones Programadas)
- **Historial de sesión** (últimos 10 guiones)
- **Brand Espacio Cripto** (#F7B11F accent, #111111 black, Inter font)

## 🛠️ Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** (Claude API)
- **Notion API**

## 📋 Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Anthropic API Key (obtener de https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Notion Integration Token (obtener de https://www.notion.so/my-integrations)
NOTION_TOKEN=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Notion Database ID (ID de la DB "Publicaciones Programadas")
NOTION_DATABASE_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

**⚠️ IMPORTANTE:** Actualiza `ANTHROPIC_API_KEY` con tu key real antes de correr.

### 3. Correr desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 Uso

1. **Ingresa un tema/pregunta** (ej: "¿Qué es un DEX?")
2. **Selecciona tipo de contenido** (TikTok 60s, Reel 90s, Thread, Artículo corto)
3. **Selecciona nivel técnico** (Principiante, Intermedio, Avanzado)
4. **Click "Generar con Voice Isra 🚀"**
5. **Edita el guion** en el preview si es necesario
6. **Guarda en Notion** o **copia al portapapeles**

## 🔧 Estructura del Proyecto

```
isra-skill-ui/
├── app/
│   ├── layout.tsx           # Layout principal con metadata
│   ├── page.tsx             # Página principal (generador)
│   ├── api/
│   │   ├── generate-script/route.ts  # Genera guiones con Claude
│   │   └── save-to-notion/route.ts   # Guarda en Notion DB
│   └── globals.css
├── components/
│   ├── ScriptForm.tsx       # Formulario de inputs
│   ├── ScriptPreview.tsx    # Preview + edición + acciones
│   └── ScriptHistory.tsx    # Historial lateral
├── lib/
│   ├── isra-skill.ts        # Parser de metodología Isra + prompts
│   └── notion.ts            # Cliente Notion API
├── .env.local               # Variables de entorno
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
