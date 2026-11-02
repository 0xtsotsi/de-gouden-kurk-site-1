import { products } from "./products.js";

export function createApp({
  schedule = window.setTimeout.bind(window),
  cancelSchedule = window.clearTimeout.bind(window)
} = {}) {
  const currencyFormatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR"
  });

  const elements = {
    productGrid: document.querySelector("#product-grid"),
    productSearch: document.querySelector("#product-search"),
    productSort: document.querySelector("#product-sort"),
    resultStatus: document.querySelector("#result-status"),
    emptyState: document.querySelector("#empty-state"),
    categoryFilter: document.querySelector("#category-filters"),
    cartDialog: document.querySelector("#cart-dialog"),
    cartItems: document.querySelector("#cart-items"),
    cartEmpty: document.querySelector("#cart-empty"),
    cartSummary: document.querySelector("#cart-summary"),
    cartTotal: document.querySelector("#cart-total"),
    cartCount: document.querySelector("#cart-count"),
    cartLive: document.querySelector("#cart-live"),
    cartView: document.querySelector("#cart-view"),
    cartTitle: document.querySelector("#cart-title"),
    cartKicker: document.querySelector("#cart-kicker"),
    checkoutForm: document.querySelector("#checkout-form"),
    checkoutSuccess: document.querySelector("#checkout-success"),
    checkoutSummaryList: document.querySelector("#checkout-summary-list"),
    checkoutTotal: document.querySelector("#checkout-total"),
    deliveryFields: document.querySelector("#delivery-fields"),
    toast: document.querySelector("#toast"),
    ageDialog: document.querySelector("#age-dialog"),
    pourMoment: document.querySelector(".pour-moment")
  };

  const state = {
    activeCategory: "all",
    searchQuery: "",
    sort: "name-asc",
    cart: new Map(),
    searchTimer: null,
    toastTimer: null,
    addedButtonTimer: null,
    badgeTimer: null,
    renderedCartCount: null
  };

  function formatCurrency(value) {
    return currencyFormatter.format(value);
  }

  function readStoredCart() {
    try {
      const storedValue = JSON.parse(localStorage.getItem("dgk-cart") || "[]");
      if (!Array.isArray(storedValue)) return new Map();

      const validEntries = storedValue.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const product = products.find((candidate) => candidate.id === entry.id);
        const quantity = Number(entry.quantity);
        if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return [];
        return [[product.id, Math.min(quantity, 99)]];
      });

      return new Map(validEntries.sort(([leftId], [rightId]) => leftId.localeCompare(rightId)));
    } catch {
      return new Map();
    }
  }

  function saveCart() {
    try {
      const entries = Array.from(state.cart.entries()).sort(([leftId], [rightId]) => leftId.localeCompare(rightId));
      localStorage.setItem("dgk-cart", JSON.stringify(entries));
    } catch {
      // De winkelmand blijft tijdens deze sessie werken zonder opslag.
    }
  }

  function getVisibleProducts() {
    const normalizedQuery = state.searchQuery.trim().toLocaleLowerCase("nl-NL");
    const visibleProducts = products.filter((product) => {
      const matchesCategory = state.activeCategory === "all" || product.category === state.activeCategory;
      const searchable = `${product.name} ${product.style} ${product.categoryLabel}`.toLocaleLowerCase("nl-NL");
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    return visibleProducts.sort((left, right) => {
      if (state.sort === "price-asc") return left.price - right.price || left.name.localeCompare(right.name, "nl-NL");
      if (state.sort === "price-desc") return right.price - left.price || left.name.localeCompare(right.name, "nl-NL");
      return left.name.localeCompare(right.name, "nl-NL");
    });
  }

  function productImageMarkup(product, className = "product-card__image") {
    return `<img class="${className}" src="${product.image}" alt="${product.imageAlt}" width="${product.imageWidth}" height="${product.imageHeight}" loading="lazy" decoding="async">`;
  }

  function renderProducts() {
    const visibleProducts = getVisibleProducts();
    elements.productGrid.innerHTML = visibleProducts.map((product) => `
      <article class="product-card">
        <div class="product-card__media">${productImageMarkup(product)}</div>
        <div class="product-card__content">
          <div class="product-card__meta">
            <span>${product.categoryLabel}</span>
            <span>${product.volume}</span>
          </div>
          <h3>${product.name}</h3>
          <p class="product-card__style">${product.style}</p>
          <p class="product-card__specs">${product.volume} · ${product.abv}</p>
          <div class="product-card__buy">
            <span class="product-card__price">${formatCurrency(product.price)}</span>
            <button class="button button--ink" type="button" data-add-product="${product.id}" aria-label="Voeg ${product.name} toe aan de winkelmand">In mand</button>
          </div>
        </div>
      </article>
    `).join("");

    const count = visibleProducts.length;
    elements.resultStatus.textContent = `${count} ${count === 1 ? "voorbeeld" : "voorbeelden"} gevonden`;
    elements.emptyState.hidden = count !== 0;
    elements.productGrid.hidden = count === 0;
  }

  function getCartEntries() {
    return Array.from(state.cart.entries())
      .sort(([leftId], [rightId]) => leftId.localeCompare(rightId))
      .map(([id, quantity]) => ({
        product: products.find((product) => product.id === id),
        quantity
      }));
  }

  function getCartCount() {
    return Array.from(state.cart.values()).reduce((sum, quantity) => sum + quantity, 0);
  }

  function getCartTotal(entries = getCartEntries()) {
    return entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  }

  function pulseCartBadge() {
    cancelSchedule(state.badgeTimer);
    elements.cartCount.classList.remove("is-updated");
    void elements.cartCount.offsetWidth;
    elements.cartCount.classList.add("is-updated");
    state.badgeTimer = schedule(() => {
      elements.cartCount.classList.remove("is-updated");
    }, 320);
  }

  function renderCart() {
    const entries = getCartEntries();
    const count = getCartCount();
    const total = getCartTotal(entries);

    elements.cartCount.textContent = count;
    elements.cartCount.hidden = count === 0;
    elements.cartEmpty.hidden = entries.length !== 0;
    elements.cartSummary.hidden = entries.length === 0;
    elements.cartTotal.textContent = formatCurrency(total);
    elements.checkoutTotal.textContent = formatCurrency(total);

    const cartButton = document.querySelector("[data-open-cart]");
    cartButton.setAttribute("aria-label", `Open winkelmand, ${count} ${count === 1 ? "artikel" : "artikelen"}`);

    const countChanged = state.renderedCartCount !== null && state.renderedCartCount !== count;
    state.renderedCartCount = count;
    if (countChanged) pulseCartBadge();

    elements.cartItems.innerHTML = entries.map(({ product, quantity }) => `
      <article class="cart-item">
        <div class="cart-item__art">${productImageMarkup(product, "cart-item__image")}</div>
        <div>
          <h3>${product.name}</h3>
          <p class="cart-item__specs">${product.volume} · ${product.abv} · ${formatCurrency(product.price)} per fles</p>
          <p class="cart-item__price">${formatCurrency(product.price * quantity)}</p>
          <div class="quantity" aria-label="Aantal voor ${product.name}">
            <button type="button" data-cart-action="decrease" data-id="${product.id}" aria-label="Eén fles ${product.name} minder">−</button>
            <span aria-label="Aantal ${quantity}">${quantity}</span>
            <button type="button" data-cart-action="increase" data-id="${product.id}" aria-label="Eén fles ${product.name} meer">+</button>
          </div>
        </div>
        <button class="cart-item__remove" type="button" data-cart-action="remove" data-id="${product.id}" aria-label="Verwijder ${product.name} uit de winkelmand">Verwijderen</button>
      </article>
    `).join("");

    elements.checkoutSummaryList.innerHTML = entries.map(({ product, quantity }) => `
      <div class="checkout-summary__row">
        <span>${quantity} × ${product.name}</span>
        <strong>${formatCurrency(product.price * quantity)}</strong>
      </div>
    `).join("");

    saveCart();
  }

  function showToast(message) {
    cancelSchedule(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    state.toastTimer = schedule(() => {
      elements.toast.hidden = true;
    }, 2800);
  }

  function announceCart(message) {
    elements.cartLive.textContent = message;
  }

  function addToCart(productId) {
    const current = state.cart.get(productId) || 0;
    state.cart.set(productId, Math.min(current + 1, 99));
    renderCart();
    const product = products.find((item) => item.id === productId);
    showToast(`${product.name} is toegevoegd aan je mand.`);
    announceCart(`${product.name} is toegevoegd. ${getCartCount()} artikelen in de winkelmand.`);
  }

  function hideToast() {
    cancelSchedule(state.toastTimer);
    elements.toast.hidden = true;
  }

  function openCart() {
    hideToast();
    resetCheckoutView();
    if (!elements.cartDialog.open) elements.cartDialog.showModal();
  }

  function closeCart() {
    if (elements.cartDialog.open) elements.cartDialog.close();
  }

  function resetCheckoutView() {
    elements.cartView.hidden = false;
    elements.checkoutForm.hidden = true;
    elements.checkoutSuccess.hidden = true;
    elements.cartTitle.textContent = "Winkelmand";
    elements.cartKicker.textContent = "Jouw selectie";
  }

  function showCheckout() {
    if (state.cart.size === 0) return;
    elements.cartView.hidden = true;
    elements.checkoutForm.hidden = false;
    elements.checkoutSuccess.hidden = true;
    elements.cartTitle.textContent = "Afrekenen";
    elements.cartKicker.textContent = "Laatste controle";
    elements.checkoutForm.querySelector("input[name='fulfillment']").focus();
  }

  function updateDeliveryFields(isDelivery) {
    elements.deliveryFields.hidden = !isDelivery;
    elements.deliveryFields.querySelectorAll("[data-delivery-field]").forEach((field) => {
      field.required = isDelivery;
    });
  }

  function setActiveCategory(categoryId) {
    state.activeCategory = categoryId;
    elements.categoryFilter.querySelectorAll("button[data-category]").forEach((filterButton) => {
      const isActive = filterButton.dataset.category === categoryId;
      filterButton.setAttribute("aria-pressed", String(isActive));
      if (isActive) filterButton.dataset.active = "true";
      else delete filterButton.dataset.active;
    });
    renderProducts();
  }

  function closeNavigation({ restoreFocus = false } = {}) {
    const navToggle = document.querySelector("#nav-toggle");
    const mainNav = document.querySelector("#main-nav");
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.dataset.open = "false";
    if (restoreFocus) navToggle.focus();
  }

  function initCatalog() {
    elements.categoryFilter.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-category]");
      if (!button) return;
      setActiveCategory(button.dataset.category);
    });

    elements.productSearch.addEventListener("input", () => {
      cancelSchedule(state.searchTimer);
      state.searchTimer = schedule(() => {
        state.searchQuery = elements.productSearch.value;
        renderProducts();
      }, 100);
    });

    elements.productSort.addEventListener("change", () => {
      state.sort = elements.productSort.value;
      renderProducts();
    });

    elements.productGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-add-product]");
      if (!button) return;
      addToCart(button.dataset.addProduct);
      button.classList.add("is-added");
      button.textContent = "Toegevoegd";
      cancelSchedule(state.addedButtonTimer);
      state.addedButtonTimer = schedule(() => {
        button.classList.remove("is-added");
        button.textContent = "In mand";
      }, 1300);
    });

    document.querySelector("#reset-filters").addEventListener("click", () => {
      state.searchQuery = "";
      elements.productSearch.value = "";
      state.sort = "name-asc";
      elements.productSort.value = "name-asc";
      setActiveCategory("all");
      elements.productSearch.focus();
    });
  }

  function initCart() {
    document.querySelectorAll("[data-open-cart]").forEach((button) => {
      button.addEventListener("click", openCart);
    });

    document.querySelectorAll("[data-close-cart]").forEach((button) => {
      button.addEventListener("click", closeCart);
    });

    elements.cartItems.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-cart-action]");
      if (!button) return;
      const productId = button.dataset.id;
      const action = button.dataset.cartAction;

      if (action === "remove") {
        state.cart.delete(productId);
      } else if (action === "decrease") {
        const quantity = state.cart.get(productId) || 0;
        if (quantity <= 1) state.cart.delete(productId);
        else state.cart.set(productId, quantity - 1);
      } else if (action === "increase") {
        state.cart.set(productId, Math.min((state.cart.get(productId) || 0) + 1, 99));
      }

      renderCart();
      announceCart(`Winkelmand bijgewerkt. ${getCartCount()} artikelen. Subtotaal ${formatCurrency(getCartTotal())}.`);
    });

    document.querySelector("#start-checkout").addEventListener("click", showCheckout);
    document.querySelector("#back-to-cart").addEventListener("click", resetCheckoutView);

    elements.checkoutForm.addEventListener("change", (event) => {
      if (event.target.name !== "fulfillment") return;
      updateDeliveryFields(event.target.value === "delivery");
    });

    elements.checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.checkoutForm.reportValidity()) return;
      elements.checkoutForm.hidden = true;
      elements.checkoutSuccess.hidden = false;
      elements.cartTitle.textContent = "Overzicht";
      elements.cartKicker.textContent = "Preview gereed";
      elements.checkoutSuccess.querySelector("button").focus();
    });

    elements.cartDialog.addEventListener("click", (event) => {
      if (event.target !== elements.cartDialog) return;
      const bounds = elements.cartDialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) closeCart();
    });
  }

  function initNavigation() {
    const navToggle = document.querySelector("#nav-toggle");
    const mainNav = document.querySelector("#main-nav");

    navToggle.addEventListener("click", () => {
      const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(willOpen));
      mainNav.dataset.open = String(willOpen);
    });

    mainNav.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      closeNavigation();
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNavigation({ restoreFocus: true });
      }
    });

    document.querySelector("[data-focus-search]").addEventListener("click", () => {
      document.querySelector("#assortiment").scrollIntoView({ behavior: "smooth", block: "start" });
      schedule(() => elements.productSearch.focus({ preventScroll: true }), 350);
    });

    const siteHeader = document.querySelector("#site-header");
    const navigationLinks = Array.from(mainNav.querySelectorAll('a[href^="#"]'));
    const updateActiveNavigation = () => {
      const marker = window.scrollY + 180;
      const currentSection = navigationLinks
        .map((link) => ({ link, section: document.querySelector(link.hash) }))
        .filter(({ section }) => section)
        .sort((left, right) => left.section.offsetTop - right.section.offsetTop)
        .filter(({ section }) => section.offsetTop <= marker)
        .at(-1);

      for (const link of navigationLinks) {
        if (link === currentSection?.link) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const updateHeader = () => {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
      updateActiveNavigation();
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function initLegalDialogs() {
    const legalDialog = document.querySelector("#legal-dialog");
    const creditsDialog = document.querySelector("#credits-dialog");

    document.querySelector("[data-open-legal]").addEventListener("click", () => legalDialog.showModal());
    document.querySelector("[data-close-legal]").addEventListener("click", () => legalDialog.close());
    document.querySelectorAll("[data-open-credits]").forEach((button) => {
      button.addEventListener("click", () => creditsDialog.showModal());
    });
    document.querySelector("[data-close-credits]").addEventListener("click", () => creditsDialog.close());

    const creditsList = document.querySelector("#credits-list");
    creditsList.innerHTML = [
      `<li><span>De Gouden Kurk, winkelinterieur</span><a href="https://www.rodi.nl/rozenburg/nieuws/108613/run-op-nieuwe-slijterij">Rodi, 8 januari 2026</a><span>Publicatierechten controleren vóór livegang</span></li>`,
      ...products.map((product) => `
        <li>
          <span>${product.name}</span>
          <a href="${product.credit.sourceUrl}">${product.credit.creator}</a>
          <a href="${product.credit.licenseUrl}">${product.credit.license}</a>
        </li>
      `)
    ].join("");
  }

  function initPourMoment() {
    if (!elements.pourMoment) return;
    const startPour = () => elements.pourMoment.classList.add("is-pouring");
    const ageDialog = elements.ageDialog;

    if (ageDialog.open) {
      ageDialog.addEventListener("close", startPour, { once: true });
      return;
    }

    startPour();
  }

  function initAgeGate() {
    const ageMain = document.querySelector("#age-main");
    const ageUnderage = document.querySelector("#age-underage");
    const ageUnderageTitle = document.querySelector("#age-underage-title");

    const ageConfirmed = () => {
      try {
        return localStorage.getItem("dgk-age-confirmed") === "yes";
      } catch {
        return false;
      }
    };

    if (!ageConfirmed() && !elements.ageDialog.open) elements.ageDialog.showModal();

    elements.ageDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
    });

    document.querySelector("#age-yes").addEventListener("click", () => {
      try {
        localStorage.setItem("dgk-age-confirmed", "yes");
      } catch {
        // De preview kan ook zonder opslag verdergaan.
      }
      elements.ageDialog.close();
    });

    document.querySelector("#age-no").addEventListener("click", () => {
      ageMain.hidden = true;
      ageUnderage.hidden = false;
      ageUnderageTitle.focus();
    });
  }

  function init() {
    state.cart = readStoredCart();
    initCatalog();
    initCart();
    initNavigation();
    initLegalDialogs();
    initAgeGate();
    initPourMoment();
    renderProducts();
    renderCart();
  }

  init();
}

createApp();
