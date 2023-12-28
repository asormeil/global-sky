# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Folder Structure

This project follows a modular and scalable structure suitable for both small and large React applications. Here's a brief overview of the directory structure and the purpose of each folder:

- `src/`: The main source directory for the application.
  - `assets/`: Contains all the static resources like images, fonts, and other similar files.
  - `components/`: Reusable React presentational components that can be shared across the application.
  - `containers/`: Components that are connected to the state management logic or contexts.
  - `hooks/`: Custom React hooks for managing stateful logic and side effects.
  - `lib/`: External libraries and scripts that do not belong to the components or utilities.
  - `providers/`: React context providers for managing global application state, themes, and more.
  - `routes/`: Components and utilities for routing within the application.
  - `stores/`: If using state management like Redux, this includes actions, reducers, and the store setup.
  - `utils/`: Utility functions and helpers for common tasks throughout the app.

- `App.css`: Global styles for the application.
- `App.test.tsx`: Test suite for the main `App` component.
- `App.tsx`: The root React component that includes the primary application layout.
- `index.css`: Base CSS for styling the application.
- `index.tsx`: The entry point for React to mount the app onto the DOM.
- `react-app-env.d.ts`: TypeScript definitions specific to the app.
- `reportWebVitals.ts`: Utilities for measuring and monitoring performance.
- `setupTests.ts`: Configuration and setup for the testing environment.

This structure aims to keep the project organized and maintainable, ensuring that each file has a clear and defined purpose.
