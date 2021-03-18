
import { api_url, RESULTS_PER_PAGE, API_KEY } from "./config.js";
import { AJAX } from "./helpers.js";





export const state = {
    recipe: {},
    search: {
        page: 1,
        query: "",
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
    },
    bookmarks: [],
}

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
}

export const loadRecipe = async function (recipeId) {
    try {
        const data = await AJAX(`${api_url}${recipeId}?key=${API_KEY}`);
        state.recipe = createRecipeObject(data);


        if (state.bookmarks.some(book => book.id === recipeId)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    }
    catch (err) {
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${api_url}?search=${query}&key=${API_KEY}`);
        let { recipes } = data.data;
        recipes = recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && { key: rec.key }),
            }
        });
        state.search.results = recipes;
        state.search.page = 1;
    }
    catch (err) {
        throw err;
    }
}


export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * this.state.search.resultsPerPage;
    const end = page * this.state.search.resultsPerPage;

    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    });

    state.recipe.servings = newServings;
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
}

export const removeBookmark = function (recipeId) {
    const curBook = state.bookmarks.findIndex(el => el.id === recipeId);
    state.bookmarks.splice(curBook, 1);
    if (recipeId === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
}

const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
            const ingArr = ing[1].split(",").map(el => el.trim());
            if (ingArr.length !== 3) throw new Error("Wrong ingredient format.");
            const [quantity, unit, description] = ingArr;
            return { quantity: quantity ? +quantity : null, unit, description };
        });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        }


        const data = await AJAX(`${api_url}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }


}



const init = function () {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
}

init();