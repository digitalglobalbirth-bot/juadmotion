(() => {
  const phone = "919451445603";
  const email = "sharedigital204@gmail.com";
  const page = location.pathname.split("/").pop() || "index.html";
  document.body.classList.add("page-enhanced");

  const navItems = [
    ["Home", "index.html"],
    ["About", "about.html"],
    ["Portfolio", "portfolio.html"],
    ["Pricing", "pricing.html"],
    ["Blog", "blog.html"],
    ["FAQ", "faq.html"],
    ["Contact", "contact.html"]
  ];

  const navLinks = navItems.map(([label, href]) =>
    `<a href="${href}"${page === href ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");

  const servicesPages = ["services.html", "digital-marketing.html", "video-editing.html"];
  const servicesLinks = `<details class="page-services"><summary${servicesPages.includes(page) ? ' aria-current="page"' : ""}>Services</summary><div class="page-services-menu"><a href="services.html">All services</a><a href="digital-marketing.html">Digital marketing</a><a href="video-editing.html">Video editing</a></div></details>`;

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="page-topline">Digital strategy · Video storytelling · Creative design</div>
      <header class="page-header">
        <nav class="page-nav page-wrap" aria-label="Main navigation">
          <a class="page-brand" href="index.html" aria-label="JU.ADMOTION home">
            <img src="assets/ju-admotion-logo.webp" alt="JU.ADMOTION logo" width="768" height="768">
            <span class="page-brand-lockup"><span class="page-brand-name">JU.ADMOTION</span><span class="page-brand-caption">Strategy · Story · Design</span></span>
          </a>
          <div class="page-nav-links" id="pageNavLinks">${navLinks}${servicesLinks}<a class="page-mobile-cta" href="contact.html">Get a free consultation ↗</a></div>
          <a class="page-nav-cta" href="contact.html">Free consultation <span aria-hidden="true">↗</span></a>
          <button class="page-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="pageNavLinks">☰</button>
        </nav>
      </header>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <footer class="page-footer">
        <div class="page-wrap">
          <div class="page-footer-grid">
            <div><a class="page-brand" href="index.html"><img src="assets/ju-admotion-logo.webp" alt="" width="768" height="768" loading="lazy"><span class="page-brand-lockup"><span class="page-brand-name">JU.ADMOTION</span><span class="page-brand-caption">Strategy · Story · Design</span></span></a><p>Ideas shaped with purpose. Digital strategy, video storytelling and design to help your brand connect and grow.</p></div>
            <nav aria-label="Quick links"><h2>Explore</h2><div class="page-footer-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="portfolio.html">Portfolio</a><a href="pricing.html">Pricing</a><a href="blog.html">Blog</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div></nav>
            <nav aria-label="Services"><h2>Services</h2><div class="page-footer-links"><a href="digital-marketing.html">Digital marketing</a><a href="video-editing.html">Video editing</a><a href="services.html">Creative support</a><a href="portfolio.html">Selected work</a></div></nav>
            <div><h2>Let’s connect</h2><p>Have a project in mind? Share a little about it to start a conversation.</p><div class="page-footer-links"><a href="mailto:${email}">${email}</a><a href="https://wa.me/${phone}" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="https://www.instagram.com/ju.admotion/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/aman-prajapati-b5b3742b1" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
          </div>
          <div class="page-footer-bottom"><span>© <span data-year></span> JU.ADMOTION. All rights reserved.</span><span><a href="privacy.html">Privacy policy</a> · <a href="terms.html">Terms</a></span></div>
        </div>
      </footer>
      <a class="page-whatsapp" href="https://wa.me/${phone}?text=Hello%20JU.ADMOTION%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" aria-label="Chat with JU.ADMOTION on WhatsApp"><span aria-hidden="true">WA</span></a>
      <button class="page-back-top" type="button" aria-label="Back to top">↑</button>`;
  }

  document.querySelectorAll("[data-year]").forEach(node => { node.textContent = new Date().getFullYear(); });

  const menuButton = document.querySelector(".page-menu-toggle");
  const menu = document.querySelector(".page-nav-links");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
      menuButton.textContent = expanded ? "☰" : "×";
      menu.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });
    menu.addEventListener("click", event => {
      if (event.target instanceof HTMLAnchorElement) {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.textContent = "☰";
        document.body.classList.remove("menu-open");
      }
    });
  }

  const revealItems = document.querySelectorAll(".page-reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("no-motion"));
  }

  const backTop = document.querySelector(".page-back-top");
  if (backTop) {
    window.addEventListener("scroll", () => backTop.classList.toggle("is-visible", window.scrollY > 600), { passive: true });
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const portfolioCards = document.querySelectorAll("[data-category]");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
    portfolioCards.forEach(card => { card.hidden = selected !== "all" && card.dataset.category !== selected; });
  }));

  const lightbox = document.getElementById("portfolioLightbox");
  const lightboxVideo = document.getElementById("lightboxVideo");
  if (lightbox instanceof HTMLDialogElement && lightboxVideo instanceof HTMLVideoElement) {
    document.querySelectorAll("[data-video]").forEach(button => button.addEventListener("click", () => {
      const source = button.getAttribute("data-video");
      if (!source) return;
      lightboxVideo.src = source;
      lightbox.showModal();
      document.body.classList.add("dialog-open");
      lightboxVideo.play().catch(() => {});
    }));
    const closeDialog = () => {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();
      document.body.classList.remove("dialog-open");
    };
    lightbox.addEventListener("close", closeDialog);
    lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });
    lightbox.querySelector("[data-close-dialog]")?.addEventListener("click", () => lightbox.close());
  }

  const pricing = {
    video: [
      { name: "Basic", price: "₹2,499", cadence: "per project", features: ["One short-form edit", "Basic titles and captions", "One revision"] },
      { name: "Standard", price: "₹5,999", cadence: "per project", features: ["Up to four short-form edits", "Branded captions and transitions", "Two revision rounds"] },
      { name: "Premium", price: "₹11,999", cadence: "per project", features: ["Up to eight short-form edits", "Advanced motion and sound polish", "Priority delivery and revisions"] }
    ],
    marketing: [
      { name: "Basic", price: "₹4,999", cadence: "per month", features: ["One platform", "Monthly content plan", "Performance summary"] },
      { name: "Standard", price: "₹9,999", cadence: "per month", features: ["Two platforms", "Content calendar and publishing", "Monthly review and recommendations"] },
      { name: "Premium", price: "₹19,999", cadence: "per month", features: ["Multi-platform content support", "Campaign creative coordination", "Regular performance reviews"] }
    ]
  };
  const pricingGrid = document.getElementById("pricingGrid");
  const priceTabs = document.querySelectorAll("[data-price-tab]");
  const renderPrices = type => {
    if (!pricingGrid) return;
    pricingGrid.innerHTML = pricing[type].map((plan, index) => `
      <article class="page-card price-card${index === 1 ? " price-featured" : ""}">
        ${index === 1 ? '<span class="page-filter-tag">Most popular</span>' : ""}
        <h3>${plan.name}</h3><p class="price-amount">${plan.price}<small> / ${plan.cadence.split(" ").slice(-1)[0]}</small></p>
        <ul>${plan.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        <a class="page-button${index === 1 ? "" : " secondary"}" href="contact.html?service=${encodeURIComponent(type === "video" ? "Video editing" : "Digital marketing")}&plan=${encodeURIComponent(plan.name)}">Discuss this plan</a>
      </article>`).join("");
  };
  if (pricingGrid) {
    renderPrices("video");
    priceTabs.forEach(tab => tab.addEventListener("click", () => {
      priceTabs.forEach(item => item.setAttribute("aria-selected", String(item === tab)));
      renderPrices(tab.dataset.priceTab === "marketing" ? "marketing" : "video");
    }));
  }

  const faqSearch = document.getElementById("faqSearch");
  if (faqSearch) {
    faqSearch.addEventListener("input", () => {
      const query = faqSearch.value.trim().toLowerCase();
      document.querySelectorAll(".faq-item").forEach(item => {
        item.hidden = !item.textContent.toLowerCase().includes(query);
      });
      const empty = document.getElementById("faqNoResults");
      if (empty) empty.hidden = [...document.querySelectorAll(".faq-item")].some(item => !item.hidden);
    });
  }

  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm instanceof HTMLFormElement) {
    const query = new URLSearchParams(location.search);
    const serviceSelect = enquiryForm.elements.namedItem("service");
    if (serviceSelect instanceof HTMLSelectElement && query.has("service")) {
      const requestedService = query.get("service");
      if ([...serviceSelect.options].some(option => option.value === requestedService)) serviceSelect.value = requestedService;
    }
    enquiryForm.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("formStatus");
      if (!enquiryForm.reportValidity()) {
        if (status) {
          status.dataset.state = "error";
          status.textContent = "Please check the highlighted fields and try again.";
        }
        return;
      }
      const data = new FormData(enquiryForm);
      const message = [
        "Hello JU.ADMOTION, I’d like to discuss a project.",
        `Name: ${data.get("name")}`,
        `Phone: ${data.get("phone")}`,
        `Email: ${data.get("email")}`,
        `Service: ${data.get("service")}`,
        `Budget: ${data.get("budget") || "Not specified"}`,
        `Project details: ${data.get("message")}`
      ];
      const requestedPlan = query.get("plan");
      if (requestedPlan) message.splice(1, 0, `Package: ${requestedPlan}`);
      const whatsappWindow = window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message.join("\n"))}`, "_blank");
      if (!whatsappWindow) {
        if (status) {
          status.dataset.state = "error";
          status.textContent = "Your browser blocked the WhatsApp window. Use the WhatsApp contact link instead.";
        }
        return;
      }
      whatsappWindow.opener = null;
      if (status) {
        status.dataset.state = "success";
        status.textContent = "Your message draft is ready in WhatsApp. Review it and press Send to submit your enquiry.";
      }
    });
  }
})();
