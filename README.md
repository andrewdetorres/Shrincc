# Shrincc
Welcome to Shrincc. A portfolio project to help further develop my React, Node, Express and MongoDB skills.

# Set up

First clone this project into an appropriate directory.
```
git clone https://github.com/andrewdetorres/shrincc.git
```

Navigate to the directory root and run the build script. This will install all of the dependancies relevent to the project.
```
./build.sh
```

Add all the relevant keys into ```server/config/dev.js``` file. An Example of this file can be found in ```server/config/dev.js.example```

Navigate to the ```server``` file and run the yarn script
```
yarn dev
```

This will build the project in development mode at the url ```http://localhost:3000/```

## Proposed Git Workflow.

### Branches
 - master
   - Used for **production** code only.
   - **No** development work is to take place on master.
   - Work shall be merge in to master **only** from staging
 - develop
   - Used as a **stage** for pre-production code.
   - **No** development work is to take place on develop.
   - **Supporting branches** to come from develop
   - Work shall be merge in to develop **only** from supporting branches

##### Supporting Branches

 - feature-\[issue-number\]-\[short-description\]
   - Used to **develop new features** code only.
   - Should branch off develop and **must** merge back into develop.
 - hotfix-\[issue-number\]-\[short-description\]
   - Used to fix **urgent features** only.
   - May branch off develop both develop and master **must** merge back into **both** develop & Master irrespective of the source branch.


### Cloning a repository for development

```
git clone https://github.com/andrewdetorres/shrincc.git
git checkout develop
git checkout -b [feature-branch]
git add path/to/changes
git commit -m "message" path/to/changes
git push origin HEAD
```

```Create PR on Github.com```

## Sass
For the development of the project we will use [node-sass](https://www.npmjs.com/package/node-sass)
component styling will be stored in the individual component ```.scss``` file and compiled into main.scss in the ```assets/sass``` folder

## Yarn

The application utilises the 'Yarn' Package Manager.

##### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
