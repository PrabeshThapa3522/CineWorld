import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};



export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};


// // Admin Authentication API call
// export const sendAdminAuthRequest = async (data) => {
//   try {
//     const response = await fetch("http://localhost:9001/admin/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     return response.json(); // Assuming response contains `id` and `token`
//   } catch (err) {
//     console.error("API error:", err);
//     throw err;
//   }
// };

axios.defaults.baseURL = "http://localhost:9001"; // Make sure backend URL is correct

export const sendAdminAuthRequest = async (inputs, isLogin = true) => {
  try {
    const endpoint = isLogin ? "login" : "signup";
    const res = await axios.post(`/admin/${endpoint}`, inputs);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, data: err.response?.data || { message: "Request failed" } };
  }
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

  if (!adminId || !token) {
    console.error("Admin not logged in");
    return null;
  }

  try {
    const res = await axios.get(`/admin/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching admin details:", err);
    return null;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch movie details");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post("/booking", bookingData);
    if (response.status !== 200) {
      throw new Error("Failed to create booking");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumbers, // <-- Changed from seatNumber to seatNumbers
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  console.log(res);
  return res.data;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};


export const addMovie = async (data) => {
  try {
    const res = await axios.post(
      "/api/movie/add", // matches backend
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured, // fix typo
        actors: data.actors,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error adding movie:", err.response?.data || err);
    throw err;
  }
};

