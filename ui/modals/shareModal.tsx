import React from "react";
import { X, MessageCircle, Twitter, Facebook, Linkedin, Send, Copy, Check, ExternalLink } from "lucide-react";
import {
  ShareData,
  shareToWhatsApp,
  shareToTwitter,
  shareToFacebook,
  shareToLinkedIn,
  shareToTelegram,
  copyToClipboard,
  shareNatively,
} from "@/utils/shareUtils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: ShareData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareData }) => {
  const [copied, setCopied] = React.useState(false);
  const [showNativeShare, setShowNativeShare] = React.useState(false);

  React.useEffect(() => {
    setShowNativeShare("share" in navigator);
  }, []);

  const handleCopy = async () => {
    const success = await copyToClipboard(shareData);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    const success = await shareNatively(shareData);
    if (success) {
      onClose();
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => shareToWhatsApp(shareData),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => shareToTwitter(shareData),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => shareToFacebook(shareData),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => shareToLinkedIn(shareData),
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "Telegram",
      icon: Send,
      action: () => shareToTelegram(shareData),
      color: "bg-blue-400 hover:bg-blue-500",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Compartir artículo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Native Share (if supported) */}
          {showNativeShare && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center space-x-3 p-4 bg-lime-50 hover:bg-lime-100 text-lime-700 rounded-xl transition-colors"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-medium">Compartir usando el sistema</span>
            </button>
          )}

          {/* Social Share Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Redes sociales</h4>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.action();
                      onClose();
                    }}
                    className={`flex items-center justify-center space-x-2 p-4 text-white rounded-xl transition-colors ${option.color}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium text-sm">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Copiar enlace</h4>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={shareData.url}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2 ${
                  copied ? "bg-green-100 text-green-700" : "bg-lime-100 hover:bg-lime-200 text-lime-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Article Preview */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h5 className="font-medium text-gray-900 mb-1 line-clamp-2">{shareData.title}</h5>
            <p className="text-sm text-gray-600 line-clamp-2">{shareData.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
