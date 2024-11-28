import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, MovieCard } from '../components';
import { Link } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const pageSize = 8; 

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

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <div className="relative w-full h-96 bg-cover bg-center"
                 style={{ backgroundImage: 'url(https://rukminim2.flixcart.com/image/850/1000/l2z26q80/poster/4/r/k/small-yaa-fast-furious-cool-art-effect-movie-poster-original-image72hwzkpexdg.jpeg?q=20&crop=false)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
                    <h1 className="text-5xl font-bold mb-4">Welcome to MovieNest</h1>
                    <p className="text-lg mb-6">Discover, watch, and share your favorite movies</p>
                    <Link to="/all-movies" className="bg-red-600 px-6 py-3 rounded-md text-xl hover:bg-red-500 transition">
                        Explore Movies
                    </Link>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="py-8">
                <Container>
                    <h2 className="text-3xl font-semibold mb-6">Popular Movies</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {movies.map((movie) => (
                            <div key={movie.$id} className="p-4 bg-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
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
        </div>
    );
}

export default Home;

