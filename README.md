# 🐸 Isra Crypto Education Generator

Interfaz web para generar guiones educativos crypto usando la metodología anti-hype de Isra.

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

### Vercel

1. **Push a GitHub** (si no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Isra Skill UI"
   gh repo create isra-skill-ui --public --source=. --push
   ```

2. **Deploy a Vercel**:
   ```bash
   vercel
   ```

3. **Configura env vars en Vercel**:
   - Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
   - Settings → Environment Variables
   - Agrega: `ANTHROPIC_API_KEY`, `NOTION_TOKEN`, `NOTION_DATABASE_ID`

4. **Redeploy** para aplicar las variables:
   ```bash
   vercel --prod
   ```

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
