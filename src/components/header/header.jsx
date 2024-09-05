import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './header.css'
import './header_responsive.css'

const Header = () => {
    return (
        <header>
            <div className='icon-titulo'>
                <div className='icon-video'>
                    <FontAwesomeIcon className='icon' icon={faVideo} style={{ color: "#b33636" }} />
                </div>

                <div className='titulo'>
                    <Link to='/'><h1 className='title'>BUSCA FILMES</h1></Link>
                </div>

                <div></div>
            </div>

        </header>
    )
}

export default Header