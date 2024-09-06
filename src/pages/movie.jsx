import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons'

import '../css/movie_cards/movie_card.css'
import '../css/responsive/movie_card_responsive.css'

const urlMovies = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const apiImg = import.meta.env.VITE_IMG

const Movie = () => {

  const { id } = useParams()
  const [filme, setFilme] = useState()
  const [streaming, setStreaming] = useState()
  const [credits, setCredits] = useState()

  async function Filme() {
    const url = `${urlMovies}${id}?${apiKey}&language=pt-BR&append_to_response=videos,images`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.videos.results[0] || !data.overview) {
      const url = `${urlMovies}${id}?${apiKey}&language=en-US&append_to_response=videos,images`
      const response = await fetch(url)
      const data = await response.json()

      setFilme(data)
    } else {
      setFilme(data)
    }

  }

  async function Streaming() {
    const url = `${urlMovies}${id}/watch/providers?${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    setStreaming(data.results.BR)
  }

  async function Credits() {
    const url = `${urlMovies}${id}/credits?${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    setCredits(data)
  }

  useEffect(() => {
    Filme()
    Streaming()
    Credits()
  }, [])

  return (
    <div className='card-complet'>
      {filme && (

        <div className='movie scroll'>
          <div className='poster-trailer-overview'>

            <div className='poster-title'>
              <img className='movie-poster' src={`${apiImg}${filme.poster_path}`} alt={`${filme.title} poster`} />

              <p className='title-movie'>{filme.title}</p>
            </div>

            {filme.videos.results.length === 0 && <p className='trailer-error'>NO MOMENTO O FILME SE ENCONTRA SEM TRAILER... </p>}
            {filme.videos.results.length > 0 && <iframe className='movie-trailer' src={`https://www.youtube.com/embed/${filme.videos.results[0].key}`} width={`740px`} height={`415px`}></iframe>}

            {filme.overview.length === 0 ? <p className='overview scroll'>NO MOMENTO O FILME SE ENCONTRA SEM SINOPSE...</p> : <p className='overview scroll'>{filme.overview}</p>}

          </div>

          <div className='stars-and-time'>
            <p className='text'>
              <FontAwesomeIcon className='stars' icon={faStar} style={{ color: "#D0C80A" }} /> {(filme.vote_average).toFixed(2)}
            </p>
            <p className='text'>
              <FontAwesomeIcon className='time' icon={faClock} style={{ color: "#b33636" }} /> {filme.runtime} min
            </p>
          </div>

          <ul className='movie-genres'>
            {filme.genres.map(element =>
              <li className='genres' key={element.id}>{element.name}</li>
            )}
          </ul>

          <div className='title-and-elenco'>

            <div className='titles'>
              <h5 className='title-elenco'>ELENCO</h5>

              <h5 className='title-stars'>ESTRELAS</h5>
            </div>

            <div className='elenco scroll'>
              <ul className='actors-list'>
                {credits && credits.cast.map(actor =>
                  <li className='actor' key={actor.id}>
                    <p>
                      {actor.profile_path === null ? null : <img className='img-actor' src={`${apiImg}${actor.profile_path}`} alt={`actor ${actor.name} profile`} />}
                    </p>

                    {actor.profile_path === null ? <p className='actor-name'> {actor.name} </p> : <p className='actor-name'> {actor.name} </p>}
                  </li>
                )}
              </ul>
            </div>

            <div className='streaming'>
              <h6 className='title-streaming'>STREAMING</h6>
              <div className='logo'>
                {
                  streaming && (
                    streaming.flatrate ? (
                      <img className='streaming-logo' src={`${apiImg}${streaming.flatrate[0].logo_path}`} alt={`${streaming.flatrate[0].provider_name} logo`} />
                    ) : (
                      streaming.buy ? (
                        <img className='streaming-logo' src={`${apiImg}${streaming.buy[0].logo_path}`} alt={`${streaming.buy[0].provider_name} logo`} />
                      ) : (
                        streaming.rent ? (
                          <img className='streaming-logo' src={`${apiImg}${streaming.rent[0].logo_path}`} alt={`${streaming.rent[0].provider_name} logo`} />
                        ) : null
                      )
                    )
                  )
                }
              </div>

            </div>
          </div>

        </div >
      )}
    </div>
  )
}

export default Movie
