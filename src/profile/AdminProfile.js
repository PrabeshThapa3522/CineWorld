

import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AdminProfile.css";  // Import custom CSS for styling

const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-profile-container">
      <Fragment>
        {admin && (
          <div className="profile-info-container">
            <AccountCircleIcon className="profile-icon" />
            <div className="admin-email">
              <p>Email: {admin.email}</p>
            </div>
          </div>
        )}

        {admin && admin.addedMovies.length > 0 && (
          <div className="movies-container">
            <h3>Added Movies</h3>
            <div className="movie-list">
              {admin.addedMovies.map((movie, index) => (
                <div className="admin_profile_movie_item" key={index}>
                  <p>Movie: {movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default AdminProfile;
