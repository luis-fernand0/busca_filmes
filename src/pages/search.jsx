import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../css/movie_cards/movie_cards.css'
import '../css/responsive/movie_cards_responsive.css'
import BtnPages from '../components/paginas/pages'

const apiKey = import.meta.env.VITE_API_KEY
const apiImg = import.meta.env.VITE_IMG
const apiSearch = import.meta.env.VITE_SEARCH

function Search() {

  const [searchParams, setSearchParams] = useSearchParams()
  const [filme, setFilme] = useState([])

  const query = searchParams.get(`query`)
  const page = searchParams.get(`page`)

  async function Filme() {
    const url = `${apiSearch}?query=${query}&page=${page}?&${apiKey}&language=pt-BR&append_to_response=videos,images`
    const response = await fetch(url)
    const data = await response.json()
    
    setFilme(data.results)
  }

  useEffect(() => {
    Filme()
  }, [query, page])

  return (
    <div>
      <ul className='cards'>
        {filme && filme.map((movie) =>
          <li className='movies-cards' key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img className='poster' src={`${apiImg}${movie.poster_path}`}
              alt={`${movie.title} poster`} />
            </Link>

            <div className='movie-name-and-stars'>
              <Link>
                <p className='text movie-name'> {movie.title} </p>
              </Link>
            
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

      <BtnPages/>
    </div>
  )
}

export default Search
