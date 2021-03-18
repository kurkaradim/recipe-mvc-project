import View from "./View";
import previewView from "./previewView";

class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMsg = "No results found, please search something else.";
    _generateMarkup() {
        return this._data.map(res => previewView.render(res, false)).join("");
    }

}
export default new ResultsView();