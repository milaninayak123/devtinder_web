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
------
now install redux.
then create a folder utils under src.
under that create a file appStore.js
inside that create a store.

then wrap all your code in root file i.e app.jsx inside Provider.
 <Provider>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path ="/" element={<Body />} >
      <Route path ="/login" element={<Login />}/>
      <Route path ="/profile" element={<Profile />}/>
      </Route>
    </Routes>
    </BrowserRouter> 
    </Provider> 

    now in the provider i have to provide the store appStore.
    now you can use store inside body component and literally anywhere.
    this is a central store. your store consists of slices.
    and we can make diff types of slices.
    so create a slice called userSlice.js in a folder utils
    now we will store all data in redux store.
    how to do that? will do using hook dispatch.
    you dispatch an action.
      const dispatch = useDispatch();
      useDispatch(); is the hook.
      we will dispatch an action calld adduser like this:
        dispatch(addUser);
        addUser is created in userSlice.js.
        in adduser you will pass user.data and it will be stored in store.

now we will create a feature to show image of profile when user logins.
so what happens is when you login , your data gets stored in store but as you refresh it vanishes. \so your store is a central place. your navbar will read data from store.
you need to subscribe to the store.
use a hook called useSelector and in it the argument will be "what is it that you are subscribed to" i.e user.
now this function will get you the user from the store.

also if the user is not logged in no profile should be shown. for that do this in navbar.jsx:
{user && (
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
        )}
just add this line :{user && (
  
so here navbar is reading the store.and as soon as you login your profile image is being shown.
after login your feed should be visible.
so you handle the login , dispatch the action and navigate user to a diff url.
like this inside handlelogin func:

HOW TO NAVIGATE FROM ONE URL TO OTHER LIKE LOGIN TO FEED FOR E.G?
USE A HOOK CALLED NAVIGATE AND RETURN IT WITH THE PATH TO WHICH WE ARE SUPPOSED TO NAVIGATE MENTIONED.

  //call the hook
const navigate = useNavigate(); 
 const handleLogin =async ()=>{
     
    try{
    const res = await axios.post("http://localhost:7777/login",{
      email,
      password,
    } , {withCredentials: true}
  
  );
  
  dispatch(addUser(res.data));
  return navigate("/"); // this is the path to where you will navigate.
  you will go to feed.
  for that go to app.jsx add the feed component like below:
  <Routes>
      <Route path ="/" element={<Body />} >
      <Route path ="/" element={<Feed />}/>
      <Route path ="/login" element={<Login />}/>
      <Route path ="/profile" element={<Profile />}/>
      </Route>
    </Routes>
  then create a new Feed.jsx inside src folder.
  always remember to import feed login etc from their location  like ./feed.

REFACTORING CODE:
1. note: never hardcode url like this:
const handleLogin =async ()=>{
   
    try{
    const res = await axios.post(
      "http://localhost:7777/login",
      {
      email,
      password,
    } , 
    {withCredentials: true}
  
  );
  inside utils folder create a constants.js file and there add this.
  like this:
  in login.jsx:

  import { BASE_URL } from './utils/constants';
  //rest of code
  const handleLogin =async ()=>{
   
    try{
    const res = await axios.post(
      BASE_URL + "/login",
      {
      email,
      password,
    } , 
//rest of code
and in constants.js :
export const BASE_URL = "http://localhost:7777";

2. we've made a lot of components and ideally all of them should be in 1 folder like body feed footer etc not main.jsx.