import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, MovieCard } from '../components';
import appwriteService from "../appwrite/config";

function Search() {
  const { query } = useParams(); // Query from the route
  const [movies, setMovies] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  const queryText = query ? query.replace(/-/g, " ") : "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        // Calculate offset for API request
        const offset = (currentPage - 1) * pageSize;

        // Fetch movies from Appwrite
        const response = await appwriteService.getMovies([], pageSize, offset);

        if (response && response.documents) {
          // Filter the movies by search query (case-insensitive)
          const filteredMovies = response.documents.filter((movie) =>
            movie.title.toLowerCase().includes(queryText.toLowerCase())
          );

          // Set the filtered movies and the total number of filtered results
          setMovies(filteredMovies);
          setTotalDocuments(filteredMovies.length); // Total filtered documents
        } else {
          setMovies([]);
          setTotalDocuments(0);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryText, currentPage]); // Ensure dependencies are correct

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className='w-full py-8 bg-black'>
      <Container>
        <h1 className="text-white text-2xl mb-4">
          Search Results for "{queryText}"
        </h1>
        {movies.length > 0 ? (
          <div className='flex flex-wrap'>
            {movies.map((movie) => (
              <div key={movie.$id} className='p-2 w-1/4'>
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white">No movies found.</div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Search;
