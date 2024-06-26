import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../css/movie_cards/movie_cards.css'
import '../css/responsive/movie_cards_responsive.css'

import BtnPages from '../components/paginas/pages'

const urlMovies = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const apiImg = import.meta.env.VITE_IMG

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams([])
  const [topMovies, setTopMovies] = useState()
  const [totalPages, setTotalPages] = useState()

  const page = searchParams.get('page')

  function AppendUrl (totpage) {
    /*
    ESSA FUNÇÃO ADICIONA UM NOVO PARAMENTRO NA URL DO BROWSER ASSIM PODEMOS LER
    DINAMICAMENTE QUANTAS PAGINAS TEM CADA SETOR, POR EXEMPLO QUANTAS PAGINAS TEM O TOP RATED OU POPULAR FILMS
    */
    const params = new URLSearchParams(searchParams)
    if (totpage === undefined) return //VERIFICAMOS SE TOTPAGE ESTÁ UNDEFINED OU NÃO SE TIVER ELE VAI ESPERAR ATÉ QUE A FUNÇÃO FILMES RESPONDA
    params.set(`total_pages`, `${totpage}`)
    setSearchParams(params)
  }
  
  async function Filmes () {
    if (page === null) return
    const url = `${urlMovies}top_rated?${apiKey}&page=${page}?&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    
    setTopMovies(data.results)
    setTotalPages(data)
  }

  useEffect(() => {
    Filmes()
    AppendUrl(totalPages && totalPages.total_pages) // GARANTINDO QUE TOTALPAGES NÃO SEJA UNDEFINED
  },[page])

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
              <Link to={`/movie/${movie.id}`}>
                <p className='text movie-name'> {movie.title} </p>
              </Link>

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

      <BtnPages/>
    </>
  )
}

export default Home
