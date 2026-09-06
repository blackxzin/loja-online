/* ============================================================
   NovaTech — Application Logic
   Vanilla JS, sem build step. Organizado por módulo de UI.
   ============================================================ */

'use strict';

/* ---------- Constantes ---------- */
const STORAGE = {
    cart: 'novatech-cart',
    wishlist: 'novatech-wishlist',
    theme: 'novatech-theme',
    announcement: 'novatech-announcement',
    dealEnd: 'novatech-deal-end',
};

const FREE_SHIPPING_MIN = 299;
const SHIPPING_FLAT = 24.9;
const MAX_INSTALLMENTS = 12;
const MIN_INSTALLMENT = 30;
const DEAL_DURATION_MS = 3 * 24 * 60 * 60 * 1000;
const SEARCH_MIN_CHARS = 2;
const TOAST_MS = 3200;
const LOW_STOCK = 5;

const COUPONS = {
    NOVA10: { percent: 10, label: '10% OFF' },
    FRETEGRATIS: { percent: 0, freeShipping: true, label: 'Frete grátis' },
    NOVATECH20: { percent: 20, label: '20% OFF' },
};

const CATEGORIES = [
    { id: 'headphones', label: 'Fones', icon: 'headphones' },
    { id: 'watches', label: 'Relógios', icon: 'watch' },
    { id: 'speakers', label: 'Áudio', icon: 'speaker' },
    { id: 'cameras', label: 'Câmeras', icon: 'camera' },
    { id: 'gaming', label: 'Gaming', icon: 'gamepad-2' },
    { id: 'accessories', label: 'Acessórios', icon: 'cable' },
];

const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

/* ---------- Catálogo ---------- */
const img = (id) => `https://images.unsplash.com/photo-${id}?w=720&h=720&fit=crop&q=80`;

