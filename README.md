# recipe-mvc-project
This is a MVC structure project that displays recipes from an API, based on Jonas Schmedtmanns forkify project.
Live version HERE https://radim-mvc-project.netlify.app/
(not optimised for mobile, please view on a larger screen preferably)
The possible search queries are listed here https://forkify-api.herokuapp.com/phrases.html (feel free to experiment with other queries)

To run simply clone this repo and initialise with 
```
npm init
```

then run 
```
npm install
```
to install all dependent modules.

Finally launch this app with
```
npm start
```

In ./src/js/config.js it is possible to configure a few variables:
- your API key for storage of own recipes on original forkify API => https://forkify-api.herokuapp.com/
- results displayed per page
- time before modal windows close
- time before timeout of requests
