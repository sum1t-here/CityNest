import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  About,
  CreateListing,
  Home,
  Listing,
  Profile,
  Signin,
  Signout,
  Signup,
  UpdateListing,
} from './Pages';
import { Header, PrivateRoute } from './Components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-out' element={<Signout />} />
        <Route path='/about' element={<About />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
