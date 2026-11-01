# BookAnnotationApp

An Angular 19 application for reading and annotating literature, with an editorial cream-and-burgundy UI.

## UI preview

Run `npm start`, then open [the library preview](http://localhost:4200/preview/my-books).
You can also choose **Explore the UI preview** on the login screen. On Windows,
use `npm.cmd start` if PowerShell blocks the npm script.

The `/preview` routes are a presentation sandbox using existing mock data. They do
not sign you in or change the authentication guard on the existing application routes.
Search passages within an open book, explore the analysis sample, and try the reader
appearance and annotation controls. Annotation edits are local to the workspace;
kept book-note drafts remain in memory until the page is refreshed.

Semantic results and literary analysis are illustrative. Upload preparation, profile
editing, and reading preferences are UI previews. No new backend integrations
or persistence are included.

See [the UI implementation guide](docs/ui-implementation.md) for screen coverage,
file changes, verification, and the functionality handoff.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
