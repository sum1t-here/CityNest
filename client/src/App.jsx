import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Home, Profile, Signin, Signout } from './Pages';
import { Header } from './Components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-out' element={<Signout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
