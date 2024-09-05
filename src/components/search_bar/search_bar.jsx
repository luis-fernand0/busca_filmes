import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import './search_bar.css'
import './search_bar_responsive.css'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!search) return
        
        navigate(`search?query=${search}&page=1`)
        setSearch('')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='input-search-button'>

                <input onChange={(e) => setSearch(e.target.value)} value={search}
                className='input' type="text" 
                placeholder='PESQUISAR FILMES' autoComplete='off'/>

                <button type='submit' className='button-search'> 
                    <FontAwesomeIcon className='icon-search' icon={faMagnifyingGlass} style={{ color: "#b33636" }} /> 
                </button>
            </form>  

        </>
    )
}

export default SearchBar