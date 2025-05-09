
    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);

    // User Modal
    const userBtn = document.getElementById('user-btn');
    const userModal = document.getElementById('user-modal');
    const closeModal = document.getElementById('close-modal');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');

    userBtn.addEventListener('click', () => {
      userModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      userModal.style.display = 'none';
    });

    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginContent.classList.add('active');
      registerContent.classList.remove('active');
    });

    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerContent.classList.add('active');
      loginContent.classList.remove('active');
    });

    document.getElementById('submit-login').addEventListener('click', () => {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      if (username && password) {
        alert('Đăng nhập thành công!');
        userModal.style.display = 'none';
      } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
      }
    });

    document.getElementById('submit-register').addEventListener('click', () => {
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      if (username && email && password) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        userModal.style.display = 'none';
        loginTab.click();
      } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
      }
    });

    // Cart Functionality
    let cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartBtn.addEventListener('click', () => {
      cartDropdown.classList.toggle('show');
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        updateCart();
      });
    });

    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item flex justify-between';
        itemElement.innerHTML = `
          <span>${item.name} x${item.quantity}</span>
          <span>${(item.price * item.quantity).toLocaleString()} VNĐ</span>
        `;
        cartItems.appendChild(itemElement);
      });
      cartTotal.textContent = `${total.toLocaleString()} VNĐ`;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.classList.add('bounce');
      setTimeout(() => cartCount.classList.remove('bounce'), 300);
    }

    document.addEventListener('click', (e) => {
      if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.remove('show');
      }
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.getElementById('product-grid');
    const products = Array.from(productGrid.children);

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const sortType = button.dataset.sort;
        let sortedProducts = [...products];

        if (sortType === 'price-asc') {
          sortedProducts.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (sortType === 'price-desc') {
          sortedProducts.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        }

        productGrid.innerHTML = '';
        sortedProducts.forEach(product => productGrid.appendChild(product));
      });
    });

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Pop-up Ad
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');

    setTimeout(() => {
      popup.classList.add('show');
    }, 5000);

    popupClose.addEventListener('click', () => {
      popup.classList.remove('show');
    });