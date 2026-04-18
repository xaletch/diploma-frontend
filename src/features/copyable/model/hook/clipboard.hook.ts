import { useState } from "react"

interface useClipboardReturnProps {
  copied: boolean;
  copy: (txt: string) => void;
}

export const useClipboard = (timeout=2500): useClipboardReturnProps => {
  const [copied, setCopied] = useState(false);

  const copy = async (txt: string) => {
    await navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  }

  return { copied, copy }
}
