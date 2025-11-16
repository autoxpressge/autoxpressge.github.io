// --- Utility Functions (Same as before) ---
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200);
}

// --- Core UI Functions (Same as before) ---

// DOM Elements (will be initialized in DOMContentLoaded)
let menuButton, mobileMenu, viewProductsButton, sections, navLinks;
let productCategories, subcategoryView, backToCategoriesButton;
let subcategoryButtons, productCards, productDetailSection, backToListButton;
let subcategoryTitle, basicPartsList, emptyCategoryMessage;
let contactToOrderButton, contactModal, closeModalButton;
let gmailOrderLink, footerEmailLink;

// Product Data (in-memory)
const productData = {
  "air-intake-filter": {
    id: "air-intake-filter",
    name: "ჰაერის შემშვები (ფილტრი)",
    price: 60,
    description: [
      "ზომა: 76მმ / 3ინჩი",
      "მაღალი ხარისხის, მრავალჯერადი გამოყენების შემშვები ფილტრი.",
      "უზრუნველყოფს გაუმჯობესებულ ჰაერის ნაკადს ძრავისთვის.",
    ],
  },
};

// Category Names Map
const categoryTitles = {
  basic: "ძირითადი ნაწილები",
  engine: "ძრავის ნაწილები",
  accessories: "აქსესუარები",
};

// --- Core UI Functions ---

function showPage(pageId) {
  if (!sections) return;
  
  sections.forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("active");
  });

  const targetSection = document.querySelector(`[data-section="${pageId}"]`);
  if (targetSection) {
    setTimeout(() => {
      targetSection.classList.remove("hidden");
      targetSection.classList.add("active");
    }, 50);
  }

  // Update active link styling
  document.querySelectorAll(".nav-link, .nav-link-mobile").forEach((link) => {
    link.classList.remove("text-primary-red", "font-bold");
    link.classList.add("text-gray-700", "font-semibold");
    if (link.dataset.page === pageId) {
      link.classList.add("text-primary-red", "font-bold");
      link.classList.remove("text-gray-700", "font-semibold");
    }
  });

  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showProductList(category) {
  if (!productCategories || !subcategoryView) return;
  
  productCategories.classList.add("opacity-0");

  if (basicPartsList) basicPartsList.classList.add("hidden");
  if (emptyCategoryMessage) emptyCategoryMessage.classList.add("hidden");

  setTimeout(() => {
    productCategories.classList.add("hidden");
    subcategoryView.classList.remove("hidden");

    if (subcategoryTitle) {
      subcategoryTitle.textContent = categoryTitles[category] || "პროდუქტები";
      subcategoryTitle.classList.remove("text-gray-800");
      subcategoryTitle.classList.add("text-primary-red");
    }

    if (category === "basic" && basicPartsList) {
      basicPartsList.classList.remove("hidden");
    } else if (emptyCategoryMessage) {
      emptyCategoryMessage.classList.remove("hidden");
    }

    setTimeout(() => {
      subcategoryView.classList.add("opacity-100");
    }, 10);
  }, 300);
}

function showCategories() {
  if (!productCategories || !subcategoryView) return;
  
  if (productDetailSection) productDetailSection.classList.add("hidden");
  subcategoryView.classList.add("opacity-0");

  if (subcategoryTitle) {
    subcategoryTitle.classList.remove("text-primary-red");
    subcategoryTitle.classList.add("text-gray-800");
  }

  setTimeout(() => {
    subcategoryView.classList.add("hidden");
    productCategories.classList.remove("hidden");

    setTimeout(() => {
      productCategories.classList.remove("opacity-0");
      productCategories.classList.add("opacity-100");
    }, 10);
  }, 300);
}

