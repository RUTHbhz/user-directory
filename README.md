# User Directory

A small web page that loads people from a practice API and lets you search them by name or email.

Each person appears on a card with:

- Full name
- Email address
- City
- Organization name

## How to run it

1. Open the `user-directory` folder.
2. Open `index.html` in a browser.

The page requests users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) as soon as it loads. Use **Reload users** to request the list again.

If the browser blocks the request when the file is opened directly, serve the folder with a local server and open the page from that address. For example, from the `user-directory` folder:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## How to use it

- Wait for the loading message to finish. The cards appear when the request succeeds.
- Type part of a name or email address. Capitalization and extra spaces are ignored.
- Clear the search box to see the full list again.
- If nothing matches, the page explains that no users were found.
- If the request fails, an error message appears. Click **Reload users** to try again.

## JavaScript concepts used

- `async` / `await` and Promises, with `try...catch...finally`
- `fetch()` to request JSON from an external API
- Checking `response.ok` before reading the body with `response.json()`
- Storing the full user list, then filtering a copy for search
- `filter()`, `includes()`, `trim()`, and `toLowerCase()`
- Creating cards with `document.createElement()` and `textContent`
- Separate messages for loading, success, an empty search, an empty API response, and a failed request

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: title, search, reload button, message, and card area |
| `style.css` | Layout and styles for cards and status messages |
| `script.js` | Loading, display, search, and error handling |
