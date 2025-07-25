
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";
import axios from "axios"; // Import axios for API calls
import "./Header.css"; // Add your custom styles here

const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Store the current search input
  const [data, setData] = useState([]); // Store search results
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();

  const fetchMovies = async (title) => {
    try {
      const response = await axios.get(`/movies/search?title=${title}`);
      setData(response.data.movie); // Set the search results from the backend
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) { // Trigger search when user types at least 3 characters
      fetchMovies(value);
    } else {
      setData([]); // Clear results if search term is less than 3 characters
    }
  };

  const handleMovieSelect = (val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    if (movie) {
      document.title = `MovieTickets - ${movie.title}`; // Set dynamic title
      if (isUserLoggedIn) {
        navigate(`/booking/${movie._id}`);
      }
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <i className="movie-icon">🎬</i> {/* You can use any icon here*/}
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Across Multiple Movies"
          value={searchTerm}
          onChange={handleChange} // Trigger fetch on change
        />
        {data.length > 0 && (
          <datalist id="movies">
            {data.map((movie) => (
              <option key={movie._id} value={movie.title} onClick={() => handleMovieSelect(movie.title)} />
            ))}
          </datalist>
        )}
      </div>
      <nav className="nav-links">
        <ul>
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <li>
                <NavLink to="/auth" className="nav-link">
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              </li>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <li>
                <NavLink to="/user" className="nav-link">
                  User
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => dispatch(userActions.logout())}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {isAdminLoggedIn && (
            <>
              <li>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" className="nav-link">
                  Add Movie
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => dispatch(adminActions.logout())}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

