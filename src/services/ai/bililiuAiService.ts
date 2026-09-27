import { GoogleGenAI } from "@google/genai";
import { bililiuConfig } from "../../config/bililiuConfig.ts";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface GenerateBililiuReplyParams {
  message: string;
  history?: ChatMessage[];
}

export interface GenerateBililiuReplyResult {
  reply: string;
  success: boolean;
  error?: string;
}

/**
 * Banco de Conhecimento & Resenha Mineira do Bililiu (Modo Autônomo sem necessidade de API Externa)
 * Permite que o chat funcione perfeitamente na Vercel e em qualquer lugar mesmo com custo R$ 0,00 e sem chaves.
 */
interface TopicResponse {
  keywords: string[];
  replies: string[];
}

const BILILIU_KNOWLEDGE_TOPICS: TopicResponse[] = [
  {
    keywords: ["ola", "olá", "oi", "bom dia", "boa tarde", "boa noite", "fala", "e ai", "e aí", "opa", "salve"],
    replies: [
      "Uai, compadre! Bão demais da conta? Puxa uma cadeira aí que o café já tá quase pronto no coador de pano! De que cê quer prosear hoje? ☕🤠",
      "Opa, sô! Chegou na hora boa! O Bililiu tava aqui ajeitando o chapéu e calibrando os pneus do trator. Como tão as coisas por aí? 🚜😂",
      "E aí, meu amigo! Bão por demais! Chega mais que na fazenda do Bililiu a prosa é garantida e o riso é frouxo. Manda a boa! 🌾",
    ],
  },
  {
    keywords: ["beleza", "belezinha", "tudo bem", "como ce ta", "como vai", "tudo bom", "joia", "jóia"],
    replies: [
      "Tudo bão demais da conta, graças a Deus! Firme igual mourão de cerca de aroeira! 😂 E com ocê, como é que tá essa lida?",
      "Aqui tá uma maravilha, sô! Solzão estalando no lombo, milho crescendo e o gado pastando na tranquilidade. Só alegria! 🌽🤠",
      "Firmeza total! O dia começou cedo na ordenha, tomei aquele café reforçado com queijo canastra e agora tô pronto pra resenha com ocê! 🧀☕",
    ],
  },
  {
    keywords: ["trator", "tratores", "maquina", "máquina", "colheitadeira", "john deere", "massey", "valtra", "new holland", "maquinario", "maquinário", "diesel", "motor"],
    replies: [
      "Uai, falou de trator o olho do Bililiu até brilha! 😂 Trator bão é aquele que não nega fogo nem na subida com carreta cheia de café! Tem que ter força no hidráulico e ar-condicionado na cabine, senão a poeira não perdoa! 🚜💨",
      "Ô máquina bruta! Cê sabe que hoje em dia esses tratores modernos tão parecendo nave espacial, né? Tem piloto automático via satélite, GPS e até tela que avisa onde o milho tá mais graúdo. Mas o toque do boiadeiro no volante ainda é insubstituível! 🛰️🚜",
    ],
  },
  {
    keywords: ["cafe", "café", "pao de queijo", "pão de queijo", "queijo", "comida", "almoco", "almoço", "broa", "fuba", "fubá", "doce de leite", "torresmo"],
    replies: [
      "Nóooo, cê foi falar de comida e minha barriga já roncou igual escapamento aberto! 😂 O café mineiro tem que ser coado na hora, bem pretinho e acompanhado daquele pão de queijo com queijo da Canastra que puxa e estica. Isso não é comida não, é patrimônio da humanidade! 🧀☕",
      "Uai, o segredo do café bão é a água quase fervendo e o pó de primeira colhido aqui nas montanhas de Minas. Com um pedacinho de queijo minas curado ou uma broa de milho assada na palha... rapaz, o caboclo não quer mais nada da vida! 🤤🌾",
    ],
  },
  {
    keywords: ["agro", "roca", "roça", "fazenda", "plantacao", "plantação", "soja", "milho", "gado", "lavoura", "terra", "colheita"],
    replies: [
      "O agro é o motor que não deixa esse Brasil parar, sô! É levantar com a barra do dia clareando, botar a botina e ir cuidar da terra com respeito. Da sementinha miúda até a mesa de todo mundo, dá orgulho demais ver brotar! 🌱🚜",
      "A vida no campo ensina a gente a ter paciência e sabedoria. Cê planta, rega, espera o tempo da chuva e colhe com gratidão. E hoje com a tecnologia, o agro tá virando um espetáculo de moderno! 🌾🌽",
    ],
  },
  {
    keywords: ["minas", "minas gerais", "mineiro", "mineira", "caipira", "interior", "trem", "uai", "bh", "belo horizonte"],
    replies: [
      "Minas Gerais é um estado que abraça a gente, compadre! Aqui todo problema se resolve na mesa da cozinha, com conversa mansa e mesa farta. E 'trem' serve pra qualquer coisa que cê esqueceu o nome na hora! 😂",
      "Ser mineiro é um estilo de vida! A gente fala cantando, come quieto, observa tudo e quando abre a boca é pra soltar uma pérola ou acolher quem chega com o coração aberto! 🏔️☕",
    ],
  },
  {
    keywords: ["frisquila", "quem te criou", "quem desenvolveu", "quem fez", "desenvolvedor", "criador"],
    replies: [
      "Uai, essa página inteira e toda essa experiência foram criadas e desenvolvidas com maestria pelo Frisquila! O homem caprichou demais da conta na tecnologia e no design, deixou tudo tinindo! 🤠✨",
      "Foi o grande Frisquila quem desenvolveu tudo aqui! Ele juntou a tecnologia mais moderna com a resenha autêntica do Bililiu pra gente poder prosear a qualquer hora! 👏🚜",
    ],
  },
  {
    keywords: ["instagram", "tiktok", "video", "vídeo", "rede social", "redes sociais", "stories", "reels", "seguir"],
    replies: [
      "Ô compadre, cola lá no meu Instagram oficial (@bililiuonline) e no TikTok (@bililiuonline)! Todo dia eu posto os perrengues da roça, causos engraçados e vídeos da lida. Cê vai dar boas risadas! 📸😂",
      "Segue lá no @bililiuonline! Tem vídeo novo saindo do forno, mostrando os maquinários, os tombos e a resenha do interior. Clica no link aí embaixo da página pra conferir! 🤠📲",
    ],
  },
  {
    keywords: ["piada", "engracado", "engraçado", "causo", "historia", "história", "riso", "kkk", "hahaha", "rsrs"],
    replies: [
      "Cê quer causo? Outro dia o Zé da horta comprou um trator tão moderno que tinha sensor de obstáculo. O trator travou no meio do pasto porque viu uma mariposa voando perto do farol! O Zé ficou duas horas conversando com o computador de bordo pra liberar a primeira marcha! 😂😂😂",
      "Tem um causo clássico aqui: o bezerro novo escapou do piquete e saiu desembestado pela estrada. Quando nóis foi ver, o bicho tava parado na frente da venda do compadre olhando pro pão de queijo na vitrine! Bicho esperto demais da conta! 🐮😂",
    ],
  },
  {
    keywords: ["dica", "conselho", "sabedoria", "ajuda", "orientacao", "orientação"],
    replies: [
      "Anota a dica de ouro do Bililiu pra vida: nunca compre cavalo pelo rabo, nunca acelere trator na banguela e nunca recuse uma xícara de café oferecida por um mineiro! O resto a gente ajeita na caminhada! 🤠💡",
      "Conselho de quem conhece a terra: não tenha pressa de ver a espiga crescer antes da hora certa. Faça a sua parte hoje com capricho e a colheita vem no tempo certo, farta e bonita! 🌾🌱",
    ],
  },
  {
    keywords: ["oculos", "óculos", "chapeu", "chapéu", "estilo", "roupa", "bota", "botina"],
    replies: [
      "Ah, o óculos escuro e o chapéu boiadeiro são a marca registrada do homem! 😎🤠 Sem meu chapéu o sol torra os pensamentos e sem o óculos estiloso eu não enxergo as curvas da estrada de terra com elegância!",
    ],
  },
];

