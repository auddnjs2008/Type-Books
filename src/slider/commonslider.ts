import { SliderComponent } from "./slider.js";

export class CommonSlider extends SliderComponent {
  private listItemMarginRight: number = 20;
  private scrollWidth: number = this.sliderBox.scrollWidth;
  private clientWidth: number =
    this.sliderBox.clientWidth + this.listItemMarginRight;
  constructor(sliderBox: HTMLElement, bookNumber: number) {
    super(sliderBox, bookNumber);
    this.rightMoveWay = this.rightMove;
    this.leftMoveWay = this.leftMove;
  }

  speeder = (where: string) => {
    let howpx: number = 0; // 얼마나 뺐는지 더했는지 알려준다.
    if (where === "left") {
      const speeder = setInterval(() => {
        howpx += this.clientWidth / 10;
        this.sliderBox.scrollLeft -= this.clientWidth / 10;
        if (howpx + 10 >= this.clientWidth) {
          howpx = 0;
          clearInterval(speeder);
          return;
        }
      }, 10);
    } else if (where === "right") {
      const speeder = setInterval(() => {
        howpx += this.clientWidth / 10;
        this.sliderBox.scrollLeft += this.clientWidth / 10;
        if (howpx + 10 >= this.clientWidth) {
          howpx = 0;
          clearInterval(speeder);
          return;
        }
      }, 10);
    }
  };

  leftMove = () => {
    const scrollLeft: number = this.sliderBox.scrollLeft;
    if (scrollLeft !== 0) {
      this.speeder("left");
    } else {
      this.sliderBox.scrollLeft = this.scrollWidth - this.clientWidth;
    }
  };

  rightMove = () => {
    const scrollLeft: number = this.sliderBox.scrollLeft;
    if (scrollLeft + 10 >= this.scrollWidth - this.clientWidth) {
      this.sliderBox.scrollLeft = 0;
    } else {
      this.speeder("right");
    }
  };
}
