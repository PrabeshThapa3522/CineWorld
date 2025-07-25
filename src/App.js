
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AddMovie from "./components/Movies/AddMovie";
import Movies from "./components/Movies/Movies";
import AdminProfile from "./profile/AdminProfile";
import UserProfile from "./profile/UserProfile";
import Footer from "./components/Footer/Footer"; // Footer is imported here

import { adminActions, userActions } from "./store";
import FootballPage from "./components/FootballPage";
import CricketPage from "./components/CricketPage";
import { getAllMovies } from "./api-helpers/api-helpers"; 

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  const [ setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        // Sort movies by release date (newest first)
        const sortedMovies = data.movies.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        setMovies(sortedMovies);
      })
      .catch((err) => console.log(err));
  }, [setMovies]);


  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
              
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </>
          )}
          
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/events/football" element={<FootballPage />} /> 
               <Route path="/events/cricket" element={<CricketPage />} />
                  
          
        </Routes>
        

      </section>
      <Footer /> {/* Footer component here */}
    </div>
  );
}

export default App;