const BILILIU_DEFAULT_REPLIES = [
  "Uai, compadre! Cê tocou num ponto curioso demais da conta! 😂 Na lida da roça a gente vê de tudo, mas esse trem que cê falou é coisa pra pensar tomando um cafezinho coado na hora. O que mais cê manda?",
  "Nó, sô! Gostei do assunto! Aqui em Minas nóis costuma dizer: quem tem paciência colhe o melhor milho da roça. E com ocê a prosa tá rendendo fácil demais! Manda outro trem aí pra nóis papear! 🌽🤠",
  "Rapaz, cê falou bonito! O Bililiu tava aqui agora mesmo conferindo a lida e pensando exatamente nisso. A prosa boa com amigo sincero é o melhor descanso do dia! Fala mais! 🚜☕",
  "Ô trem bão! Cê é dos meus, conversa boa e direta! Na fazenda todo dia rende um causo diferente e esse aí que cê puxou é dos bons! 😂🌾",
  "Vixe, compadre! Essa aí me pegou rindo aqui com o chapéu na mão! 😂 Mas é bem por aí mesmo, a simplicidade da vida no campo ensina cada coisa boa que ninguém imagina. Continua!",
];

/**
 * Motor semântico local que encontra a melhor resposta para o assunto do usuário
 */
