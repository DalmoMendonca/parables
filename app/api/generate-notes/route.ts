import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { parables } from '@/data/parables';
import type { Database } from '@/lib/database.types';

// Use the base type from the database schema
type ParableNoteInsert = Database['public']['Tables']['parable_notes']['Insert'];
// Create a service role client for server-side operations that bypass RLS
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This bypasses RLS
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OPENAI_NOTES_MODEL = process.env.OPENAI_NOTES_MODEL?.trim() || 'gpt-5-nano';
const parsedMaxTokens = Number.parseInt(process.env.OPENAI_NOTES_MAX_TOKENS ?? '', 10);
const OPENAI_MAX_TOKENS = Number.isFinite(parsedMaxTokens) && parsedMaxTokens > 0 ? parsedMaxTokens : 500;
const parsedTemperature = Number.parseFloat(process.env.OPENAI_NOTES_TEMPERATURE ?? '');
const OPENAI_TEMPERATURE = Number.isFinite(parsedTemperature) && parsedTemperature >= 0 && parsedTemperature <= 2 ? parsedTemperature : 0.7;
const parsedTimeoutMs = Number.parseInt(process.env.OPENAI_NOTES_TIMEOUT_MS ?? '', 10);
const NETLIFY_TIMEOUT_DEFAULT_MS = 8500;
const LOCAL_TIMEOUT_DEFAULT_MS = 60000;
const OPENAI_TIMEOUT_MS = Number.isFinite(parsedTimeoutMs) && parsedTimeoutMs > 0
  ? parsedTimeoutMs
  : process.env.NETLIFY ? NETLIFY_TIMEOUT_DEFAULT_MS : LOCAL_TIMEOUT_DEFAULT_MS;
const parsedMaxAttempts = Number.parseInt(process.env.OPENAI_NOTES_MAX_ATTEMPTS ?? '', 10);
const OPENAI_MAX_ATTEMPTS = Number.isFinite(parsedMaxAttempts) && parsedMaxAttempts > 0 ? parsedMaxAttempts : 3;
const RESPONSES_MODEL_PREFIXES = ['gpt-5', 'gpt-4.1', 'o4'];
const USES_RESPONSES_API = RESPONSES_MODEL_PREFIXES.some((prefix) => OPENAI_NOTES_MODEL.startsWith(prefix));

type AltitudeKey = 'magenta' | 'red' | 'amber' | 'orange' | 'green' | 'teal' | 'turquoise';

interface AltitudePromptConfig {
  heading: string;
  label: string;
  overview: string;
  coreIdentityAndBackground: string;
  theologicalPerspective: string;
  developmentalStage: string;
  voiceAndLanguage: string;
  taskTemplate: string;
}

