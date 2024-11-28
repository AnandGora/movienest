import React, { useState, useEffect } from 'react';
import { Container, MovieCard } from '../components';
import appwriteService from "../appwrite/config";

function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // You can adjust the page size as needed

  // Fetch movies when the page or currentPage changes
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    const offset = (page - 1) * pageSize;
    const response = await appwriteService.getMovies([], pageSize, offset);

    if (response && response.documents) {
      setMovies(response.documents);
      setTotalDocuments(response.total);
    }
  };

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='w-full py-8 bg-black'>
      <Container>
        <h2 className="text-white text-2xl mb-6">All Movies</h2>
        <div className='flex flex-wrap'>
          {movies.map((movie) => (
            <div key={movie.$id} className='p-2 w-1/4'>
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
        
         {/* Pagination Controls */}
         <div className="flex justify-center mt-6">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 mx-1 border rounded ${
                                    currentPage === index + 1
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
      </Container>
    </div>
  );
}

export default AllMovies;