const products = [
    /* ---- Fones ---- */
    {
        id: 1, name: 'Fone Bluetooth ANC Studio', category: 'headphones',
        price: 499.9, was: 699.9, photo: '1505740420928-5e560c06d30e',
        rating: 4.8, reviews: 234, stock: 12, badge: 'sale',
        desc: 'Cancelamento ativo de ruído híbrido, 40 h de bateria e drivers de 40 mm afinados para música e chamadas.',
        specs: { 'Driver': '40 mm', 'Bateria': '40 h', 'Conexão': 'Bluetooth 5.3', 'Peso': '265 g' },
    },
    {
        id: 2, name: 'Earbuds Pro Wireless TWS', category: 'headphones',
        price: 279.9, was: 399.9, photo: '1572569511254-d8f925fe2cbb',
        rating: 4.6, reviews: 312, stock: 3, badge: 'sale',
        desc: 'Fones true wireless com detecção de ouvido, modo transparência e estojo com carregamento por indução.',
        specs: { 'Driver': '11 mm', 'Bateria': '28 h com estojo', 'Conexão': 'Bluetooth 5.3', 'Resistência': 'IPX5' },
    },
    {
        id: 3, name: 'Headset Over-Ear Signature', category: 'headphones',
        price: 899.9, was: null, photo: '1546435770-a3e426bf472b',
        rating: 4.9, reviews: 96, stock: 8, badge: 'new',
        desc: 'Referência de estúdio com almofadas em memory foam e cabo destacável banhado a ouro.',
        specs: { 'Driver': '50 mm', 'Impedância': '38 Ω', 'Conexão': 'P2 + Bluetooth', 'Peso': '310 g' },
    },
    {
        id: 4, name: 'Fone Monitor DJ Reference', category: 'headphones',
        price: 649.9, was: 799.9, photo: '1484704849700-f032a568e944',
        rating: 4.7, reviews: 141, stock: 6,
        desc: 'Resposta plana para mixagem, conchas rotativas em 90° e isolamento passivo de 28 dB.',
        specs: { 'Driver': '45 mm', 'Resposta': '5 Hz – 30 kHz', 'Conexão': 'Cabo espiral 3 m', 'Peso': '295 g' },
    },

    /* ---- Relógios ---- */
    {
        id: 5, name: 'SmartWatch Ultra Fitness Pro', category: 'watches',
        price: 899.9, was: null, photo: '1523275335684-37898b6baf30',
        rating: 4.9, reviews: 189, stock: 9, badge: 'new',
        desc: 'Tela AMOLED de 1,9", GPS duplo e mais de 120 modos de treino com oxímetro e ECG.',
        specs: { 'Tela': 'AMOLED 1,9"', 'Bateria': '14 dias', 'Sensores': 'GPS, SpO2, ECG', 'Resistência': '5 ATM' },
    },
    {
        id: 6, name: 'SmartWatch Sport GPS', category: 'watches',
        price: 1249.9, was: 1499.9, photo: '1508685096489-7aacd43bd3b1',
        rating: 4.8, reviews: 74, stock: 4, badge: 'sale',
        desc: 'Feito para treinar fora de casa: GPS multibanda, mapas offline e caixa em alumínio aeronáutico.',
        specs: { 'Tela': 'Retina LTPO', 'Bateria': '36 h', 'Sensores': 'GPS, altímetro, bússola', 'Resistência': '5 ATM' },
    },
    {
        id: 7, name: 'Relógio Classic Aço', category: 'watches',
        price: 749.9, was: 899.9, photo: '1524592094714-0f0654e20314',
        rating: 4.6, reviews: 158, stock: 15,
        desc: 'Mostrador circular clássico com pulseira de couro italiano e caixa em aço inoxidável escovado.',
        specs: { 'Caixa': '40 mm em aço', 'Vidro': 'Safira', 'Pulseira': 'Couro italiano', 'Resistência': '3 ATM' },
    },
    {
        id: 8, name: 'Pulseira Fitness Tracker', category: 'watches',
        price: 249.9, was: 329.9, photo: '1575311373937-040b8e1fd5b6',
        rating: 4.5, reviews: 428, stock: 34, badge: 'hot',
        desc: 'Monitor de sono, frequência cardíaca contínua e 14 dias de bateria em 22 g no pulso.',
        specs: { 'Tela': 'AMOLED 1,1"', 'Bateria': '14 dias', 'Sensores': 'FC, SpO2, sono', 'Peso': '22 g' },
    },

    /* ---- Áudio ---- */
    {
        id: 9, name: 'Caixa de Som Portátil Bass+', category: 'speakers',
        price: 349.9, was: 449.9, photo: '1608043152269-423dbba4e7e1',
        rating: 4.7, reviews: 156, stock: 18, badge: 'hot',
        desc: 'Graves profundos com radiador passivo duplo, 20 h de bateria e proteção contra água e poeira.',
        specs: { 'Potência': '30 W RMS', 'Bateria': '20 h', 'Resistência': 'IP67', 'Conexão': 'Bluetooth 5.3 + AUX' },
    },
    {
        id: 10, name: 'Caixa de Som Outdoor XL', category: 'speakers',
        price: 899.9, was: 1149.9, photo: '1558537348-c0f8e733989d',
        rating: 4.8, reviews: 203, stock: 7, badge: 'sale',
        desc: 'Feita para festa: 80 W, iluminação reativa ao ritmo e pareamento de até 100 caixas.',
        specs: { 'Potência': '80 W RMS', 'Bateria': '24 h', 'Resistência': 'IP67', 'Extras': 'PartyBoost' },
    },
    {
        id: 11, name: 'Alto-falante Smart Home', category: 'speakers',
        price: 429.9, was: null, photo: '1543512214-318c7553f230',
        rating: 4.4, reviews: 132, stock: 24,
        desc: 'Som 360° com assistente de voz integrado e controle dos dispositivos da casa conectada.',
        specs: { 'Potência': '40 W', 'Conexão': 'Wi-Fi 6 + Bluetooth', 'Assistente': 'Integrado', 'Extras': 'Multiroom' },
    },
    {
        id: 12, name: 'Monitor de Estúdio Ativo', category: 'speakers',
        price: 1099.9, was: 1399.9, photo: '1545454675-3531b543be5d',
        rating: 4.7, reviews: 88, stock: 5, badge: 'sale',
        desc: 'Par de monitores near-field com woofer de 5" e resposta plana para mixagem em casa.',
        specs: { 'Potência': '2× 60 W', 'Woofer': '5"', 'Entradas': 'XLR, TRS, RCA', 'Resposta': '45 Hz – 22 kHz' },
    },

    /* ---- Câmeras ---- */
    {
        id: 13, name: 'Câmera Mirrorless 24MP', category: 'cameras',
        price: 4299.9, was: 4899.9, photo: '1519638831568-d9897f54ed69',
        rating: 4.9, reviews: 61, stock: 3, badge: 'sale',
        desc: 'Sensor APS-C de 24 MP, vídeo 4K/60p e estabilização de 5 eixos no corpo.',
        specs: { 'Sensor': 'APS-C 24 MP', 'Vídeo': '4K 60p', 'Estabilização': 'IBIS 5 eixos', 'Encaixe': 'Baioneta E' },
    },
    {
        id: 14, name: 'Câmera DSLR Kit 18-55', category: 'cameras',
        price: 3199.9, was: null, photo: '1502920917128-1aa500764cbd',
        rating: 4.7, reviews: 214, stock: 11, badge: 'new',
        desc: 'Kit completo para começar na fotografia: corpo, lente 18-55 mm, bolsa e cartão de 64 GB.',
        specs: { 'Sensor': 'APS-C 24,1 MP', 'Vídeo': 'Full HD 60p', 'Visor': 'Óptico + tela articulada', 'Inclui': 'Lente 18-55 mm' },
    },
    {
        id: 15, name: 'Câmera Instantânea Retrô', category: 'cameras',
        price: 899.9, was: 1099.9, photo: '1526170375885-4d8ecf77b99f',
        rating: 4.6, reviews: 337, stock: 22, badge: 'hot',
        desc: 'Revelação na hora com filtros de cor, autofoco e conexão com o celular para imprimir fotos do rolo.',
        specs: { 'Filme': 'Formato quadrado', 'Foco': 'Automático', 'Conexão': 'Bluetooth', 'Bateria': '15 packs' },
    },
    {
        id: 16, name: 'Drone Compacto 4K', category: 'cameras',
        price: 3499.9, was: 3999.9, photo: '1473968512647-3e447244af8f',
        rating: 4.8, reviews: 57, stock: 2, badge: 'sale',
        desc: 'Dobrável, 34 minutos de voo e gimbal de 3 eixos com transmissão estável a 10 km.',
        specs: { 'Câmera': '4K 60p HDR', 'Autonomia': '34 min', 'Alcance': '10 km', 'Peso': '249 g' },
    },

    /* ---- Gaming ---- */
    {
        id: 17, name: 'Controle Sem Fio Pro', category: 'gaming',
        price: 599.9, was: 749.9, photo: '1612287230202-1ff1d85d1bdf',
        rating: 4.8, reviews: 267, stock: 14, badge: 'sale',
        desc: 'Gatilhos hall effect, botões traseiros programáveis e latência de 1 ms no modo com fio.',
        specs: { 'Conexão': 'USB-C, BT, 2.4 GHz', 'Bateria': '40 h', 'Extras': '4 botões extras', 'Compatível': 'PC, console, mobile' },
    },
    {
        id: 18, name: 'Console Next-Gen 1TB', category: 'gaming',
        price: 4199.9, was: 4699.9, photo: '1606813907291-d86efa9b94db',
        rating: 4.9, reviews: 512, stock: 4, badge: 'sale',
        desc: 'SSD de 1 TB com carregamento quase instantâneo, ray tracing e saída 4K a 120 Hz.',
        specs: { 'Armazenamento': 'SSD 1 TB', 'Vídeo': '4K 120 Hz', 'Áudio': '3D nativo', 'Inclui': '1 controle' },
    },
    {
        id: 19, name: 'Teclado Mecânico RGB TKL', category: 'gaming',
        price: 529.9, was: null, photo: '1618384887929-16ec33fab9ef',
        rating: 4.7, reviews: 198, stock: 7, badge: 'new',
        desc: 'Switches hot-swap, estrutura em alumínio e espuma acústica em três camadas.',
        specs: { 'Layout': 'TKL ABNT2', 'Switch': 'Hot-swap linear', 'Conexão': 'USB-C destacável', 'Iluminação': 'RGB por tecla' },
    },
    {
        id: 20, name: 'Headset Gamer 7.1 Surround', category: 'gaming',
        price: 459.9, was: 599.9, photo: '1618366712010-f4ae9c647dcb',
        rating: 4.6, reviews: 421, stock: 19, badge: 'hot',
        desc: 'Áudio espacial 7.1, microfone com cancelamento de ruído e espuma respirável.',
        specs: { 'Driver': '50 mm', 'Áudio': '7.1 virtual', 'Microfone': 'Destacável', 'Conexão': 'USB + P2' },
    },

    /* ---- Acessórios ---- */
    {
        id: 21, name: 'Carregador GaN 65W', category: 'accessories',
        price: 189.9, was: 249.9, photo: '1583863788434-e58a36330cf0',
        rating: 4.8, reviews: 389, stock: 42, badge: 'hot',
        desc: 'Três saídas com distribuição inteligente: carrega notebook, celular e fone ao mesmo tempo.',
        specs: { 'Potência': '65 W', 'Portas': '2× USB-C + 1× USB-A', 'Tecnologia': 'GaN III', 'Protocolos': 'PD 3.0, QC 4+' },
    },
    {
        id: 22, name: 'Teclado Slim Wireless', category: 'accessories',
        price: 279.9, was: null, photo: '1587829741301-dc798b83add3',
        rating: 4.4, reviews: 112, stock: 16,
        desc: 'Perfil baixo, três dispositivos pareados simultaneamente e recarga por USB-C.',
        specs: { 'Layout': 'Full ABNT2', 'Bateria': '3 meses', 'Conexão': 'BT + 2.4 GHz', 'Peso': '480 g' },
    },
    {
        id: 23, name: 'Mouse Sem Fio Ergonômico', category: 'accessories',
        price: 219.9, was: 289.9, photo: '1527814050087-3793815479db',
        rating: 4.7, reviews: 276, stock: 29, badge: 'sale',
        desc: 'Sensor de 8.000 DPI, scroll magnético silencioso e formato que apoia o punho por horas.',
        specs: { 'Sensor': '8.000 DPI', 'Bateria': '70 dias', 'Conexão': 'BT + receptor USB', 'Botões': '6 programáveis' },
    },
    {
        id: 24, name: 'Teclado Compacto Sem Fio', category: 'accessories',
        price: 159.9, was: 209.9, photo: '1541140532154-b024d705b90a',
        rating: 4.3, reviews: 148, stock: 37, badge: 'sale',
        desc: 'Layout 75% que libera espaço na mesa, teclas silenciosas e pareamento com dois dispositivos.',
        specs: { 'Layout': '75% ABNT2', 'Bateria': '6 meses', 'Conexão': 'Bluetooth 5.1', 'Peso': '390 g' },
    },
].map((p) => ({
    ...p,
    categoryLabel: CATEGORY_LABEL[p.category],
    image: img(p.photo),
    discount: p.was ? Math.round((1 - p.price / p.was) * 100) : 0,
}));

