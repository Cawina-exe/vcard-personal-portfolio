'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add keyframes for a premium cinematic blur-reveal animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes cinematicReveal {
    0% { transform: translateY(15px) scale(0.98); opacity: 0; filter: blur(5px); }
    100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
  }
  
  .article.active, .project-details-article.active {
    animation: cinematicReveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
  }
`;
document.head.appendChild(styleSheet);

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    let isAlreadyActive = false;
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page && pages[j].classList.contains('active')) {
        isAlreadyActive = true;
      }
    }
    
    if (isAlreadyActive) return;
    const targetPageStr = this.innerHTML.toLowerCase();

    // Close project articles if open
    const projectArticles = document.querySelectorAll('.project-details-article');
    projectArticles.forEach(p => p.classList.remove('active'));

    for (let j = 0; j < pages.length; j++) {
      if (targetPageStr === pages[j].dataset.page) {
        // Trigger a reflow to restart the CSS animation seamlessly
        pages[j].classList.remove("active");
        void pages[j].offsetWidth;
        
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Handle URL hash to open specific tabs on load
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const hashPage = window.location.hash.substring(1).toLowerCase();
    const targetLink = Array.from(navigationLinks).find(link => link.innerHTML.toLowerCase() === hashPage);
    if (targetLink) {
      targetLink.click();
    }
  }
});

// Project Details Navigation
const projectLinks = document.querySelectorAll('[data-project-link]');
const portfolioPage = document.querySelector('[data-page="portfolio"]');
const projectArticles = document.querySelectorAll('.project-details-article');
const backToPortfolioBtns = document.querySelectorAll('[data-back-btn]');
const mainNavbar = document.querySelector('.main-content > .navbar');

projectLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    
    pages.forEach(p => p.classList.remove('active'));
    navigationLinks.forEach(n => n.classList.remove('active'));
    projectArticles.forEach(p => p.classList.remove('active'));
    
    // Hide main navbar to prevent overlapping with "Back to Portfolio"
    if(mainNavbar) {
      mainNavbar.style.opacity = '0';
      mainNavbar.style.pointerEvents = 'none';
      mainNavbar.style.transition = 'opacity 0.3s ease';
    }
    
    const targetProject = document.getElementById(targetId);
    if(targetProject) {
      void targetProject.offsetWidth; // Trigger reflow
      targetProject.classList.add('active');
      window.scrollTo(0, 0);
    }
  });
});

backToPortfolioBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    projectArticles.forEach(p => p.classList.remove('active'));
    
    const portLink = Array.from(navigationLinks).find(link => link.innerHTML.toLowerCase() === 'portfolio');
    if(portLink) portLink.classList.add('active');
    
    // Restore main navbar
    if(mainNavbar) {
      mainNavbar.style.opacity = '1';
      mainNavbar.style.pointerEvents = 'all';
    }
    
    void portfolioPage.offsetWidth; // Trigger reflow
    portfolioPage.classList.add('active');
    
    window.scrollTo(0, 0);
  });
});
