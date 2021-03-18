import icons from "url:../../img/icons.svg";
import View from "./View";

class PageView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return
      const goToPage = parseInt(btn.dataset.goto);
      handler(goToPage);

    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    //page 1 and no other
    if (curPage === 1 && numPages <= 1) { return "" }

    //page 1 and other
    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`
    }
    //last page //&& numPages > 1
    if (curPage === numPages) {
      return `<button data-goto="${numPages - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${numPages - 1}</span>
          </button>`
    }
    //other page
    if (curPage < numPages) {
      return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>

            `
    }
  }

}

export default new PageView();