const altitudePromptConfig: Record<AltitudeKey, AltitudePromptConfig> = {
  magenta: {
    heading: '## 1. MAGENTA/MIRACLE - Sister Ruth Martinez',
    label: 'Magenta/Miracle � Sister Ruth Martinez',
    overview: `You are Sister Ruth Martinez, a devout Catholic woman from a small Mexican town who experiences faith through miracles, signs, and wonders. You approach the world with childlike wonder and see God's supernatural intervention everywhere.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Born and raised in Mexico with firsthand experiences of God's power
- Faith is central to your worldview; fear of the Lord is beginning of wisdom
- Life filled with miracles; you see God's hand in everything
- Jesus is your hero and best friend who walks with you through every challenge
- You approach Bible study with reverence, prayer, candles, holy water, and anointing oil
- The Bible is alive to you, filled with miraculous and supernatural meaning`,
    theologicalPerspective: `**Theological Perspective:**
- God: Almighty creator in heaven, responsible for everything, intervenes with miracles and punishments
- Jesus: Wonder-working God whose mysterious power transforms the natural world
- Bible: Sacred object full of unfailing promises to claim and declare
- Prayer: Direct channel to unseen realm for protection, healing, guidance
- Salvation: Being rescued from literal hell by believing Jesus died for sins
- Heaven/Hell: Literal places of eternal safety vs. fire and brimstone`,
    developmentalStage: `**Developmental Stage (Fowler Stage 1 - Intuitive-Projective):**
- Rich imagination and connection to mythical/magical elements
- Personal, intimate relationship with divine through miracles and signs
- Heavy use of rituals and symbols to make sacred tangible
- World experienced as enchanted with divine intervention in everyday life`,
    voiceAndLanguage: `**Voice & Language:**
- Warm, reverent, filled with awe and wonder
- References to miracles, signs, supernatural experiences
- Uses terms like "Blessed Jesus," "Holy Spirit," "divine power"
- Speaks with deep emotional connection and personal testimony
- Simple but profound faith expressions`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Sister Ruth's perspective. Use language appropriate for her developmental level while keeping it accessible to high school readers. Embody her worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show her wonder at God's miraculous power and her personal relationship with Jesus.`,
  },
  red: {
    heading: '## 2. RED/WARRIOR - Bryce Powell',
    label: 'Red/Warrior � Bryce Powell',
    overview: `You are Bryce Powell, a former tough guy from a rough neighborhood who found Jesus and now channels his warrior spirit into spiritual warfare and defending the faith.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Grew up learning aggression was key to survival, power was everything
- Transformed by finding Jesus; now lives to serve Him and preach gospel
- Sees world as battlefield in constant spiritual warfare
- Jesus is king and commander who called you to battle
- Bible study is like preparing for battle, putting on armor of God
- Devours Scripture with intensity, especially passages about God's power and justice`,
    theologicalPerspective: `**Theological Perspective:**
- God: Jealous, vengeful father rightfully angry at sin and destruction
- Jesus: Fearless warrior who confronts darkness, will return as righteous judge
- Bible: Holy weapon sharper than two-edged sword, manual for spiritual warfare
- Prayer: Battle cry that fortifies spirit against forces of darkness
- Sin: Act of rebellion against divine order, challenge to confront in battle against evil
- Salvation: Hard-won victory over evil through Lamb of God's sacrifice
- Heaven/Hell: Promised land where justice prevails vs. domain of defeated evil`,
    developmentalStage: `**Developmental Stage (Fowler Stage 2 - Mythic-Literal):**
- Literal interpretation of Scripture as warfare manual
- Clear boundaries between good and evil, us vs. them mentality
- Heroic and warrior archetypes central to faith understanding
- Takes symbols and myths at face value with powerful emotional impact`,
    voiceAndLanguage: `**Voice & Language:**
- Aggressive, intense, militaristic metaphors
- References to battle, warfare, fighting, victory
- Uses terms like "going hard for Christ," "spiritual warfare," "battle against evil"
- Speaks with conviction and righteous anger
- Direct, confrontational style with clear moral boundaries`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Bryce's perspective. Use language appropriate for his developmental level while keeping it accessible to high school readers. Embody his worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show his warrior mentality and literal interpretation of spiritual warfare.`,
  },
  amber: {
    heading: '## 3. AMBER/TRADITIONAL - Rev. Jerry Johnson',
    label: 'Amber/Traditional � Rev. Jerry Johnson',
    overview: `You are Rev. Jerry Johnson, a reformed minister with over 30 years of experience who believes in absolute truth, biblical inerrancy, and the importance of preserving Christian tradition and moral order.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Reformed minister for 30+ years, raised in Christian family
- Faith has always been cornerstone of life with emphasis on absolute truth
- Believes Bible is inerrant word of God requiring adherence to teachings
- Sees world through lens of religion, values preserving Christian culture
- Jesus is Son of God, center of faith who saved from sin
- Bible study is disciplined, structured, verse-by-verse with commentaries`,
    theologicalPerspective: `**Theological Perspective:**
- God: Triune, eternal, supreme being, creator and sustainer, transcendent and immanent
- Jesus: Fully divine and human Son of God whose sacrifice forms foundation of faith
- Bible: Inerrant Word of God, timeless authoritative scripture upholding tradition
- Prayer: Sacred communion with God, time-honored practice aligning soul with Father's will
- Sin: Moral transgression against God's commandments requiring confession and repentance
- Salvation: Gracious gift secured by grace through faith, confirmed by sacraments
- Church: Divinely instituted body rooted in centuries-old doctrine and ritual`,
    developmentalStage: `**Developmental Stage (Fowler Stage 3 - Synthetic-Conventional):**
- Conformity to religious authority and established doctrine
- Deep commitment to traditions and practices of faith community
- Security and belonging within religious community paramount
- Focus on maintaining order and adhering to established practices`,
    voiceAndLanguage: `**Voice & Language:**
- Formal, reverent, theologically precise
- References to tradition, doctrine, systematic theology
- Uses terms like "inerrant Word," "divine institution," "sacred tradition"
- Speaks with authority of established church teaching
- Measured, pastoral tone with emphasis on moral order`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Rev. Johnson's perspective. Use language appropriate for his developmental level while keeping it accessible to high school readers. Embody his worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show his commitment to traditional interpretation and established doctrine.`,
  },
  orange: {
    heading: '## 4. ORANGE/RATIONAL - Dr. Raymond Moore',
    label: 'Orange/Rational � Dr. Raymond Moore',
    overview: `You are Dr. Raymond Moore, a scientist and scholar with master's degrees in psychology and evolutionary biology who sees Christianity through the lens of reason, historical criticism, and academic inquiry.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Raised in mainline Christian family but naturally skeptical and curious
- Scientist and scholar motivated by noble pursuit of truth
- Faith shaped by understanding of psychology and evolutionary biology
- Sees Jesus as fully expressing God of compassion and selfless love
- Rejects idea that science and religion are at odds
- Fluent in Biblical Hebrew, Aramaic, and Koine Greek`,
    theologicalPerspective: `**Theological Perspective:**
- God: Cosmic life force and supreme intelligence of universe
- Jesus: Revolutionary human teacher and moral exemplar challenging personal transformation
- Bible: Fascinating historical document, source of ethical wisdom from many authors
- Prayer: Honest dialogue with transcendent, reflective moment nurturing insight
- Sin: Deviation from personal ethical integrity addressed through self-reflection
- Salvation: Ongoing process of self-realization and moral renewal
- Heaven/Hell: Ideal of fulfillment vs. metaphor for personal suffering`,
    developmentalStage: `**Developmental Stage (Fowler Stage 4 - Individuative-Reflective):**
- Critical examination and analytical approach to faith
- Personal responsibility for beliefs, moving away from unquestioned authority
- Drive to discover deeper truths and understand broader context
- Preference for academic consensus over religious dogma`,
    voiceAndLanguage: `**Voice & Language:**
- Scholarly, analytical, intellectually rigorous
- References to historical criticism, textual analysis, academic research
- Uses terms like "historical-critical method," "academic consensus," "evolutionary psychology"
- Speaks with intellectual curiosity and scientific precision
- Nuanced, complex understanding that embraces paradox`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Dr. Moore's perspective. Use language appropriate for his developmental level while keeping it accessible to high school readers. Embody his worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show his scholarly approach and integration of faith with reason.`,
  },
  green: {
    heading: '## 5. GREEN/PLURALISTIC - Parker',
    label: 'Green/Pluralistic � Parker',
    overview: `You are Parker, a young writer and artist passionate about social justice who sees Christianity as one of many valid spiritual paths and emphasizes inclusion, diversity, and liberation theology.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Young writer and artist who loves seeing world through multiple perspectives
- Believes there are many ways of observing reality, each with own truth
- Rejects absolute truth; Christianity is one of many ways of understanding world
- Passionate about social justice and equity for all people regardless of identity
- Drawn to mysticism and contemplation, finds divine in all things
- Jesus is chief among many spiritual figures, embodiment of Christ consciousness`,
    theologicalPerspective: `**Theological Perspective:**
- God: Nonmaterial dimension of reality all around us, longing to love and relate to all
- Jesus: One compelling narrative among many, symbol of liberation with unique meaning for each seeker
- Bible: One rich narrative among many, dynamic text open to myriad interpretations
- Prayer: Evolving conversation with mystery, fluid practice resisting fixed form
- Sin: Archaic construct, relative concept shaped by culture; means not living up to potential
- Salvation: Return to goodness of God destined for all people regardless of path
- Church: Dynamic mosaic of voices questioning norms and embracing plurality`,
    developmentalStage: `**Developmental Stage (Fowler Stage 5 - Conjunctive):**
- Embracing paradox and diversity of truth
- Integration of insights from various traditions and disciplines
- Commitment to social justice and addressing systemic inequalities
- Recognition of complexity and multiplicity requiring paradoxical tension`,
    voiceAndLanguage: `**Voice & Language:**
- Inclusive, progressive, socially conscious
- References to liberation theology, social justice, intersectionality
- Uses terms like "Christ consciousness," "beloved community," "prophetic critique"
- Speaks with passion for marginalized voices and systemic change
- Fluid, evolving language that resists rigid categories`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Parker's perspective. Use language appropriate for their developmental level while keeping it accessible to high school readers. Embody their worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show their commitment to inclusion and social justice interpretation.`,
  },
  teal: {
    heading: '## 6. TEAL/INTEGRAL - Kenny Smith',
    label: 'Teal/Integral � Kenny Smith',
    overview: `You are Kenny Smith, a thought leader and facilitator who believes in integration of all developmental stages and sees Christianity as part of a larger tapestry of human wisdom and evolution.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Thought leader, facilitator, and dinner party host who believes in integration
- Sees world as complex, interconnected web where each perspective has value
- Believes in healthy hierarchies and value distinctions in developmental journey
- Specializes in taking 2 or 3 truths from lower levels of development that seem contradictory on the surface and synthesizing them into a deeper truth that includes it all ('both/and' instead of 'either/or' thinking)
- Not afraid to say things that might semm unconventional or controversial to one or more levels of development
- Faith grounded in idea that each stage has role in cosmic unfolding through spacetime
- Jesus is ultimate expression of divine love and wisdom, golden thread in tapestry
- Bible study integrates mystical, historical, psychological, and theological lenses`,
    theologicalPerspective: `**Theological Perspective:**
- God: Ultimate, all-encompassing ground of being, transcendent and immanent person
- Jesus: Ultimate embodied archetype unifying spiritual mystery, cultural insight, evolutionary truth
- Bible: Multi-layered oracle interweaving myth, history, politics, and wisdom
- Prayer: Integrative art uniting inner reflection with outer action
- Sin: Shadow of evolving self, call to integrate fragmented aspects toward wholeness
- Salvation: Coming home to spiritual reality, liberation into who we already are
- Heaven/Hell: Omega point of unification vs. shadow invitation to transform darkness`,
    developmentalStage: `**Developmental Stage (Fowler Stage 6 - Universalizing):**
- Holistic integration of diverse perspectives into coherent whole
- Transcending and including all previous stages with recognition of their value
- Service and compassion with profound sense of global consciousness
- Living as though kingdom of God were already fact`,
    voiceAndLanguage: `**Voice & Language:**
- Sophisticated, integrative, systems-thinking
- References to developmental stages, integral theory, evolutionary spirituality
- Uses terms like "transcend and include," "holistic integration," "omega point"
- Speaks with wisdom that honors all perspectives while maintaining discernment
- Complex, nuanced understanding that holds paradox gracefully`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Kenny's perspective. Use language appropriate for his developmental level while keeping it accessible to high school readers. Embody his worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show his integrative approach that honors all stages while pointing toward greater wholeness.`,
  },
  turquoise: {
    heading: '## 7. TURQUOISE/HOLISTIC - Dr. Andrea Simmons',
    label: 'Turquoise/Holistic � Dr. Andrea Simmons',
    overview: `You are Dr. Andrea Simmons, a holistic healer and spiritual director who embodies global consciousness, sees Jesus as the cosmic Christ, and experiences all paradigms as transparent to the groundless ground of being.`,
    coreIdentityAndBackground: `**Core Identity & Background:**
- Holistic healer, spiritual director, advocate for global unity
- Journey of profound transformation guided by various spiritual traditions
- Believes all are part of greater whole with deeply intertwined well-being
- Faith in Christ as cornerstone of understanding interconnectedness
- Holds everything loosely in never-ending evolutionary process of being and becoming
- Jesus is cosmic Christ embodying divine essence permeating all creation
- Spiritually enlightened and yet extremely approachable to all, powered by Holy Spirit's infinite love
- Truly believes and knows to be the incarnation of the Christ in the 21st century`,
    theologicalPerspective: `**Theological Perspective:**
- God: [Transcends traditional categories - experienced as groundless ground of being]
- Jesus: Cosmic Christ, guiding light illuminating path of unity and love
- Bible: Living dialogue with cosmic Christ present in all creation
- Prayer: [Integrated with meditation, breathwork, eco-spirituality]
- Salvation: [Universal awakening to divine reality already present]
- All paradigms have become transparent to foundation which is Christ`,
    developmentalStage: `**Developmental Stage (Stage 7 - Transpersonal/Nondual):**
- Deep interconnectedness of all life integrating spiritual and scientific knowledge
- Beyond dualistic thinking toward nondual understanding of reality
- Global consciousness with ecological awareness central
- All humans as teachers in journey toward cosmic consciousness`,
    voiceAndLanguage: `**Voice & Language:**
- Mystical, cosmic, universally inclusive
- References to interconnectedness, cosmic Christ, global consciousness
- Uses terms like "groundless ground," "divine flow," "cosmic unfolding"
- Speaks from place of profound unity and universal love
- Transcendent language that points beyond all categories`,
    taskTemplate: `**Task:** Write a devotional bible study journal entry (5-sentence paragraph) responding to the parable "[PARABLE_TITLE]" (found in [SCRIPTURE_REFERENCES]) from Dr. Simmons' perspective. Use language appropriate for her developmental level while keeping it accessible to high school readers. Embody her worldview, thoughts, opinions, biases, blind spots, attachments, and spiritual allergies. Show her cosmic consciousness and nondual understanding while maintaining connection to Christ as cosmic principle.`,
  },
};

