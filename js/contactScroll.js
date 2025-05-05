const contactPage = document.querySelector(".contactpage");
const cards = document.querySelector(".contactpage .cards");
const contactBg = document.querySelector("#contact-background");

document.getElementById("card2").style.top = `calc(${
  window.innerWidth * 0.5 * (295 / 960)
}px )`;
document.getElementById("card3").style.top = `calc(${
  window.innerWidth * 0.5 * (295 / 960) + window.innerWidth * 0.25 * (573 / 480)
}px )`;

const cardsHeight =
  window.innerWidth * 0.5 * (295 / 960) +
  window.innerWidth * 0.25 * (573 / 480) +
  window.innerWidth * 0.5 * (335 / 960);

contactPage.addEventListener("wheel", function (e) {
  e.preventDefault();

  if (contactBg.style.top === "") {
    contactBg.style.top = "0px";
  }
  if (cards.style.top === "") {
    cards.style.top = "1080px";
  }

  let bgTop = parseInt(contactBg.style.top);
  let cardsTop = parseInt(cards.style.top);

  const bgMin = -(contactBg.offsetHeight - window.innerHeight);
  const bgMax = 0;

  const cardsMin = -cardsHeight;
  const cardsMax = window.innerHeight;

  if (e.deltaY > 0) {
    if (bgTop > bgMin) {
      contactBg.style.top = `${Math.max(bgTop - 12, bgMin)}px`;
    }
    if (cardsTop > cardsMin) {
      cards.style.top = `${Math.max(cardsTop - 200, cardsMin)}px`;
    }
  } else if (e.deltaY < 0) {
    if (bgTop < bgMax) {
      contactBg.style.top = `${Math.min(bgTop + 12, bgMax)}px`;
    }
    if (cardsTop < cardsMax) {
      cards.style.top = `${Math.min(cardsTop + 200, cardsMax)}px`;
    }
  }
});
