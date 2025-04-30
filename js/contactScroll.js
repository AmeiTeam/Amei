gsap.registerPlugin(ScrollTrigger);

function setupParallax() {
  gsap.to("#contact-background", {
    y: "180vh",
    ease: "none",
    immediateRender: true,
    scrollTrigger: {
      trigger: ".contactpage",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
      scroller: "body", // 這樣會確保 ScrollTrigger 使用整個頁面的滾動
    },
  });

  gsap.utils.toArray(["#card1", "#card2", "#card3"]).forEach((card) => {
    gsap.to(card, {
      y: "-40vh",
      scrollTrigger: {
        trigger: ".contactpage",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });
  });
}

linkul.addEventListener("click", function (event) {
  const clickedId = event.target.id;

  if (clickedId != "") {
    const samePage =
      (clickedId == "homeLink" &&
        (homepage.style.transform == "" ||
          homepage.style.transform == "translateY(0px)")) ||
      (clickedId == "contactLink" &&
        contactpage.style.transform == "translateY(0px)") ||
      (clickedId == "musicLink" &&
        musicpage.style.transform == "translateY(0px)") ||
      (clickedId == "listeningLink" &&
        listeningpage.style.transform == "translateY(0px)");

    if (!samePage) {
      switch (clickedId) {
        case "contactLink":
          setTimeout(() => {
            ScrollTrigger.refresh();
            setupParallax();
          }, 3400);
          break;
      }
    }
  }
});
