# 🚀 Quick Start — Isra Skill UI

Guía rápida para que Lalo pueda usar la interfaz inmediatamente.

---

## ⚡ Setup Rápido (5 minutos)

### 1. Obtener Anthropic API Key

1. Ve a https://console.anthropic.com
2. Sign in (o crea cuenta si no tienes)
3. Ve a **API Keys** en el menú
4. Click **"Create Key"**
5. Copia la key (empieza con `sk-ant-...`)

### 2. Agregar API Key al proyecto

Edita el archivo `.env.local` en la raíz del proyecto:

```bash
cd /Users/lola/.openclaw/workspace/isra-skill-ui
nano .env.local
```

Reemplaza `your_anthropic_api_key_here` con tu key real:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Guarda el archivo (Ctrl+O, Enter, Ctrl+X en nano).

### 3. Iniciar el servidor

```bash
npm run dev
```

### 4. Abrir en el navegador

Abre http://localhost:3000

---

## 🎬 Cómo Usar

### Generar un Guion

1. **Escribe un tema** en el campo "Tema/Pregunta"
   - Ejemplo: "¿Qué es staking?"
   - Ejemplo: "¿Cómo funcionan los Layer 2?"
   - Ejemplo: "Explicar el rugpull de [proyecto]"

2. **Selecciona tipo de contenido:**
   - **TikTok 60s** — Guion corto (~165 palabras, 60 segundos)
   - **Reel 90s** — Guion mediano (~250 palabras, 90 segundos)
   - **Thread** — Twitter thread (~400 palabras, 8-10 tweets)
   - **Artículo corto** — Blog post (~600 palabras, 3-4 min lectura)

3. **Selecciona nivel técnico:**
   - **Principiante** — Explicaciones super simples, sin jargon
   - **Intermedio** — Puede usar algunos términos técnicos
   - **Avanzado** — Audiencia con experiencia en crypto

4. **Click "Generar con Voice Isra 🚀"**

Espera ~10-15 segundos mientras Claude genera el guion.

### Editar y Guardar

1. **Revisa el guion** en el preview
2. **Edita directamente** en el textarea si necesitas cambios
3. **Revisa metadata:**
   - Palabras totales
   - Duración estimada
   - Complejidad

4. **Acciones disponibles:**
   - **♻️ Regenerar** — Genera una nueva versión del mismo tema
   - **💾 Guardar a Notion** — Guarda automáticamente en DB "Publicaciones Programadas"
   - **📋 Copiar** — Copia al portapapeles

### Historial

El sidebar derecho muestra los últimos 10 guiones de la sesión.

- Click en cualquier guion para volver a verlo
- Los guiones guardados en Notion tienen badge verde "✓ Notion"

---

## 🎯 Tips de Uso

### Mejores Temas para Generar

✅ **Conceptos fundamentales:**
- "¿Qué es X?" (DEX, staking, Layer 2, etc.)
- "¿Cómo funciona Y?" (smart contracts, wallets, etc.)
- "Diferencia entre X y Y" (CEX vs DEX, staking vs lending)

✅ **Noticias recientes:**
- "ETF de Bitcoin aprobado"
- "Argentina adopta Bitcoin"
- "Regulación nueva de [país/organismo]"

✅ **Scams/Educación preventiva:**
- "Red flags de un rugpull"
- "Cómo identificar una estafa crypto"
- "Análisis del rugpull de [proyecto]"

❌ **Evita:**
- Predicciones de precio ("Bitcoin llegará a $100K")
- Promover proyectos específicos
- Temas demasiado genéricos ("Crypto 101")

### Para Mejores Resultados

1. **Sé específico en el tema:**
   - ❌ "Crypto"
   - ✅ "¿Qué es un DEX y cómo funciona?"

2. **Si es noticia, incluye contexto:**
   - ❌ "Bitcoin ETF"
   - ✅ "Estados Unidos aprobó el ETF de Bitcoin: qué significa"

3. **Para scams, menciona el proyecto:**
   - ❌ "Rugpull"
   - ✅ "Rugpull de la moneda LIBRA de Javier Milei"

---

## 📊 Integración Notion

Cuando guardas a Notion, la app automáticamente:

✅ Crea página en DB "Publicaciones Programadas"  
✅ Agrega título (tu tema)  
✅ Inserta guion completo en el body  
✅ Asigna metadata (palabras, duración, complejidad)  
✅ Marca plataforma (TikTok/Instagram/Twitter/Blog según tipo)  
✅ Sugiere fecha (+2 días)  
✅ Marca status = "Listo"  
✅ Infiere complejidad de grabación/edición

Después de guardar, recibes el link directo a la página en Notion.

---

## 🔧 Troubleshooting

### "Failed to generate script"

**Causas posibles:**
- API key incorrecta o expirada
- Sin créditos en Anthropic
- Rate limit excedido

**Solución:**
1. Verifica que `ANTHROPIC_API_KEY` en `.env.local` sea correcta
2. Revisa tu usage en https://console.anthropic.com/settings/usage
3. Espera 1 minuto y vuelve a intentar

### "Failed to save to Notion"

**Causas posibles:**
- Notion token incorrecto
- Database ID incorrecto
- Falta permisos en la integración

**Solución:**
1. Verifica `NOTION_TOKEN` en `.env.local`
2. Verifica `NOTION_DATABASE_ID`
3. Ve a https://www.notion.so/my-integrations y verifica que la integración tenga acceso a la DB

### El servidor no inicia

**Solución:**
```bash
cd /Users/lola/.openclaw/workspace/isra-skill-ui
rm -rf node_modules
npm install
npm run dev
```

---

## 🚀 Deploy a Vercel (Opcional)

Si quieres que la app esté disponible online 24/7:

### 1. Deploy con Vercel CLI

```bash
vercel
```

Sigue los prompts (acepta defaults).

### 2. Configurar Environment Variables

```bash
vercel env add ANTHROPIC_API_KEY
# Pega tu API key cuando te lo pida

vercel env add NOTION_TOKEN
# Pega tu Notion token (mismo que usas en .env.local)

vercel env add NOTION_DATABASE_ID
# Pega tu Database ID (mismo que usas en .env.local)
```

### 3. Redeploy

```bash
vercel --prod
```

Recibes URL pública (ej: `https://isra-skill-ui.vercel.app`).

---

## 📖 Recursos

- **README.md** — Documentación completa del proyecto
- **EXAMPLES.md** — 3 guiones de ejemplo generados
- **GitHub** — https://github.com/lalocripto/isra-skill-ui
- **Skill original** — `/workspace/skills/isra-crypto-education/SKILL.md`

---

## 💡 Próximos Pasos

1. Genera 3-5 guiones de prueba para validar la metodología
2. Ajusta prompts en `lib/isra-skill.ts` si necesitas más control
3. Si encuentras bugs, reporta en GitHub Issues
4. Deploy a Vercel para usar desde cualquier lugar

**¿Preguntas?** Ping a Lola en Telegram.
