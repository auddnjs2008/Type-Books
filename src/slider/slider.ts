interface Slider {
  leftSlider: (event: Event) => void;
  rightSlider: (event: Event) => void;
  eventListeners: () => void;
}

export class SliderComponent implements Slider {
  protected sliderBox: HTMLElement;
  protected sliderController: NodeList;
  protected sliderNumber: number = 1;
  protected bookNumber: number;
  protected sliderItemClientRect;
  protected sliderItemMarginRight: number = 15;
  protected leftMoveWay: () => void = () => {};
  protected rightMoveWay: () => void = () => {};

  constructor(sliderBox: HTMLElement, bookNumber: number) {
    this.sliderBox = sliderBox.querySelector("ul") as HTMLUListElement;
    this.sliderController = sliderBox.querySelectorAll(".controller");
    this.sliderItemClientRect = this.sliderBox.firstElementChild!.getBoundingClientRect();

    this.bookNumber = bookNumber;
  }

  leftSlider = (event: Event) => {
    this.leftMoveWay();
  };

  rightSlider = (event: Event) => {
    this.rightMoveWay();
  };

  eventListeners = () => {
    this.sliderController[0].addEventListener("click", (e) =>
      this.leftSlider(e)
    );
    this.sliderController[1].addEventListener("click", (e) =>
      this.rightSlider(e)
    );
  };
}
