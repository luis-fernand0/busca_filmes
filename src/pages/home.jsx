import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../css/movie_cards/movie_cards.css'
import '../css/responsive/movie_cards_responsive.css'

const urlMovies = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const apiImg = import.meta.env.VITE_IMG

const Home = () => {

  const [topMovies, setTopMovies] = useState() 

  async function Filmes () {
    const url = `${urlMovies}top_rated?${apiKey}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    
    setTopMovies(data.results)
  }

  useEffect(() => {
    Filmes()
  }, [])

  return (
    <>
      <ul className='cards'>

        {topMovies && topMovies.map((movie) => 
          <li className='movies-cards ' key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img className='poster' src= {`${apiImg}${movie.poster_path}`} 
              alt={`${movie.title} poster`} />
            </Link>

            <div className='movie-name-and-stars'>
              <p className='text movie-name'> {movie.title} </p>

              <p className='text'>
                <FontAwesomeIcon className='stars' icon={faStar} style={{color: "#D0C80A"}} /> 
                {(movie.vote_average) && (movie.vote_average).toFixed(2)}
              </p>
            </div>

            <Link to={`/movie/${movie.id}`}>
              <button className='btn-detalhes' type="button">DETALHES</button>
            </Link>
          </li>)}

      </ul>
    </>
  )
}

export default Home
