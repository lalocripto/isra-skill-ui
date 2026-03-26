# 🚀 Deployment Guide - Isra Skill UI

## 📍 Estado Actual

**✅ DEPLOYADO EN PRODUCCIÓN**

- **URL:** https://isra-skill-ui.vercel.app
- **GitHub Repo:** https://github.com/lalocripto/isra-skill-ui
- **Vercel Project:** eriosfg008-4655s-projects/isra-skill-ui
- **Deploy Date:** 2026-03-26
- **Build Status:** ✅ Successful

---

## 🔐 Environment Variables

### Variables Configuradas

| Variable | Status | Environment |
|----------|--------|-------------|
| `NOTION_TOKEN` | ✅ Configurada | Production |
| `NOTION_DATABASE_ID` | ✅ Configurada | Production |
| `ANTHROPIC_API_KEY` | ⚠️ **PENDIENTE** | N/A |

### ⚠️ ACCIÓN REQUERIDA: Agregar ANTHROPIC_API_KEY

La aplicación está deployada pero **NO funcionará hasta que agregues tu API key de Claude**.

#### Pasos para agregar ANTHROPIC_API_KEY:

1. **Obtén tu API key:**
   - Ve a https://console.anthropic.com
   - Login con tu cuenta
   - Ve a **API Keys** en el menú lateral
   - Crea una nueva key o copia una existente
   - **Formato:** `sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

2. **Agrega la key en Vercel:**
   - Ve a: https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui/settings/environment-variables
   - Click **"Add New"**
   - Llena el formulario:
     - **Name:** `ANTHROPIC_API_KEY`
     - **Value:** `sk-ant-api03-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (tu key real)
     - **Environment:** Marca **Production**, **Preview**, y **Development**
   - Click **Save**

3. **Redeploy para aplicar cambios:**
   - Ve a: https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui
   - Click en la pestaña **Deployments**
   - En el deployment más reciente, click en el menú **⋯** (tres puntos)
   - Selecciona **Redeploy**
   - Espera ~30-60 segundos a que complete

4. **Verifica que funciona:**
   - Ve a https://isra-skill-ui.vercel.app
   - Ingresa un tema (ej: "¿Qué es Bitcoin?")
   - Click **"Generar con Voice Isra 🚀"**
   - Si aparece el guion generado → ✅ Funciona
   - Si da error de API key → Revisa que la key sea correcta

---

## 📋 Build & Deploy History

### Initial Deployment (2026-03-26)

```bash
cd isra-skill-ui
npm run build  # ✅ Build exitoso
vercel --prod --yes
```

**Build Output:**
```
✓ Generating static pages using 1 worker (6/6) in 132ms
Build Completed in /vercel/output [25s]
Deployment completed
```

**URLs generadas:**
- Production: https://isra-skill-psexxf1m7-eriosfg008-4655s-projects.vercel.app
- Alias (la buena): https://isra-skill-ui.vercel.app

### Environment Variables Added

```bash
vercel env add NOTION_TOKEN production
# ✅ Added successfully

vercel env add NOTION_DATABASE_ID production
# ✅ Added successfully
```

---

## 🔄 Cómo Redeploy

### Opción 1: Git Push (Recomendado)

Cualquier push a `main` en GitHub triggerea un deploy automático:

```bash
cd isra-skill-ui
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel detectará el push y deployará automáticamente (~30-60 segundos).

### Opción 2: Vercel CLI

Deploy manual desde local:

```bash
cd isra-skill-ui
vercel --prod
```

### Opción 3: Vercel Dashboard

1. Ve a https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui
2. Pestaña **Deployments**
3. Click **Redeploy** en el deployment más reciente

---

## 🛠️ Troubleshooting

### Error: "Missing ANTHROPIC_API_KEY"

**Causa:** La env var no está configurada en Vercel  
**Solución:** Sigue los pasos en la sección "ACCIÓN REQUERIDA" arriba

### Error: "Build failed"

**Causa:** Error en el código o dependencias  
**Solución:**
1. Verifica que build funcione localmente: `npm run build`
2. Revisa los logs de Vercel en el deployment fallido
3. Fix el error y haz push

### Error: "Rate limit exceeded" (429)

**Causa:** Demasiadas requests a Claude API  
**Solución:**
1. Espera unos minutos
2. Verifica tu tier de API en Anthropic console
3. Considera agregar rate limiting en el código

### Notion DB no se actualiza

**Causa:** Database ID incorrecto o permisos faltantes  
**Solución:**
1. Verifica que `NOTION_DATABASE_ID` sea correcto
2. Confirma que la integration tenga acceso a la DB
3. Ve a Notion → Share → Agregar integration "Lola Benchmarks"

---

## 📊 Analytics & Monitoring

### Vercel Dashboard

- **URL:** https://vercel.com/eriosfg008-4655s-projects/isra-skill-ui
- **Metrics disponibles:**
  - Visits
  - Request duration
  - Status codes
  - Edge locations

### Logs en tiempo real

```bash
vercel logs isra-skill-ui --follow
```

---

## 🔐 Security Checklist

- [x] `.env.local` está en `.gitignore`
- [x] Environment variables en Vercel (no hardcodeadas)
- [x] Repository es público (código abierto)
- [x] ANTHROPIC_API_KEY **NO** está en el código
- [x] NOTION_TOKEN **NO** está en el código
- [x] Build exitoso sin warnings de seguridad

---

## 📝 Next Steps

1. [ ] Agregar `ANTHROPIC_API_KEY` en Vercel settings
2. [ ] Redeploy para aplicar la key
3. [ ] Probar generación de guiones en producción
4. [ ] Compartir URL con el equipo
5. [ ] (Opcional) Configurar dominio custom (ej: `isra.espaciocripto.io`)

---

## 🐞 Issues & Support

Si encuentras problemas:

1. **Revisa los logs:** `vercel logs isra-skill-ui`
2. **Verifica build local:** `npm run build`
3. **Contacta:** @lalocripto en GitHub
4. **Docs oficiales:**
   - [Vercel Docs](https://vercel.com/docs)
   - [Next.js Deployment](https://nextjs.org/docs/deployment)
   - [Anthropic API Docs](https://docs.anthropic.com)

---

**Última actualización:** 2026-03-26  
**Deployado por:** Lola (subagent)  
**Build Status:** ✅ Production Ready (pending ANTHROPIC_API_KEY)
