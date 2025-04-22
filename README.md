# Devtinder
-Created a vite + react application & start it.
- remove unnecessary code
- install tailwind css.
- add navbar components to your APP.jsx file.
-always create a separate file for diff components like diff file for navbar.
- Create a navbar.jsx file
- add routing to applications.
-basic level of component design:


Body
    NavBar
    Route=/ => Feed
    Route=/login => login 
    Route=/connections => connections
    Route=/profile => Profile

- install react router dom
- create BrowseRouter->Routes->Route=/body->RouteChildren
- Create an outlet in your Body Component.
- Create a footer
- Create a login
- Install axios
- Instll CORS in backend=> add middleware with configurations: origin , credentials:true
- pass  axios->{withCedentials=true} in frontend whenever making an api call. (if you dont do this it will not pass token in cookie);
- install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
--add redux devtools extension in chrome
-- login and see if your data is coming properly in store.
-- navabr should update as soon as user logins
-refactor code to add constants file + create a component folder.
-- you should not be able to access other routes without login.
-- it token is not present redirect user to login page.
-- logout
-- feed feature
-- build the usercard in feed.
 