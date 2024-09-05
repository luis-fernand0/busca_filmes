import BtnPages from '../components/paginas/pages'
import Cards from '../components/cards/cards'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const apiKey = import.meta.env.VITE_API_KEY
const apiSearch = import.meta.env.VITE_SEARCH

function Search() {

  const [searchParams, setSearchParams] = useSearchParams()
  const [filme, setFilme] = useState([])

  const page = searchParams.get(`page`)
  const query = searchParams.get(`query`)

  function AppendUrl (totpage) {
    const params = new URLSearchParams(searchParams)
    if (totpage === undefined) return
    params.set(`total_pages`, `${totpage}`)
    setSearchParams(params)
  }


  async function Filme() {
    if (page === null) return
    const url = `${apiSearch}?query=${query}&page=${page}?&${apiKey}&language=pt-BR&append_to_response=videos,images`
    const response = await fetch(url)
    const data = await response.json()
    
    setFilme(data.results)
    AppendUrl(data.total_pages)
  }

  useEffect(() => {
    Filme()
  }, [query, page])

  return (
    <>
      <h1 className='names-titles'>Titulos com nome: {query}</h1>

      <Cards movies={filme}/>

      <BtnPages/>
    </>
  )
}

export default Search
