import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../../css/movie_cards/movie_cards.css'
import '../../css/responsive/movie_cards_responsive.css'

const Cards = ({movies}) => {
    const filmes = movies
    const apiImg = import.meta.env.VITE_IMG

    return (
        <>
            <ul className='cards'>

                {filmes && filmes.map((movie) =>
                    <li className='movies-cards ' key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <img className='poster' src={`${apiImg}${movie.poster_path}`}
                                alt={`${movie.title} poster`} />
                        </Link>

                        <div className='movie-name-and-stars'>
                            <Link to={`/movie/${movie.id}`}>
                                <p className='text movie-name'> {movie.title} </p>
                            </Link>

                            <p className='text'>
                                <FontAwesomeIcon className='stars' icon={faStar} style={{ color: "#D0C80A" }} />
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

export default Cards
