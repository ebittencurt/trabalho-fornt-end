const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const termo = (document.getElementById('q')?.value || '').trim().toLowerCase();
    if (!termo) return;

    const cards = Array.from(document.querySelectorAll('.card'));
    let melhor = null;
    let melhorScore = -1;
    cards.forEach(card => {
      const nome = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      let score = 0;
      if (nome === termo) score = 100;
      else if (nome.includes(termo)) score = 80;
      else if (termo && nome.split(' ').some(w => termo.includes(w) || w.includes(termo))) score = 60;
      if (score > melhorScore) {
        melhor = card;
        melhorScore = score;
      }
    });
    if (melhor) {
      melhor.scrollIntoView({behavior: 'smooth', block: 'center'});
      melhor.classList.add('busca-destaque');
      setTimeout(() => melhor.classList.remove('busca-destaque'), 1800);
    }
  });
}

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));


const toggleTema = document.getElementById('toggleTema');
let isLight = false;

try {
  const saved = localStorage.getItem('pref-theme');
  if (saved === 'light') isLight = true;
  if (saved === 'dark') isLight = false;
} catch (e) {
}

function updateToggleButtonState() {
  if (!toggleTema) return;
  document.body.classList.toggle('light', isLight);
  toggleTema.setAttribute('aria-pressed', String(isLight));

  const icon = toggleTema.querySelector('i');
  if (icon) icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  const label = isLight ? 'Ativar tema escuro' : 'Ativar tema claro';
  toggleTema.setAttribute('aria-label', label);
  toggleTema.setAttribute('title', label);
}

updateToggleButtonState();

toggleTema?.addEventListener('click', () => {
  isLight = !isLight;
  updateToggleButtonState();

  try {
    localStorage.setItem('pref-theme', isLight ? 'light' : 'dark');
  } catch (e) {}
});



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




const itemsMap = {
  "1": "Attack Shark K86",
  "2": "Attack Shark L80 PRO",
  "3": "Attack Shark X11",
  "4": "mouse pad",
  "5": "Webcam Full HD",
  "6": "cadeira ergonomica"
};

const cart = new Set();                                      
const cartCountEl = $('#cartCount');                         
const btnCart      = $('#btnCart');                          

const fav = new Set();
const favCountEl = $('#favCount');
const btnFav = $('#btnFav');

const backdropFav = $('#backdrop-fav');
const modalFav = $('#modal-fav');
const favListEl = $('#fav-list');
const closeFavBtn = $('#closeFav');

const backdropCart = $('#backdrop-cart');
const modalCart    = $('#modal-cart');
const cartMsg      = $('#cart-msg');
const cartListEl   = $('#cart-list');
const closeCartBtn = $('#closeCart');
const goCheckout   = $('#goCheckout');

function updateCartBadge() {
  if (cartCountEl) cartCountEl.textContent = String(cart.size);
}
function updateFavBadge() {
  if (favCountEl) favCountEl.textContent = String(fav.size);
}
function showCart(message, fromCartButton = false, singleItemId = null) {
  if (cartMsg) cartMsg.textContent = message || 'Seu carrinho';
  

  const cartTitle = document.getElementById('cart-title');
  if (cartTitle) {
    cartTitle.textContent = fromCartButton ? 'Seu Carrinho 🛒' : 'Produto adicionado 🛒';
  }

  renderCartList(fromCartButton ? null : singleItemId);
  
  const checkoutBtn = document.getElementById('goCheckout');
  if (checkoutBtn) {
    if (fromCartButton) {
      checkoutBtn.style.display = 'none';
    } else {
      checkoutBtn.style.display = 'block';
      checkoutBtn.replaceWith(checkoutBtn.cloneNode(true));
      document.getElementById('goCheckout').addEventListener('click', () => {
        showCart('Seu carrinho completo', true);
      });
    }
  }
  
  openModal(backdropCart, modalCart);
}
function hideCart() { closeModal(backdropCart, modalCart); }


wireModalClose(backdropCart, modalCart, closeCartBtn);


btnCart?.addEventListener('click', () => showCart('Seu carrinho', true));


$$('.btn.add').forEach(btn => {
  btn.addEventListener('click', () => {
    const id   = btn.getAttribute('data-id');
    const name = btn.getAttribute('data-item') || itemsMap[id] || 'Produto';
    if (!id) return;

    if (cart.has(id)) {
      showCart(`${name} já está no carrinho.`, false, id);
    } else {
      cart.add(id);
      updateCartBadge();
      showCart(`${name} adicionado ao carrinho.`, false, id);
    }
  });
});


const anoEl = $('#ano');
if (anoEl) anoEl.textContent = new Date().getFullYear().toString();



