const url = 'https://course-api.com/javascript-store-products';

const productsDom = document.querySelector('.products-center');

const fetchProducts = async () => {
  productsDom.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    productsDom.innerHTML = '<p class="error">there was an error</p>';
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id } = product;
      const {
        fields: {
          name,
          price,
          image: [{ url }],
        },
      } = product;
      const formatPrice = price / 100;

      //id,name,price,image
      return `<a class="single-product" href="product.html">
            <img src="${url}" alt="${name}" class="single-product-img img" />
            <footer>
              <h5 class="name">${name}</h5>
              <span class="price">${formatPrice}</span>
            </footer>
          </a>`;
    })
    .join('');
  productsDom.innerHTML = `<div class="products-container">
  ${productList}</div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
