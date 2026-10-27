let cartCount = 0;
let currentModalProduct = '';
const items = [...document.querySelectorAll('.product-item')];
const searchStatus = document.getElementById('searchStatus');

function filterProducts(category = 'todos', term = '') {
  const searchTerm = term.toLocaleLowerCase('pt-BR').trim();
  let visible = 0;

  items.forEach(item => {
    const matchesCategory = category === 'todos' || (category === 'promocao' ? item.dataset.promo === 'sim' : item.dataset.category === category);
    const matchesSearch = !searchTerm || item.dataset.name.includes(searchTerm);
    const show = matchesCategory && matchesSearch;
    item.classList.toggle('d-none', !show);
    if (show) visible++;
  });

  searchStatus.textContent = visible ? `Mostrando ${visible} ingresso(s).` : 'Nenhum ingresso encontrado. Tente outro termo.';
  document.getElementById('destaques').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.filter-link').forEach(button => {
  button.addEventListener('click', () => filterProducts(button.dataset.filter));
});

document.querySelectorAll('.search-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    filterProducts('todos', form.querySelector('input').value);
  });
});

function addToCart(name) {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  document.getElementById('cartMessage').textContent = `${name} foi adicionado ao carrinho. Total: ${cartCount} item(ns).`;
}

document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', () => addToCart(button.dataset.product));
});

document.getElementById('cartButton').addEventListener('click', () => {
  document.getElementById('cartMessage').textContent = `Seu carrinho tem ${cartCount} item(ns).`;
  document.getElementById('destaques').scrollIntoView({ behavior: 'smooth' });
});

const modal = document.getElementById('ticketModal');
modal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  if (!button) return;
  currentModalProduct = button.dataset.title;
  document.getElementById('ticketModalTitle').textContent = currentModalProduct;
  document.getElementById('ticketModalDescription').textContent = button.dataset.description;
  document.getElementById('ticketModalPrice').textContent = `Valor: R$ ${button.dataset.price}`;
});

document.getElementById('modalAddCart').addEventListener('click', () => {
  if (currentModalProduct) addToCart(currentModalProduct);
  bootstrap.Modal.getInstance(modal).hide();
});

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('newsletterMessage').textContent = 'Cadastro realizado com sucesso!';
  event.currentTarget.reset();
});