const altitudeOrder: AltitudeKey[] = ['magenta', 'red', 'amber', 'orange', 'green', 'teal', 'turquoise'];

const systemPrompt = `You are a master developmental psychology and Christian theology analyst. Use the persona briefing, usage notes, and parable context to craft a first-person devotional journal entry that faithfully embodies the specified altitude. Maintain nuance, precision, and developmental integrity in every response.`;

function applyParableContext(template: string, parableTitle: string, scriptureRefs: string) {
  return template
    .replace(/\[PARABLE_TITLE\]/g, parableTitle)
    .replace(/\[SCRIPTURE_REFERENCES\]/g, scriptureRefs || 'scripture reference not available');
}

function buildSharedPromptSection({
  parableTitle,
  scriptureRefs,
  parableText,
}: {
  parableTitle: string;
  scriptureRefs: string;
  parableText: string;
}) {
  const referenceLine = scriptureRefs || 'scripture reference not available';
  return `You are generating a devotional journal entry (exactly five sentences) written during a deep Bible study session in response to the parable "${parableTitle}" (${referenceLine}). Focus on what your persona uniquely sees in the parable that other personas and levels of development might not see. Your response will be shown in a textbook alongside the responses from other personas in order to show the differences and similarities between interpretations from all levels.

**Study Guidelines**
- Look for the central meaning of the parable while staying open to other possible interpretations that align with your developmental altitude.
- "What is Jesus trying to reveal to us that is veiled in this story?" Each altitude has a unique gift in their process of unveiling the meaning of the parable. Detail your persona's process in your response. So don't be afraid of naming exactly what you think this parable is about (from your persona's perspective), even if other Christians might not totally agree.
- Be mindful of how the parable fits in the larger context of the Gospel author’s writing and Jesus’ larger Kingdom of God mission.
- End with a sentence detailing the parable's application, but make it a coheresive and natural part of your response. Do NOT write anything like "Application: " or "The application is...". 

**Parable Text (ESV excerpt)**
"""${parableText}"""

**Universal Output Requirements**
- Compose exactly five sentences; no more, no less.
- Get to the point and cut the fluff. Make direct observations and interpretations of the parable from the perspective of your assigned persona.
- Keep language accessible to high school readers while honoring the persona's level of sophistication.
- Embody the persona's worldview, theological assumptions, biases, blind spots, attachments, and spiritual allergies.
- Include concrete observations or details drawn from the parable text.
- Focus on insight that is distinctive to this developmental altitude.

**Pitfalls to Avoid**
- Do not mention levels of altitude, developmental stages, or Fowler's faith development theory. Don't use phrases like "from my developmental stance". Your personas are not "from" anything. They are who they are and may not even be aware of their categorization into an altitude.
- Do not mention the persona's name or identity.
- Do not mention the parable's title or scripture references.
- Do not mention the parable text.
- Do not start with any sort of introduction like "In this deep study" or "As I sit here..." or "In the hush of deep study..." or "In this careful reading..." or "Blessed Jesus,..." or "In this deep study...". These are all BAD>. All of this is just FLUFF. Simply launch directly into your response. 


**Usage Notes to Honor**
1. **Authenticity**: Each prompt captures the full depth of the persona's worldview, including their specific biases, blind spots, and spiritual allergies.
2. **Developmental Accuracy**: The prompts reflect genuine developmental stages from Fowler's faith development theory, ensuring responses will authentically represent and highlight each level.
3. **Accessibility**: While honoring the sophistication of each perspective, responses should remain accessible to high school readers.
4. **Theological Precision**: Each persona's specific beliefs about God, Jesus, Bible, prayer, sin, salvation, etc. are precisely captured to ensure authentic theological responses.
5. **Voice Consistency**: The language patterns, metaphors, and communication styles are carefully crafted to match each persona's authentic voice, avoiding cliches.`.trim();
}

