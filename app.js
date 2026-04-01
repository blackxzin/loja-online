/* ============================================
   NovaTech - Premium Online Store
   Application Logic
   ============================================ */

// ===== Product Data =====
const products = [
    {
        id: 1,
        name: 'Fone Bluetooth Premium ANC',
        category: 'headphones',
        categoryLabel: 'Fones de Ouvido',
        price: 499.90,
        originalPrice: 699.90,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 234,
        badge: 'sale',
        badgeText: '-29%',
    },
    {
        id: 2,
        name: 'SmartWatch Ultra Fitness Pro',
        category: 'watches',
        categoryLabel: 'Relógios',
        price: 899.90,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 189,
        badge: 'new',
        badgeText: 'Novo',
    },
    {
        id: 3,
        name: 'Caixa de Som Portátil Bass+',
        category: 'speakers',
        categoryLabel: 'Caixas de Som',
        price: 349.90,
        originalPrice: 449.90,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 156,
        badge: 'hot',
        badgeText: 'Popular',
    },
    {
        id: 4,
        name: 'Earbuds Pro Wireless TWS',
        category: 'headphones',
        categoryLabel: 'Fones de Ouvido',
        price: 279.90,
        originalPrice: 399.90,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 312,
        badge: 'sale',
        badgeText: '-30%',
    },
    {
        id: 5,
        name: 'Headset Gamer RGB 7.1',
        category: 'headphones',
        categoryLabel: 'Fones de Ouvido',
        price: 389.90,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 98,
        badge: 'new',
        badgeText: 'Novo',
    },
    {
        id: 6,
        name: 'Smartband Fitness Tracker',
        category: 'watches',
        categoryLabel: 'Relógios',
        price: 199.90,
        originalPrice: 249.90,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
        rating: 4.5,
        reviews: 423,
        badge: 'sale',
        badgeText: '-20%',
    },
    {
        id: 7,
        name: 'Speaker Soundbar Cinema',
        category: 'speakers',
        categoryLabel: 'Caixas de Som',
        price: 1299.90,
        originalPrice: 1599.90,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 67,
        badge: 'hot',
        badgeText: 'Popular',
    },
    {
        id: 8,
        name: 'Carregador Wireless Magnético',
        category: 'accessories',
        categoryLabel: 'Acessórios',
        price: 149.90,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
        rating: 4.4,
        reviews: 178,
        badge: 'new',
        badgeText: 'Novo',
    },
    {
        id: 9,
        name: 'Hub USB-C 8-em-1 Premium',
        category: 'accessories',
        categoryLabel: 'Acessórios',
        price: 229.90,
        originalPrice: 299.90,
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 95,
        badge: 'sale',
        badgeText: '-23%',
    },
    {
        id: 10,
        name: 'Relógio Premium Classic Gold',
        category: 'watches',
        categoryLabel: 'Relógios',
        price: 1499.90,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
        rating: 5.0,
        reviews: 42,
        badge: 'hot',
        badgeText: 'Popular',
    },
    {
        id: 11,
        name: 'Fone Over-ear Studio Monitor',
        category: 'headphones',
        categoryLabel: 'Fones de Ouvido',
        price: 799.90,
        originalPrice: 999.90,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 156,
        badge: 'sale',
        badgeText: '-20%',
    },
    {
        id: 12,
        name: 'Power Bank Solar 20000mAh',
        category: 'accessories',
        categoryLabel: 'Acessórios',
        price: 179.90,
        originalPrice: 249.90,
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 234,
        badge: 'sale',
        badgeText: '-28%',
    },
];

// ===== State =====
let cart = JSON.parse(localStorage.getItem('novatech-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('novatech-wishlist')) || [];

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initHeader();
    initAnnouncement();
    initSearch();
    initCart();
    initProducts();
    initFilters();
    initCountdown();
    initParticles();
    initCounterAnimation();
    initScrollAnimations();
    initForms();
    initBackToTop();
    updateCartUI();
    updateWishlistUI();
});

