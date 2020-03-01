class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
  }

  _addProductToCard = function(product) {
    if (!product) return;

    let storageProducts = JSON.parse(localStorage.getItem('cart-products')) || [];

    let storagedSameProduct = storageProducts
      .find(item => item.id === product.id);
      
    if (!!storagedSameProduct) return;

    storageProducts.push(product);

    localStorage.setItem('cart-products', JSON.stringify(storageProducts));
  }

  show() {
    return fetch('/assets/data/products.json')
      .then(responce => {
        return responce.json()
      })
      .then(products => {
        this._products = products;

        let productsHtml = products
          .map(product => `
            <div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-img-wrap">
                        <img class="card-img-top" src="${product.imageUrl}" alt="${product.title}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <div class="rate">
                            <i class="icon-star ${!!product.rating && !!product.rating.stars && product.rating.stars >= 1 ? 'checked' : 'active'}"></i>
                            <i class="icon-star ${!!product.rating && !!product.rating.stars && product.rating.stars >= 2 ? 'checked' : 'active'}"></i>
                            <i class="icon-star ${!!product.rating && !!product.rating.stars && product.rating.stars >= 3 ? 'checked' : 'active'}"></i>
                            <i class="icon-star ${!!product.rating && !!product.rating.stars && product.rating.stars >= 4 ? 'checked' : 'active'}"></i>
                            <i class="icon-star ${!!product.rating && !!product.rating.stars && product.rating.stars >= 5 ? 'checked' : 'active'}"></i>
                            <span class="rate-amount ml-2">${product.rating ? product.rating.reviewsAmount : ''}</span>
                        </div>
                        <p class="card-text price-text ${!!product.oldPrice ? 'discount' : ''}">
                          <strong>${product.price}</strong>
                          ${!!product.oldPrice ? '<small class="ml-2">'+product.oldPrice+'</small>' : ''}                          
                        </p>
                        <button class="product-add-to-cart" data-button-role="add-to-cart">
                          Add to cart
                        </button>
                    </div>
                </div>
            </div>
          `)
          .join('');

        this.el.insertAdjacentHTML('beforeEnd', `
          <div class="row justify-content-end">
            <div class="col-lg-9">
                <h3 class="section-title">Top Recommendations for You</h3>
                <div class="row homepage-cards">
                  ${productsHtml}
                </div>
            </div>
          </div>
        `);

        this.el.addEventListener('click', ((event) => {
          if (event.target.nodeName !== 'BUTTON' || event.target.dataset.buttonRole !== 'add-to-cart') return;

          let productElement = event.target.closest('.products-list-product[data-product-id]');
          if (!productElement) return;

          let productId = +(productElement.dataset.productId);
          if (isNaN(productId)) return;

          if (!confirm('Вы уверенны, что хотите добавить этот товар в корзину?')) return;

          let product = this._products.find(item => item.id === productId);

          this._addProductToCard(product);
        }).bind(this));
      })
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
