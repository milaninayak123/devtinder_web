# DevTinder Frontend Development Notes

## Table of Contents
- [Setup and Configuration](#setup-and-configuration)
- [Tailwind CSS](#tailwind-css)
- [React Router Setup](#react-router-setup)
- [Component Design](#component-design)
- [Form Handling](#form-handling)
- [API Integration](#api-integration)
- [CORS Configuration](#cors-configuration)
- [State Management with Redux](#state-management-with-redux)
- [Navigation](#navigation)
- [Best Practices](#best-practices)

## Setup and Configuration

### Initial Setup
```bash
# Install dependencies
npm i
```

## Tailwind CSS

Tailwind is a CSS framework used in this project. We're also using DaisyUI as a component library on top of Tailwind.

### Configuration
Tailwind will be tracked in the files mentioned in `tailwind.config.js`:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

This configuration ensures Tailwind is applied to all the specified files.

## React Router Setup

Adding routing to your application:

1. Install React Router:
```bash
npm install react-router-dom
```

2. Setup in App.jsx:
```jsx
<BrowserRouter basename='/'>
  <Routes>
    <Route path="/" element={<Body />}>
      <Route path="/" element={<Feed />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/profile" element={<Profile />}/>
    </Route>
  </Routes>
</BrowserRouter>
```

3. Create base route component (Body.jsx) with Outlet for child routes:
```jsx
<div>
  <NavBar/>
  <Outlet/>
</div>
```

### Benefits of this Structure
- NavBar remains consistent across all pages
- Child components render within the Outlet
- Can add footer below Outlet for consistent presence across all pages

## Component Design

### Recommended Component Structure
```
Body
  |-- NavBar
  |-- Route=/ => Feed
  |-- Route=/login => Login
  |-- Route=/connections => Connections
  |-- Route=/profile => Profile
```

## Form Handling

### State Variables
```jsx
const [emailId, setEmailId] = useState();
const [password, setPassword] = useState();
```

### Input Handling
```jsx
<input 
  type="email" 
  onChange={(e) => setEmailId(e.target.value)} 
  value={emailId}
/>
```

## API Integration

### Making API Calls with Axios
```jsx
const handleLogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId,
        password,
      }, 
      {withCredentials: true}
    );
    // Handle response
  } catch(err) {
    console.error(err);
  }
};
```

## CORS Configuration

### Backend Configuration
```javascript
const cors = require("cors");

// Simple CORS setup
app.use(cors());

// Advanced CORS setup with domain whitelisting
app.use(cors({
  // Whitelisting the domain name
  origin: "http://localhost:5173",
  credentials: true,
}));
```

### Frontend Configuration
When making API calls that involve credentials (cookies, tokens):
```javascript
axios.post(url, data, {withCredentials: true});
```

## State Management with Redux

### Setup Redux Store
1. Create `utils/appStore.js`
2. Wrap application with Provider in App.jsx:
```jsx
<Provider store={appStore}>
  <BrowserRouter basename='/'>
    {/* Routes */}
  </BrowserRouter>
</Provider>
```

### Create Redux Slice
1. Create `utils/userSlice.js`
2. Define reducers and actions

### Using Redux in Components
```jsx
// Dispatch actions
const dispatch = useDispatch();
dispatch(addUser(userData));

// Subscribe to store
const user = useSelector((store) => store.user);
```

### Conditional Rendering with Redux State
```jsx
{user && (
  <div className="dropdown dropdown-end mx-5">
    {/* Profile dropdown content */}
  </div>
)}
```

## Navigation

### Using useNavigate Hook
```jsx
// Import
import { useNavigate } from 'react-router-dom';

// Inside component
const navigate = useNavigate();

// Navigate after login
const handleLogin = async () => {
  try {
    // API call
    dispatch(addUser(res.data));
    return navigate("/"); // Navigate to feed
  } catch(err) {
    console.error(err);
  }
};
```

## Best Practices

### Code Organization
- Keep components in a dedicated components folder
- Store utility functions and constants in utils folder

### Avoid Hardcoding
- Store API URLs and other constants in a separate file:
```javascript
// utils/constants.js
export const BASE_URL = "http://localhost:7777";
```

### Remember JSX vs HTML
- When working with React, always use JSX syntax, not HTML
- Component names should be PascalCase (e.g., NavBar, not navbar)




ep-17
if not logged in you should be directed to login page.
if loggedin should be redirected to feed page.
when you refresh you should not be logged out.
as soon as your body component loads in body.jsx check if token is present or not. if present then try to get the profile of the user.
when a user logins token is set. 
so in your body as soon as page will load fetch the profile of user using a fucntion.
when you refresh , your store refreshes but you shouldnt get loggedout.
how to build that feature?
go to body. the root of your app.
so in your body as soon as page will load as you are logged in it will get you the profile of user.

const Body = () => {
  const dispatch = useDispatch();
  //this will fetch the profile of user
  const fetchUser = async () => {
    //update the store
    try{
    const res = await axios.get
    //you will make a profile api call
    //will give the info of loggedin user.
    (BASE_URL + "/profile/view" , {
      withCredentials: true,
    });
  }catch(err){
    console.log(err);
  }
}

after fetching update your store with res.data and do that using dispatch hook the dispatch an action.
below is how it will be done:
BELOW IS HOW TO MAKE SURE WE DONT LOG OUT IF REFRESH THE PAGE:
ALSO USING THE BELOW CODE WE CAN MAKE SURE THAT WITHOUT LOGGING IN WE CANNOT ACCESS THE / OR HOME PAGE. IT WILL REDIRECT US TO LOGIN PAGE IF WE TRY TO DO THAT.
import {addUser} from "../utils/userSlice"
const Body = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    //update the store
    try{
    //you will make a profile api call
    //will give the info of loggedin user.
    const res = await axios.get(BASE_URL + "/profile/view" , {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  }catch(err){
    console.log(err);
  }
};


useeffect: when my component loads whatever you write inside this will happen in the first load of the component.
after the component is loaded this useeffect is called.
e.g:
useEffect(()=>{
  fetchUser();
} , []);
over here we will fetch the user as soon as the component loads.

//as you login and are in the feed page and as soon as page / component is loaded 2 api calls are made.
2 times we are in "Strict" mode in dev.
if you remove that from main.jsx .
2 times is to reverify if the render is working well. 

so after above code if you refreshyou will not log out.

note: error 401 means unauthorized error.
so only when you get this error i.e not logged in redirect to login page for other errors dont.
}catch(err){
    if(err.status==401){
      navigate("/login");
    }
    navigate("/login");
    console.log(err);
  }

so you cannot access any page unless you are loggedin.
and the login is wrtten inside body.jsx:
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    //update the store
    try{
    //you will make a profile api call
    //will give the info of loggedin user.
    const res = await axios.get(BASE_URL + "/profile" , {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  }catch(err){
    if(err.status==401){
      navigate("/login");
    }
    console.log(err);
  }
};
IMP:
so as soon as my applixation starts it will check if token is valid it logs you in. else it redirects you to login page.

once you have data in redux you dont want to make api call again and agin.
to do that check the store in your body.

  const userData = useSelector((store) => store.user);
  get the user data.
  if user data is not present then only make the api call.
  const fetchUser = async () => {
    //update the store
    if(userData) return;
    try{

so summary:
-- you should not be able to access other routes without login.
-- it token is not present redirect user to login page.