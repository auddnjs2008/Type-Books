interface Search {
  fetch: () => void;
  onSubmit: (e: Event) => void;
}

export class SearchComponent {
  private url: string = "https://www.googleapis.com/books/v1/volumes?";
  private key: string = "AIzaSyD1gStoBN-K1cSgox7UoJ_NUPegMU4eX6M";
  private searchResult = {};
  private SearchForm: Node | null = document.querySelector(".header__form");
  private SearchInput: HTMLInputElement | null = (
    this.SearchForm as HTMLElement
  ).querySelector("input");
  constructor() {
    this.SearchForm?.addEventListener("submit", this.onSubmit);
  }

  fetch = async (word: string) => {
    const requestUrl = this.url + `q=${word}+inauthor:keys&key=${this.key}`;
    await fetch(requestUrl)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("search", JSON.stringify(res));
      });
  };

  onSubmit = async (e: Event) => {
    e.preventDefault();
    const value = this.SearchInput!.value;

    if (value !== "") {
      await this.fetch(value);
    }
    this.SearchInput!.value = "";
    window.location.href = "/html/search.html";
  };
}
