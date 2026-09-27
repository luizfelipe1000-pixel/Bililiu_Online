/**
 * Utilitário de Compartilhamento Viral
 * Usa a Web Share API nativa em celulares e fallback para área de transferência em desktop.
 */

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export async function shareBililiu(options?: ShareOptions): Promise<{ shared: boolean; method: "native" | "clipboard" | "error" }> {
  const shareData = {
    title: options?.title || "Converse com Bililiu | Prosa Mineira com IA",
    text: options?.text || "Vem prosear com o Bililiu, o influenciador agro mineiro! Uma resenha boa demais com IA 😂🌾",
    url: options?.url || (typeof window !== "undefined" ? window.location.href : "https://conversecombililiu.com.br/"),
  };

  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { shared: true, method: "native" };
    } catch (err: any) {
      if (err.name === "AbortError") {
        return { shared: false, method: "native" };
      }
    }
  }

  // Fallback: cópia para clipboard
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${shareData.text} 👉 ${shareData.url}`);
      return { shared: true, method: "clipboard" };
    } catch {
      // Ignora erro
    }
  }

  return { shared: false, method: "error" };
}
