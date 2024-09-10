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

  function AppendUrl(totpage) {
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
    
    /* 
      ESSE TRECHO DE CODIGO, EM ESPECIFICO AS LINHAS(36 ATÉ A 43) SERVE COMO UMA CHECAGEM DOS FILMES. QUANDO O USUARIO FAZIA A BUSCA DOS FILMES OCORRIA QUE MOSTRAVA BASTANTE FILMES QUE NA MINHA OPNIÃO NÃO DEVERIAM ESTAR ALI, EXEMPLO: FILMES COM STAR 0 OU FILMES SEM POSTER, MUITAS VEZES ESSES FILMES NÃO TINHAM NADA PARA EXIBIR, NEM SINOPSE, ELENCO, STREAMING E MUITO MENOS TRAILER, ENTÃO OPTEI POR TIRAR ESSES FILMES 
     */

    var checkFilmes = [] // AQUI CRIAMOS UM ARRAY VAZIO QUE NOS SERVIRA PARA ARMAZENAR OS FILMES QUE REALMENTE SÃO VALIDOS

    for (let i = 0; i < data.results.length; i++) { // AQUI CRIAMOS UM LAÇO FOR QUE IRA ITERAR SOBRE CADA FILME QUE FOI RETORNADO EM data.results
      
      if (data.results[i].vote_average > 0 && data.results[i].poster_path) { // AQUI FAZEMOS A VERIFICAÇÃO DO FILMES, VERIFICAMOS SE O FILME TEM ESTRELAS E SE O FILME TEM ALGUM POSTER
        checkFilmes.push(data.results[i]) // SE O FILME PASSAR NA VERIFICAÇÃO, ELE VAI SER ADICIONADO DENTRO DO ARRAY
      }
    }

    setFilme(checkFilmes) // AQUI O ARRAY DE FILMES VALIDOS É USADO PARA ATUALIZAR O ESTADO DO COMPONENTE ASSIM EXIBINDO ELES NA TELA
    AppendUrl(data.total_pages)
  }

  useEffect(() => {
    Filme()
  }, [query, page])

  return (
    <>
      <h1 className='names-titles'>Titulos com nome: {query}</h1>

      <Cards movies={filme} />

      <BtnPages />
    </>
  )
}

export default Search
