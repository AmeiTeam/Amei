const homepage = document.querySelector(".homepage");
const contactpage = document.querySelector(".contactpage");
const musicpage = document.querySelector(".musicpage");
const listeningpage = document.querySelector(".listeningpage");
const homeLink = document.querySelector("#homeLink");
const contactLink = document.querySelector("#contactLink");
const musicLink = document.querySelector("#musicLink");
const listeningLink = document.querySelector("#listeningLink");
const linkul = document.querySelector("#linkul");
const line1 = document.querySelector("#line1");
const line2 = document.querySelector("#line2");
const line3 = document.querySelector("#line3");

linkul.addEventListener("click", function (event) {
  const clickedId = event.target.id;

  if (clickedId != "") {
    // in homepage
    if (homepage.style.transform == "" && clickedId != "homeLink") {
      line1.style.top = "-100vh";
      document.body.removeEventListener("wheel", window.handleScroll, {
        passive: false,
      });
      setTimeout(() => {
        document.querySelector(".left").style.transform = "translateY(-100vh)";
      }, 150);
      setTimeout(() => {
        line2.style.top = "-100vh";
      }, 300);
      setTimeout(() => {
        document.querySelector(".slider-container").style.transform = `${
          window.getComputedStyle(document.querySelector(".slider-container"))
            .transform
        } translateY(-100vh)`;
        document.querySelector(".launch").style.transform =
          "translateY(-100vh)";
        document.querySelector(".status").style.transform =
          "translateY(-100vh)";
      }, 450);
      setTimeout(() => {
        line3.style.top = "-100vh";
      }, 600);
      setTimeout(() => {
        document.querySelector(".right").style.transform = "translateY(-100vh)";
      }, 750);
      setTimeout(() => {
        homepage.style.transform = "translateY(-100vh)";
      }, 1750);
    }
    // in contactpage
    else if (
      contactpage.style.transform == "translateY(0)" &&
      clickedId != "contactLink"
    ) {
      console.log("contactpage");
      line1.style.top = "-100vh";
    }
    // in musicpage
    else if (
      musicpage.style.transform == "translateY(0)" &&
      clickedId != "musicLink"
    ) {
      console.log("musicpage");
      line1.style.top = "-100vh";
    }
    // in listeningpage
    else if (
      listeningpage.style.transform == "translateY(0)" &&
      clickedId != "listeningLink"
    ) {
      console.log("listeningpage");
      line1.style.top = "-100vh";
    }
  }

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
    setTimeout(() => {
      switch (clickedId) {
        // to homepage
        case "homeLink":
          console.log("Home link clicked!");
          document.body.addEventListener("wheel", window.handleScroll, {
            passive: false,
          });
          break;
        // to contactpage
        case "contactLink":
          console.log("Contact link clicked!");
          line1.style.top = "0";
          setTimeout(() => {
            line2.style.top = "0";
          }, 300);
          setTimeout(() => {
            contactpage.style.transform = "translateY(0)";
          }, 500);
          setTimeout(() => {
            line3.style.top = "0";
          }, 600);
          break;
        // to musicpage
        case "musicLink":
          console.log("Music link clicked!");
          line1.style.top = "0";
          setTimeout(() => {
            line2.style.top = "0";
          }, 300);
          setTimeout(() => {
            musicpage.style.transform = "translateY(0)";
          }, 500);
          setTimeout(() => {
            line3.style.top = "0";
          }, 600);
          break;
        // to listeningpage
        case "listeningLink":
          console.log("Listening link clicked!");
          line1.style.top = "0";
          setTimeout(() => {
            line2.style.top = "0";
          }, 300);
          setTimeout(() => {
            listeningLink.style.transform = "translateY(0)";
          }, 500);
          setTimeout(() => {
            line3.style.top = "0";
          }, 600);
          break;
      }
    }, 1800);
  }
});
