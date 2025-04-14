to get node_modules , do npm i


tailwind will be tracked in the files mentioned in tailwind.config.js.
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  like these files.
  in all these files , tailwind will be used.
  we gave this path and did such config because tailwind will be used here.

  ---------------------
  tailwind is the css framework.
  we will also use another design component library i.e daisyUI.

  remember when working with react you are working with jsx but not html.
  always copy the code of jsx.
  --use react router to add routing to your application.
  -- you can do that by first doing npm install react-router-dom
  -- routing can be done in the root level of your application. here in App.jsx.
  -- how to do that?
  1. create a browser router.
  2. inside browser router give a base name (where your application root should point to).
  like if base name is / then all routes will start with /.
  3. create multiple routes inside browserouter. use the routes component which is like a wrapper and inside this every small routes will be there.
  4. inside routes create a route whose path can be like /login,  will also pass an element and it will decide what will be vendored in this path.
  element is asking for a jsx component.
  5. before creating any routes like /login etc create a base route
  like this:<Route path ="/" element={<div>Base Page </div>} ></Route>
  6. now this is react router dom which is now set up.
  7. whenever creating routes in react before that make sure to create a component design.:

  Body
    NavBar
    Route=/ => Feed
    Route=/login => login 
    Route=/connections => connections
    Route=/profile => Profile

this is hpw we will create our routes.
now create a Body.jsx which will be the base route i.e /.
here you will keep the navbar.

next inside that body component in app.js you will create children routes.


like this in App.jsx:
 <BrowserRouter basename='/'>
    <Routes>
      <Route path ="/" element={<Body />} >
      <Route path ="/login" element={<Login />}/>
      <Route path ="/profile" element={<Profile />}/>
      </Route>
    </Routes>
    </BrowserRouter>  


now there needs to be an outlet where these children can be rendered.
so in your body component create an outlet.
we added an outlet below navabr. it says that any children route of the body will render over jere.

<div>
        <NavBar/>
        <Outlet/>
    </div>

advantage if this thing by this navbar will remain consistent and all the rest of ccode will come below navbar.
you can create a footer compoent below outlet which will always remain there constant.
