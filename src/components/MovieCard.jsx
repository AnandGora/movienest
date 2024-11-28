import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function MovieCard({ $id, title, movie_poster_url, description}) {
    
  return (
    <Link
      to={`/movie/${$id}`}
      className="mt-4 text-lg font-semibold transition-all duration-300 transform hover:scale-110"
    >
    <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
    {/* Movie Poster as Background */}
      <div
        className="w-full h-64 bg-cover bg-center rounded-t-lg transition-all duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${movie_poster_url})` }}
      ></div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white truncate">{title}</h3>
      </div>
    </div>  
    </Link>
  )
}


export default MovieCard