const productById = new Map(products.map((p) => [p.id, p]));

/* ---------- Estado ---------- */
let cart = readStore(STORAGE.cart, []);
let wishlist = readStore(STORAGE.wishlist, []);
let activeCoupon = null;
let activeFilter = 'all';
let activeSort = 'relevance';
let lastFocused = null;

function readStore(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
    } catch (error) {
        console.warn(`Não foi possível ler "${key}" do localStorage:`, error);
        return fallback;
    }
}

function writeStore(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Não foi possível gravar "${key}" no localStorage:`, error);
    }
}

/* ---------- Utilidades ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatPrice = (value) => brl.format(value);

/** Escapa texto antes de qualquer interpolação em innerHTML. */
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[char]);
}

function renderIcons(scope = document) {
    if (window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide', ...(scope !== document && { el: scope }) });
}

function starsMarkup(rating) {
    const full = Math.round(rating);
    return `<span class="stars" role="img" aria-label="${rating.toFixed(1).replace('.', ',')} de 5 estrelas">${Array.from({ length: 5 }, (_, i) => (
        i < full
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".4"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
    )).join('')}</span>`;
}

/** Maior parcela sem juros respeitando o valor mínimo por parcela. */
function installmentsFor(total) {
    if (total <= 0) return null;
    const count = Math.max(1, Math.min(MAX_INSTALLMENTS, Math.floor(total / MIN_INSTALLMENT)));
    if (count < 2) return null;
    return { count, value: total / count };
}

function debounce(fn, wait) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Camadas (scrim, foco, ESC) ---------- */
const overlayStack = [];
const scrim = $('#scrim');

function openLayer(element, { onClose, focusTarget } = {}) {
    lastFocused = document.activeElement;
    element.hidden = false;
    document.body.classList.add('is-locked');

    if (element.dataset.scrim !== 'false') {
        scrim.hidden = false;
        requestAnimationFrame(() => scrim.classList.add('is-open'));
    }
    requestAnimationFrame(() => element.classList.add('is-open'));

    overlayStack.push({ element, onClose });
    (focusTarget || element.querySelector('button, [href], input, select, textarea') || element).focus?.();
}

function closeLayer(element) {
    const index = overlayStack.findIndex((layer) => layer.element === element);
    if (index === -1) return;

    const [layer] = overlayStack.splice(index, 1);
    element.classList.remove('is-open');

    const finish = () => { element.hidden = true; };
    prefersReducedMotion() ? finish() : setTimeout(finish, 260);

    if (!overlayStack.length) {
        document.body.classList.remove('is-locked');
        scrim.classList.remove('is-open');
        setTimeout(() => { if (!overlayStack.length) scrim.hidden = true; }, 260);
    }

    layer.onClose?.();
    lastFocused?.focus?.();
}

function closeTopLayer() {
    const top = overlayStack[overlayStack.length - 1];
    if (top) closeLayer(top.element);
}

function initLayers() {
    scrim.addEventListener('click', closeTopLayer);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlayStack.length) {
            event.preventDefault();
            closeTopLayer();
            return;
        }
        if (event.key !== 'Tab' || !overlayStack.length) return;

        // Mantém o foco dentro da camada ativa.
        const { element } = overlayStack[overlayStack.length - 1];
        const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', element)
            .filter((el) => !el.disabled && el.offsetParent !== null);
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    $$('[data-close-drawer]').forEach((btn) => {
        btn.addEventListener('click', () => {
            closeTopLayer();
            const target = btn.dataset.goto;
            if (target) setTimeout(() => $(target)?.scrollIntoView({ behavior: 'smooth' }), 180);
        });
    });
}

/* ---------- Tema ---------- */
function initTheme() {
    $('#theme-btn').addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        writeStore(STORAGE.theme, next);
        showToast(next === 'light' ? 'Tema claro ativado' : 'Tema escuro ativado', 'info');
    });
}

/* ---------- Aviso superior ---------- */
function initAnnouncement() {
    const bar = $('#announcement');
    if (readStore(STORAGE.announcement, null) === 'dismissed') {
        bar.hidden = true;
    }

    $('#announcement-close').addEventListener('click', () => {
        bar.hidden = true;
        writeStore(STORAGE.announcement, 'dismissed');
    });

    $('#coupon-copy').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('NOVA10');
            showToast('Cupom NOVA10 copiado. Cole no carrinho.', 'success');
        } catch {
            showToast('Use o cupom NOVA10 no carrinho.', 'info');
        }
    });
}

/* ---------- Header ---------- */
function initHeader() {
    const header = $('#header');
    const nav = $('#nav');
    const menuToggle = $('#menu-toggle');
    const progress = $('#scroll-progress');
    const backToTop = $('#back-to-top');
    const sections = $$('section[id]');
    const navLinks = $$('[data-nav]');

    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;

            header.classList.toggle('is-scrolled', y > 8);
            backToTop.classList.toggle('is-visible', y > 500);
            progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

            const current = sections.find((section) => {
                const top = section.offsetTop - 160;
                return y >= top && y < top + section.offsetHeight;
            });
            if (current) {
                navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${current.id}`));
            }
            ticking = false;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        menuToggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}" class="icon"></i>`;
        renderIcons(menuToggle);
    };

    menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    $('#year').textContent = String(new Date().getFullYear());
}