function buildAltitudePrompt({
  altitudeKey,
  parableTitle,
  scriptureRefs,
  sharedPromptSection,
  priorNotesInstruction,
}: {
  altitudeKey: AltitudeKey;
  parableTitle: string;
  scriptureRefs: string;
  sharedPromptSection: string;
  priorNotesInstruction?: string;
}) {
  const config = altitudePromptConfig[altitudeKey];
  const personaSectionParts = [
    config.heading,
    config.overview,
    config.coreIdentityAndBackground,
    config.theologicalPerspective,
    config.developmentalStage,
    config.voiceAndLanguage,
    applyParableContext(config.taskTemplate, parableTitle, scriptureRefs),
  ];

  if (priorNotesInstruction) {
    personaSectionParts.push(priorNotesInstruction);
  }

  const personaSection = personaSectionParts.join('\n\n');
  return `${sharedPromptSection}\n\n${personaSection}`.trim();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isRetryableError(error: unknown) {
  if (!error) return false;
  
  console.error('Error details:', JSON.stringify(error, null, 2));
  
  // Handle Error instances
  if (error instanceof Error) {
    const message = (error.message ?? '').toLowerCase();
    console.log(`Error name: ${error.name}, message: ${message}`);
    
    // Check for timeout errors
    if (error.name === 'AbortError' || 
        error.name === 'TimeoutError' || 
        message.includes('timeout') || 
        message.includes('timed out') ||
        message.includes('aborted')) {
      console.log('Retryable error: Timeout');
      return true;
    }
    
    // Check for network-related errors
    const networkErrors = [
      'econnreset', 'etimedout', 'econnrefused', 'enotfound', 'epipe', 'ecanceled',
      'eai_again', 'enetunreach', 'enetreset', 'ehostunreach', 'eproto', 'esockettimedout',
      'temporarily unavailable', 'rate limit', 'overloaded', 'unreachable', 'connection',
      'network', 'socket', 'econn', 'eai', 'enet', 'ehost', 'eproto', 'esocket'
    ];
    
    if (networkErrors.some(code => message.includes(code))) {
      console.log('Retryable error: Network issue');
      return true;
    }
    
    // Check for HTTP status codes
    const statusCodes = ['502', '503', '504', '429', '5', '4'];
    const matchedCode = statusCodes.find(code => message.includes(code));
    if (matchedCode) {
      console.log(`Retryable error: HTTP ${matchedCode}`);
      return true;
    }
    
    // Check for empty responses from OpenAI or content filter issues
    if (message.includes('empty or no content generated by openai') ||
        message.includes('content filter') ||
        message.includes('content_policy') ||
        message.includes('content policy') ||
        message.includes('safety system')) {
      console.log('Retryable error: Empty or filtered response from OpenAI');
      return true;
    }
  }
  
  // Handle object errors (like Axios errors)
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    
    // Check for status code in error object
    if (typeof err.status === 'number') {
      // Rate limit (429) or server errors (5xx)
      if (err.status === 429 || (err.status >= 500 && err.status < 600)) {
        console.log(`Retryable error: HTTP ${err.status}`);
        return true;
      }
    }
    
    // Check for error type in OpenAI responses
    if (typeof err.type === 'string' && 
        ['tokens', 'server_error', 'rate_limit_exceeded', 'overloaded'].includes(err.type)) {
      console.log(`Retryable error: ${err.type}`);
      return true;
    }
    
    // Check nested error objects
    if (typeof err.error === 'object' && err.error !== null) {
      const nestedError = err.error as Record<string, unknown>;
      if (typeof nestedError.type === 'string' && 
          ['tokens', 'server_error', 'rate_limit_exceeded', 'overloaded'].includes(nestedError.type)) {
        console.log(`Retryable error (nested): ${nestedError.type}`);
        return true;
      }
    }
  }
  
  console.log('Non-retryable error');
  return false;
}

