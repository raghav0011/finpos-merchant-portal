City Remit Management Web Portal

## Get Started

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/) -JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://npmjs.org/) - Node package manager

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://krishnatimilsina@bitbucket.org/Citytech_global/cityremit-mgmt-web-portal.git
 $ cd cityremit-mgmt-web-portal
 $ cp .env.example .env (edit it with REST API URL)
 $ npm install
```
### 3. Deploy the application 
Start the application on development environment:
 
```
 $ npm start
```

Run the application on production environment:
 
```
 $ npm run build
```
Run the test watcher in an interactive mode:
 
```
 $ npm test
```
 
Generate test coverage report:
 
```
 $ npm test -- --coverage 
```
### 3. Deploy the application using Docker  [Optional]


i. Build the docker image. Make sure you are in the project root directory in your terminal and run the following command.
 
```
 $ sudo docker build -t repo.citytech.global/cityremit-mgmt-portal .
```
ii. To see the list images built in your system, run the following command
 
```
 $ sudo docker images
```

iii. Run container on 80 port
 
```
 $ sudo docker run -p 3000:80 repo.citytech.global/finpulse-client-mgmt:latest
```

Now open http://localhost:3000 in your browser to check its running !


**Note:** Docker - Bind for 0.0.0.0:4000 failed: port is already allocated


```
$ docker container ls
$ docker rm -f <container-name>
```

### 4. Project Structure

```
src\
 |--app\            # Main app files with component, container and redux toolkit slice 
 |--assets\         # Image and other assets
 |--constants\      # Global app constants
 |--layout\         # App layouts
 |--reducers\       # Reducer config for redux store
 |--routes\         # Route configuration
 |--store\          # Redux store configuration
 |--styles\         # Custom styling
 |--utils\          # Utility classes and functions
 |--index.js        # App entry point
```

    
### 5. Useful Link
- JavaScript library for building user interfaces - [React](https://reactjs.org/)
- Create React App  - [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- Declarative routing for React - [React-Router](https://reactrouter.com/)
- Predictable state container - [Redux](https://redux.js.org/)
- React Bindings For Redux  - [React Redux](https://react-redux.js.org/)
- Thunk middleware for Redux  - [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- Redux Toolkit  - [Redux Toolkit](https://redux-toolkit.js.org/)
- A Redux binding for React Router v4 and v5  - [Connected React Router](https://github.com/supasate/connected-react-router)
- Promise based HTTP client - [Axios](https://github.com/axios/axios)
- An enterprise-class UI design language and React UI library - [antd](https://ant.design/)
- Internationalization framework for React / React Native  - [react-i18next](https://react.i18next.com/)
- Code Linting Tool - [ESLint](http://eslint.org/)
- Code Formatter - [Prettier](https://www.npmjs.com/package/prettier)
