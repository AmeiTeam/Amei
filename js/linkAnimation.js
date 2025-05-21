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
    //#region in homepage
    if (
      (homepage.style.transform == "" ||
        homepage.style.transform == "translateY(0px)") &&
      clickedId != "homeLink"
    ) {
      line1.style.top = "-100vh";
      setTimeout(() => {
        document.querySelector(".left").style.transform = "translateY(-100vh)";
      }, 150);
      setTimeout(() => {
        line2.style.top = "-100vh";
      }, 300);
      setTimeout(() => {
        document.querySelector(".slider-container").style.transform =
          "translateY(-100vh)";
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
    //#endregion
    //#region in contactpage
    else if (
      contactpage.style.transform == "translateY(0px)" &&
      clickedId != "contactLink"
    ) {
      line1.style.top = "-100vh";
      setTimeout(() => {
        line2.style.top = "-100vh";
      }, 300);
      setTimeout(() => {
        contactpage.style.transform = "translateY(calc(-100vh - 1080px))";
      }, 450);
      setTimeout(() => {
        line3.style.top = "-100vh";
      }, 600);
      setTimeout(() => {
        document.querySelector(
          ".contactpage .cards"
        ).style.top = `${window.innerHeight}px`;
        document.querySelector(".contactpage .cards").style.display = "none";
        document.querySelector("#contact-background").style.top = "0px";
      }, 1200);
    }
    //#endregion
    //#region in musicpage
    else if (
      musicpage.style.transform == "translateY(0px)" &&
      clickedId != "musicLink"
    ) {
      line1.style.top = "-100vh";
      setTimeout(() => {
        line2.style.top = "-100vh";
        musicpage.style.transform = "translateY(-100vh)";
      }, 300);
      setTimeout(() => {
        line3.style.top = "-100vh";
      }, 600);
    }
    //#endregion
    //#region in listeningpage
    else if (
      listeningpage.style.transform == "translateY(0px)" &&
      clickedId != "listeningLink"
    ) {
      line1.style.top = "-100vh";
      setTimeout(() => {
        line2.style.top = "-100vh";
        listeningpage.style.transform = "translateY(-100vh)";
      }, 300);
      setTimeout(() => {
        line3.style.top = "-100vh";
      }, 600);
    }
    //#endregion
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
        //#region to homepage
        case "homeLink":
          homepage.style.transform = "translateY(0)";
          line1.style.top = "0";
          setTimeout(() => {
            document.querySelector(".left").style.transform = "translateY(0)";
          }, 150);
          setTimeout(() => {
            line2.style.top = "0";
          }, 300);
          setTimeout(() => {
            document.querySelector(".slider-container").style.transform =
              "translateY(0)";
            document.querySelector(".launch").style.transform = "translateY(0)";
            document.querySelector(".status").style.transform = "translateY(0)";
          }, 450);
          setTimeout(() => {
            line3.style.top = "0";
          }, 600);
          setTimeout(() => {
            document.querySelector(".right").style.transform = "translateY(0)";
          }, 750);
          break;
        //#endregion
        //#region to contactpage
        case "contactLink":
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
          setTimeout(() => {
            document.querySelector(".contactpage .cards").style.display =
              "block";
          }, 1500);
          break;
        //#endregion
        //#region to musicpage
        case "musicLink":
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
        //#endregion
        //#region to listeningpage
        case "listeningLink":
          line1.style.top = "0";
          setTimeout(() => {
            line2.style.top = "0";
          }, 300);
          setTimeout(() => {
            listeningpage.style.transform = "translateY(0)";
          }, 500);
          setTimeout(() => {
            line3.style.top = "0";
          }, 600);
          break;
        //#endregion
      }
    }, 1800);
  }
});
