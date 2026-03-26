/**
 * Isra Crypto Education Skill Parser
 * Extracts methodology and frameworks from SKILL.md
 */

export interface ScriptRequest {
  topic: string;
  contentType: 'TikTok 60s' | 'Reel 90s' | 'Thread' | 'Artículo corto';
  technicalLevel: 'Principiante' | 'Intermedio' | 'Avanzado';
}

export interface ScriptMetadata {
  wordCount: number;
  estimatedDuration: string;
  complexity: 'Baja' | 'Media' | 'Alta';
}

export function buildPrompt(request: ScriptRequest): string {
  const { topic, contentType, technicalLevel } = request;
  
  // Calculate target word count based on content type
  const targetWords = getTargetWordCount(contentType);
  
  // Build structured prompt using Isra's methodology
  const prompt = `Eres Isra, educador crypto con una metodología anti-hype y radicalmente honesta.

**CORE PRINCIPLES:**
1. Anti-hype: Siempre muestra el lado oscuro, no solo la luna
2. Verifica, no confíes: Apunta a datos on-chain y registros públicos
3. Analogías > Jargon: Usa comparaciones cotidianas, no tecnicismos
4. Balance: Toda innovación tiene trade-offs — muestra ambos
5. Empoderamiento: Da herramientas para pensar, no instrucciones a seguir

**VOICE:**
- Directo, conversacional, ligeramente sarcástico
- Crítico de autoridad (políticos, ballenas, instituciones)
- Transparente sobre riesgos y estafas
- Educacional, NO promocional
- Audiencia: hispanohablantes (Latinoamérica principalmente)

**SIGNATURE PHRASES (usa naturalmente):**
- "Te explico [X] para cuando salga el tema con tus amigos"
- "Te suena familiar?"
- "Y claro que no todo es color rosa" (transición a riesgos)
- "El parecido con [scam] es mera coincidencia" (sarcasmo)
- "Puedes verificar en blockchain / [fuente pública]"

**TASK:**
Escribe un guion educativo sobre: **${topic}**

**SPECS:**
- Tipo de contenido: ${contentType}
- Nivel técnico: ${technicalLevel}
- Target: ~${targetWords} palabras (${getEstimatedDuration(contentType)})
- Audiencia: ${getAudienceDescription(technicalLevel)}

**STRUCTURE:**
${getStructureTemplate(contentType, technicalLevel)}

**CRITICAL RULES:**
- ❌ NO predicciones de precio
- ❌ NO shillear proyectos
- ❌ NO usar jargon sin explicar
- ❌ NO ignorar riesgos
- ❌ NO manipulación FOMO
- ✅ SIEMPRE incluir "Y claro que no todo es color rosa" antes de mencionar riesgos
- ✅ SIEMPRE terminar con pregunta de engagement
- ✅ SIEMPRE usar analogías cotidianas para conceptos complejos

**OUTPUT FORMAT:**
Responde SOLO con el guion en markdown. No incluyas explicaciones meta.`;

  return prompt;
}

function getTargetWordCount(contentType: string): number {
  switch (contentType) {
    case 'TikTok 60s':
      return 165; // 150-180 words for 60s
    case 'Reel 90s':
      return 250; // 220-280 words for 90s
    case 'Thread':
      return 400; // Twitter thread ~400-500 words
    case 'Artículo corto':
      return 600; // Short article ~600-800 words
    default:
      return 200;
  }
}

function getEstimatedDuration(contentType: string): string {
  switch (contentType) {
    case 'TikTok 60s':
      return '~60 segundos';
    case 'Reel 90s':
      return '~90 segundos';
    case 'Thread':
      return 'Thread 8-10 tweets';
    case 'Artículo corto':
      return '3-4 minutos lectura';
    default:
      return '~60 segundos';
  }
}

function getAudienceDescription(level: string): string {
  switch (level) {
    case 'Principiante':
      return 'Personas que recién empiezan en crypto, necesitan explicaciones simples sin jargon';
    case 'Intermedio':
      return 'Personas con conocimiento básico de crypto, pueden manejar algunos términos técnicos';
    case 'Avanzado':
      return 'Personas con experiencia en crypto, buscan análisis profundo y matices';
    default:
      return 'Audiencia general';
  }
}

function getStructureTemplate(contentType: string, level: string): string {
  if (contentType === 'TikTok 60s' || contentType === 'Reel 90s') {
    return `1. **Hook** (5-10 palabras): Pregunta provocadora o stat impactante
2. **Definición simple** (1-2 frases): ¿Qué es [concepto]?
3. **Analogía cotidiana** (2-3 frases): "En vez de X, haces Y..."
4. **Beneficio** (1-2 frases): ¿Por qué importa?
5. **Transición**: "Y claro que no todo es color rosa."
6. **Riesgos/Trade-offs** (2-3 frases): Menciona 2-3 riesgos concretos
7. **Pregunta final**: "¿Tú [question relacionada]?"`;
  } else if (contentType === 'Thread') {
    return `1. **Tweet 1 (Hook)**: Stat o pregunta provocadora
2. **Tweet 2**: ¿Qué pasó? (contexto)
3. **Tweet 3-4**: Explicación con analogía
4. **Tweet 5-6**: Por qué importa / beneficios
5. **Tweet 7**: "Y claro que no todo es color rosa."
6. **Tweet 8-9**: Riesgos y trade-offs
7. **Tweet 10**: Pregunta final + CTA educativo`;
  } else {
    return `1. **Intro** (50 palabras): Hook + contexto
2. **Explicación** (200 palabras): ¿Qué es? Usa analogías
3. **Beneficios** (150 palabras): ¿Por qué importa?
4. **Transición**: "Y claro que no todo es color rosa."
5. **Riesgos** (150 palabras): Trade-offs y downsides
6. **Conclusión** (50 palabras): Resumen + pregunta`;
  }
}

export function calculateMetadata(script: string): ScriptMetadata {
  const wordCount = script.split(/\s+/).filter(word => word.length > 0).length;
  
  // Estimate duration (150 words/minute for Spanish)
  const minutes = Math.floor(wordCount / 150);
  const seconds = Math.round((wordCount % 150) / 2.5);
  const estimatedDuration = minutes > 0 
    ? `${minutes}m ${seconds}s`
    : `~${seconds}s`;
  
  // Determine complexity based on length and technical terms
  let complexity: 'Baja' | 'Media' | 'Alta' = 'Baja';
  if (wordCount > 400) complexity = 'Alta';
  else if (wordCount > 250) complexity = 'Media';
  
  return {
    wordCount,
    estimatedDuration,
    complexity
  };
}
