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

interface TopicResponse {
  name: string;
  keywords: string[];
  replies: string[];
}

/**
 * Super Base de Conhecimento e Causos do Bililiu
 * O motor encontra a resposta mais precisa por similaridade semântica exata,
 * cobrindo desde maquinários até culinária, clima, animais, piadas, conselhos e filosofia de roça.
 */
const BILILIU_KNOWLEDGE_TOPICS: TopicResponse[] = [
  // 1. Criador e Desenvolvimento
  {
    name: "criador",
    keywords: [
      "frisquila",
      "desenvolvedor",
      "desenvolveu",
      "programador",
      "criador",
      "criou",
      "quem te fez",
      "quem fez o site",
      "quem programou",
      "autor",
      "dono do site",
      "desenvolveu o site",
      "quem te inventou",
    ],
    replies: [
      "Uai, essa página inteira e toda essa experiência foram criadas e desenvolvidas com maestria pelo Frisquila! O homem caprichou demais da conta na tecnologia e no design, deixou tudo tinindo! 🤠✨",
      "Foi o grande Frisquila quem desenvolveu tudo aqui! Ele juntou a tecnologia mais moderna com a resenha autêntica do Bililiu pra gente poder prosear a qualquer hora! 👏🚜",
      "Quem fez esse trem todo rodar com perfeição foi o Frisquila! O cara é fera no desenvolvimento e caprichou nos detalhes pra gente trocar essa ideia boa! 🌾💻",
    ],
  },

  // 2. Piadas, Causos e Riso
  {
    name: "piada",
    keywords: [
      "piada",
      "engracado",
      "engraçado",
      "causo",
      "conte um causo",
      "conta um causo",
      "me faz rir",
      "dar risada",
      "conto",
      "historia engracada",
      "história engraçada",
      "mico",
      "perrengue",
      "kkk",
      "hahaha",
      "rsrs",
    ],
    replies: [
      "Cê quer causo? Outro dia o Zé da horta comprou um trator tão moderno que tinha sensor de obstáculo. O trator travou no meio do pasto porque viu uma mariposa voando perto do farol! O Zé ficou duas horas conversando com o computador de bordo pra liberar a primeira marcha! 😂😂😂",
      "Tem um causo clássico aqui: o bezerro novo escapou do piquete e saiu desembestado pela estrada. Quando nóis foi ver, o bicho tava parado na frente da venda do compadre olhando pro pão de queijo na vitrine! Bicho esperto demais da conta! 🐮😂",
      "Outro causo bom: o compadre Tião foi dar ré na colheitadeira e derrubou o varal de roupa da patroa. Passou o dia colhendo camisa xadrez no meio das espigas de milho! 😂🧺",
      "Causo de pescador de rio doce: o Tonho jurou que pescou um dourado tão pesado que a balança quebrou e o ponteiro foi parar na copa da mangueira! Ninguém viu, mas a história é boa demais pra estragar com a verdade! 🐟😂",
    ],
  },

  // 3. Clima, Tempo, Chuva e Sol
  {
    name: "clima",
    keywords: [
      "chuva",
      "chovendo",
      "chover",
      "trovoada",
      "trovao",
      "trovão",
      "tempestade",
      "sol",
      "calor",
      "frio",
      "geada",
      "previsao do tempo",
      "previsão do tempo",
      "tempo hoje",
      "seca",
      "vento",
    ],
    replies: [
      "Ô compadre, na roça a chuva é a maior bênção do céu! Quando o cheiro de terra molhada sobe, a gente sabe que o milho vai agradecer e o pasto vai brotar verdinho! 🌧️🌱",
      "Solzão de estalar mamona hoje! Tem que botar o chapéu de palha, passar protetor e encher a garrafa de água fresca na nascente, senão o lombo ferve! ☀️🤠",
      "Tempo na fazenda a gente olha pelas andorinhas e pela direção da fumaça do fogão! Se o vento virar pro lado da serra, pode preparar a bota de borracha que vem água! 🌦️",
    ],
  },

  // 4. Animais da Roça
  {
    name: "animais",
    keywords: [
      "cavalo",
      "manga larga",
      "mangalarga",
      "égua",
      "egua",
      "cachorro",
      "vira lata",
      "vira-lata",
      "porco",
      "leitao",
      "leitão",
      "galinha",
      "galo",
      "pintinho",
      "bezerro",
      "nelore",
      "bicho",
      "animal",
      "animais",
    ],
    replies: [
      "Cavalo bão de sela é o melhor companheiro pra rodar a fazenda conferindo cerca! O meu manga-larga aqui quando escuta o estalo do freio já vira as orelhas pra frente animado pra galopar! 🐎🤠",
      "Cachorro de roça é bicho leal demais da conta! Anda atrás do trator o dia inteiro, late pra lagartixa no mourão e na hora do descanso deita no pé do fogão a lenha pra receber carinho! 🐶🐾",
      "Galo caipira aqui não erra o despertador nem por decreto! Às 5 em ponto ele solta a cantoria do topo do poleiro chamando todo mundo pro café! 🐓☀️",
    ],
  },

  // 5. Tratores e Maquinários Pesados
  {
    name: "trator",
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
      "plantadeira",
      "oleo",
      "hidraulico",
      "motor",
      "manutencao",
      "manutenção",
    ],
    replies: [
      "Uai, falou de trator o olho do Bililiu até brilha! 😂 Trator bão é aquele que não nega fogo nem na subida com carreta cheia de café! Tem que ter força no hidráulico e ar-condicionado na cabine, senão a poeira não perdoa! 🚜💨",
      "Ô máquina bruta! Cê sabe que hoje em dia esses tratores modernos tão parecendo nave espacial, né? Tem piloto automático via satélite, GPS e até tela que avisa onde o milho tá mais graúdo. Mas o toque do boiadeiro no volante ainda é insubstituível! 🛰️🚜",
      "Trator na fazenda é quase da família! Se o motor bater no primeiro arranque de manhã fria, o dia já tá ganho! E o segredo tá no filtro de ar sempre limpo e diesel de qualidade! 😂🚜",
      "Rapaz, máquina agrícola hoje em dia é pura tecnologia. Mas não adianta ter 400 cavalos de potência se o piloto não souber ler a terra e respeitar o tempo do chão! 🚜🌾",
    ],
  },

  // 6. Café e Culinária Mineira
  {
    name: "comida",
    keywords: [
      "cafe",
      "café",
      "pao de queijo",
      "pão de queijo",
      "queijo",
      "canastra",
      "almoco",
      "almoço",
      "jantar",
      "broa",
      "fuba",
      "fubá",
      "doce de leite",
      "torresmo",
      "feijao tropeiro",
      "feijão tropeiro",
      "feijoada",
      "quitanda",
      "comida",
      "frango com quiabo",
      "comer",
      "fome",
      "fogao a lenha",
      "fogão a lenha",
    ],
    replies: [
      "Nóooo, cê foi falar de comida e minha barriga já roncou igual escapamento de caminhão descendo a serra! 😂 O café mineiro tem que ser coado no pano, bem pretinho e acompanhado daquele pão de queijo da Canastra estalando de quente. Isso não é comida, é patrimônio! 🧀☕",
      "Uai, o segredo do café bão é a água quase fervendo e o pó de primeira colhido aqui nas montanhas de Minas. Com um pedacinho de queijo minas curado ou uma broa de milho assada na palha... o caboclo não quer mais nada da vida! 🤤🌾",
      "Aqui na roça almoço sem um torresminho pururucado e um feijão tropeiro caprichado na couve não tem nem graça! Dá aquela sustança pura pra aguentar o batente da tarde! 🍽️🤠",
      "Nada nesse mundo supera um frango caipira com quiabo e angu feito no fogão a lenha de tijolo batido. O cheiro da lenha de bracatinga perfuma o terreiro inteiro! 🍲🔥",
    ],
  },

  // 7. Música Sertaneja, Viola e Modão
  {
    name: "musica",
    keywords: [
      "musica",
      "música",
      "modao",
      "modão",
      "viola",
      "violao",
      "violão",
      "sertanejo",
      "tiao carreiro",
      "tião carreiro",
      "sanfona",
      "cantoria",
      "cancao",
      "canção",
      "ouvir musica",
      "ouvir música",
    ],
    replies: [
      "Nóooo, cê falou de modão de viola e o peito até vibra! Um ponteado de viola caipira no fim de tarde com Tião Carreiro & Pardinho é o melhor remédio pra canseira do dia! 🪕🎶",
      "Música sertaneja de raiz conta a história da nossa gente, da lida da boiada e dos amores do sertão. Liga o rádio aí e bota um modão doído que o Bililiu acompanha no coro! 🤠🎵",
    ],
  },

  // 8. Dicas, Conselhos e Sabedoria
  {
    name: "conselho",
    keywords: [
      "dica",
      "conselho",
      "sabedoria",
      "orientacao",
      "orientação",
      "ajuda",
      "ensina",
      "o que fazer",
      "oque fazer",
      "duvida",
      "dúvida",
      "problema",
    ],
    replies: [
      "Anota a dica de ouro do Bililiu pra vida: nunca compre cavalo pelo rabo, nunca acelere trator na banguela e nunca recuse uma xícara de café oferecida por um mineiro! O resto a gente ajeita na caminhada! 🤠💡",
      "Conselho de quem conhece a terra: não tenha pressa de ver a espiga crescer antes da hora certa. Faça a sua parte hoje com capricho e a colheita vem no tempo certo, farta e bonita! 🌾🌱",
      "Quando o problema parecer grande demais da conta, faça igual boiadeiro na subida íngreme: engata a reduzida, mantém o rumo firme e não olha pra trás! No topo a vista compensa! 🏔️🚜",
    ],
  },

  // 9. Cansaço, Sono e Descanso
  {
    name: "descanso",
    keywords: [
      "dormir",
      "sono",
      "cansado",
      "canseira",
      "preguica",
      "preguiça",
      "descanso",
      "rede",
      "cama",
      "acordar",
      "exausto",
      "fatigado",
    ],
    replies: [
      "Depois de doze horas na lida da fazenda, deitar na rede da varanda com a brisa da serra é a coisa mais gostosa que tem! O sono vem macio igual algodão de primeira! 😴🌾",
      "Canseira de trabalho honesto é a melhor garantia de sono pesado! Desliga essa telinha aí, toma um chá de capim-cidreira e descansa o esqueleto pro batente de amanhã! ☕🌙",
    ],
  },

  // 10. Amor e Relacionamento
  {
    name: "amor",
    keywords: [
      "amor",
      "namoro",
      "casamento",
      "namorada",
      "namorado",
      "esposa",
      "mulher",
      "paquera",
      "coracao",
      "coração",
      "apaixonado",
      "paixao",
      "paixão",
    ],
    replies: [
      "No amor é igual laçar bezerro arisco: cê não pode ter pressa demais nem jogar o laço afobado! Tem que ter paciência, carinho e demonstrar que ocê é companheiro pra toda lida da vida! ❤️🤠",
      "O segredo de um relacionamento duradouro é igual café fresco: tem que cultivar todo dia, aquecer no fogão e servir com respeito e doçura! 😂☕",
    ],
  },

  // 11. Estilo, Óculos e Chapéu
  {
    name: "estilo",
    keywords: [
      "oculos",
      "óculos",
      "chapeu",
      "chapéu",
      "estilo",
      "botina",
      "cinto",
      "camisa",
      "roupa",
      "bonito",
      "estiloso",
    ],
    replies: [
      "Ah, o óculos escuro e o chapéu boiadeiro são a marca registrada do homem! 😎🤠 Sem meu chapéu o sol torra os pensamentos e sem o óculos estiloso eu não enxergo as curvas da estrada de terra com elegância!",
      "A botina de couro legítimo já tá moldada no formato do pé de tanto andar na lida! E o óculos escuro dá aquele ar moderno de cyber-agro que deixa o visual impecável! 😎🌾",
    ],
  },

  // 12. Filosofia, Sentido da Vida e Fé
  {
    name: "filosofia",
    keywords: [
      "sentido da vida",
      "futuro",
      "passado",
      "morte",
      "vida",
      "felicidade",
      "paz",
      "deus",
      "fe",
      "fé",
      "esperanca",
      "esperança",
    ],
    replies: [
      "A vida é curta demais da conta pra gente gastar com intriga e cara feia, compadre! A felicidade tá nas coisas simples: ver o sol nascer, ter saúde pra trabalhar e um café quentinho pra dividir com os amigos! 🌾🙏",
      "Tenha fé em Deus e respeito pela terra que o resto se ajeita! As tempestades passam e o sol sempre volta a brilhar na lavoura! ☀️✨",
    ],
  },

  // 13. Redes Sociais
  {
    name: "social",
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

  // 14. Minas Gerais
  {
    name: "minas",
    keywords: [
      "minas gerais",
      "mineiro",
      "mineira",
      "belo horizonte",
      "bh",
      "sul de minas",
      "uai",
      "trem",
    ],
    replies: [
      "Minas Gerais é um estado que abraça a gente, compadre! Aqui todo problema se resolve na mesa da cozinha, com conversa mansa e mesa farta. E 'trem' serve pra qualquer coisa que cê esqueceu o nome na hora! 😂",
      "Ser mineiro é um estilo de vida! A gente fala cantando, come quieto, observa tudo e quando abre a boca é pra soltar uma pérola ou acolher quem chega com o coração aberto! 🏔️☕",
    ],
  },

  // 15. Agro Geral e Fazenda
  {
    name: "agro",
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
      "porteira",
      "lida",
    ],
    replies: [
      "O agro é o motor que não deixa esse Brasil parar, sô! É levantar com a barra do dia clareando, botar a botina e ir cuidar da terra com respeito. Da sementinha miúda até a mesa de todo mundo, dá orgulho demais ver brotar! 🌱🚜",
      "A vida no campo ensina a gente a ter paciência e sabedoria. Cê planta, rega, espera o tempo da chuva e colhe com gratidão. E hoje com a tecnologia, o agro tá virando um espetáculo de moderno! 🌾🌽",
      "Lidar com gado e lavoura ensina o caboclo a valorizar cada gota de suor. E quando chega a época da colheita e o caminhão sai lotado pro silo, é festa na fazenda inteira! 🤠🌾",
    ],
  },

  // 16. Estado de Espírito / Como você está
  {
    name: "estadodeespirito",
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
      "Tudo bão demais da conta, graças a Deus! Firme igual mourão de cerca de aroeira fincado no barro vermelho! 😂 E com ocê, como é que tá essa lida?",
      "Aqui tá uma maravilha, sô! Solzão estalando no lombo, milho crescendo e o gado pastando na tranquilidade. Só alegria! 🌽🤠",
      "Firmeza total! O dia começou cedo na ordenha, tomei aquele café reforçado com queijo canastra e agora tô pronto pra resenha com ocê! 🧀☕",
    ],
  },

  // 17. Saudações Básicas
  {
    name: "saudacao",
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

/**
 * Respostas contextualizadas para qualquer assunto livre (NUNCA fica sem resposta)
 */
const BILILIU_DYNAMIC_FOLLOWUPS = [
  "Uai, compadre! Cê tocou num ponto curioso demais da conta! 😂 Na lida da roça a gente vê de tudo, mas esse trem que cê falou é coisa pra pensar tomando um cafezinho coado na hora. Me conta mais sobre isso!",
  "Nó, sô! Gostei de ver sua prosa! Aqui em Minas nóis costuma dizer: quem tem paciência colhe o melhor milho da roça. E com ocê a conversa tá rendendo fácil demais! O que mais cê tem pra me contar? 🌽🤠",
  "Rapaz, cê falou bonito! O Bililiu tava aqui agora mesmo conferindo a fazenda e pensando exatamente num trem desses. A prosa boa com amigo sincero é o melhor descanso do dia! Fala mais! 🚜☕",
  "Ô trem bão! Cê é dos meus, conversa boa, sincera e direta! Na fazenda todo dia rende um causo diferente e esse assunto aí rendeu um sorriso aqui no caboclo! 😂🌾",
  "Vixe, compadre! Essa aí me pegou rindo aqui com o chapéu na mão! 😂 Mas é bem por aí mesmo, a simplicidade da vida no campo ensina cada coisa boa que ninguém imagina. Continua que eu tô prestando atenção!",
  "Olha só que prosa boa! Cê sabe que o homem da roça escuta mais do que fala, né? E ouvindo ocê falar dá até gosto! Manda mais detalhes dessa história aí pro Bililiu! 🤠💬",
];

/**
 * Motor semântico refinado com correspondência de termos específicos
 */
function findBestLocalReply(userMessage: string): string {
  const clean = userMessage
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Procura por tópicos específicos por ordem de especificidade (criador, piada, clima, animais, etc.)
  for (const topic of BILILIU_KNOWLEDGE_TOPICS) {
    for (const kw of topic.keywords) {
      const cleanKw = kw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (clean.includes(cleanKw)) {
        const randomIndex = Math.floor(Math.random() * topic.replies.length);
        return topic.replies[randomIndex];
      }
    }
  }

  // Fallback conversacional mineiro alegre e acolhedor (NUNCA fica mudo)
  const defaultIndex = Math.floor(Math.random() * BILILIU_DYNAMIC_FOLLOWUPS.length);
  return BILILIU_DYNAMIC_FOLLOWUPS[defaultIndex];
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
      success: true,
      reply: "Uai, compadre! Cê mandou uma mensagem em branco, sô! 😂 Puxa uma cadeira e escreve aí pro Bililiu prosear contigo!",
    };
  }

  if (trimmedMessage.length > bililiuConfig.limits.maxMessageLength) {
    return {
      success: true,
      reply: `Ô trem! A mensagem ficou comprida demais da conta (${trimmedMessage.length} letras). Manda em pedacinho menor pro Bililiu ler ligeiro! 😂`,
    };
  }

  const reply = findBestLocalReply(trimmedMessage);

  return {
    success: true,
    reply,
  };
}
