
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
  backdropEl?.addEventListener('click', (e) => { if (e.target === backdropEl) closeModal(backdropEl, modalEl); });
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


$$('.btn.wish').forEach(btn => {
  btn.setAttribute('aria-pressed', 'false');
  btn.textContent = '♡ Favoritar';
  btn.addEventListener('click', () => {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    btn.textContent = pressed ? '♡ Favoritar' : '❤️ Desfavoritar';
  });
});


const itemsMap = {
  "1": "Attack Shark K86",
  "2": "Attack Shark L80 PRO",
  "3": "Attack Shark X11",
};

const cart = new Set();                                      
const cartCountEl = $('#cartCount');                         
const btnCart      = $('#btnCart');                          

const backdropCart = $('#backdrop-cart');
const modalCart    = $('#modal-cart');
const cartMsg      = $('#cart-msg');
const cartListEl   = $('#cart-list');
const closeCartBtn = $('#closeCart');
const goCheckout   = $('#goCheckout');

function renderCartList() {
  if (!cartListEl) return;
  const html = Array.from(cart).map(id => `<li>${itemsMap[id]}</li>`).join('');
  cartListEl.innerHTML = html || '<li>Seu carrinho está vazio.</li>';
}
function updateCartBadge() {
  if (cartCountEl) cartCountEl.textContent = String(cart.size);
}
function showCart(message) {
  if (cartMsg) cartMsg.textContent = message || 'Seu carrinho';
  renderCartList();
  openModal(backdropCart, modalCart);
}
function hideCart() { closeModal(backdropCart, modalCart); }


wireModalClose(backdropCart, modalCart, closeCartBtn, goCheckout);


btnCart?.addEventListener('click', () => showCart('Seu carrinho'));


$$('.btn.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const id   = btn.getAttribute('data-id');            // "1", "2" ou "3"
    const name = btn.getAttribute('data-item') || itemsMap[id] || 'Produto';
    if (!id) return;

    if (cart.has(id)) {
      showCart(`${name} já está no carrinho.`);
    } else {
      cart.add(id);
      updateCartBadge();
      showCart(`${name} adicionado ao carrinho.`);
    }
  });
});


const anoEl = $('#ano');
if (anoEl) anoEl.textContent = new Date().getFullYear().toString();
