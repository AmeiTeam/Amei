//#region const
const $scroll = document.querySelector(".scroll");
const $items = document.querySelectorAll(".scroll-item");
const $images = document.querySelectorAll(".scroll-item img");
let scrollWidth = $scroll.clientWidth;
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;
//#endregion

//#region lerp
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};
//#endregion

//#region dispose
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll;
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(
          -itemWidth,
          wrapWidth - itemWidth,
          parseInt(x)
        );
        return `${s}px`;
      },
    },
  });
};
const centerItemIndex = 2;
const initialOffset =
  (scrollWidth - itemWidth) / 2 - centerItemIndex * itemWidth;
dispose(initialOffset);
scrollY = initialOffset;
y = initialOffset;
//#endregion

//#region wheel
const vw = window.innerWidth;
const fullCalc = vw / 10 + 40;
const scrollAmount = fullCalc;
let lastScrollTime = 0;
const throttleDelay = 100;
document.querySelector(".homepage .block").style.transform = 0;

const handleMouseWheel = (e) => {
  const now = Date.now();
  if (now - lastScrollTime < throttleDelay) return;

  lastScrollTime = now;

  const direction = e.deltaY > 0 ? 1 : -1;
  const fixedDelta = direction * 100;
  const currentTransform =
    document.querySelector(".homepage .block").style.transform;

  const match = currentTransform.match(/rotate\((\d+)deg\)/);
  let currentAngle = match ? parseInt(match[1]) : 0;

  if (direction == 1) {
    document.querySelector(".homepage .block").style.transform = `rotate(${
      currentAngle + 180
    }deg)`;
  } else {
    document.querySelector(".homepage .block").style.transform = `rotate(${
      currentAngle - 180
    }deg)`;
  }

  scrollY -= (fixedDelta * scrollAmount) / 100;
  detectCenterAfterScroll();
  startScrambling(title, intro);
};
//#endregion

//#region touch
let touchStart = 0;
let touchX = 0;
let isDragging = false;
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  $scroll.classList.add("is-dragging");
};
const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
const handleTouchEnd = () => {
  isDragging = false;
  $scroll.classList.remove("is-dragging");
};
//#endregion

//#region listeners
window.addEventListener("mousewheel", handleMouseWheel);

$scroll.addEventListener("touchstart", handleTouchStart);
$scroll.addEventListener("touchmove", handleTouchMove);
$scroll.addEventListener("touchend", handleTouchEnd);

$scroll.addEventListener("selectstart", () => {
  return false;
});
//#endregion

//#region resize
window.addEventListener("resize", () => {
  scrollWidth = $scroll.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});
//#endregion

//#region getCenter
const getCenteredItem = () => {
  const screenCenter = window.innerWidth / 2;
  let closestItem = null;
  let closestDistance = Infinity;
  let centeredIndex = -1;

  $items.forEach(($item, index) => {
    const rect = $item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = Math.abs(itemCenter - screenCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = $item;
      centeredIndex = index;
    }
  });

  return { item: closestItem, index: centeredIndex };
};

let scrollTimeout = null;
const title = document.getElementById("title");
const intro = document.getElementById("intro");
const rightImg = document.getElementById("right-img");
const launchSpan = document.getElementById("launch-span");
const statusSpan = document.getElementById("status-span");
const statusDot = document.getElementById("status-dot");

const detectCenterAfterScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  let index = 0;
  const introText =
    "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal. <br class='br'> No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation.";

  scrollTimeout = setTimeout(() => {
    const centered = getCenteredItem();
    if (centered.index - 2 == 0) {
      index = 1;
    } else if (centered.index - 2 == -1) {
      index = 15;
    } else if (centered.index - 2 == -2) {
      index = 14;
    } else index = centered.index - 1;
    title.innerText = `Testing ${index}`;
    intro.innerHTML = introText;
    rightImg.src = imgData[index - 1].src;
    launchSpan.innerText = imgData[index - 1].launch;
    stopScrambling();
    switch (imgData[index - 1].status) {
      case 1:
        statusSpan.innerText = "opening";
        statusDot.src = "/img/green_dot.svg";
        break;
      case 2:
        statusSpan.innerText = "closed";
        statusDot.src = "/img/red_dot.svg";
        break;
      case 3:
        statusSpan.innerText = "error404";
        statusDot.src = "/img/yellow_dot.svg";
        break;
    }
  }, 500);
};
detectCenterAfterScroll();
//#endregion

