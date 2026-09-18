# NASA Mission Control

A React 18 / Vite dashboard with React Router 7 and Arwes sound effects, backed
by an Express API. Requires Node.js 22.12+ (Node 24 recommended).

## Start

```sh
npm install
npm run dev
```

The client runs at http://localhost:3000 and the API at http://localhost:8000.
Vite forwards `/api/*` requests to the API. `npm run dev` stops both processes
when interrupted. Individual commands: `npm run client` and `npm run server`.

## Configuration and scripts

Run commands from the repository root:

| Command                 | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `npm run lint`          | ESLint and Stylelint checks                       |
| `npm run lint:js`       | Check JS/JSX with ESLint flat configuration       |
| `npm run lint:css`      | Check CSS with Stylelint standard rules           |
| `npm run lint:fix`      | Apply available lint fixes                        |
| `npm run format:check`  | Check Prettier formatting                         |
| `npm run format`        | Format supported project files                    |
| `npm test`              | Run server and client Jest suites once            |
| `npm run test:coverage` | Collect coverage in each package                  |
| `npm run test:e2e`      | Start Vite on port 3100, run Cypress, stop Vite   |
| `npm run cypress:open`  | Open Cypress against a client on port 3000        |
| `npm run cypress:run`   | Run Cypress against a client on port 3000         |
| `npm run build`         | Build the frontend into `client/build`            |
| `npm run check`         | Lint, formatting, Jest, and production build      |
| `npm run deploy`        | Build and serve the frontend and API on port 8000 |

For watch mode: `npm run test:watch --prefix client` or
`npm run test-watch --prefix server`. Client Jest uses Babel, jsdom, Testing
Library, and jest-dom; server Jest uses Node and Supertest.

Cypress mocks API responses and exercises scheduling, aborting, failure
recovery, navigation, and mobile layout. It uses the real Arwes provider.
Run `npx cypress install` if its binary is missing. In terminals exporting
`ELECTRON_RUN_AS_NODE=1`, run `env -u ELECTRON_RUN_AS_NODE npm run test:e2e`.

## Automatic checks before commits

`npm install` enables the Husky pre-commit hook through the `prepare` script.
Run `npm run prepare` to enable it again if dependencies were installed with
lifecycle scripts disabled.

On each commit, lint-staged checks only staged files:

- JavaScript/JSX: ESLint autofixes, then Prettier formatting.
- CSS: Stylelint autofixes, then Prettier formatting.
- JSON, Markdown, HTML, and YAML: Prettier formatting.

Remaining lint errors or warnings block the commit. Successful fixes are
included in the staged changes automatically. lint-staged preserves unstaged
edits in partially staged files and restores its backup when a task fails.
The existing tool ignore rules still apply, including Prettier's lockfile
exclusion. Run `npm run lint:staged` to check the staged changes manually.

The hook is a local safeguard; `npm run check` remains the full-project
validation command. See the [Husky setup guide](https://typicode.github.io/husky/get-started.html)
and [lint-staged documentation](https://github.com/lint-staged/lint-staged).

## Frontend and audio

Create React App is replaced by Vite, JSX modules use `.jsx`, and routing uses
React Router's current declarative API. Arwes audio is retained through
`@arwes/react-bleeps`, using the original files in `client/public/sound`.
`client/src/settings.js` configures all six sounds; navigation, success,
warning, and abort interactions use `useBleeps`.

React stays on 18 because the published Arwes React sound package declares
React 18 support. StrictMode is omitted as required by the
[Arwes provider documentation](https://arwes.dev/docs/develop).

Styles retain the mission-control design, with consistent formatting, font
fallbacks, visible keyboard focus, and a skip link. Stylelint disables only
`no-descending-specificity` because unrelated component selectors share this
stylesheet. Failed requests show feedback and release the submit button.

## Deployment

`npm run deploy` builds and serves the app and API from the Express server.
The server supports `/api/planets` and `/api/launches` while preserving the
original API paths. Direct `/launch`, `/upcoming`, and `/history` visits serve
the frontend entry page. `npm run deploy-cluster` starts the same app with PM2.

For separate static hosting, serve `client/build`, enable SPA route fallback,
and proxy `/api/*` to the backend (stripping `/api` if needed). Alternatively,
set `VITE_API_URL` in `client/.env.local` before building and configure backend
CORS for that origin. Vite variables are public build-time values; use them
only for public configuration. `npm run preview --prefix client` previews the
build locally. The API currently stores launches in memory.
