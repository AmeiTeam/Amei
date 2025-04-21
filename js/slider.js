const totalImages = 15;
let currentIndex = 0;

const carousel = document.getElementById("carousel");
let isAnimating = false;

function getCarouselImages(currentIndex) {
  const images = [];
  for (let i = -5; i <= 5; i++) {
    let index = (currentIndex + i + totalImages) % totalImages;
    images.push(index + 1); // image number from 1 ~ 15
  }
  return images;
}

function updateCarousel(direction) {
  const images = getCarouselImages(currentIndex);
  carousel.innerHTML = "";

  images.forEach((imgNum, i) => {
    // Create the structure <div><span><img></span></div>
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");

    img.src = "/img/test.jpg";
    img.alt = "Image " + imgNum;
    div.classList.add("carousel-item");

    // Append img inside span, and span inside div
    div.appendChild(span);
    span.innerText = "Bombardiro Crocodillo ";
    div.appendChild(img);

    // Apply classes and styles as before
    if (i === 5) {
      div.classList.add("active");
      span.classList.add("active");
      setTimeout(() => {
        img.style.transform = "scale(1.25)";
        span.style.top = "-25%";
      }, 10);
    }

    if (direction > 0) {
      if (i === 4) {
        img.classList.add("prev");
        img.style.transform = "scale(1.25)";
        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 5);
      }
      if (i === 6) {
        img.classList.add("next");
        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 5);
      }
    }

    if (direction < 0) {
      if (i === 6) {
        img.classList.add("prev");
        img.style.transform = "scale(1.25)";
        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 5);
      }
      if (i === 4) {
        img.classList.add("next");
        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 5);
      }
    }

    // Append the div (which contains span and img) to the carousel
    carousel.appendChild(div);
  });
}

function renderCarousel(direction = 0) {
  if (isAnimating) return;
  isAnimating = true;

  const moveX = direction > 0 ? -220 : direction < 0 ? 220 : 0;

  // 1. 先更新圖片內容（讓下一張 active）
  updateCarousel(direction);

  // 2. 先把 carousel 移到「滑動開始的起點」
  carousel.style.transition = "none";
  carousel.style.transform = `translate(-50%, -50%) translateX(${-moveX}px)`;

  // 3. 等下一幀（下一輪繪圖）再執行動畫
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      carousel.style.transition = "transform 0.5s ease";
      carousel.style.transform = `translate(-50%, -50%) translateX(0)`;
    });
  });

  // 4. 結束動畫後解鎖
  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

let scrollTimeout = null;

function handleScroll(e) {
  if (isAnimating || scrollTimeout) {
    e.preventDefault();
    return;
  }

  e.preventDefault();
  const direction = e.deltaY > 0 ? 1 : -1;
  currentIndex = (currentIndex + direction + totalImages) % totalImages;
  renderCarousel(direction);

  scrollTimeout = setTimeout(() => {
    scrollTimeout = null;
  }, 500); // 和動畫時間一致
}

document.body.addEventListener("wheel", handleScroll, { passive: false });

// 初始化
renderCarousel();
