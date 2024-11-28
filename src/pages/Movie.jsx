import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Movie() {
  const [movie, setMovie] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = movie && userData ? movie.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getMovie(slug).then((movie) => {
        if (movie) setMovie(movie);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deleteMovie = () => {
    appwriteService.deleteMovie(movie.$id).then((status) => {
      if (status) {
        navigate("/");
      }
    });
  };

  return movie ? (
    <div className="py-12 bg-black text-white">
      <Container>
        {/* Movie Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10">
          {/* Movie Poster */}
          <div className="w-full lg:w-1/3 rounded-lg overflow-hidden shadow-lg">
            <img
              src={movie.movie_poster_url}
              alt={movie.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-4xl font-extrabold text-red-500 mb-4">{movie.title}</h1>
            <p className="text-lg text-gray-400 mb-4">
              <strong>Category:</strong>{" "}
              {movie.category.map((cat, index) => (
                <Link
                  key={index}
                  to={`/all-movies/${cat}`}
                  className="text-blue-400 hover:underline"
                >
                  {cat}
                </Link>
              ))}
            </p>
            <p className="text-lg text-gray-400 mb-4">
              <strong>Genre:</strong> {movie.genre.join(", ")}
            </p>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Release Year:</strong> {movie.release_year}
            </p>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Director:</strong> {movie.director}
            </p>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Cast:</strong> {movie.actors}
            </p>
            <div className="text-gray-300 mb-6">{parse(movie.description)}</div>

            {/* Action Buttons */}
            {isAuthor && (
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Link to={`/edit-movie/${movie.$id}`}>
                  <Button bgColor="bg-green-500 hover:bg-green-600">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deleteMovie}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Movie Download Section */}
        {movie.download_link && movie.download_link.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Download Links</h2>
            <div className="flex items-center justify-center">
              {movie.download_link.map((link, index) => (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="bg-red-500 hover:bg-red-600 text-white text-center py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Download 
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  ) : (
    <div className="text-center text-white py-8">Loading...</div>
  );
}