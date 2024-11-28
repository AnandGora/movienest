import React, {useEffect, useState} from 'react'
import {Container, MovieForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditMovie() {
    const [movie, setmovies] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getMovie(slug).then((movie) => {
                if (movie) {
                    setmovies(movie)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return movie ? (
    <div className='py-8'>
        <Container>
            <MovieForm movie={movie} />
        </Container>
    </div>
  ) : null
}

export default EditMovie