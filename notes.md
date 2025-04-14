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
-- inside create login.jsx create ui for login page.
-- then create a state.


 
 Understand below concepts:

 onChange={(e)=>setEmailId(e.target.value)}
//state variables
  const [emailId , setEmailId] = useState();
  const [password , setPassword] = useState();

onchange func basically changes value of your text when you input.

HANDLE LOGIN API CALL.
  const handleLogin =async ()=>{
    
    try{
    const res = await axios.post("http://localhost:7777/login",{
      emailId,
      password,
    });}
    catch(err){
      console.error(err);
    }
  };
  this is a fucntion that will make an api call to login function.
  for that we will use an npm package called axios.
  you can also use fetch.
  you can use any library.

CORS ERROR:it arises when you try to send an api call from one domain to another domain like from http://localhost:5173/login to http://localhost:7777/login.
if your api are not of same domain such errors will be thrown and this error arises at browser level.

so even if you change your ip to localhost for both you will get the error. so even port number matters.

you will use an imp package over here in backend code 
you'll use express cors package. use it as a middleware. 
like this in app.js:
const cors = require("cors");

app.use(cors());
before that do npm i cors

by this you can now login from ui.

now if you go to application and check if token is set in cookies you will find that it isn't. this is because axios doesnt allow tokens to be visible in unsecured browser.
app.use(cors({
  // whitelisting the domain name
    origin: "http://localhost:5173",
    credentials:true,
}));
here 

you also have to set credentials in your frontend as well.
after doing both you will see your token in cookies.
so now the token is set in cookies.