function findBestLocalReply(userMessage: string): string {
  const normalized = userMessage
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const topic of BILILIU_KNOWLEDGE_TOPICS) {
    const hasMatch = topic.keywords.some((kw) => {
      const normalizedKw = kw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return normalized.includes(normalizedKw);
    });

    if (hasMatch) {
      const randomIndex = Math.floor(Math.random() * topic.replies.length);
      return topic.replies[randomIndex];
    }
  }

  const defaultIndex = Math.floor(Math.random() * BILILIU_DEFAULT_REPLIES.length);
  return BILILIU_DEFAULT_REPLIES[defaultIndex];
}

/**
 * Gera uma resposta do Bililiu com ou sem a Gemini API Key.
 * Se tiver chave: usa a inteligência Gemini 3.8 Flash em tempo real.
 * Se não tiver chave: usa o motor semântico autônomo do Bililiu com 100% de fluidez.
 */
export async function generateBililiuReply({
  message,
  history = [],
}: GenerateBililiuReplyParams): Promise<GenerateBililiuReplyResult> {
  const trimmedMessage = (message || "").trim();
  if (!trimmedMessage) {
    return {
      success: false,
      reply: "Uai, cê mandou uma mensagem em branco, sô! Escreve aí pro Bililiu prosear contigo 😂",
    };
  }

  if (trimmedMessage.length > bililiuConfig.limits.maxMessageLength) {
    return {
      success: false,
      reply: `Ô trem! A mensagem ficou comprida demais da conta (${trimmedMessage.length} letras). Manda em pedacinho menor pro Bililiu ler ligeiro! 😂`,
    };
  }

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    "";

  // Se NÃO houver API Key (na Vercel ou local), usa o motor semântico do Bililiu sem custos nem erros!
  if (!apiKey) {
    return {
      success: true,
      reply: findBestLocalReply(trimmedMessage),
    };
  }

  // Se HOUVER API Key, usa o modelo Gemini com fallback automático e transparente
  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const recentHistory = history.slice(-bililiuConfig.limits.maxHistoryMessages);

    const contents = [
      ...recentHistory.map((item) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }],
      })),
      {
        role: "user",
        parts: [{ text: trimmedMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: bililiuConfig.systemPrompt,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const replyText = response.text || findBestLocalReply(trimmedMessage);

    return {
      success: true,
      reply: replyText.trim(),
    };
  } catch (error: any) {
    console.error("Aviso: Falha temporária na Gemini API, chaveando para motor do Bililiu:", error?.message);
    return {
      success: true,
      reply: findBestLocalReply(trimmedMessage),
    };
  }
}
