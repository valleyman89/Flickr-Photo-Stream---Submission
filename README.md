# Flickr Photo Stream

## About

This is my solution for the [web development flickr task](https://github.com/holidayextras/recruitment-tasks/blob/master/developer-flickr-task.md). The solution follows the wireframe, and uses no additional frameworks other than React.

- It functions as a single page app, but there is also a modal window for each picture.
- Built with HTML, CSS and React. This is a context-based solution.
- Supports major browsers, employs a responsive design (desktop-first), and has infinite scrolling.
- There is an integration test which tests for:
  - the app rendering
  - a picture and modal rendering
  - input box accepts text
  - search results show correct picture
- ⚠️🚨The `safe_search` parameter **does not always work**.🚨⚠️ With this in mind, I have amended the URL for the [flickr public API](https://www.flickr.com/services/feeds/docs/photos_public/) to default to public pictures tagged as _cats_. This, unfortunately, is not fool-proof and sometimes NSFW images slip-through. If you want to see the full photo-stream, remove `&tags=cat` from the `url` variable in `/src/context/pictureContext.js` (see below)
  ```js
  const url =
    "feeds/photos_public.gne?format=json&nojsoncallback=1&safe_search=1&tags=cat";
  ```
- Uses `React.lazy()` to implement lazy loading. You can see this in action by using your browsers developer tools and throttling the network connection (e.g. disable cache, slow 3G preset on Google Chrome). Lazy loading will appear for the initial API call, and the first modal window call.
- There is an additional _safe/sfw ('safe for work') mode_ which can be triggered by interacting with the 🐱 floating emoji on the top-right of the app. This will use the `box-shadow` CSS property to redact all images rendered on the app. Turn off safe mode by tapping the 🙀 floating emoji. This is an aesthetic change only.

### Assumptions

- **Search**
  - The requirements didn't specify whether searching for a title/tag/description applied to currently loaded images, or all public feed images. Since the API does not have a title or description parameter available, I opted to have the search only check the title and tags for currently loaded images.
- **Description**
  - The wireframe wanted the description to appear on each card, however the value for the key in results included not only the author, title and description - but it's presented in HTML. With this in mind, I decided to use `dangerouslySetInnerHTML` on the pictureModal to display this data, and on the card, used string manipulation to pick out the description, and truncated the result with CSS.
- **Tags**
  - I wanted to implement some extra functionality for the tags. When on the picture modal, you can click on a tag and it'll re-render the app to show currently loaded pictures with the same tag. To keep in-line with the wireframe spec, this isn't available on the picture card.

### Issues / Bugs / Notes

**App**

- I have set development server `proxy` key in `package.json` to overcome any CORS-related issues. The app may not work if deployed to production, so use `npm run start` (development)

**Tests**

- running `npm run test` will result in a warning, caused by the use of `React.lazy()`.

## Getting Started

### Prerequisites

- This project assumes you have NodeJS, npm and a modern browser installed on your local environemnt.

### Installation

1. Clone the repo to your preferred directory
   ```bash
   gh repo clone valleyman89/Flickr-Photo-Stream---Submission
   ```
2. Install NPM packages
   ```bash
   npm install
   ```

## Usage

- Start the server
  ```bash
  npm run start
  ```
- Run the test suite
  ```bash
  npm run test
  ```

## Contact

Steven Rolph - [@steven_rolph](https://twitter.com/steven_rolph)

GitHub: [https://github.com/valleyman89/Flickr-Photo-Stream---Submission](https://github.com/valleyman89/Flickr-Photo-Stream---Submission)

[![LinkedIn][linkedin-shield]][linkedin-url]

### Built With

[![React][react.js]][react-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/steven-rolph
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
