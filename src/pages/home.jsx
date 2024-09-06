import Cards from '../components/cards/cards'
import BtnPages from '../components/paginas/pages'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const urlMovies = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams([])
  const [topMovies, setTopMovies] = useState()

  const page = searchParams.get('page')

  function AppendUrl (totpage) {
    const params = new URLSearchParams(searchParams)
    if (totpage === undefined) return
    params.set(`total_pages`, `${totpage}`)
    setSearchParams(params)
  }
  
  async function Filmes () {
    if (page === null) return
    const url = `${urlMovies}top_rated?${apiKey}&page=${page}?&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].vote_average === 0 || !data.results[i].poster_path) {
        console.log(`esse filme n'ao existe`)
      }
    }

    console.log(data.results)
    setTopMovies(data.results)
    AppendUrl (data.total_pages)
  }
  
  useEffect(() => {
    Filmes()
  },[page])

  return (
    <>
      <Cards movies={topMovies}/>

      <BtnPages/>
    </>
  )
}

export default Home
