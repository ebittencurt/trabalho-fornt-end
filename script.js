
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
  "4": "mouse pad",
  "5": "Webcam Full HD",
  "6": "cadeira ergonomica"
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

function updateCartBadge() {
  if (cartCountEl) cartCountEl.textContent = String(cart.size);
}
function showCart(message, fromCartButton = false, singleItemId = null) {
  if (cartMsg) cartMsg.textContent = message || 'Seu carrinho';
  
  // Atualiza o título do modal
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
      // Remove qualquer evento de clique anterior
      checkoutBtn.replaceWith(checkoutBtn.cloneNode(true));
      // Adiciona o novo evento de clique
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


// Mapa de preços dos produtos
const priceMap = {
  "1": 399.90, // Attack Shark K86
  "2": 189.90, // Attack Shark L80 PRO
  "3": 139.90, // Attack Shark X11
  "4": 69.99,  // mouse pad
  "5": 149.90, // Webcam Full HD
  "6": 779.90  // cadeira ergonomica
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

  // Adiciona o total apenas quando mostrar o carrinho completo
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

(function montarOfertas(){
  const grid = document.getElementById('ofertas-grid');
  if (!grid) return;
  grid.innerHTML = ofertas.map(cardProdutoHTML).join('');

  document.querySelectorAll('#ofertas .btn.add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id   = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-item');
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

  document.querySelectorAll('#ofertas .btn.wish').forEach(btn => {
    const id = btn.getAttribute('data-id');
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = '♡ Favoritar';
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
      btn.textContent = pressed ? '♡ Favoritar' : '❤️ Desfavoritar';
    });
  });
})();

