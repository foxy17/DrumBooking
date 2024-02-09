# Drum Session Booking App

## Required Versions

| Tool        | Version    |
| ----------- | ---------- |
| NodeJS      | >=16       |
| TypeScript  | >=4.9.4    |

## Getting Started


### Installing Dependencies

```
npm install
```

### Running Locally

To run the project locally, simply execute:

```
npm run dev
```

## Scripts

| Command       | Description                                                                  |
| ------------- | -----------------------------------------------------------------------------|
| `start`       | Run `build:css` then watch TailwindCSS and Vite concurrently                 |
| `watch:css`   | Watch for changes in `index.css` and output to `styles.css` using TailwindCSS|
| `build:css`   | Build CSS using TailwindCSS from `index.css` to `styles.css`                 |
| `build`       | Run TypeScript compiler, build CSS and then Vite build                       |
| `preview`     | Run Vite preview                                                             |
| `lint`        | Lint TypeScript files using ESLint                                           |
| `lint:fix`    | Fix linting issues in TypeScript files using ESLint                          |
| `format`      | Format `.ts`, `.tsx`, and `.json` files using Prettier                       |
| `test`        | Run Jest tests                                                               |
| `release`     | Run `standard-version` for versioning                                        |
| `commit`      | Use `git-cz` for commits                                                     |
| `prepare`     | Set up Husky for git hooks in a production environment                       |


## Project Structure

Here's a basic overview of the significant folders in the boilerplate:

```
├── public
└── src
  ├── components
  ├── hooks
  ├── lib
  ├── pages
  ├── routes
  ├── services
  ├── store
  └── types
```


| Folder      | Description                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------|
| **`src/`**   | Contains the main source code for the application.                                                   |
| `components`| Reusable React components, each handling a specific piece of the UI.                                  |
| `hooks`     | Custom React hooks that encapsulate logic and behaviors which can be reused across different components.  |
| `lib`       | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                          |
| `pages`     | Components representing full pages in the application, typically corresponding to routes.                |
| `routes`    | Configuration and components related to routing in the application.                                     |
| `services`  | Functions or classes that handle tasks like API calls, data processing, or other "service"-like tasks.    |
| `store`     | Zustand st ores for state management, holding |
| **`public/`**   | Contains static assets like images, fonts, and the entry HTML file. Assets in this directory are served directly and are not processed by bundlers like Vite. |




## Features

| Tool/Library | Description                                                    |
|--------------|----------------------------------------------------------------|
| React Query  | Helps in fetching, caching, and updating asynchronous data.    |
| Zustand      | For simple and scalable state management.                      |
| TypeScript   | For type-safe code and scalability.                            |
| Vite         | For faster builds and a smoother developer experience.         |

## License

[MIT](https://choosealicense.com/licenses/mit/)
