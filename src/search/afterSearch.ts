export type dataItem = {
  saleInfo: object;
  volumeInfo: object;
};

export type itemInfo = {
  volumeInfo: {
    authors: Array<string>;
    title: string;
    subtitle: string;
    categories: string;
    imageLinks: { thumbnail: string; smallThumbnail: string };
    infoLink: string;
    previewLink: string;
    pageCount: number;
  };
  saleInfo: {
    buyLink: string;
    country: string;
    isEbook: true;
    saleability: string;
    listPrice: { amount: string; currencyCode: string };
  };
};

export class afterSearchComponent {
  private searchData = JSON.parse(localStorage.getItem("search")!).items.map(
    (item: dataItem) => {
      return { saleInfo: item.saleInfo, volumeInfo: item.volumeInfo };
    }
  );
  private bookListUl: HTMLUListElement = document.querySelector(".bookList")!;
  private alarmBox: HTMLDivElement = document.querySelector(".alarm")!;
  private alarmBoxContent: HTMLHeadingElement =
    this.alarmBox.querySelector("h3")!;
  private cartLink: HTMLAnchorElement = this.alarmBox.querySelector("a")!;
  private timeOut: number | undefined = undefined;
  constructor() {
    this.drawAllItem();
    this.bookListUl?.addEventListener("click", (e) => this.onCartClick(e));
  }

  drawAllItem = () => {
    if (this.searchData) {
      this.searchData.forEach((item: itemInfo, index: number) =>
        this.drawOneItem(item, index)
      );
    }
  };

  drawOneItem = (item: itemInfo, index: number) => {
    const a = document.createElement("a");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const priceSpan = document.createElement("span");
    priceSpan.className = "price";
    a.href = item.volumeInfo.infoLink;
    img.src = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.thumbnail
      : "https://usecloud.s3-ap-northeast-1.amazonaws.com/%EC%96%B4%EB%AA%BD%EC%96%B4%EC%8A%A42.PNG";
    a.appendChild(img);

    h3.textContent = item.volumeInfo.title;
    span.textContent = item.volumeInfo.authors[0];
    p.textContent = item.volumeInfo.subtitle;
    div.appendChild(h3);
    div.appendChild(span);
    div.appendChild(p);

    if (item.saleInfo.saleability !== "NOT_FOR_SALE") {
      priceSpan.textContent =
        item.saleInfo.saleability !== "FREE"
          ? `${item.saleInfo.listPrice.amount}(${item.saleInfo.listPrice.currencyCode})`
          : "0(KRW)";
      const buyLink = document.createElement("a");
      const storeCart = document.createElement("span");
      buyLink.href = item.saleInfo.buyLink;
      buyLink.textContent = "책사기";
      buyLink.className = "buylink";
      storeCart.textContent = "🛒";
      storeCart.className = `storeCart`;
      storeCart.id = `${index}`;
      console.log(storeCart.className);
      div.appendChild(priceSpan);
      div.appendChild(storeCart);
      div.appendChild(buyLink);
    } else {
      priceSpan.textContent = "판매불가";
      div.appendChild(priceSpan);
    }

    li.appendChild(a);
    li.appendChild(div);
    li.className = "bookItem";
    this.bookListUl?.appendChild(li);
  };

  onCartClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.className === "storeCart") {
      this.localCartStore(this.searchData[Number(target.id)], target);
      this.moveAlarmBox();
    }
  };

  localCartStore = (item: itemInfo, target: HTMLElement) => {
    let localArray: itemInfo[] = localStorage.getItem("store")
      ? JSON.parse(localStorage.getItem("store")!)
      : [];
    const isInclude = localArray.findIndex(
      (book: itemInfo) => book.volumeInfo.title === item.volumeInfo.title
    );

    if (isInclude === -1) {
      localArray.push(item);
      localStorage.setItem("store", JSON.stringify(localArray));
      this.alarmBoxContent.textContent = "카트에 추가되었습니다.";
      target.style.backgroundColor = "red";
      this.cartLink.style.display = "block";
    } else {
      this.cartLink.style.display = "none";
      this.alarmBoxContent.textContent = "카트에서 제거되었습니다.";
      target.style.backgroundColor = "";
      localArray = localArray.filter((item, index) => index !== isInclude);
      localStorage.setItem("store", JSON.stringify(localArray));
    }
  };

  moveAlarmBox = () => {
    clearTimeout(this.timeOut);

    if (
      !this.alarmBox.classList.contains("out") &&
      this.timeOut !== undefined
    ) {
      this.alarmBox.style.animation = "alarmInit 0.05s linear forwards";
    }

    setTimeout(() => {
      this.alarmBox.style.animation = "alarmMove 0.15s linear forwards";
      this.alarmBox.classList.remove("out");
    }, 50);

    this.timeOut = setTimeout(() => {
      this.alarmBox.style.animation = "alarmInit 0.15s linear forwards";
      this.alarmBox.classList.add("out");
    }, 3000);
  };
}
