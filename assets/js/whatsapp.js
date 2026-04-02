/* ============================================
   GLOBAL EXPORT EXCHANGE
   WhatsApp Widget — whatsapp.js
   ============================================ */

const WHATSAPP = (() => {
  const WA_NUMBER = '919810818274'; // +91-9810818274
  const DEFAULT_MSG = "Hello, I'm interested in your export services. Can you please assist me?";

  function buildURL(message) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message || DEFAULT_MSG)}`;
  }

  function init() {
    const fab = document.getElementById('whatsapp-fab');
    if (!fab) return;

    // The href is already set in HTML; we can update it dynamically here
    fab.href = buildURL();

    // Optionally: log analytics click
    fab.addEventListener('click', () => {
      console.log('[SGE] WhatsApp button clicked');
    });
  }

  function openChat(customMessage) {
    window.open(buildURL(customMessage), '_blank', 'noopener,noreferrer');
  }

  return { init, openChat, buildURL };
})();

window.WHATSAPP = WHATSAPP;
