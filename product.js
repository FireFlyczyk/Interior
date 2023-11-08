const productDom = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  productDom.innerHTML = '<h4 class="product-loading">Loading...</h4>';
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  try {
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDom.innerHTML = '<p class="error">there was an error</p>';
  }
};

const displayProduct = (product) => {
  const {
    fields: {
      company,
      name,
      price,
      colors,
      image: [{ url }],
    },
  } = product;
  document.title = name.toUpperCase();
  const formatPrice = price / 100;
  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');

  productDom.innerHTML = `<div class="product-wrapper">
        <img src="${url}" class="img" alt="" />

        <div class="product-info">
          <h3>${name}</h3>
          <h5>${company}</h5>
          <span>${formatPrice}</span>
          <div class="colors">
            ${colorsList}
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            maxime odit natus quaerat dolor, qui non est sapiente itaque eum in
            repellendus ex inventore exercitationem laboriosam architecto iste,
            expedita nobis?
          </p>
          <button class="btn">Add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();

  displayProduct(data);
};

start();
