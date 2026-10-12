
# React Redux Connectors and Providers

This project explores connecting React components to Redux using React Redux.

## Learning Objectives

- Connect React components to the Redux store.
- Use mapStateToProps to access Redux state.
- Create a Redux store using createStore.
- Use Provider to make the store available to components.
- Manage application state with Redux reducers.
- Test connected and unconnected React components.

## Technologies

- React
- Redux
- React Redux
- Immutable.js
- Jest and Enzyme
- Webpack
- Node.js 12

## Task 0

The initial dashboard was copied from the previous Redux reducers and selectors project.

Implemented:
- Installed React Redux.
- Connected App using mapStateToProps.
- Created the Redux store using uiReducer.
- Wrapped App with Provider.
- Added tests for mapStateToProps.
- Resolved a Node.js 12 dependency compatibility issue.

## Running the Project

Navigate to the dashboard directory:

```bash
cd task_0/dashboard
npm install
npm start
```

## Running Tests

```bash
npm test -- --runInBand
```

## Building with Webpack

```bash
./node_modules/.bin/webpack --mode development --config config/webpack.config.js
```

