const totalImages = 15;
let currentIndex = 0; // 選中的是第幾張圖（0-based）

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function getCarouselImages(currentIndex) {
  const images = [];
  for (let i = -4; i <= 4; i++) {
    let index = (currentIndex + i + totalImages) % totalImages;
    images.push(index + 1); // 圖片是 1~15
  }
  return images;
}

function renderCarousel() {
  const images = getCarouselImages(currentIndex);
  carousel.innerHTML = ""; // 清空現有內容

  images.forEach((imgNum, i) => {
    const div = document.createElement("img");
    div.src = "/img/test.jpg";
    div.classList.add("carousel-item");
    if (i === 4) div.classList.add("active"); // 中央那張圖
    div.textContent = imgNum;
    carousel.appendChild(div);
  });
}

function handleScroll(e) {
  e.preventDefault();

  if (e.deltaY > 0) {
    // 往下滾視為下一張
    currentIndex = (currentIndex + 1) % totalImages;
  } else {
    // 往上滾視為上一張
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  }

  renderCarousel();
}

// 綁定滾輪事件（只在 carousel 上觸發）
document.body.addEventListener("wheel", handleScroll, { passive: false });

renderCarousel();
