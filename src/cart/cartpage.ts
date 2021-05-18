import { itemInfo } from "../search/afterSearch";

export class CartPageComponent {
  private data: itemInfo[] = localStorage.getItem("store")
    ? JSON.parse(localStorage.getItem("store")!)
    : [];
  private prices = this.data.map((item) =>
    item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : "0"
  );
  private bookList: HTMLUListElement =
    document.querySelector(".cartBooks__list")!;
  private buyInfoBox: HTMLDivElement =
    document.querySelector(".buyInfoWrapper")!;
  private allCheckClick: HTMLInputElement = document.querySelector(
    ".cartBooks__allClick"
  )!;
  private ItemsCheckClick: HTMLInputElement[] = [];
  private showMoneyAmount: NodeList = document.querySelectorAll(".amount");
  private SelectDelBtn: HTMLButtonElement = document.querySelector(
    ".cartBooks__selectDel"
  )!;

  constructor() {
    this.data.forEach((item, index) => this.drawBookItem(item, index));
    window.addEventListener("scroll", this.onScroll);
    this.allCheckClick.addEventListener("click", this.onAllClick);
    this.bookList.addEventListener("click", this.onItemCheckClick);
    this.SelectDelBtn.addEventListener("click", this.selectDelButton);
  }

  onAllClick = (e: Event) => {
    if (this.allCheckClick.checked) {
      this.ItemsCheckClick.forEach((item) => (item.checked = true));
      this.allSumMoneyAmount();
    } else {
      this.ItemsCheckClick.forEach((item) => (item.checked = false));
      this.clearMoneyAmount();
    }
  };

  selectDelButton = (e: Event) => {
    const checkList: boolean[] = this.ItemsCheckClick.map(
      (item) => item.checked
    );
    const cartListes = this.bookList.querySelectorAll("li");

    if (checkList.findIndex((item) => item) !== -1) {
      cartListes.forEach((item: HTMLElement, index) => {
        if (checkList[index]) {
          this.bookList.removeChild(item);
          this.prices.splice(index);
          this.localDel(index);
        }
      });
    } else {
      window.alert("삭제할 책을 선택해주세요");
    }
  };

  onItemCheckClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") {
      this.allCheckClick.checked = false;
      const price = Number(this.prices[Number(target.id)]);
      const checked = (target as HTMLInputElement).checked;
      checked ? this.addMoneyAmount(price) : this.minusMoneyAmount(price);
    } else if (target.tagName === "BUTTON") {
      if (window.confirm("삭제하시겠습니까?")) {
        this.bookList.removeChild(target.parentElement!.parentElement!);
        this.prices.splice(Number(target.id), 1);
        this.localDel(Number(target.id));
      }
    }
  };

  onScroll = (e: Event) => {
    if (window.scrollY < 260) {
      this.buyInfoBox.style.position = "absolute";
      this.buyInfoBox.style.top = "41%";
      this.buyInfoBox.style.opacity = "1";
    } else if (window.scrollY >= 260 && window.scrollY < 430) {
      this.buyInfoBox.style.position = "fixed";
      this.buyInfoBox.style.opacity = "1";
      this.buyInfoBox.style.top = "10px";
    } else {
      this.buyInfoBox.style.opacity = "0";
    }
  };

  localDel = (index: number) => {
    const localCart = JSON.parse(localStorage.getItem("store")!);
    localCart.splice(index, 1);
    localStorage.setItem("store", JSON.stringify(localCart));
  };

  addMoneyAmount = (prices: number) => {
    this.showMoneyAmount.forEach(
      (item) =>
        (item.textContent = `${
          prices +
          Number(item.textContent?.substring(0, item.textContent.length - 1))
        }원`)
    );
  };
  minusMoneyAmount = (prices: number) => {
    this.showMoneyAmount.forEach(
      (item) =>
        (item.textContent = `${
          Number(item.textContent?.substring(0, item.textContent.length - 1)) -
          prices
        }원`)
    );
  };

  clearMoneyAmount = () => {
    this.showMoneyAmount.forEach((item) => (item.textContent = "0원"));
  };

  allSumMoneyAmount = () => {
    const sum = this.prices.reduce((sum, curValue) => sum + Number(curValue));
    this.showMoneyAmount.forEach((item) => (item.textContent = `${sum}원`));
  };

  drawBookItem = (item: itemInfo, index: number) => {
    const li = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = `${index}`;
    checkBox.className = "cartBooks__itemCheck";
    this.ItemsCheckClick.push(checkBox);
    const img = document.createElement("img");
    item.volumeInfo.imageLinks
      ? (img.src = item.volumeInfo.imageLinks.thumbnail)
      : (img.src =
          "https://usecloud.s3-ap-northeast-1.amazonaws.com/%EC%96%B4%EB%AA%BD%EC%96%B4%EC%8A%A42.PNG");

    const infoBox = document.createElement("div");
    infoBox.className = "cart__infoBox";
    const title = document.createElement("h2");
    title.textContent = item.volumeInfo.title;
    const author = document.createElement("div");
    author.textContent = item.volumeInfo.authors[0];
    const delButton = document.createElement("button");
    delButton.id = `${index}`;
    delButton.textContent = "삭제";
    const price = document.createElement("div");
    price.className = "cart__price";
    price.textContent = item.saleInfo.listPrice
      ? item.saleInfo.listPrice.amount
      : "0";
    li.appendChild(checkBox);
    li.appendChild(img);

    infoBox.appendChild(title);
    infoBox.appendChild(author);
    infoBox.appendChild(delButton);
    li.appendChild(infoBox);
    li.appendChild(price);
    this.bookList.appendChild(li);
  };
}