/* ---------- Busca ---------- */
function initSearch() {
    const modal = $('#search-modal');
    const input = $('#search-input');
    const results = $('#search-results');
    const suggestions = $('#search-suggestions');

    const open = () => {
        openLayer(modal, {
            focusTarget: input,
            onClose: () => {
                input.value = '';
                results.innerHTML = '';
                suggestions.hidden = false;
                input.setAttribute('aria-expanded', 'false');
            },
        });
    };

    $('#search-btn').addEventListener('click', open);
    $('#search-close').addEventListener('click', () => closeLayer(modal));
    modal.addEventListener('mousedown', (event) => { if (event.target === modal) closeLayer(modal); });

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            modal.hidden ? open() : closeLayer(modal);
        }
    });

    const highlight = (text, query) => {
        const at = text.toLowerCase().indexOf(query);
        if (at === -1) return escapeHtml(text);
        return `${escapeHtml(text.slice(0, at))}<mark>${escapeHtml(text.slice(at, at + query.length))}</mark>${escapeHtml(text.slice(at + query.length))}`;
    };

    const run = (rawQuery) => {
        const query = rawQuery.toLowerCase().trim();
        suggestions.hidden = query.length >= SEARCH_MIN_CHARS;
        input.setAttribute('aria-expanded', String(query.length >= SEARCH_MIN_CHARS));

        if (query.length < SEARCH_MIN_CHARS) {
            results.innerHTML = '';
            return;
        }

        const matches = products.filter((p) =>
            p.name.toLowerCase().includes(query) ||
            p.categoryLabel.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query)
        ).slice(0, 8);

        if (!matches.length) {
            results.innerHTML = `<p class="search-empty">Nada encontrado para “${escapeHtml(rawQuery.trim())}”.</p>`;
            return;
        }

        results.innerHTML = matches.map((p) => `
            <button class="search-result" type="button" role="option" data-id="${p.id}">
                <img src="${p.image}" alt="" width="48" height="48" loading="lazy">
                <span>
                    <span class="search-result-name">${highlight(p.name, query)}</span>
                    <span class="search-result-meta">${escapeHtml(p.categoryLabel)} · ${p.rating.toFixed(1)} ★</span>
                </span>
                <span class="search-result-price">${formatPrice(p.price)}</span>
            </button>
        `).join('');
    };

    input.addEventListener('input', debounce((event) => run(event.target.value), 120));

    input.addEventListener('keydown', (event) => {
        const items = $$('.search-result', results);
        if (!items.length) return;

        const current = items.findIndex((item) => item.classList.contains('is-active'));
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const next = event.key === 'ArrowDown'
                ? (current + 1) % items.length
                : (current - 1 + items.length) % items.length;
            items.forEach((item, i) => item.classList.toggle('is-active', i === next));
            items[next].scrollIntoView({ block: 'nearest' });
        } else if (event.key === 'Enter' && current > -1) {
            event.preventDefault();
            items[current].click();
        }
    });

    results.addEventListener('click', (event) => {
        const button = event.target.closest('.search-result');
        if (!button) return;
        const id = Number(button.dataset.id);
        closeLayer(modal);
        setTimeout(() => openQuickView(id), 200);
    });

    suggestions.addEventListener('click', (event) => {
        const chip = event.target.closest('[data-suggest]');
        if (!chip) return;
        input.value = chip.dataset.suggest;
        input.focus();
        run(chip.dataset.suggest);
    });
}

/* ---------- Carrinho ---------- */
function cartSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartTotals() {
    const subtotal = cartSubtotal();
    const discount = activeCoupon ? subtotal * (activeCoupon.percent / 100) : 0;
    const afterDiscount = subtotal - discount;
    const freeShipping = afterDiscount >= FREE_SHIPPING_MIN || Boolean(activeCoupon?.freeShipping) || subtotal === 0;
    const shipping = freeShipping ? 0 : SHIPPING_FLAT;
    return { subtotal, discount, shipping, freeShipping, total: afterDiscount + shipping };
}

function addToCart(productId, quantity = 1, sourceEl = null) {
    const product = productById.get(productId);
    if (!product) return;

    const existing = cart.find((item) => item.id === productId);
    const currentQty = existing?.qty ?? 0;

    if (currentQty + quantity > product.stock) {
        showToast(`Só temos ${product.stock} unidade(s) de ${product.name} em estoque.`, 'error');
        return;
    }

    cart = existing
        ? cart.map((item) => (item.id === productId ? { ...item, qty: item.qty + quantity } : item))
        : [...cart, { id: product.id, name: product.name, price: product.price, image: product.image, qty: quantity }];

    persistCart();
    flyToCart(sourceEl);
    bumpBadge($('#cart-count'));
    showToast(`${product.name} adicionado ao carrinho.`, 'success', {
        label: 'Ver carrinho',
        onClick: () => openLayer($('#cart-drawer')),
    });
}

/** Leva uma cópia da imagem do produto até o ícone do carrinho. */
function flyToCart(sourceEl) {
    if (!sourceEl || prefersReducedMotion() || typeof Element.prototype.animate !== 'function') return;

    const image = sourceEl.matches('img') ? sourceEl : sourceEl.querySelector('img');
    const target = $('#cart-btn');
    if (!image || !target) return;

    const from = image.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (!from.width || !to.width) return;

    const ghost = document.createElement('img');
    ghost.src = image.currentSrc || image.src;
    ghost.alt = '';
    ghost.className = 'fly-ghost';
    ghost.style.left = `${from.left}px`;
    ghost.style.top = `${from.top}px`;
    ghost.style.width = `${from.width}px`;
    ghost.style.height = `${from.height}px`;
    document.body.appendChild(ghost);

    const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
    const dy = (to.top + to.height / 2) - (from.top + from.height / 2);

    const animation = ghost.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx * 0.55}px, ${dy * 0.5 - 70}px) scale(0.45)`, opacity: 0.9, offset: 0.6 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.1)`, opacity: 0 },
    ], { duration: 720, easing: 'cubic-bezier(0.36, 0, 0.2, 1)' });

    animation.onfinish = () => ghost.remove();
    animation.oncancel = () => ghost.remove();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    persistCart();
    showToast('Item removido do carrinho.', 'info');
}