//#region trail
let frameCount = 0;

const createTrail = () => {
  $items.forEach(($item) => {
    const rect = $item.getBoundingClientRect();
    const clone = $item.cloneNode(true);
    clone.classList.add("trail");

    $scroll.appendChild(clone);

    const scrollRect = $scroll.getBoundingClientRect();
    const offsetLeft = rect.left - scrollRect.left;
    const offsetTop = rect.top - scrollRect.top;

    gsap.set(clone, {
      x: 0,
      y: 0,
      opacity: 0.3,
      pointerEvents: "none",
      position: "absolute",
      left: `${offsetLeft}px`,
      top: `${offsetTop}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    gsap.to(clone, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        clone.remove();
      },
    });
  });
};
//#endregion

//#region render
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  frameCount++;
  if (Math.abs(scrollSpeed) > 1 && frameCount % 3 === 0) {
    createTrail();
  }

  $items.forEach(($item, i) => {
    const rect = $item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;
    const distToCenter = Math.abs(screenCenter - itemCenter);

    const opacityVal = 1 - Math.min(0.4, Math.abs(scrollSpeed) / 100);

    const scaleVal = distToCenter < itemWidth / 2 ? 1.25 : 1;

    gsap.to($item, {
      opacity: opacityVal,
      scale: scaleVal,
      ease: "power2.out",
      duration: 0.3,
    });
  });
};
render();
//#endregion

//#region imgData
const imgData = [
  { src: "/img/slider/slider1.jpg", status: 2, launch: "2025/03/15" },
  { src: "/img/slider/slider2.jpg", status: 1, launch: "2025/06/10" },
  { src: "/img/slider/slider3.jpg", status: 3, launch: "2025/09/25" },
  { src: "/img/slider/slider4.jpg", status: 1, launch: "2025/01/05" },
  { src: "/img/slider/slider5.jpg", status: 2, launch: "2025/04/20" },
  { src: "/img/slider/slider6.jpg", status: 3, launch: "2025/07/30" },
  { src: "/img/slider/slider7.jpg", status: 1, launch: "2025/02/14" },
  { src: "/img/slider/slider8.jpg", status: 2, launch: "2025/05/18" },
  { src: "/img/slider/slider9.jpg", status: 3, launch: "2025/08/22" },
  { src: "/img/slider/slider10.jpg", status: 1, launch: "2025/11/11" },
  { src: "/img/slider/slider11.jpg", status: 2, launch: "2025/03/03" },
  { src: "/img/slider/slider12.jpg", status: 3, launch: "2025/06/06" },
  { src: "/img/slider/slider13.jpg", status: 1, launch: "2025/09/09" },
  { src: "/img/slider/slider14.jpg", status: 2, launch: "2025/12/12" },
  { src: "/img/slider/slider15.jpg", status: 3, launch: "2025/10/10" },
];
//#endregion

//#region randomChar
const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*() ";

let isScrambling = false;
let scrambleInterval = null;

function getRandomChar() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function startScrambling(title, intro) {
  const titleText = title.innerText;
  const introText = intro.innerText;
  if (isScrambling) return; // ✅ 已啟動就跳過
  isScrambling = true;

  scrambleInterval = setInterval(() => {
    let scrambled = "";
    for (let i = 0; i < titleText.length; i++) {
      const char = titleText[i];
      if (
        char === " " ||
        /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F]/.test(char)
      ) {
        scrambled += char;
      } else {
        scrambled += getRandomChar();
      }
    }
    title.textContent = scrambled;

    for (let i = 0; i < introText.length - 20; i++) {
      const char = introText[i];
      if (
        char === " " ||
        /[\u3000-\u303F\uFF00-\uFFEF\u2000-\u206F]/.test(char)
      ) {
        scrambled += char;
      } else {
        scrambled += getRandomChar();
      }
    }
    intro.textContent = scrambled;
  }, 50);
}

function stopScrambling() {
  clearInterval(scrambleInterval);
  scrambleInterval = null;
  isScrambling = false;
}
//#endregion
