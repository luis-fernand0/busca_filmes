import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../css/movie_cards/movie_cards.css'
import '../css/responsive/movie_cards_responsive.css'

const apiKey = import.meta.env.VITE_API_KEY
const apiImg = import.meta.env.VITE_IMG
const apiSearch = import.meta.env.VITE_SEARCH

function Search() {

  const [searchParams] = useSearchParams([])
  const [filme, setFilme] = useState([])

  const query = searchParams.get(`query`)

  async function Filme() {
    const url = `${apiSearch}?query=${query}&${apiKey}&language=pt-BR&append_to_response=videos,images`
    const response = await fetch(url)
    const data = await response.json()
    
    setFilme(data.results)
  }

  useEffect(() => {
    Filme()
  }, [query])

  return (
    <div>
      <ul className='cards'>
        {filme && filme.map((movie) =>
          <li className='movies-cards ' key={movie.id}>
            <img className='poster' src={`${apiImg}${movie.poster_path}`}
              alt={`${movie.title} poster`} />

            <div className='movie-name-and-stars'>
              <p className='text movie-name'> {movie.title} </p>

              <p className='text stars'>
                <FontAwesomeIcon icon={faStar} style={{ color: "#D0C80A" }}/>
                {(movie.vote_average) && (movie.vote_average).toFixed(2)}
              </p>
            </div>

            <Link to={`/movie/${movie.id}`}>
              <button className='btn-detalhes' type="button">DETALHES</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Search