function changeQty(productId, delta) {
    const item = cart.find((entry) => entry.id === productId);
    if (!item) return;

    const next = item.qty + delta;
    if (next < 1) { removeFromCart(productId); return; }

    const stock = productById.get(productId)?.stock ?? Infinity;
    if (next > stock) {
        showToast(`Estoque máximo: ${stock} unidade(s).`, 'error');
        return;
    }

    cart = cart.map((entry) => (entry.id === productId ? { ...entry, qty: next } : entry));
    persistCart();
}

function persistCart() {
    writeStore(STORAGE.cart, cart);
    renderCart();
}

function renderCart() {
    const list = $('#cart-items');
    const empty = $('#cart-empty');
    const footer = $('#cart-footer');
    const meter = $('#shipping-meter');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const badge = $('#cart-count');
    badge.textContent = String(count);
    badge.classList.toggle('is-visible', count > 0);
    $('#cart-items-label').textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;

    if (!cart.length) {
        list.innerHTML = '';
        empty.hidden = false;
        footer.hidden = true;
        meter.hidden = true;
        return;
    }

    empty.hidden = true;
    footer.hidden = false;
    meter.hidden = false;

    list.innerHTML = cart.map((item) => `
        <article class="line-item">
            <img src="${item.image}" alt="" width="68" height="68" loading="lazy">
            <div>
                <h3 class="line-item-name">${escapeHtml(item.name)}</h3>
                <p class="line-item-meta">${formatPrice(item.price)} / unidade</p>
                <p class="line-item-price">${formatPrice(item.price * item.qty)}</p>
            </div>
            <div class="line-item-side">
                <div class="qty">
                    <button type="button" data-qty="-1" data-id="${item.id}" aria-label="Diminuir quantidade de ${escapeHtml(item.name)}"><i data-lucide="minus" class="icon-xs"></i></button>
                    <span>${item.qty}</span>
                    <button type="button" data-qty="1" data-id="${item.id}" aria-label="Aumentar quantidade de ${escapeHtml(item.name)}"><i data-lucide="plus" class="icon-xs"></i></button>
                </div>
                <button class="link-danger" type="button" data-remove="${item.id}">Remover</button>
            </div>
        </article>
    `).join('');
    renderIcons(list);

    const { subtotal, discount, shipping, freeShipping, total } = cartTotals();

    $('#cart-subtotal').textContent = formatPrice(subtotal);
    $('#cart-shipping').textContent = freeShipping ? 'Grátis' : formatPrice(shipping);
    $('#cart-total').textContent = formatPrice(total);

    const discountRow = $('#cart-discount-row');
    discountRow.hidden = discount <= 0;
    if (discount > 0) {
        $('#cart-discount').textContent = `- ${formatPrice(discount)}`;
        $('#cart-coupon-tag').textContent = activeCoupon.code;
    }

    const plan = installmentsFor(total);
    $('#cart-installments').textContent = plan ? `ou ${plan.count}x de ${formatPrice(plan.value)} sem juros` : '';

    // Medidor de frete grátis
    const remaining = Math.max(0, FREE_SHIPPING_MIN - (subtotal - discount));
    const percent = Math.min(100, ((subtotal - discount) / FREE_SHIPPING_MIN) * 100);
    const fill = $('#shipping-meter-fill');
    fill.style.width = `${percent}%`;
    fill.classList.toggle('is-complete', remaining === 0);
    $('#shipping-meter-bar').setAttribute('aria-valuenow', String(Math.round(percent)));
    $('#shipping-meter-text').innerHTML = remaining === 0
        ? '<span class="done">Frete grátis liberado 🎉</span>'
        : `Faltam <strong>${formatPrice(remaining)}</strong> para o frete grátis`;
}

function initCart() {
    const drawer = $('#cart-drawer');

    $('#cart-btn').addEventListener('click', () => openLayer(drawer));
    $('#cart-close').addEventListener('click', () => closeLayer(drawer));

    $('#cart-items').addEventListener('click', (event) => {
        const qtyBtn = event.target.closest('[data-qty]');
        if (qtyBtn) { changeQty(Number(qtyBtn.dataset.id), Number(qtyBtn.dataset.qty)); return; }

        const removeBtn = event.target.closest('[data-remove]');
        if (removeBtn) removeFromCart(Number(removeBtn.dataset.remove));
    });

    $('#coupon-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const input = $('#coupon-input');
        const code = input.value.trim().toUpperCase();

        if (!code) { showToast('Digite um cupom.', 'error'); return; }
        if (activeCoupon?.code === code) { showToast('Este cupom já está aplicado.', 'info'); return; }

        const coupon = COUPONS[code];
        if (!coupon) { showToast(`Cupom "${code}" inválido ou expirado.`, 'error'); return; }

        activeCoupon = { code, percent: coupon.percent ?? 0, freeShipping: Boolean(coupon.freeShipping) };
        input.value = '';
        renderCart();
        showToast(`Cupom ${code} aplicado: ${coupon.label}.`, 'success');
    });

    $('#checkout-btn').addEventListener('click', (event) => {
        const button = event.currentTarget;
        button.disabled = true;
        button.innerHTML = 'Processando…';

        setTimeout(() => {
            const { total } = cartTotals();
            showToast(`Pedido de ${formatPrice(total)} confirmado! Enviamos os detalhes por e-mail.`, 'success');
            cart = [];
            activeCoupon = null;
            persistCart();
            closeLayer(drawer);
            button.disabled = false;
            button.innerHTML = 'Finalizar compra <i data-lucide="arrow-right" class="icon-sm"></i>';
            renderIcons(button);
        }, 1100);
    });

    renderCart();
}

/* ---------- Favoritos ---------- */
function toggleWishlist(productId) {
    const product = productById.get(productId);
    if (!product) return;

    const has = wishlist.includes(productId);
    wishlist = has ? wishlist.filter((id) => id !== productId) : [...wishlist, productId];
    writeStore(STORAGE.wishlist, wishlist);

    if (!has) bumpBadge($('#wishlist-count'));
    showToast(has ? `${product.name} removido dos favoritos.` : `${product.name} salvo nos favoritos.`, has ? 'info' : 'success');

    renderWishlist();
    syncWishButtons();
}

function syncWishButtons() {
    $$('[data-wish]').forEach((btn) => {
        const on = wishlist.includes(Number(btn.dataset.wish));
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', String(on));
    });
}