// ===== Header =====
function initHeader() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('[data-nav]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();

            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`[data-nav][href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });
}

// ===== Announcement Bar =====
function initAnnouncement() {
    const bar = document.getElementById('announcement-bar');
    const close = document.getElementById('announcement-close');

    close.addEventListener('click', () => {
        bar.classList.add('hidden');
    });
}

// ===== Search =====
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', closeSearch);
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const results = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.categoryLabel.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.map(p => `
                <div class="search-result-item" data-id="${p.id}">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="search-result-info">
                        <h4>${p.name}</h4>
                        <span>${formatPrice(p.price)}</span>
                    </div>
                </div>
            `).join('');
            searchResults.classList.add('active');

            // Click on result
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    addToCart(parseInt(item.dataset.id));
                    closeSearch();
                });
            });
        } else {
            searchResults.innerHTML = '<div class="search-result-item"><p style="color: var(--text-muted)">Nenhum produto encontrado</p></div>';
            searchResults.classList.add('active');
        }
    });

    function closeSearch() {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.classList.remove('active');
    }
}

// ===== Cart =====
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartShopBtn = document.getElementById('cart-shop-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    if (cartShopBtn) {
        cartShopBtn.addEventListener('click', closeCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            showToast('Redirecionando para o checkout...', 'info');
            setTimeout(() => {
                showToast('Este é um site de demonstração! 😄', 'info');
            }, 2000);
        });
    }
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} adicionado ao carrinho!`, 'success');
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('novatech-cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Update badge
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('show', totalItems > 0);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-bag" class="icon-xl"></i>
                <p>Seu carrinho está vazio</p>
                <a href="#products" class="btn btn-primary btn-sm" onclick="closeCart()">Explorar Produtos</a>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="price">${formatPrice(item.price * item.qty)}</span>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i data-lucide="trash-2" class="icon-sm"></i>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        cartSubtotal.textContent = formatPrice(subtotal);
        cartTotal.textContent = formatPrice(subtotal);
    }

    lucide.createIcons();
}

// ===== Wishlist =====
function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx === -1) {
        wishlist.push(productId);
        const product = products.find(p => p.id === productId);
        showToast(`${product.name} adicionado aos favoritos! ❤️`, 'success');
    } else {
        wishlist.splice(idx, 1);
        showToast('Removido dos favoritos', 'info');
    }
    localStorage.setItem('novatech-wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    updateProductCards();
}

function updateWishlistUI() {
    const wishlistCount = document.getElementById('wishlist-count');
    wishlistCount.textContent = wishlist.length;
    wishlistCount.classList.toggle('show', wishlist.length > 0);
}

function updateProductCards() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        btn.classList.toggle('wishlisted', wishlist.includes(id));
    });
}

// ===== Products =====
function initProducts() {
    renderProducts(products);
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');

    grid.innerHTML = productsToRender.map((product, index) => `
        <div class="product-card" data-category="${product.category}" style="transition-delay: ${index * 0.05}s">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badgeText}</span>` : ''}
                <div class="product-actions-overlay">
                    <button class="product-action-btn wishlist-btn ${wishlist.includes(product.id) ? 'wishlisted' : ''}" 
                            data-id="${product.id}"
                            onclick="toggleWishlist(${product.id})" 
                            aria-label="Adicionar aos favoritos">
                        <i data-lucide="heart" class="icon"></i>
                    </button>
                    <button class="product-action-btn" onclick="addToCart(${product.id})" aria-label="Adicionar ao carrinho">
                        <i data-lucide="shopping-bag" class="icon"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.categoryLabel}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${getStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    // Animate cards in
    setTimeout(() => {
        grid.querySelectorAll('.product-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 80);
        });
    }, 100);
}

// ===== Filters =====
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const filtered = filter === 'all'
                ? products
                : products.filter(p => p.category === filter);

            renderProducts(filtered);
        });
    });
}

// ===== Countdown =====
function initCountdown() {
    // Set deadline to 3 days from now
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(23, 59, 59, 0);

    function update() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ===== Particles =====
function initParticles() {
    const container = document.getElementById('hero-particles');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${6 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.width = `${2 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const isDecimal = el.dataset.decimal === 'true';
                const duration = 2000;
                const start = performance.now();

                function animate(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

                    if (isDecimal) {
                        el.textContent = (target * eased).toFixed(1);
                    } else {
                        el.textContent = Math.floor(target * eased).toLocaleString('pt-BR');
                    }

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.category-card, .testimonial-card, .contact-card, .trust-item, .about-content, .about-image'
    );

    elements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ===== Forms =====
function initForms() {
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        showToast(`Obrigado! ${email} cadastrado com sucesso! 🎉`, 'success');
        newsletterForm.reset();
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
    });
}

// ===== Back to Top =====
function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Utilities =====
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const iconMap = {
        success: 'check-circle',
        error: 'alert-circle',
        info: 'info',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i data-lucide="${iconMap[type]}" class="icon"></i>
        <p>${message}</p>
    `;
    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
