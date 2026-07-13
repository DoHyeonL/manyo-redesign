// 링크·이미지 드래그 방지
document.addEventListener("dragstart", (e) => e.preventDefault());

// 이벤트 배너가 화면 위로 사라지면 헤더 흰색으로 전환
const header = document.getElementById("header");
const eventBanner = document.querySelector(".event-banner");

window.addEventListener("scroll", function () {
  if (eventBanner.getBoundingClientRect().bottom <= 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 햄버거 메뉴
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");

// 열고닫을때만 애니메이션 클래스 잠깐 붙였다 뗌
// 화면 크기 바뀌면서 저절로 움직일땐 애니메이션 없이 바로 이동시키려고 이렇게함
let animateTimer;
function animateNavMenu() {
  navMenu.classList.add("animating");
  clearTimeout(animateTimer);
  animateTimer = setTimeout(function () {
    navMenu.classList.remove("animating");
  }, 350);
}

function closeMobileMenu() {
  animateNavMenu();
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("open");
  navOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.contains("open");
  if (isOpen) {
    closeMobileMenu();
  } else {
    animateNavMenu();
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("open");
    navOverlay.classList.add("open");
    document.body.classList.add("no-scroll");
  }
});

navOverlay.addEventListener("click", closeMobileMenu);

// 모바일에서 SHOP같은거 누르면 하위메뉴 아코디언처럼 펼쳐짐
document.querySelectorAll(".nav-item").forEach((item) => {
  const trigger = item.querySelector("a");
  const dropdown = item.querySelector(".dropdown");

  if (!dropdown) return;

  trigger.addEventListener("click", function (e) {
    if (window.innerWidth > 768) return; // pc는 그냥 호버로 열리니까 여기서 return

    e.preventDefault();
    item.classList.toggle("open");
  });
});

// 화면 넓어지면 메뉴 상태 초기화
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// esc 누르면 메뉴 닫힘
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

// 제품 데이터
const products = [
  {
    name: "[2종세트]퓨어 소이빈 클렌징 오일 200ml+클렌징 워터 500ml",
    discount: "25%",
    price: "39,900원",
    originalPrice: "53,200원",
    img: "images/product1.png",
  },
  {
    name: "딥 포어 클렌징 소다폼<br>150ml",
    discount: "20%",
    price: "16,000원",
    originalPrice: "20,000원",
    img: "images/product2.png",
  },
  {
    name: "글루타치온7  다크스팟 세럼<br>30ml",
    discount: "20%",
    price: "22,400원",
    originalPrice: "28,000원",
    img: "images/product3.png",
  },
  {
    name: "마이크로 히알루로닉 에센스 마스크<br>7매",
    discount: "40%",
    price: "16,800원",
    originalPrice: "28,000원",
    img: "images/product4.png",
  },
  {
    name: "비피다 바이옴 앰플 로션<br>300ml",
    discount: "20%",
    price: "20,000원",
    originalPrice: "25,000원",
    img: "images/product5.png",
  },
  {
    name: "퓨어 소이빈 클렌징 폼<br>160ml",
    discount: "10%",
    price: "12,960원",
    originalPrice: "14,400원",
    img: "images/product6.png",
  },
  {
    name: "판테토인 에센스 토너<br>200ml",
    discount: "20%",
    price: "25,600원",
    originalPrice: "32,000원",
    img: "images/product7.png",
  },
];


const loopProducts = products.concat(products).concat(products);

const grid = document.getElementById("productGrid");
grid.innerHTML = loopProducts
  .map(
    (product) => `
  <a href="javascript:void(0)" class="swiper-slide product-card">
    <div class="product-img-wrap">
      <img src="${product.img}" alt="${product.name.replace(/<br\s*\/?>/gi, " ")}" loading="lazy" draggable="false">
    </div>
    <div class="product-info">
      <p class="product-name">${product.name}</p>
      <div class="product-price-wrap">
        <p class="discount-rate">${product.discount}</p>
        <p class="current-price">${product.price}</p>
        <p class="original-price">${product.originalPrice}</p>
      </div>
    </div>
  </a>
`,
  )
  .join("");

// 슬라이더 초기화
const swiper = new Swiper(".product-swiper", {
  slidesPerView: 4,
  grabCursor: true,
  loop: true,
  autoplay: { delay: 2000 },
  breakpoints: {
    0: { slidesPerView: 2, spaceBetween: 8 },
    768: { slidesPerView: 3, spaceBetween: 14 },
    1024: { slidesPerView: 4, spaceBetween: 34 },
  },
});

// 진행 바
const progressBar = document.querySelector(".swiper-progress-bar");
const totalSlides = products.length;

// 초기 진행 바 세팅 (첫 슬라이드)
progressBar.style.width = (1 / totalSlides) * 100 + "%";

swiper.on("slideChange", function () {
  const realIndex = swiper.realIndex % totalSlides;

  if (realIndex === 0) {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    progressBar.offsetHeight;
    progressBar.style.transition = "width 0.4s ease";
  }

  progressBar.style.width = ((realIndex + 1) / totalSlides) * 100 + "%";
});

// 추천 제품 데이터
const recommendedProducts = [
  /* MD 제품 리스트*/
  {
    name: "비피다 바이옴 앰플 마스크<br>5매",
    category: "md",
    discount: "20%",
    price: "28,800원",
    originalPrice: "36,000원",
    img: "images/md_product1.png",
  },
  {
    name: "갈릭 나이아신 에센스 마스크<br>5매",
    category: "md",
    discount: "20%",
    price: "12,000원",
    originalPrice: "15,000원",
    img: "images/md_product2.png",
  },
  {
    name: "딥 클리어 클렌징 밤<br> 132ml",
    category: "md",
    discount: "20%",
    price: "19,200원",
    originalPrice: "24,000원",
    img: "images/md_product3.png",
  },
  {
    name: "퓨어 소이빈 클렌징 워터<br>500ml",
    category: "md",
    discount: "20%",
    price: "22,560원",
    originalPrice: "28,200원",
    img: "images/md_product4.png",
  },
  {
    name: "히알루론 하이드레이팅 선스틱<br>18g",
    category: "md",
    discount: "20%",
    price: "20,800원",
    originalPrice: "26,000원",
    img: "images/md_product5.png",
  },
  {
    name: "퓨어 소이빈 클렌징 오일<br>200ml",
    category: "md",
    discount: "20%",
    price: "20,000원",
    originalPrice: "25,000원",
    img: "images/md_product6.png",
  },

  /* 프로모션 제품 리스트 */
  {
    name: "딥 포어 클렌징 소다폼<br>150ml",
    category: "promotion",
    discount: "40%",
    price: "12,000원",
    originalPrice: "20,000원",
    img: "images/promotion_product1.png",
  },
  {
    name: "마이크로 히알루토닉 에센스<br>50ml",
    category: "promotion",
    discount: "20%",
    price: "25,600원",
    originalPrice: "32,000원",
    img: "images/promotion_product2.png",
  },
  {
    name: "바닐라부티크 허그 퍼퓸 바디로션<br>150ml",
    category: "promotion",
    discount: "20%",
    price: "16,000원",
    originalPrice: "20,000원",
    img: "images/promotion_product3.png",
  },
  {
    name: "로터스 포어 타이트핏 마스크<br>5매",
    category: "promotion",
    discount: "20%",
    price: "16,000원",
    originalPrice: "20,000원",
    img: "images/promotion_product4.png",
  },

  /* set 제품 리스트 */
  {
    name: "퓨어 소이빈 클렌징 밀크 200mlX2<br>더블세트(+증정)",
    category: "set",
    discount: "33%",
    price: "28,000원",
    originalPrice: "42,000원",
    img: "images/set_product1.png",
  },
  {
    name: "글루타치온7 다크스팟 토너&패치 세트<br>(+증정)",
    category: "set",
    discount: "20%",
    price: "37,500원",
    originalPrice: "47,000원",
    img: "images/set_product2.png",
  },
  {
    name: "글루타치온7 다크스팟 토너&세럼 세트<br>(+증정)",
    category: "set",
    discount: "20%",
    price: "41,000원",
    originalPrice: "51,000원",
    img: "images/set_product3.png",
  },
  {
    name: "퓨어 소이빈 클렌징 폼 160mlX2<br>더블세트(+증정)",
    category: "set",
    discount: "21%",
    price: "22,800원",
    originalPrice: "28,800원",
    img: "images/set_product4.png",
  },
  {
    name: "퓨어 소이빈 클렌징 오일 200mlX2<br>더블세트(+증정)",
    category: "set",
    discount: "32%",
    price: "34,000원",
    originalPrice: "50,000원",
    img: "images/set_product5.png",
  },
];

const recGrid = document.getElementById("recommendedGrid");

function renderProducts(list) {
  recGrid.innerHTML = list
    .map(
      (product) => `
    <a href="javascript:void(0)" class="product-card">
      <div class="product-img-wrap">
        <img src="${product.img}" alt="${product.name.replace(/<br\s*\/?>/gi, " ")}" loading="lazy" draggable="false">
      </div>
      <div class="product-info">
        <p class="product-name">${product.name}</p>
        <div class="product-price-wrap">
          <p class="discount-rate">${product.discount}</p>
          <p class="current-price">${product.price}</p>
          <p class="original-price">${product.originalPrice}</p>
        </div>
      </div>
    </a>
  `,
    )
    .join("");
}

renderProducts(recommendedProducts.filter((p) => p.category === "md"));

document.querySelectorAll(".filter-buttons button").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-buttons button").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");
    const category = this.dataset.category;
    const filtered = recommendedProducts.filter((p) => p.category === category);
    renderProducts(filtered);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => observer.observe(el));
