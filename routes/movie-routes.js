
import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  getMovies,
} from "../controllers/movie-controller.js";
const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/add", addMovie);
movieRouter.get("/movies", getMovies);

export default movieRouter;

