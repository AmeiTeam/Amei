/*--------------------
Vars
--------------------*/
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

/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
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
const centerItemIndex = 2; // 第 3 個（index 從 0 開始）
const initialOffset =
  (scrollWidth - itemWidth) / 2 - centerItemIndex * itemWidth;
dispose(initialOffset);
scrollY = initialOffset;
y = initialOffset;

/*--------------------
Wheel
--------------------*/

const vw = window.innerWidth;
const fullCalc = vw / 10 + 40;
const scrollAmount = fullCalc;
let lastScrollTime = 0;
const throttleDelay = 100;

const handleMouseWheel = (e) => {
  const now = Date.now();
  if (now - lastScrollTime < throttleDelay) return;

  lastScrollTime = now;

  const direction = e.deltaY > 0 ? 1 : -1;
  const fixedDelta = direction * 100;

  scrollY -= (fixedDelta * scrollAmount) / 100;
  detectCenterAfterScroll();
};

/*--------------------
Touch
--------------------*/
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

/*--------------------
Listeners
--------------------*/
window.addEventListener("mousewheel", handleMouseWheel);

$scroll.addEventListener("touchstart", handleTouchStart);
$scroll.addEventListener("touchmove", handleTouchMove);
$scroll.addEventListener("touchend", handleTouchEnd);

$scroll.addEventListener("selectstart", () => {
  return false;
});

/*--------------------
Resize
--------------------*/
window.addEventListener("resize", () => {
  scrollWidth = $scroll.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

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
const rightImg = document.getElementById("right-img");

const detectCenterAfterScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  let index = 0;

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
    rightImg.src = `img/slider/slider${index}.jpg`;
  }, 500);
};
detectCenterAfterScroll();

/*--------------------
Render
--------------------*/
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
      // filter: "blur(4px)",
      pointerEvents: "none",
      position: "absolute",
      left: `${offsetLeft}px`,
      top: `${offsetTop}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      // zIndex: 0,
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

    const offsetFactor = Math.sin(i * 1.2 + y * 0.8 + Math.random() * 0.1);
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
