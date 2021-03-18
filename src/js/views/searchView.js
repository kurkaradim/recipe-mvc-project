class SearchView {
    _parentElement = document.querySelector(".search");

    getQuery() {
        return document.querySelector(".search__field").value;
    }

    clearInput() {
        document.querySelector(".search__field").value = "";
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            handler();
        });
    }

}

export default new SearchView();