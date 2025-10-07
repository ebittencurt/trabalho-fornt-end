const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));


const toggleTema = $('#toggleTema');
if (toggleTema) {
  let isLight = false;
  toggleTema.addEventListener('click', () => {
    isLight = !isLight;
    document.body.classList.toggle('light', isLight);
    toggleTema.setAttribute('aria-pressed', String(isLight));
  });
}


function openModal(backdropEl, modalEl) {
  if (!backdropEl || !modalEl) return;
  backdropEl.style.display = 'flex';
  requestAnimationFrame(() => modalEl.classList.add('show'));
  backdropEl.setAttribute('aria-hidden', 'false');
}
function closeModal(backdropEl, modalEl) {
  if (!backdropEl || !modalEl) return;
  modalEl.classList.remove('show');
  setTimeout(() => {
    backdropEl.style.display = 'none';
    backdropEl.setAttribute('aria-hidden', 'true');
  }, 200);
}
function wireModalClose(backdropEl, modalEl, ...buttons) {
  
  buttons.filter(Boolean).forEach(btn => btn.addEventListener('click', () => closeModal(backdropEl, modalEl)));
  
  if (backdropEl) {
    backdropEl.addEventListener('click', (e) => { if (e.target === backdropEl) closeModal(backdropEl, modalEl); });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdropEl && backdropEl.style.display === 'flex') {
      closeModal(backdropEl, modalEl);
    }
  });
}


const backdropNews = $('#backdrop');
const modalNews    = $('#modalSuccess');
const modalNewsMsg = $('#modal-msg');
const closeNewsBtn = $('#closeModal');
const okNewsBtn    = $('#okModal');

function showNewsletter(message) {
  if (modalNewsMsg) modalNewsMsg.textContent = message || 'Inscrição realizada com sucesso!';
  openModal(backdropNews, modalNews);
}
wireModalClose(backdropNews, modalNews, closeNewsBtn, okNewsBtn);


function inscreverNewsletter() {
  const email = $('#email')?.value.trim();
  const nome  = $('#nome')?.value.trim();
  if (!email) { alert('Informe um e-mail válido.'); return; }
  $('#form-news')?.reset();
  showNewsletter(`Obrigado, ${nome || 'visitante'}! Cadastro realizado com sucesso.`);
}
window.inscreverNewsletter = inscreverNewsletter;


const backdropCart = $('#backdrop-cart');
const modalCart    = $('#modal-cart');
const cartMsg      = $('#cart-msg');
const closeCartBtn = $('#closeCart');
const goCheckout   = $('#goCheckout');

function showCart(message) {
  if (cartMsg) cartMsg.textContent = message || 'Seu carrinho';
  openModal(backdropCart, modalCart);
}
function hideCart() { closeModal(backdropCart, modalCart); }
wireModalClose(backdropCart, modalCart, closeCartBtn, goCheckout);


const btnCart = $('#btnCart');
if (btnCart) btnCart.addEventListener('click', () => showCart('Seu carrinho'));


const cartCountEl = $('#cartCount');
let cartCount = 0;

$$('.btn.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.getAttribute('data-item') || 'Produto';
    cartCount += 1;
    if (cartCountEl) cartCountEl.textContent = String(cartCount);
    showCart(`${item} adicionado ao carrinho.`);
  });
});


$$('.btn.wish').forEach(btn => {
  btn.setAttribute('aria-pressed', 'false');
  btn.textContent = '♡ Favoritar';
  btn.addEventListener('click', () => {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    btn.textContent = pressed ? '♡ Favoritar' : '❤️ Desfavoritar';
  });
});


const anoEl = $('#ano');
if (anoEl) anoEl.textContent = new Date().getFullYear().toString();
