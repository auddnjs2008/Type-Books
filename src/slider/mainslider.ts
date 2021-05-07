import { SliderComponent } from "./slider.js";

export class MainSlider extends SliderComponent {
  private sliderIndexWindow = document.querySelector(
    ".slider1__page"
  ) as HTMLElement;
  constructor() {
    super(document.querySelector(".slider1") as HTMLElement, 8);
    this.highlight();
    setInterval(() => {
      this.rightMove();
    }, 5000);
    this.leftMoveWay = this.leftMove;
    this.rightMoveWay = this.rightMove;
    window.addEventListener("resize", () => {
      this.sliderItemClientRect = this.sliderBox.firstElementChild!.getBoundingClientRect();
      this.sliderBox.style.transform = `translateX(${
        -1 *
        Math.floor(
          this.sliderItemClientRect.width + this.sliderItemMarginRight
        ) *
        (this.sliderNumber - 1)
      }px)`;
    });
  }

  upgradeIndexWindow = () => {
    const index =
      this.sliderNumber <= this.bookNumber
        ? this.sliderNumber
        : this.sliderNumber - this.bookNumber;
    this.sliderIndexWindow.textContent = `${index}/${this.bookNumber}`;
  };

  highlightClear = () => {
    const target = this.sliderBox.querySelectorAll("li")[this.sliderNumber];
    const img = target.querySelector("img") as HTMLElement;
    target.style.transform = "scale(1)";
    img.style.filter = "brightness(0.4)";
  };
  highlight = () => {
    const target = this.sliderBox.querySelectorAll("li")[this.sliderNumber];
    const img = target.querySelector("img") as HTMLElement;
    target.style.transform = "scale(1.05)";
    img.style.filter = "brightness(1)";
  };

  leftMove = () => {
    this.highlightClear();
    this.sliderNumber -= 1;
    if (this.sliderNumber === 0) {
      this.sliderNumber = this.bookNumber;
      this.sliderBox.style.transform = `translateX(-${
        Math.floor(
          this.sliderItemClientRect.width + this.sliderItemMarginRight
        ) *
        (this.bookNumber - 1)
      }px)`;
      this.sliderBox.style.transition = "unset";
      this.highlight();
      this.upgradeIndexWindow();
      return;
    }
    const movePx = Math.floor(this.sliderItemClientRect.width);
    const originTrans = this.sliderBox.style.transform
      ? Number(this.sliderBox.style.transform.split("X")[1].slice(1, -3))
      : 0;
    this.sliderBox.style.transform = ` translateX(${
      originTrans + movePx + this.sliderItemMarginRight
    }px)`;
    this.sliderBox.style.transition = `transform 100ms linear `;
    this.upgradeIndexWindow();
    this.highlight();
  };

  rightMove = () => {
    this.highlightClear();
    this.sliderNumber += 1;

    if (this.sliderNumber === this.bookNumber * 2 - 1) {
      this.sliderNumber = this.bookNumber;
      this.sliderBox.style.transform = `translateX(-${
        Math.floor(
          this.sliderItemClientRect.width + this.sliderItemMarginRight
        ) *
        (this.bookNumber - 1)
      }px)`;
      this.sliderBox.style.transition = "unset";
      this.highlight();
      this.upgradeIndexWindow();

      return;
    }
    const movePx = Math.floor(this.sliderItemClientRect.width);
    const originTrans = this.sliderBox.style.transform
      ? Number(this.sliderBox.style.transform.split("X")[1].slice(1, -3))
      : 0;
    this.sliderBox.style.transform = ` translateX(${
      originTrans - movePx - this.sliderItemMarginRight
    }px)`;
    this.sliderBox.style.transition = `transform 100ms linear `;
    this.highlight();
    this.upgradeIndexWindow();
  };
}