const priceMap = {
  "1": 399.90, 
  "2": 189.90, 
  "3": 139.90, 
  "4": 69.99, 
  "5": 149.90, 
  "6": 779.90  
};

function renderCartList(singleItemId = null) {
  if (!cartListEl) return;

  let items;
  if (singleItemId) {
    items = [singleItemId];
  } else {
    items = Array.from(cart);
  }

  const html = items.map(id => `
    <li style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin:6px 0;">
      <div style="display:flex; flex-direction:column;">
        <span>${itemsMap[id]}</span>
        <span style="color:var(--brand); font-size:0.9em;">R$ ${priceMap[id].toFixed(2)}</span>
      </div>
      <button class="btn ghost rm-item" data-id="${id}">Remover</button>
    </li>
  `).join('');

 
  if (!singleItemId && items.length > 0) {
    const total = items.reduce((sum, id) => sum + priceMap[id], 0);
    cartListEl.innerHTML = `
      ${html}
      <li style="margin-top:16px; padding-top:16px; border-top:1px solid var(--border);">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <strong>Total:</strong>
          <strong style="color:var(--brand); font-size:1.1em;">R$ ${total.toFixed(2)}</strong>
        </div>
      </li>
    `;
  } else {
    cartListEl.innerHTML = html || '<li>Seu carrinho está vazio.</li>';
  }
}

cartListEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('.rm-item');  
  if (!btn) return;

  const id = btn.getAttribute('data-id');
  if (!id) return;

  cart.delete(id);

  updateCartBadge();

  renderCartList();
});



function loadFavFromStorage() {
  try {
    const raw = localStorage.getItem('favoritos:v1');
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) arr.forEach(id => fav.add(String(id)));
  } catch (e) {}
}
function saveFavToStorage() {
  try {
    localStorage.setItem('favoritos:v1', JSON.stringify(Array.from(fav)));
  } catch (e) {}
}

function renderFavList() {
  if (!favListEl) return;
  if (fav.size === 0) {
    favListEl.innerHTML = '<li>Você não adicionou favoritos.</li>';
    return;
  }

  const html = Array.from(fav).map(id => `
    <li style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin:6px 0;">
      <div style="display:flex; flex-direction:column;">
        <span>${itemsMap[id] || 'Produto'}</span>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button class="btn ghost rm-fav" data-id="${id}">Remover</button>
      </div>
    </li>
  `).join('');

  favListEl.innerHTML = html;
}

favListEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('.rm-fav');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  if (!id) return;
  fav.delete(id);
  saveFavToStorage();
  updateFavBadge();
  renderFavList();
  const wishBtn = document.querySelector(`.btn.wish[data-id="${id}"]`);
  if (wishBtn) {
    wishBtn.setAttribute('aria-pressed', 'false');
    wishBtn.textContent = '♡ Favoritar';
  }
});

wireModalClose(backdropFav, modalFav, closeFavBtn);
btnFav?.addEventListener('click', () => {
  renderFavList();
  openModal(backdropFav, modalFav);
});

const btnFavFooter = $('#btnFavFooter');
const favCountFooter = $('#favCountFooter');
if (btnFavFooter) {
  btnFavFooter.addEventListener('click', () => {
    renderFavList();
    openModal(backdropFav, modalFav);
  });
}

function syncFavBadges() {
  updateFavBadge();
  if (favCountFooter) favCountFooter.textContent = String(fav.size);
}

function wireWishButtons(root = document) {
  $$('.btn.wish', root).forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (!id) return;
    btn.setAttribute('aria-pressed', fav.has(id) ? 'true' : 'false');
    btn.textContent = fav.has(id) ? '❤️ Desfavoritar' : '♡ Favoritar';
    const clone = btn.cloneNode(true);
    clone.addEventListener('click', () => {
      const pressed = clone.getAttribute('aria-pressed') === 'true';
      if (pressed) {
        fav.delete(id);
      } else {
        fav.add(id);
      }
      clone.setAttribute('aria-pressed', String(!pressed));
      clone.textContent = !pressed ? '❤️ Desfavoritar' : '♡ Favoritar';
      saveFavToStorage();
      syncFavBadges();
      const other = document.querySelectorAll(`.btn.wish[data-id="${id}"]`);
      other.forEach(el => {
        if (el !== clone) {
          el.setAttribute('aria-pressed', String(!pressed));
          el.textContent = !pressed ? '❤️ Desfavoritar' : '♡ Favoritar';
        }
      });
    });
    btn.replaceWith(clone);
  });
}
loadFavFromStorage();
wireWishButtons();
syncFavBadges();

