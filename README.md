# Basic Webpack

A worked webpack 4 build for a small vanilla-JS page (a dinosaur comparison app), set up
twice: a development build with hot reloading, and a production build with extracted and
minified CSS. An Express server serves whichever one you asked for.

The README was previously one line: `# Basic Webpack`. Fifteen bytes, in a repository
whose entire subject is build configuration.

## Running it

```shell
npm ci
```

**Install before setting `NODE_ENV`.** `NODE_ENV=production npm ci` skips
`devDependencies`, and webpack and every loader live there, so the build then fails with
nothing to explain why. Install first, set the variable when you run the server.

| Command | What it does |
| --- | --- |
| `npm start` | `webpack-dev-server` on :9000, hot reloading, nothing written to disk |
| `npm run start:dev` | Express on :3001 with webpack middleware, hot reloading, `nodemon` restarts on config changes |
| `npm run build:dev` | writes an unminified build with source maps to `public/` |
| `npm run build:prod` | writes the production build to `public/` |
| `npm run start:prod` | Express on :3001 serving `public/`, no webpack loaded at all |
| `npm run lint` | eslint over `src` |

`build:prod` then `start:prod` is the pair to use for the production path; `start:prod` on
its own serves whatever is in `public/`, and `public/` is not in the repository.

## The two configs

| | `config/webpack.dev.js` | `config/webpack.prod.js` |
| --- | --- | --- |
| mode | `development` | `production` |
| CSS | `style-loader`, injected into the page | `MiniCssExtractPlugin` to `app.css`, minified by `OptimizeCSSAssetsPlugin` |
| entry | includes `webpack-hot-middleware/client` | just `./src/app.js` |
| devtool | `source-map` | none |
| plugins | `HotModuleReplacementPlugin`, `HtmlWebpackPlugin` | `MiniCssExtractPlugin`, `OptimizeCSSAssetsPlugin`, `HtmlWebpackPlugin` |

Both send `.js` through `babel-loader`, `.html` through `html-loader`, and `.png`/`.jpg`
through `file-loader` into `public/images`.

`.babelrc` sets `"debug": true` on `@babel/preset-env`, so every build prints the browsers
it resolved from `targets` and the transforms it decided to include. That is noisy and it
is kept on purpose: in a repository about build configuration, watching preset-env explain
itself is the interesting part.

## What was wrong

**`start:prod` ran the development pipeline.** The script is
`NODE_ENV=production node main.js`, and `server.js` unconditionally loaded
`config/webpack.dev.js` and applied both `webpack-dev-middleware` and
`webpack-hot-middleware`. So the production script started an in-memory development build
with hot reloading attached, and `NODE_ENV` was decoration. The server branches now:
production serves `public/` and never requires webpack, development keeps the middleware,
which is the only reason to run this server instead of `webpack-dev-server`. Verified: in
production the log shows no compile output and `/`, `/app-bundle.js` and `/app.css` all
return 200.

**The build output was committed, and it was stale.** `public/` is webpack's output
directory: the bundle, the extracted CSS, the HTML `HtmlWebpackPlugin` generates from
`src/index.html`, and the images `file-loader` copies out of `src/images`. All of it was
tracked. Worse, it no longer matched the source that produces it: the committed bundle is
**9333 bytes** against **9389** for a fresh build of the same commit, differing at byte
4670. Anyone reading `public/app-bundle.js` was reading output this source no longer
generates. `public/` is ignored now.

**The polyfill configuration did nothing.** `.babelrc` set `useBuiltIns: "entry"`, which
only takes effect if the entry point explicitly imports the polyfill, and `src/app.js`
never did. `@babel/polyfill` was declared as a runtime dependency and imported nowhere,
and it has been deprecated since Babel 7.4. Both are gone, and the bundle is **byte for
byte identical** afterwards (9389 either way), which is the proof they were inert.

**A webpack 3 plugin was declared.** `extract-text-webpack-plugin` sat in
`devDependencies` alongside `mini-css-extract-plugin`, which is its webpack 4 replacement
and the one the prod config actually uses. Removed.

**`main` pointed at a file that does not exist.** It was `app.js`; the root has `main.js`
and `server.js`. It is `main.js` now, which is what the scripts run.

**The package metadata belonged to someone else.** `repository`, `bugs` and `homepage` all
pointed at `udacity/Javascript`, `description` was the string `"## Student Instructions"`,
and `author` was empty. This started as a course project and the fields were never
changed.

**Two `.DS_Store` files were committed**, one at the root and one in `src/`, because
`.gitignore` was a single line reading `node_modules/`.

## Not covered

- **Tests.** There are none, and nothing here is factored for them: `src/app.js` runs on
  import and writes to the DOM.
- **Filenames with spaces.** `src/images/tyrannosaurus rex.png` is loaded fine by
  `file-loader`, but it is a reliable way to break shell one-liners that iterate over the
  directory unquoted.
