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