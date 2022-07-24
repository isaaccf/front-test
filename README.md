# Harry Potter Characters

This project is based on the [Harry Potter Characters API](https://hp-api.herokuapp.com/api/characters)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploy

This project is deployed in Vercel. The master branch is avaiable in [https://sdg-front-test.vercel.app/](https://sdg-front-test.vercel.app/)

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

### `npm run cypress`

Launches Cypress on visual mode.

### `npm run e2e`

Launches Cypress on run mode.

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

## Possible improvements

There are a tons of new functionalities that can be added to the project:

* Add favorites. The user can mark characters as favorites, and that characters will be shown in another screen.
* More filters. Currently the search only works with the name, it should work with the other fields. Also more specific filters like house should be added.
* Character comparsion. The user can select two characters and see their fields toghether in the same table to compare them.

There are also code changes that can be implemented to improve the software:

* To help with multiple environments like DEV/PRE/PRO the API URL, should be taken from an environment variable, is not should be hardcoded in the code.

## Known bugs
* Ordering for birth date doesn't work as expected, the field is been treating as a string, not as a date, so the order is by alphabetical order. It means that 01-01-2000 is before 31-12-1999 and that is wrong.