function showProductDetail(productId) {
  if (!productDetailSection) return;
  
  const product = productData[productId];

  if (!product) {
    console.error("პროდუქტი ვერ მოიძებნა:", productId);
    return;
  }

  // Update content
  const detailName = document.getElementById("detail-name");
  const detailPrice = document.getElementById("detail-price");
  if (detailName) detailName.textContent = product.name;
  if (detailPrice) detailPrice.textContent = `${product.price}₾`;

  const descList = document.getElementById("detail-description-list");
  if (descList) {
    descList.innerHTML = "";
    product.description.forEach((desc) => {
      const li = document.createElement("li");
      li.textContent = desc;
      descList.appendChild(li);
    });
  }

  // Hide list and show details
  const productsSection = document.getElementById("products");
  if (productsSection) productsSection.classList.add("hidden");
  productDetailSection.classList.remove("hidden");
  productDetailSection.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Main Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all DOM elements
  menuButton = document.getElementById("mobile-menu-button");
  mobileMenu = document.getElementById("mobile-menu");
  viewProductsButton = document.getElementById("view-products-button");
  sections = document.querySelectorAll(".page-content");
  navLinks = document.querySelectorAll(
    ".nav-link, .nav-link-mobile, #logo-link",
  );
  productCategories = document.getElementById("product-categories");
  subcategoryView = document.getElementById("subcategory-view");
  backToCategoriesButton = document.getElementById("back-to-categories");
  subcategoryButtons = document.querySelectorAll(".show-subcategory-btn");
  productCards = document.querySelectorAll(".product-card");
  productDetailSection = document.getElementById("product-detail");
  backToListButton = document.getElementById("back-to-list");
  subcategoryTitle = document.getElementById("subcategory-title");
  basicPartsList = document.getElementById("basic-parts-list");
  emptyCategoryMessage = document.getElementById("empty-category-message");
  contactToOrderButton = document.getElementById("contact-to-order-button");
  contactModal = document.getElementById("contact-modal");
  closeModalButton = document.getElementById("close-modal");
  gmailOrderLink = document.getElementById("gmail-order-link");
  footerEmailLink = document.getElementById("footer-email-link");

  // GMAIL LINK CONFIGURATION (FIX FOR WEBSITE)
  const recipientEmail = "autoxpressge@gmail.com";
  const subject = "შეკვეთა | AutoXpress-ის საიტიდან";
  const body =
    "გამარჯობა, მსურს შევუკვეთო შემდეგი პროდუქტ(ებ)ი:\n\n[პროდუქტის სახელი: რაოდენობა]\n\nგთხოვთ დამიკავშირდეთ დეტალების დასაზუსტებლად. მადლობა!";

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" +
    encodeURIComponent(recipientEmail) +
    "&su=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // 1. Assign Gmail link to modal button
  if (gmailOrderLink) {
    gmailOrderLink.href = gmailComposeUrl;
  }

  // 2. Assign Gmail link to footer email link
  // This is the crucial part that ensures the footer link works everywhere
  if (footerEmailLink) {
    footerEmailLink.href = gmailComposeUrl;
    footerEmailLink.target = "_blank";
  }

  // 3. მობილურის მენიუს გადართვა
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 4. ნავიგაციის ლინკებზე დაწკაპუნების მოსმენა
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (link.dataset.page === "products") {
          showCategories();
          if (productDetailSection) productDetailSection.classList.add("hidden");
        }

        const page = link.dataset.page;
        if (page) {
          showPage(page);
        }
      });
    });
  }

  // 5. "პროდუქტების ნახვა" ღილაკზე დაჭერით გადართვა
  if (viewProductsButton) {
    viewProductsButton.addEventListener("click", () => {
      showCategories();
      showPage("products");
    });
  }

  // 6. კატეგორიის ღილაკებზე დაჭერა
  if (subcategoryButtons && subcategoryButtons.length > 0) {
    subcategoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;
        showProductList(category);
      });
    });
  }

  // 7. უკან კატეგორიებში ღილაკი
  if (backToCategoriesButton) {
    backToCategoriesButton.addEventListener("click", showCategories);
  }

  // 8. პროდუქტის ბარათზე დაჭერა (დეტალების სანახავად)
  if (productCards && productCards.length > 0) {
    productCards.forEach((card) => {
      card.addEventListener("click", () => {
        const productId = card.dataset.productId;
        showProductDetail(productId);
      });
    });
  }

  // 9. უკან პროდუქტების სიაში ღილაკი
  if (backToListButton) {
    backToListButton.addEventListener("click", () => {
      if (productDetailSection) productDetailSection.classList.add("hidden");
      showPage("products");
      showProductList("basic");
    });
  }

  // 10. ლოგოზე დაჭერა მთავარ გვერდზე დასაბრუნებლად
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", () => {
      showPage("home");
    });
  }

  // 11. საკონტაქტო ღილაკზე დაჭერა (მოდელის გასახსნელად)
  if (contactToOrderButton) {
    contactToOrderButton.addEventListener("click", () => {
      showModal("contact-modal");
    });
  }

  // 12. მოდელის დახურვა
  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      closeModal("contact-modal");
    });
  }

  // 13. ასევე, თუ დააწკაპუნებენ მოდელის ფონზე
  if (contactModal) {
    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        closeModal("contact-modal");
      }
    });
  }

  // გვერდის ჩატვირთვისას ნაგულისხმევი გვერდის გამოჩენა
  showPage("home");
});
