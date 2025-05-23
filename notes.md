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
- [Authentication and Route Protection](#authentication-and-route-protection)
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

## Authentication and Route Protection

### Persistent Authentication

One of the key features in a modern web application is maintaining the user's authentication state even after page refresh. This is implemented in the root component (`Body.jsx`) to ensure all routes are properly protected.

#### Token-Based Authentication Flow

When a user logs in:
1. The server returns the user data and sets an authentication token in cookies
2. The token is automatically included in subsequent API requests (using `withCredentials: true`)
3. On page refresh, the application checks for the token and fetches the user profile

#### Implementation in Body Component

```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // Skip API call if user data is already in Redux store
    if (userData) return;
    
    try {
      // Fetch the profile of the logged-in user
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      
      // Update Redux store with user data
      dispatch(addUser(res.data));
    } catch (err) {
      // If unauthorized (401), redirect to login page
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  // Call fetchUser when component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
```

### Route Protection Mechanism

This implementation provides several key features:

1. **Automatic Authentication Check**: When the application loads, it automatically checks if the user is logged in by validating the token.

2. **Redirect to Login**: If no valid token is found (resulting in a 401 Unauthorized error), the user is redirected to the login page.

3. **Persistent Login**: If a valid token exists in cookies, the user remains logged in even after refreshing the page.

4. **Redux Store Optimization**: By checking if user data already exists in the Redux store (`if (userData) return;`), we avoid unnecessary API calls.

### Development Mode Considerations

In React's development mode with StrictMode enabled (in `main.jsx`), the `useEffect` hook may run twice during initial render. This is a verification mechanism and not an issue with your code. This behavior only occurs in development mode, not in production.

```jsx
// In main.jsx, StrictMode causes double rendering in development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Error Handling Best Practices

When handling authentication errors, it's important to check the specific error status:

```jsx
catch (err) {
  // Only redirect on authentication errors (401)
  if (err.response && err.response.status === 401) {
    navigate("/login");
  }
  console.log(err);
}
```

### Summary

This authentication flow ensures:
- Users cannot access protected routes without logging in
- Authentication state persists across page refreshes
- The application efficiently manages user data by leveraging Redux
- Error handling is appropriately implemented to handle different scenarios

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


LOGOUT API:
this will clear your cookies.
also when you logout you need to logout and redirect you to login page.

const NavBar = () => {
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {withCredentials : true}
      );
    dispatch(removeUser());    
    }catch(err){
      
    }
  };

  how to clear data from redux?
  you have to dispatch an action of remove user. you had created that dispatch in userSlice.js.
  so ass soon as your redux store will be cleared you will be loggedout.

  here is the below code:
  const NavBar = () => {
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {withCredentials : true}
      );
    dispatch(removeUser());   
    return navigate("/login"); 
    }catch(err){
      
    }
  };



  return (
          <div className="navbar bg-base-300">
      <div className="flex-1">
      <Link to ="/" className="btn btn-ghost text-xl flex items-center gap-2">
                <img src={logodevtinder} alt="DevTinder Logo" className="w-35 h-11" />
              
      </Link>
      </div>
      {user && (
      <div className="flex-none gap-2">
        <div className="form-control">👾 Connected: {user.firstName}
        </div>
        <div className="dropdown dropdown-end mx-5 flex">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="user photo"
                src={user.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
      )}
    </div>
    
  );
};

now add validations and error msgs for handling cases like if email or pw is wrong.

FEED FEATURE:
in the feed profile we have to make an api call to get the feed.
get the feed by getting response.
add the feed to store.
you will need a feedSlice in utils folder to store the feed.
write the code for it , writeb reducers then export it.

then add your feedreducer to appStore.
then in feed.jsx dispatch action to get the feed.
we will dispatch an addfeed action which will have our res.data.
once you have added your feed to the store you can read the feed as well. by useselector.
useselector gives you access to the store.
also if feed is already present just return and if feed is null then getFeed().
call the useEffect func so that as soon as the page loads you will get the getFeed() page.

now that feed page is prepared , prepare cards.
for that create a file in components i.e UserCard.jsx.
inside that do rafce and then add the code of a card you got from daisy ui like this:
import React from 'react'

const UserCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default UserCard

after this import this in your feed file.

  useEffect(()=>{
    getFeed();

  },[]);
  return (
    <div className="flex justify-center my-10">
      <UserCard/>
    </div>
  )
} like this.

return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  );
}
it means when my feed is present then only load the cards else dont.


now edit profile.
//it will show profile and edit profile

import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = () => {
  const user = useSelector((store)=>store.user);
  return (
    user && (
    <div><EditProfile user= {user} /></div>
  )
);
}

export default Profile
  const user = useSelector((store)=>store.user);
  add this line to prefill your form with current data of user profile.
  this is done in profile.jsx
  in editProfile.jsx do this:
  import React from 'react'
import { useState } from 'react';
const EditProfile = ({user}) => {
      const [firstName , setFirstName] = useState(user.firstName);
      const [lastName , setLastName] = useState("");
      const [age , setAge] = useState("");
      const [gender , setgender ] = useState("");
      const [ about, setAbout] = useState("");
      const [photoUrl , setPhotoUrl] = useState("");

      const [error , setError] = useState("");
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-xl">
<div className="card-body">
  <h2 className="card-title justify-center">Edit Profile</h2>
  <div>
  <label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">First Name</span>
</div>
<input 
type="text"
value={firstName}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setFirstName(e.target.value)}
/>
</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">Last Name</span>
</div>
<input 
type="text"
value={lastName}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setlastName(e.target.value)}
/>
</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">Age</span>
</div>
<input 
type="text"
value={age}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setAge(e.target.value)}
/>
</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">Gender</span>
</div>
<input 
type="text"
value={gender}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setgender(e.target.value)}
/>
</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">Bio</span>
</div>
<input 
type="text"
value={about}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setAbout(e.target.value)}
/>
</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
  <span className="label-text">Edit Picture</span>
</div>
<input 
type="text"
value={photoUrl}
placeholder="" className="input input-bordered w-full max-w-xs"
onChange={(e)=>setPhotoUrl(e.target.value)}
/>
</label>

  </div>
  
  <p className="text-red-500">{error}</p>
  <div className="card-actions justify-center m-2">
    <button className="btn btn-primary">Save Profile</button>
    
  </div>
</div>
</div>
</div>
  )
}

export default EditProfile

HOW TO SAVE YOUR DATA:

      const saveProfile = async() => {
        try{
            const res = await axios.patch(BASE_URL + "profile/edit", {firstName , lastName , photoUrl , age , gender , about },
                {withCredentials:true}
            );
        }catch(err){
            setError(err.message);
        }
      }

check below:
const EditProfile = ({user}) => {
      const [firstName , setFirstName] = useState(user.firstName);
      const [lastName , setLastName] = useState(user.lastName);
      const [age , setAge] = useState(user.age);
      const [gender , setgender ] = useState(user.gender);
      const [ about, setAbout] = useState(user.about);
      const [photoUrl , setPhotoUrl] = useState(user.photoUrl);
      const [error , setError] = useState("");
      const dispatch = useDispatch();

      const saveProfile = async() => {
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName , lastName , photoUrl , age , gender , about },
                {withCredentials:true}
            );
            dispatch(addUser(res?.data?.data))
        }catch(err){
            setError(err.message);
        }
      }
dispatch(addUser(res?.data?.data))
by this store will be updated.


about-text area
gender - dropdown

ep 18
1. 2 features: interested and ignore
interested means sending a connection request to someone.
2. see my connection requests.
3. see my connections.

HOW TO CONNECT FRONTEND WITH BACKEND:
FOR E.G CONNECTIONS API:
const Connections = () => {
    //make an api call to fetch the data
    //it will make an api call to our backened 
    //keep a try catch block to handle errors

    const fetchConnections = async() => {
        try{
            //make an api call
            const res = await axios.get(BASE_URL+ "/user/connections" , {
                withCredentials: true,
            });
            console.log(res);
        }catch(err){

        }
    }
  return (
    <div>

    </div>
  )
}

export default Connections

REMEMBER THIS syntax:
  useEffect(()=>{

    } , [])
  

Creating SIGNUP:
use the same page for login and signup.