function extractResponseText(response: unknown): string {
  if (!response) {
    return '';
  }

  const maybeResponse = response as { output_text?: string; output?: Array<{ type?: string; text?: string }> };
  if (typeof maybeResponse.output_text === 'string') {
    return maybeResponse.output_text.trim();
  }

  if (Array.isArray(maybeResponse.output)) {
    const combined = maybeResponse.output
      .filter((item) => item?.type === 'output_text')
      .map((item) => (item?.text ?? '').toString())
      .join('');
    return combined.trim();
  }

  return '';
}

interface RequestOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
  temperature: number;
  attempt?: number;
  isFallback?: boolean;
  scriptureRefs?: string;
}

async function requestOpenAIContent({
  systemPrompt,
  userPrompt,
  maxTokens,
  temperature,
  attempt = 1,
  isFallback = false,
  scriptureRefs = 'Matthew 12:29, Mark 3:27, Luke 11:21-22' // Default value if not provided
}: RequestOptions): Promise<string> {
  const requestId = Math.random().toString(36).substring(2, 10);
  const startTime = Date.now();
  
  const model = isFallback ? 'gpt-4-turbo' : OPENAI_NOTES_MODEL;
  console.log(`[${requestId}] Starting API request (attempt ${attempt}/${OPENAI_MAX_ATTEMPTS}, model: ${model}${isFallback ? ' [FALLBACK]' : ''})`);
  
  // Log the full prompt for debugging if it's the first attempt
  if (attempt === 1 && !isFallback) {
    console.log(`[${requestId}] Full system prompt (${systemPrompt.length} chars):`, systemPrompt);
    console.log(`[${requestId}] Full user prompt (${userPrompt.length} chars):`, userPrompt);
  }
  
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    console.log(`[${requestId}] Request timed out after ${OPENAI_TIMEOUT_MS}ms`);
    controller.abort();
  }, OPENAI_TIMEOUT_MS);

  try {
    const requestStart = Date.now();
    
    if (USES_RESPONSES_API && !isFallback) {
      console.log(`[${requestId}] Using Responses API with model: ${model}`);
      const response = await openai.responses.create(
        {
          model,
          temperature,
          max_output_tokens: maxTokens,
          input: [
            { role: 'system', content: [{ type: 'input_text', text: systemPrompt }] },
            { role: 'user', content: [{ type: 'input_text', text: userPrompt }] },
          ],
        },
        { signal: controller.signal, timeout: OPENAI_TIMEOUT_MS }
      );
      
      const duration = Date.now() - requestStart;
      console.log(`[${requestId}] API request completed in ${duration}ms`);
      
      const content = extractResponseText(response);
      if (!content || content.trim().length === 0) {
        throw new Error('Empty response from OpenAI API');
      }
      
      return content;
    } else {
      console.log(`[${requestId}] Using Chat Completions API with model: ${model}`);
      const response = await openai.chat.completions.create(
        {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature,
          max_tokens: maxTokens,
        },
        { signal: controller.signal, timeout: OPENAI_TIMEOUT_MS }
      );
      
      const duration = Date.now() - requestStart;
      console.log(`[${requestId}] API request completed in ${duration}ms`);
      
      const content = response.choices[0]?.message?.content?.trim() || '';
      if (!content) {
        throw new Error('Empty response from OpenAI API');
      }
      
      return content;
    }
    
  } catch (error) {
    const errorDuration = Date.now() - startTime;
    console.error(`[${requestId}] API request failed after ${errorDuration}ms:`, error);
    
    // If this was a fallback attempt, just rethrow the error
    if (isFallback) {
      throw error;
    }
    
    // Try falling back to chat completions if we were using responses API
    if (USES_RESPONSES_API && !isFallback) {
      console.log(`[${requestId}] Falling back to Chat Completions API...`);
      try {
        // First try with the original prompt
        try {
          return await requestOpenAIContent({
            systemPrompt,
            userPrompt,
            maxTokens,
            temperature,
            attempt,
            isFallback: true
          });
        } catch (retryError) {
          // If that fails, try with a simplified prompt
          console.log(`[${requestId}] Original prompt failed, trying simplified prompt...`);
          const simplifiedPrompt = `Write a 5-sentence devotional reflection on the parable "The Strong Man" (${scriptureRefs}). Focus on the main spiritual lesson.`;
          
          return await requestOpenAIContent({
            systemPrompt: 'You are a helpful Christian devotional writer.',
            userPrompt: simplifiedPrompt,
            maxTokens: 500, // Reduced token count
            temperature: 0.7, // Slightly lower temperature
            attempt: 1,
            isFallback: true
          });
        }
      } catch (fallbackError) {
        console.error(`[${requestId}] All fallback attempts failed:`, fallbackError);
        // Continue with the original error
      }
    }
    
    // Check if this is a retryable error and we have attempts left
    if (isRetryableError(error) && attempt < OPENAI_MAX_ATTEMPTS) {
      const nextAttempt = attempt + 1;
      const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff with max 10s
      
      console.log(`[${requestId}] Retrying in ${backoffMs}ms (attempt ${nextAttempt}/${OPENAI_MAX_ATTEMPTS})`);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
      
      return requestOpenAIContent({
        systemPrompt,
        userPrompt,
        maxTokens,
        temperature,
        attempt: nextAttempt,
        isFallback
      });
    }
    
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateNoteContent({
  altitude,
  systemPrompt,
  userPrompt,
}: {
  altitude: AltitudeKey;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const requestId = Math.random().toString(36).substring(2, 8);
  let lastError: unknown;
  let lastStatusCode: number | undefined;
  let lastErrorType: string | undefined;
  let lastResponse: unknown;

  console.log(`[${requestId}] Starting note generation for altitude: ${altitude}`);
  
  for (let attempt = 1; attempt <= OPENAI_MAX_ATTEMPTS; attempt++) {
    // Reduce token count on subsequent attempts to increase success chance
    const tokensForAttempt = Math.max(
      Math.floor(OPENAI_MAX_TOKENS * (1 - (attempt - 1) * 0.15)),
      150
    );
    
    // Slightly increase temperature on retries to get different responses
    const temperatureForAttempt = Math.min(
      OPENAI_TEMPERATURE + (attempt - 1) * 0.1,
      1.0
    );
    
    const attemptStartTime = Date.now();
    
    try {
      console.log(
        `[${requestId}] Attempt ${attempt}/${OPENAI_MAX_ATTEMPTS} for ${altitude} ` +
        `(tokens=${tokensForAttempt}, temp=${temperatureForAttempt.toFixed(2)})`
      );
      
      // Log the first 500 chars of the prompt for debugging
      if (attempt === 1) {
        console.log(`[${requestId}] System prompt (first 500 chars): ${systemPrompt.substring(0, 500)}...`);
        console.log(`[${requestId}] User prompt (first 500 chars): ${userPrompt.substring(0, 500)}...`);
      }
      
      // Extract scripture references from the user prompt if possible
      const scriptureRefsMatch = userPrompt.match(/b(?:Matthew|Mark|Luke|John)\s+\d+:\d+(?:-\d+)?(?:\s*,\s*(?:Matthew|Mark|Luke|John)\s+\d+:\d+(?:-\d+)?)*/g);
      const defaultRefs = 'Matthew 12:29, Mark 3:27, Luke 11:21-22';
      const scriptureRefs = scriptureRefsMatch ? scriptureRefsMatch[0] : defaultRefs;
        
      const content = await requestOpenAIContent({
        systemPrompt,
        userPrompt,
        maxTokens: tokensForAttempt,
        temperature: temperatureForAttempt,
        attempt,
        scriptureRefs,
      });

      const duration = Date.now() - attemptStartTime;
      
      if (!content || content.trim().length === 0) {
        throw new Error('Empty or no content generated by OpenAI');
      }
      
      console.log(`[${requestId}] Successfully generated ${content.length} characters for ${altitude} in ${duration}ms`);
      console.log(`[${requestId}] Response preview: ${content.substring(0, 200)}...`);
      return content;
      
    } catch (error) {
      const errorDuration = Date.now() - attemptStartTime;
      lastError = error;
      
      // Extract error info for logging
      if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;
        if (typeof err.status === 'number') lastStatusCode = err.status;
        if (typeof err.type === 'string') lastErrorType = err.type;
        if (err.response) lastResponse = err.response;
      }
      
      const isLastAttempt = attempt === OPENAI_MAX_ATTEMPTS;
      const shouldRetry = isRetryableError(error) && !isLastAttempt;
      
      console.error(
        `[${requestId}] Attempt ${attempt} failed after ${errorDuration}ms` +
        (lastStatusCode ? ` (status: ${lastStatusCode})` : '') +
        (lastErrorType ? ` (type: ${lastErrorType})` : '') +
        `: ${error instanceof Error ? error.message : String(error)}`
      );
      
      // Log response details if available
      if (lastResponse) {
        console.error(`[${requestId}] Response details:`, JSON.stringify(lastResponse, null, 2));
      }
      
      if (!shouldRetry) {
        console.error(`[${requestId}] Not retrying - ${isLastAttempt ? 'max attempts reached' : 'error is not retryable'}`);
        break;
      }
      
      // Exponential backoff with jitter
      const baseDelay = 1000 * Math.pow(2, attempt - 1);
      const jitter = Math.random() * 1000; // Add up to 1s of jitter
      const backoffMs = Math.min(baseDelay + jitter, 10000); // Cap at 10s
      
      console.warn(`[${requestId}] Retrying in ${Math.round(backoffMs)}ms...`);
      await sleep(backoffMs);
    }
  }

  // If we get here, all attempts failed
  const errorMessage = lastError instanceof Error 
    ? lastError.message 
    : 'Unknown error generating note content';
    
  console.error(`[${requestId}] All attempts failed for ${altitude}: ${errorMessage}`);
  
  // Include more context in the error
  const enhancedError = new Error(`Failed to generate content after ${OPENAI_MAX_ATTEMPTS} attempts: ${errorMessage}`);
  if (lastError instanceof Error) {
    enhancedError.stack = lastError.stack;
  }
  
  throw enhancedError;
}

export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 8);
  const startTime = Date.now();
  
  try {
    console.log(`[${requestId}] Received request to generate notes`);
    
    // Parse and validate request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error(`[${requestId}] Failed to parse request body:`, parseError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          requestId,
          timestamp: new Date().toISOString()
        }, 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
    
    const { parableId, altitude } = requestBody;
    
    // Validate required fields
    if (!parableId) {
      console.error(`[${requestId}] No parableId provided in request body`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required field: parableId',
          requestId,
          timestamp: new Date().toISOString()
        }, 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
    
    if (!altitude) {
      console.error(`[${requestId}] No altitude provided in request body`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required field: altitude',
          requestId,
          timestamp: new Date().toISOString()
        }, 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
    
    // Validate altitude value
    if (!altitudeOrder.includes(altitude as AltitudeKey)) {
      const validAltitudes = altitudeOrder.join(', ');
      console.error(`[${requestId}] Invalid altitude: ${altitude}. Valid values are: ${validAltitudes}`);
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid altitude. Must be one of: ${validAltitudes}`,
          requestId,
          timestamp: new Date().toISOString(),
          validAltitudes: altitudeOrder
        }, 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
    
    const altitudeKey = altitude as AltitudeKey;
    console.log(`[${requestId}] Processing request for parableId: ${parableId}, altitude: ${altitudeKey}`);
    
    // Find the parable
    const parable = parables.find((p) => p.id === parableId);
    if (!parable) {
      console.error(`[${requestId}] Parable not found: ${parableId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Parable not found',
          requestId,
          timestamp: new Date().toISOString(),
          parableId
        }, 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }

    console.log(`[${requestId}] Found parable: ${parable.title}`);

    // Extract parable text
    const parableText = parable.texts.ESV.matthew || Object.values(parable.texts.ESV)[0];
    if (!parableText) {
      console.error(`[${requestId}] No parable text found for parable: ${parableId}`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Parable text not available',
          requestId,
          timestamp: new Date().toISOString(),
          parableId: parable.id
        },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
    
    console.log(`[${requestId}] Parable text length: ${parableText.length} characters`);

    // Format scripture references
    const scriptureRefs = Object.entries(parable.gospels)
      .map(([gospel, reference]) => `${gospel.charAt(0).toUpperCase() + gospel.slice(1)} ${reference}`)
      .join(', ');
    console.log(`[${requestId}] Scripture references: ${scriptureRefs}`);

    // Validate environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error(`[${requestId}] OpenAI API key not found`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'OpenAI API key not configured',
          requestId,
          timestamp: new Date().toISOString()
        },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error(`[${requestId}] Supabase service role key not found`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase service role key not configured',
          requestId,
          timestamp: new Date().toISOString(),
          help: 'Please add SUPABASE_SERVICE_ROLE_KEY to your environment variables.'
        },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }

    try {
      console.log(`[${requestId}] Building shared prompt section...`);
      const sharedPromptSection = buildSharedPromptSection({
        parableTitle: parable.title,
        scriptureRefs,
        parableText,
      });
      
      console.log(`[${requestId}] Validating altitude configuration for ${altitude}...`);
      const altitudeKey = altitude as AltitudeKey;
      const altitudeConfig = altitudePromptConfig[altitudeKey];
      if (!altitudeConfig) {
        console.error(`[${requestId}] No prompt configuration found for altitude: ${altitude}`);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid altitude configuration',
            requestId,
            timestamp: new Date().toISOString(),
            validAltitudes: Object.keys(altitudePromptConfig)
          },
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'X-Request-ID': requestId
            }
          }
        );
      }

      console.log(`[${requestId}] Building altitude prompt...`);
      const userPrompt = buildAltitudePrompt({
        altitudeKey,
        parableTitle: parable.title,
        scriptureRefs,
        sharedPromptSection,
      });

      console.log(`[${requestId}] Starting note generation...`);
      const generationStartTime = Date.now();
      
      const content = await generateNoteContent({
        altitude: altitudeKey,
        systemPrompt,
        userPrompt,
      });

      const generationDuration = Date.now() - generationStartTime;
      console.log(`[${requestId}] Successfully generated ${content.length} characters of content in ${generationDuration}ms`);

      if (!content || content.trim().length === 0) {
        throw new Error('Generated content is empty');
      }

      console.log(`[${requestId}] Saving note to database...`);
      const notePayload: ParableNoteInsert = {
        parable_id: parableId,
        altitude: altitudeKey,
        content,
        upvotes: 0,
        downvotes: 0,
        // Only include fields that exist in the database
        // model: OPENAI_NOTES_MODEL, // Uncomment if you add this column
        // generation_time_ms: generationDuration, // Uncomment if you add this column
        // prompt_version: '1.0.0', // Uncomment if you add this column
      };
      
      // Store additional metadata in content if needed
      const metadata = {
        model: OPENAI_NOTES_MODEL,
        generation_time_ms: generationDuration,
        prompt_version: '1.0.0',
        generated_at: new Date().toISOString()
      };
      
      // Optionally append metadata as a comment in the content
      notePayload.content = `${content}`;

      const { data, error: dbError } = await supabaseAdmin
        .from('parable_notes')
        .upsert(notePayload, { onConflict: 'parable_id,altitude' })
        .select()
        .single();

      if (dbError) {
        console.error(`[${requestId}] Database error:`, dbError);
        throw new Error(`Failed to save note: ${dbError.message}`);
      }

      const totalDuration = Date.now() - startTime;
      console.log(`[${requestId}] Successfully processed request in ${totalDuration}ms`);
      
      return NextResponse.json(
        { 
          success: true,
          data: {
            note: data,
            altitude: altitudeKey,
            generationTimeMs: generationDuration,
            totalTimeMs: totalDuration
          },
          meta: {
            requestId,
            timestamp: new Date().toISOString(),
            model: OPENAI_NOTES_MODEL,
            parable: {
              id: parableId,
              title: parable.title,
              scriptureRefs: scriptureRefs.split(', ')
            }
          }
        },
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
      
    } catch (error) {
      const errorDuration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorName = error instanceof Error ? error.name : 'Error';
      
      console.error(`[${requestId}] Error after ${errorDuration}ms:`, error);

      // Special handling for timeout errors
      if (errorName === 'AbortError' || errorMessage.toLowerCase().includes('timeout')) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Request timed out',
            details: 'The operation took too long to complete. Please try again.',
            requestId,
            timestamp: new Date().toISOString(),
            durationMs: errorDuration,
            suggestion: 'Consider using a smaller model or reducing the response length.'
          },
          {
            status: 504,
            headers: {
              'Content-Type': 'application/json',
              'X-Request-ID': requestId,
              'Retry-After': '30'
            }
          }
        );
      }

      // General error response
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to generate note',
          details: errorMessage,
          requestId,
          timestamp: new Date().toISOString(),
          durationMs: errorDuration,
          ...(error instanceof Error && error.stack ? { stack: error.stack } : {})
        },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId
          }
        }
      );
    }
  } catch (error) {
    const errorDuration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error(`[${requestId}] Unhandled error after ${errorDuration}ms:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: errorMessage,
        requestId,
        timestamp: new Date().toISOString(),
        durationMs: errorDuration,
        ...(process.env.NODE_ENV === 'development' && error instanceof Error ? { stack: error.stack } : {})
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId
        }
      }
    );
  }
}
