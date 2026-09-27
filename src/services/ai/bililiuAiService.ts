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
 * Banco de Conhecimento e Resenha Mineira do Bililiu
 * 100% Autônomo e nativo — Sem necessidade de chave Gemini API.
 * Integração pura para Vercel + Neon DB.
 */
interface TopicResponse {
  keywords: string[];
  priority: number;
  replies: string[];
}

const BILILIU_KNOWLEDGE_TOPICS: TopicResponse[] = [
  {
    priority: 100,
    keywords: [
      "frisquila",
      "desenvolveu",
      "desenvolvedor",
      "desenvolve",
      "criou",
      "criador",
      "criação",
      "criacao",
      "programou",
      "programador",
      "fez o site",
      "criou o site",
      "autor",
    ],
    replies: [
      "Uai, essa página inteira e toda essa experiência foram criadas e desenvolvidas com maestria pelo Frisquila! O homem caprichou demais da conta na tecnologia e no design, deixou tudo tinindo! 🤠✨",
      "Foi o grande Frisquila quem desenvolveu tudo aqui! Ele juntou a tecnologia mais moderna com a resenha autêntica do Bililiu pra gente poder prosear a qualquer hora! 👏🚜",
      "Quem fez esse trem todo rodar com perfeição foi o Frisquila! O cara é fera no desenvolvimento e caprichou nos detalhes pra gente trocar essa ideia boa! 🌾💻",
    ],
  },
  {
    priority: 85,
    keywords: [
      "trator",
      "tratores",
      "colheitadeira",
      "john deere",
      "massey",
      "valtra",
      "new holland",
      "maquinario",
      "maquinário",
      "diesel",
      "retroescavadeira",
      "arado",
      "implemento",
      "plantadeira",
    ],
    replies: [
      "Uai, falou de trator o olho do Bililiu até brilha! 😂 Trator bão é aquele que não nega fogo nem na subida com carreta cheia de café! Tem que ter força no hidráulico e ar-condicionado na cabine, senão a poeira não perdoa! 🚜💨",
      "Ô máquina bruta! Cê sabe que hoje em dia esses tratores modernos tão parecendo nave espacial, né? Tem piloto automático via satélite, GPS e até tela que avisa onde o milho tá mais graúdo. Mas o toque do boiadeiro no volante ainda é insubstituível! 🛰️🚜",
      "Trator na fazenda é quase da família! Se o motor bater no primeiro arranque de manhã fria, o dia já tá ganho! 😂🚜",
    ],
  },
  {
    priority: 80,
    keywords: [
      "cafe",
      "café",
      "pao de queijo",
      "pão de queijo",
      "queijo",
      "canastra",
      "almoco",
      "almoço",
      "broa",
      "fuba",
      "fubá",
      "doce de leite",
      "torresmo",
      "feijao tropeiro",
      "feijão tropeiro",
      "quitanda",
      "comida",
    ],
    replies: [
      "Nóooo, cê foi falar de comida e minha barriga já roncou igual escapamento aberto! 😂 O café mineiro tem que ser coado na hora, bem pretinho e acompanhado daquele pão de queijo com queijo da Canastra que puxa e estica. Isso não é comida não, é patrimônio da humanidade! 🧀☕",
      "Uai, o segredo do café bão é a água quase fervendo e o pó de primeira colhido aqui nas montanhas de Minas. Com um pedacinho de queijo minas curado ou uma broa de milho assada na palha... rapaz, o caboclo não quer mais nada da vida! 🤤🌾",
      "Aqui na roça almoço sem um torresminho pururucado e um feijão tropeiro caprichado na couve não tem nem graça! É sustança pura pra aguentar a lida! 🍽️🤠",
    ],
  },
  {
    priority: 75,
    keywords: [
      "agro",
      "roca",
      "roça",
      "fazenda",
      "plantacao",
      "plantação",
      "soja",
      "milho",
      "gado",
      "lavoura",
      "colheita",
      "pasto",
      "bezerro",
      "porteira",
      "lida",
    ],
    replies: [
      "O agro é o motor que não deixa esse Brasil parar, sô! É levantar com a barra do dia clareando, botar a botina e ir cuidar da terra com respeito. Da sementinha miúda até a mesa de todo mundo, dá orgulho demais ver brotar! 🌱🚜",
      "A vida no campo ensina a gente a ter paciência e sabedoria. Cê planta, rega, espera o tempo da chuva e colhe com gratidão. E hoje com a tecnologia, o agro tá virando um espetáculo de moderno! 🌾🌽",
      "Lidar com gado e lavoura ensina o caboclo a valorizar cada gota de suor. E quando chega a época da colheita e o caminhão sai lotado, é festa na fazenda inteira! 🤠🌾",
    ],
  },
  {
    priority: 70,
    keywords: [
      "piada",
      "engracado",
      "engraçado",
      "causo",
      "riso",
      "kkk",
      "hahaha",
      "rsrs",
      "rir",
      "historia",
      "história",
    ],
    replies: [
      "Cê quer causo? Outro dia o Zé da horta comprou um trator tão moderno que tinha sensor de obstáculo. O trator travou no meio do pasto porque viu uma mariposa voando perto do farol! O Zé ficou duas horas conversando com o computador de bordo pra liberar a primeira marcha! 😂😂😂",
      "Tem um causo clássico aqui: o bezerro novo escapou do piquete e saiu desembestado pela estrada. Quando nóis foi ver, o bicho tava parado na frente da venda do compadre olhando pro pão de queijo na vitrine! Bicho esperto demais da conta! 🐮😂",
      "Outro causo bom: o compadre Tião foi dar ré na colheitadeira e derrubou o varal de roupa da patroa. Passou o dia colhendo camisa xadrez no meio das espigas de milho! 😂🧺",
    ],
  },
  {
    priority: 65,
    keywords: [
      "instagram",
      "tiktok",
      "video",
      "vídeo",
      "videos",
      "vídeos",
      "rede social",
      "redes sociais",
      "stories",
      "reels",
      "seguir",
    ],
    replies: [
      "Ô compadre, cola lá no meu Instagram oficial (@bililiuonline) e no TikTok (@bililiuonline)! Todo dia eu posto os perrengues da roça, causos engraçados e vídeos da lida. Cê vai dar boas risadas! 📸😂",
      "Segue lá no @bililiuonline! Tem vídeo novo saindo do forno, mostrando os maquinários, os tombos e a resenha do interior. Clica no link aí embaixo da página pra conferir! 🤠📲",
    ],
  },
  {
    priority: 60,
    keywords: [
      "dica",
      "conselho",
      "sabedoria",
      "orientacao",
      "orientação",
    ],
    replies: [
      "Anota a dica de ouro do Bililiu pra vida: nunca compre cavalo pelo rabo, nunca acelere trator na banguela e nunca recuse uma xícara de café oferecida por um mineiro! O resto a gente ajeita na caminhada! 🤠💡",
      "Conselho de quem conhece a terra: não tenha pressa de ver a espiga crescer antes da hora certa. Faça a sua parte hoje com capricho e a colheita vem no tempo certo, farta e bonita! 🌾🌱",
    ],
  },
  {
    priority: 55,
    keywords: [
      "oculos",
      "óculos",
      "chapeu",
      "chapéu",
      "estilo",
      "botina",
    ],
    replies: [
      "Ah, o óculos escuro e o chapéu boiadeiro são a marca registrada do homem! 😎🤠 Sem meu chapéu o sol torra os pensamentos e sem o óculos estiloso eu não enxergo as curvas da estrada de terra com elegância!",
    ],
  },
  {
    priority: 45,
    keywords: [
      "minas",
      "mineiro",
      "mineira",
      "interior",
      "belo horizonte",
    ],
    replies: [
      "Minas Gerais é um estado que abraça a gente, compadre! Aqui todo problema se resolve na mesa da cozinha, com conversa mansa e mesa farta. E 'trem' serve pra qualquer coisa que cê esqueceu o nome na hora! 😂",
      "Ser mineiro é um estilo de vida! A gente fala cantando, come quieto, observa tudo e quando abre a boca é pra soltar uma pérola ou acolher quem chega com o coração aberto! 🏔️☕",
    ],
  },
  {
    priority: 15,
    keywords: [
      "beleza",
      "belezinha",
      "tudo bem",
      "como ce ta",
      "como vai",
      "tudo bom",
      "joia",
      "jóia",
      "tranquilo",
    ],
    replies: [
      "Tudo bão demais da conta, graças a Deus! Firme igual mourão de cerca de aroeira! 😂 E com ocê, como é que tá essa lida?",
      "Aqui tá uma maravilha, sô! Solzão estalando no lombo, milho crescendo e o gado pastando na tranquilidade. Só alegria! 🌽🤠",
      "Firmeza total! O dia começou cedo na ordenha, tomei aquele café reforçado com queijo canastra e agora tô pronto pra resenha com ocê! 🧀☕",
    ],
  },
  {
    priority: 5,
    keywords: [
      "ola",
      "olá",
      "oi",
      "bom dia",
      "boa tarde",
      "boa noite",
      "fala bililiu",
      "e ai",
      "e aí",
      "opa",
      "salve",
    ],
    replies: [
      "Uai, compadre! Bão demais da conta? Puxa uma cadeira aí que o café já tá quase pronto no coador de pano! De que cê quer prosear hoje? ☕🤠",
      "Opa, sô! Chegou na hora boa! O Bililiu tava aqui ajeitando o chapéu e calibrando os pneus do trator. Como tão as coisas por aí? 🚜😂",
      "E aí, meu amigo! Bão por demais! Chega mais que na fazenda do Bililiu a prosa é garantida e o riso é frouxo. Manda a boa! 🌾",
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
 * Motor semântico que prioriza palavras-chave exatas e tópicos específicos
 */
function findBestLocalReply(userMessage: string): string {
  const clean = userMessage
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Ordena estritamente pela maior prioridade
  const sortedTopics = [...BILILIU_KNOWLEDGE_TOPICS].sort(
    (a, b) => b.priority - a.priority
  );

  for (const topic of sortedTopics) {
    const hasMatch = topic.keywords.some((kw) => {
      const cleanKw = kw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Verifica no texto normalizado
      return clean.includes(cleanKw);
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
 * Gera a resposta do Bililiu de forma 100% autônoma, sem Gemini API Key.
 * Respostas imediatas, com sotaque mineiro, causos e bom humor.
 */
export async function generateBililiuReply({
  message,
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

  // Gera a resposta mineira sem chamadas externas nem chave de API
  const reply = findBestLocalReply(trimmedMessage);

  return {
    success: true,
    reply,
  };
}
