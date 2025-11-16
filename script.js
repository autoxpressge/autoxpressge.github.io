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

// DOM Elements
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const viewProductsButton = document.getElementById("view-products-button");
const sections = document.querySelectorAll(".page-content");
const navLinks = document.querySelectorAll(
  ".nav-link, .nav-link-mobile, #logo-link",
);
const productCategories = document.getElementById("product-categories");
const subcategoryView = document.getElementById("subcategory-view");
const backToCategoriesButton = document.getElementById("back-to-categories");
const subcategoryButtons = document.querySelectorAll(".show-subcategory-btn");
const productCards = document.querySelectorAll(".product-card");
const productDetailSection = document.getElementById("product-detail");
const backToListButton = document.getElementById("back-to-list");
const subcategoryTitle = document.getElementById("subcategory-title");
const basicPartsList = document.getElementById("basic-parts-list");
const emptyCategoryMessage = document.getElementById("empty-category-message");

// Modal Elements
const contactToOrderButton = document.getElementById("contact-to-order-button");
const contactModal = document.getElementById("contact-modal");
const closeModalButton = document.getElementById("close-modal");
const gmailOrderLink = document.getElementById("gmail-order-link");
const footerEmailLink = document.getElementById("footer-email-link"); // Footer Email Link

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

  mobileMenu.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showProductList(category) {
  productCategories.classList.add("opacity-0");

  basicPartsList.classList.add("hidden");
  emptyCategoryMessage.classList.add("hidden");

  setTimeout(() => {
    productCategories.classList.add("hidden");
    subcategoryView.classList.remove("hidden");

    subcategoryTitle.textContent = categoryTitles[category] || "პროდუქტები";
    subcategoryTitle.classList.remove("text-gray-800");
    subcategoryTitle.classList.add("text-primary-red");

    if (category === "basic") {
      basicPartsList.classList.remove("hidden");
    } else {
      emptyCategoryMessage.classList.remove("hidden");
    }

    setTimeout(() => {
      subcategoryView.classList.add("opacity-100");
    }, 10);
  }, 300);
}

function showCategories() {
  productDetailSection.classList.add("hidden");
  subcategoryView.classList.add("opacity-0");

  subcategoryTitle.classList.remove("text-primary-red");
  subcategoryTitle.classList.add("text-gray-800");

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
  const product = productData[productId];

  if (!product) {
    console.error("პროდუქტი ვერ მოიძებნა:", productId);
    return;
  }

  // Update content
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-price").textContent = `${product.price}₾`;

  const descList = document.getElementById("detail-description-list");
  descList.innerHTML = "";
  product.description.forEach((desc) => {
    const li = document.createElement("li");
    li.textContent = desc;
    descList.appendChild(li);
  });

  // Hide list and show details
  document.getElementById("products").classList.add("hidden");
  productDetailSection.classList.remove("hidden");
  productDetailSection.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Main Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {
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
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // 4. ნავიგაციის ლინკებზე დაწკაპუნების მოსმენა
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (link.dataset.page === "products") {
        showCategories();
        productDetailSection.classList.add("hidden");
      }

      const page = link.dataset.page;
      if (page) {
        showPage(page);
      }
    });
  });

  // 5. "პროდუქტების ნახვა" ღილაკზე დაჭერით გადართვა
  if (viewProductsButton) {
    viewProductsButton.addEventListener("click", () => {
      showCategories();
      showPage("products");
    });
  }

  // 6. კატეგორიის ღილაკებზე დაჭერა
  subcategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      showProductList(category);
    });
  });

  // 7. უკან კატეგორიებში ღილაკი
  backToCategoriesButton.addEventListener("click", showCategories);

  // 8. პროდუქტის ბარათზე დაჭერა (დეტალების სანახავად)
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.productId;
      showProductDetail(productId);
    });
  });

  // 9. უკან პროდუქტების სიაში ღილაკი
  backToListButton.addEventListener("click", () => {
    productDetailSection.classList.add("hidden");
    showPage("products");
    showProductList("basic");
  });

  // 10. ლოგოზე დაჭერა მთავარ გვერდზე დასაბრუნებლად
  document.getElementById("logo-link").addEventListener("click", () => {
    showPage("home");
  });

  // 11. საკონტაქტო ღილაკზე დაჭერა (მოდელის გასახსნელად)
  contactToOrderButton.addEventListener("click", () => {
    showModal("contact-modal");
  });

  // 12. მოდელის დახურვა
  closeModalButton.addEventListener("click", () => {
    closeModal("contact-modal");
  });

  // 13. ასევე, თუ დააწკაპუნებენ მოდელის ფონზე
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      closeModal("contact-modal");
    }
  });

  // გვერდის ჩატვირთვისას ნაგულისხმევი გვერდის გამოჩენა
  showPage("home");
});