function renderWishlist() {
    const list = $('#wishlist-items');
    const empty = $('#wishlist-empty');
    const badge = $('#wishlist-count');

    badge.textContent = String(wishlist.length);
    badge.classList.toggle('is-visible', wishlist.length > 0);
    $('#wishlist-items-label').textContent = `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'itens'}`;

    const items = wishlist.map((id) => productById.get(id)).filter(Boolean);
    if (!items.length) {
        list.innerHTML = '';
        empty.hidden = false;
        return;
    }

    empty.hidden = true;
    list.innerHTML = items.map((p) => `
        <article class="line-item">
            <img src="${p.image}" alt="" width="68" height="68" loading="lazy">
            <div>
                <h3 class="line-item-name">${escapeHtml(p.name)}</h3>
                <p class="line-item-meta">${escapeHtml(p.categoryLabel)}</p>
                <p class="line-item-price">${formatPrice(p.price)}</p>
            </div>
            <div class="line-item-side">
                <button class="btn btn-sm btn-primary" type="button" data-wish-add="${p.id}">Adicionar</button>
                <button class="link-danger" type="button" data-wish-remove="${p.id}">Remover</button>
            </div>
        </article>
    `).join('');
}

function initWishlist() {
    const drawer = $('#wishlist-drawer');

    $('#wishlist-btn').addEventListener('click', () => openLayer(drawer));
    $('#wishlist-close').addEventListener('click', () => closeLayer(drawer));

    $('#wishlist-items').addEventListener('click', (event) => {
        const add = event.target.closest('[data-wish-add]');
        if (add) { addToCart(Number(add.dataset.wishAdd), 1, add.closest('.line-item')); return; }

        const remove = event.target.closest('[data-wish-remove]');
        if (remove) toggleWishlist(Number(remove.dataset.wishRemove));
    });

    renderWishlist();
}

/* ---------- Categorias ---------- */
function initCategories() {
    const grid = $('#categories-grid');

    grid.innerHTML = CATEGORIES.map((category) => {
        const total = products.filter((p) => p.category === category.id).length;
        return `
            <a class="category-card reveal" href="#products" data-category="${category.id}">
                <span class="category-icon"><i data-lucide="${category.icon}" class="icon-lg"></i></span>
                <h3>${escapeHtml(category.label)}</h3>
                <div class="category-foot">
                    <span class="category-count">${total} ${total === 1 ? 'produto' : 'produtos'}</span>
                    <i data-lucide="arrow-right" class="icon-sm"></i>
                </div>
            </a>
        `;
    }).join('');
    renderIcons(grid);

    grid.addEventListener('click', (event) => {
        const card = event.target.closest('[data-category]');
        if (card) setFilter(card.dataset.category);
    });
}

/* ---------- Filtros e ordenação ---------- */
function initFilters() {
    const bar = $('#filters');
    const options = [{ id: 'all', label: 'Todos' }, ...CATEGORIES];

    bar.innerHTML = options.map((option) => {
        const total = option.id === 'all' ? products.length : products.filter((p) => p.category === option.id).length;
        return `<button class="filter-btn${option.id === 'all' ? ' is-active' : ''}" type="button" role="tab"
                    aria-selected="${option.id === 'all'}" data-filter="${option.id}">
                    ${escapeHtml(option.label)}<span class="count">${total}</span>
                </button>`;
    }).join('');

    bar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (button) setFilter(button.dataset.filter);
    });

    $('#sort-select').addEventListener('change', (event) => {
        activeSort = event.target.value;
        renderProducts({ animate: true });
    });

    $('#reset-filters').addEventListener('click', () => {
        $('#sort-select').value = 'relevance';
        activeSort = 'relevance';
        setFilter('all');
    });

    $('#deals-cta').addEventListener('click', () => {
        $('#sort-select').value = 'discount';
        activeSort = 'discount';
        setFilter('all');
    });
}

