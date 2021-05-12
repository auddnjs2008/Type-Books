import { afterSearchComponent } from "./search/afterSearch.js";
import { SearchComponent } from "./search/search.js";
import { CommonSlider } from "./slider/commonslider.js";
import { MainSlider } from "./slider/mainslider.js";

class App {
  private time = document.querySelector(".nowReading__time")
    ? document.querySelector(".nowReading__time")!.querySelector("span")
    : null;

  constructor() {
    const Search = new SearchComponent();
    if (window.location.href.includes("search")) {
      const SearchDraw = new afterSearchComponent();
    } else {
      const mainSlider = new MainSlider();
      const commonSlider = new CommonSlider(
        document.querySelector(".slider2")!,
        21
      );
      const commonSlider2 = new CommonSlider(
        document.querySelector(".slider3")!,
        15
      );
      mainSlider.eventListeners();
      commonSlider.eventListeners();
      commonSlider2.eventListeners();
      setInterval(() => {
        this.setClock();
      }, 1000);
    }
  }

  private setClock = () => {
    const DateList = new Date();
    const hour = DateList.getHours();
    const minute = DateList.getMinutes();
    this.time!.textContent = `${hour}시:${minute}분`;
  };
}

new App();
