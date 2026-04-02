/* ============================================
   SHARMA'S GLOBAL EXPORT EXCHANGE
   Currency Converter — currency.js
   ============================================ */

const CURRENCY = (() => {
  const API_URL = 'https://open.er-api.com/v6/latest/USD';
  let rates = null;
  let activeCurrency = 'USD'; // 'USD' or 'INR'

  async function fetchRates() {
    const cached = sessionStorage.getItem('sge_rates');
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      // Cache valid for 60 minutes
      if (Date.now() - ts < 3600000) {
        rates = data;
        return rates;
      }
    }
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.rates) {
        rates = json.rates;
        sessionStorage.setItem('sge_rates', JSON.stringify({ data: rates, ts: Date.now() }));
      }
    } catch (e) {
      // Fallback static rate (approximate)
      rates = { INR: 83.5 };
    }
    return rates;
  }

  function convert(amountUSD) {
    if (!rates) return amountUSD;
    if (activeCurrency === 'INR') {
      return (amountUSD * rates.INR).toFixed(0);
    }
    return amountUSD.toFixed(2);
  }

  function formatAmount(amountUSD) {
    const sym = activeCurrency === 'INR' ? '₹' : '$';
    const val = convert(amountUSD);
    return `${sym}${Number(val).toLocaleString()}`;
  }

  function toggle() {
    activeCurrency = activeCurrency === 'USD' ? 'INR' : 'USD';
    updateUI();
  }

  function getActiveCurrency() { return activeCurrency; }

  function updateUI() {
    // Update all elements with currency display
    document.querySelectorAll('[data-price-usd]').forEach(el => {
      const usd = parseFloat(el.dataset.priceUsd);
      el.textContent = formatAmount(usd);
    });

    // Update toggle buttons
    document.querySelectorAll('.currency-display').forEach(el => {
      el.textContent = activeCurrency;
    });

    // Update rate display
    const rateEl = document.querySelector('.currency-rate-display');
    if (rateEl && rates) {
      rateEl.textContent = `1 USD = ₹${rates.INR?.toFixed(2) || '83.50'}`;
    }
  }

  async function init() {
    await fetchRates();
    updateUI();

    // Attach toggle to all currency toggle buttons
    document.querySelectorAll('[data-currency-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, toggle, convert, formatAmount, fetchRates, getActiveCurrency, updateUI };
})();

window.CURRENCY = CURRENCY;