function setFilter(filter) {
    activeFilter = filter;
    $$('[data-filter]').forEach((button) => {
        const on = button.dataset.filter === filter;
        button.classList.toggle('is-active', on);
        button.setAttribute('aria-selected', String(on));
    });
    renderProducts({ animate: true });
    $('#products').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function visibleProducts() {
    const list = activeFilter === 'all' ? [...products] : products.filter((p) => p.category === activeFilter);

    const sorters = {
        'price-asc': (a, b) => a.price - b.price,
        'price-desc': (a, b) => b.price - a.price,
        rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
        discount: (a, b) => b.discount - a.discount,
        relevance: (a, b) => b.rating * Math.log10(b.reviews + 10) - a.rating * Math.log10(a.reviews + 10),
    };
    return list.sort(sorters[activeSort] ?? sorters.relevance);
}

/* ---------- Produtos ---------- */
function productCard(product) {
    const flags = [];
    if (product.discount) flags.push(`<span class="flag flag-sale">-${product.discount}%</span>`);
    if (product.badge === 'new') flags.push('<span class="flag flag-new">Novo</span>');
    if (product.badge === 'hot') flags.push('<span class="flag flag-hot">Mais vendido</span>');
    if (product.stock <= LOW_STOCK) flags.push(`<span class="flag flag-low">Últimas ${product.stock}</span>`);

    const plan = installmentsFor(product.price);

    return `
        <article class="product" data-id="${product.id}">
            <div class="product-media">
                <img src="${product.image}" alt="${escapeHtml(product.name)}" width="720" height="540" loading="lazy" decoding="async">
                <div class="product-flags">${flags.join('')}</div>
                <button class="wish" type="button" data-wish="${product.id}" aria-pressed="false" aria-label="Salvar ${escapeHtml(product.name)} nos favoritos">
                    <i data-lucide="heart" class="icon-sm"></i>
                </button>
                <div class="product-quick">
                    <button class="btn btn-sm" type="button" data-quickview="${product.id}">
                        <i data-lucide="eye" class="icon-xs"></i> Detalhes
                    </button>
                </div>
            </div>
            <div class="product-body">
                <span class="product-cat">${escapeHtml(product.categoryLabel)}</span>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <div class="rating">
                    ${starsMarkup(product.rating)}
                    <span class="rating-count">${product.rating.toFixed(1)} (${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-now">${formatPrice(product.price)}</span>
                    ${product.was ? `<span class="price-was">${formatPrice(product.was)}</span>` : ''}
                </div>
                ${plan ? `<span class="product-installments">${plan.count}x de ${formatPrice(plan.value)} sem juros</span>` : ''}
            </div>
            <div class="product-foot">
                <p class="product-stock">
                    <span class="stock-dot${product.stock <= LOW_STOCK ? ' is-low' : ''}"></span>
                    ${product.stock <= LOW_STOCK ? `Restam ${product.stock} em estoque` : 'Em estoque · envio em 24 h'}
                </p>
                <button class="btn btn-primary btn-block btn-sm" type="button" data-add="${product.id}">
                    <i data-lucide="shopping-bag" class="icon-xs"></i> Adicionar
                </button>
            </div>
        </article>
    `;
}

function renderProducts({ animate = false } = {}) {
    const grid = $('#products-grid');

    // Crossfade: some com a grade atual antes de trocar o conteúdo.
    if (animate && !prefersReducedMotion() && grid.children.length) {
        grid.classList.add('is-swapping');
        setTimeout(() => { paintProducts(); grid.classList.remove('is-swapping'); }, 200);
        return;
    }
    grid.classList.remove('is-swapping');
    paintProducts();
}

function paintProducts() {
    const grid = $('#products-grid');
    const list = visibleProducts();

    $('#result-count').textContent = `${list.length} ${list.length === 1 ? 'produto' : 'produtos'}`;
    $('#products-empty').hidden = list.length > 0;

    grid.innerHTML = list.map(productCard).join('');
    grid.setAttribute('aria-busy', 'false');
    renderIcons(grid);
    syncWishButtons();

    const cards = $$('.product', grid);
    if (prefersReducedMotion()) {
        cards.forEach((card) => card.classList.add('is-in'));
        return;
    }
    cards.forEach((card, index) => {
        setTimeout(() => card.classList.add('is-in'), Math.min(index, 12) * 45);
    });
}

function renderSkeletons(count = 8) {
    $('#products-grid').innerHTML = Array.from({ length: count }, () => `
        <div class="skeleton">
            <div class="skeleton-media"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line last"></div>
        </div>
    `).join('');
}

function initProducts() {
    renderSkeletons();
    // Pequeno atraso para que os esqueletos sejam percebidos como carregamento real.
    setTimeout(() => renderProducts(), prefersReducedMotion() ? 0 : 320);

    $('#products-grid').addEventListener('click', (event) => {
        const add = event.target.closest('[data-add]');
        if (add) { addToCart(Number(add.dataset.add), 1, add.closest('.product')?.querySelector('.product-media')); return; }

        const wish = event.target.closest('[data-wish]');
        if (wish) { toggleWishlist(Number(wish.dataset.wish)); return; }

        const quick = event.target.closest('[data-quickview]');
        if (quick) openQuickView(Number(quick.dataset.quickview));
    });
}

/* ---------- Visualização rápida ---------- */
function openQuickView(productId) {
    const product = productById.get(productId);
    if (!product) return;

    const modal = $('#quickview');
    const panel = $('#quickview-panel');
    const plan = installmentsFor(product.price);

    panel.innerHTML = `
        <div class="quickview">
            <div class="quickview-media">
                <img src="${product.image}" alt="${escapeHtml(product.name)}" width="720" height="720">
                <button class="icon-btn quickview-close" type="button" aria-label="Fechar"><i data-lucide="x" class="icon"></i></button>
            </div>
            <div class="quickview-body">
                <span class="product-cat">${escapeHtml(product.categoryLabel)}</span>
                <h2 class="quickview-name" id="quickview-name">${escapeHtml(product.name)}</h2>
                <div class="rating">
                    ${starsMarkup(product.rating)}
                    <span class="rating-count">${product.rating.toFixed(1)} · ${product.reviews} avaliações</span>
                </div>
                <p class="quickview-desc">${escapeHtml(product.desc)}</p>
                <div class="product-price">
                    <span class="price-now">${formatPrice(product.price)}</span>
                    ${product.was ? `<span class="price-was">${formatPrice(product.was)}</span><span class="price-off">-${product.discount}%</span>` : ''}
                </div>
                ${plan ? `<span class="product-installments">${plan.count}x de ${formatPrice(plan.value)} sem juros</span>` : ''}
                <ul class="quickview-specs">
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <li><span>${escapeHtml(key)}</span><span>${escapeHtml(value)}</span></li>
                    `).join('')}
                </ul>
                <p class="product-stock">
                    <span class="stock-dot${product.stock <= LOW_STOCK ? ' is-low' : ''}"></span>
                    ${product.stock <= LOW_STOCK ? `Restam ${product.stock} unidades` : `${product.stock} unidades em estoque`}
                </p>
                <div class="quickview-actions">
                    <button class="btn btn-primary" type="button" data-add="${product.id}">
                        <i data-lucide="shopping-bag" class="icon-sm"></i> Adicionar ao carrinho
                    </button>
                    <button class="btn btn-outline wish" type="button" data-wish="${product.id}" aria-pressed="false" aria-label="Favoritar">
                        <i data-lucide="heart" class="icon-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    renderIcons(panel);
    syncWishButtons();

    openLayer(modal, {
        focusTarget: panel.querySelector('.quickview-close'),
        onClose: () => { panel.innerHTML = ''; },
    });
}

/** Delegação ligada uma única vez: o painel é redesenhado a cada abertura. */
function initQuickView() {
    const modal = $('#quickview');
    const panel = $('#quickview-panel');

    modal.addEventListener('mousedown', (event) => {
        if (event.target === modal) closeLayer(modal);
    });

    panel.addEventListener('click', (event) => {
        if (event.target.closest('.quickview-close')) { closeLayer(modal); return; }

        const add = event.target.closest('[data-add]');
        if (add) { addToCart(Number(add.dataset.add), 1, panel.querySelector('.quickview-media')); return; }

        const wish = event.target.closest('[data-wish]');
        if (wish) toggleWishlist(Number(wish.dataset.wish));
    });
}

