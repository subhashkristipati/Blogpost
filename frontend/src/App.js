import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';


import DataProvider from "./context/DataProvider";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Details from "./pages/Details";
import Update from "./pages/UpdatePost";
import Myposts from "./pages/Myposts";

const PrivateRoute = ({ ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return token ?
    <>
      <Navbar />
      <Outlet />
    </> : <Navigate replace to='/account' />
};


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(
    sessionStorage.getItem('accessToken') !== null
  );

  return (
    <DataProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<Details />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/myposts' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/myposts' element={<Myposts />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
