import icons from "url:../../img/icons.svg";
import View from "./View";
import previewView from "./previewView";

class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMsg = "No bookmarks yet.";
    _generateMarkup() {
        return this._data.map(res => previewView.render(res, false)).join("");
    }

    addHandlerRender(handler) {
        window.addEventListener("load", handler);
    }
}

export default new BookmarksView();