/* ---------- Vitrine do hero ---------- */
function initShowcase() {
    const host = $('#hero-showcase');
    const featured = [...products].sort((a, b) => b.discount - a.discount || b.rating - a.rating).slice(0, 4);
    let current = featured[0];

    const paint = () => {
        host.innerHTML = `
            <article class="spotlight">
                <div class="spotlight-media">
                    <img src="${current.image}" alt="${escapeHtml(current.name)}" width="720" height="720" fetchpriority="high" decoding="async">
                    ${current.discount ? `<span class="spotlight-flag">-${current.discount}% OFF</span>` : ''}
                </div>
                <div class="spotlight-body">
                    <span class="spotlight-cat">${escapeHtml(current.categoryLabel)}</span>
                    <h2 class="spotlight-name">${escapeHtml(current.name)}</h2>
                    <div class="rating">
                        ${starsMarkup(current.rating)}
                        <span class="rating-count">${current.rating.toFixed(1)}</span>
                    </div>
                    <p class="spotlight-price">
                        <b>${formatPrice(current.price)}</b>
                        ${current.was ? `<s>${formatPrice(current.was)}</s>` : ''}
                    </p>
                    <button class="btn btn-primary btn-sm" type="button" data-add="${current.id}">
                        <i data-lucide="shopping-bag" class="icon-xs"></i> Adicionar
                    </button>
                </div>
            </article>
            <div class="thumb-rail" role="tablist" aria-label="Destaques">
                ${featured.map((p) => `
                    <button class="thumb${p.id === current.id ? ' is-active' : ''}" type="button" role="tab"
                        aria-selected="${p.id === current.id}" data-spot="${p.id}" aria-label="Ver ${escapeHtml(p.name)}">
                        <img src="${p.image}" alt="" width="180" height="180" loading="lazy">
                    </button>
                `).join('')}
            </div>
        `;
        renderIcons(host);
    };

    paint();

    host.addEventListener('click', (event) => {
        const thumb = event.target.closest('[data-spot]');
        if (thumb) {
            current = productById.get(Number(thumb.dataset.spot));
            paint();
            return;
        }
        const add = event.target.closest('[data-add]');
        if (add) addToCart(Number(add.dataset.add), 1, host.querySelector('.spotlight-media'));
    });
}

/* ---------- Contagem regressiva ---------- */
function initCountdown() {
    // O prazo é persistido para não reiniciar a cada carregamento da página.
    let end = Number(readStore(STORAGE.dealEnd, 0));
    if (!end || end <= Date.now()) {
        end = Date.now() + DEAL_DURATION_MS;
        writeStore(STORAGE.dealEnd, end);
    }

    const cells = {
        days: $('#cd-days'), hours: $('#cd-hours'),
        minutes: $('#cd-minutes'), seconds: $('#cd-seconds'),
    };

    const pad = (value) => String(Math.max(0, value)).padStart(2, '0');

    const tick = () => {
        const diff = end - Date.now();
        if (diff <= 0) {
            Object.values(cells).forEach((cell) => { cell.textContent = '00'; });
            clearInterval(timer);
            return;
        }
        cells.days.textContent = pad(Math.floor(diff / 86400000));
        cells.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        cells.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
        cells.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
    };

    tick();
    const timer = setInterval(tick, 1000);
}

/* ---------- Contadores e revelação ---------- */
function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const decimals = Number(el.dataset.decimals ?? 0);
            const suffix = el.dataset.suffix ?? '';
            const format = (value) => (decimals
                ? value.toFixed(decimals).replace('.', ',')
                : Math.floor(value).toLocaleString('pt-BR')) + suffix;

            if (prefersReducedMotion()) { el.textContent = format(target); return; }

            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / 1600, 1);
                el.textContent = format(target * (1 - Math.pow(1 - progress, 3)));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => observer.observe(counter));
}

function initReveal() {
    const targets = $$('.section-head, .trust-item, .testimonial, .about-copy, .about-media, .deals, .newsletter, .contact-list li, .contact-form, .category-card');
    targets.forEach((el) => el.classList.add('reveal'));

    if (prefersReducedMotion()) {
        targets.forEach((el) => el.classList.add('is-in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
}

function initStaticStars() {
    $$('.testimonial .stars').forEach((node) => { node.outerHTML = starsMarkup(5); });
}

/* ---------- Formulários ---------- */
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

function setFieldError(input, message) {
    const field = input.closest('.field');
    const error = field?.querySelector('.field-error');
    field?.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) error.textContent = message ?? '';
    return !message;
}

function initForms() {
    const newsletter = $('#newsletter-form');
    newsletter.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = $('#newsletter-email');
        const value = input.value.trim();

        if (!value) return setFieldError(input, 'Informe seu e-mail.');
        if (!isEmail(value)) return setFieldError(input, 'E-mail inválido.');

        setFieldError(input, null);
        showToast(`Pronto! ${value} está inscrito na newsletter.`, 'success');
        newsletter.reset();
    });

    const contact = $('#contact-form');
    const rules = [
        { id: '#contact-name', check: (v) => v.length >= 3, message: 'Informe seu nome completo.' },
        { id: '#contact-email', check: isEmail, message: 'E-mail inválido.' },
        { id: '#contact-subject', check: (v) => v.length >= 3, message: 'Descreva o assunto.' },
        { id: '#contact-message', check: (v) => v.length >= 10, message: 'A mensagem precisa de ao menos 10 caracteres.' },
    ];

    contact.addEventListener('submit', (event) => {
        event.preventDefault();

        let firstInvalid = null;
        rules.forEach((rule) => {
            const input = $(rule.id);
            const valid = rule.check(input.value.trim());
            setFieldError(input, valid ? null : rule.message);
            if (!valid && !firstInvalid) firstInvalid = input;
        });

        if (firstInvalid) { firstInvalid.focus(); return; }

        showToast('Mensagem enviada! Respondemos em até 1 dia útil.', 'success');
        contact.reset();
    });

    // Limpa o erro assim que o usuário corrige o campo.
    [...rules.map((r) => $(r.id)), $('#newsletter-email')].forEach((input) => {
        input.addEventListener('input', () => {
            if (input.closest('.field')?.classList.contains('has-error')) setFieldError(input, null);
        });
    });
}

/* ---------- Toast ---------- */
function showToast(message, type = 'info', action = null) {
    const host = $('#toasts');
    const icons = { success: 'check-circle-2', error: 'alert-circle', info: 'info' };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i data-lucide="${icons[type] ?? icons.info}" class="icon"></i><p></p>`;
    toast.querySelector('p').textContent = message;

    let dismiss;
    if (action) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'toast-action';
        button.textContent = action.label;
        button.addEventListener('click', () => { action.onClick(); dismiss(); });
        toast.appendChild(button);
    }

    host.appendChild(toast);
    renderIcons(toast);

    let removed = false;
    dismiss = () => {
        if (removed) return;
        removed = true;
        clearTimeout(timer);
        toast.classList.add('is-leaving');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
        setTimeout(() => toast.remove(), 400);
    };

    const timer = setTimeout(dismiss, action ? TOAST_MS + 1800 : TOAST_MS);
}

function bumpBadge(badge) {
    badge.classList.remove('is-bumped');
    void badge.offsetWidth; // força reflow para reiniciar a animação
    badge.classList.add('is-bumped');
}

/* ---------- Bootstrap ---------- */
function init() {
    renderIcons();
    initLayers();
    initTheme();
    initAnnouncement();
    initHeader();
    initSearch();
    initCart();
    initWishlist();
    initCategories();
    initFilters();
    initProducts();
    initQuickView();
    initShowcase();
    initCountdown();
    initCounters();
    initStaticStars();
    initReveal();
    initForms();
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
