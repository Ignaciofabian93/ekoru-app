export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const shareToWhatsApp = (data: ShareData) => {
  const text = `${data.title}\n\n${data.text}\n\n${data.url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
};

export const shareToTwitter = (data: ShareData) => {
  const text = `${data.title}\n\n${data.text}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    data.url
  )}`;
  window.open(twitterUrl, "_blank");
};

export const shareToFacebook = (data: ShareData) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
  window.open(facebookUrl, "_blank");
};

export const shareToLinkedIn = (data: ShareData) => {
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`;
  window.open(linkedInUrl, "_blank");
};

export const shareToTelegram = (data: ShareData) => {
  const text = `${data.title}\n\n${data.text}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, "_blank");
};

export const copyToClipboard = async (data: ShareData): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(data.url);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = data.url;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      return true;
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export const shareNatively = async (data: ShareData): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return true;
    } catch (err) {
      console.error("Error sharing:", err);
      return false;
    }
  }
  return false;
};
