import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const BtnPages = () => {

    const [searchParams, setSearchParams] = useSearchParams([])
    const [page, setPage] = useState(1)

    const totalPages = searchParams.get(`total_pages`) //COMO AGORA A URL DO BROWSER PODE SER LIDA EU CONSIGO PEGAR O VALOR DE TOTAL PAGE E TRANFERIR PARA ESSE ARQUIVO ASSIM PODENDO FAZER A QUANTIDADE MAXIMA BEM DINAMICA

    function verificarClique (num) {
        if (num <= 0) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }

    function AtulizarPage () {
        const params = new URLSearchParams(searchParams)
        const obterquery = params.get(`query`)

        if (!searchParams.has(`page`) || searchParams.get(`page`) === null) {
            params.set(`page`, `${page}`)
            params.set(`query`, `${obterquery}`)
            setSearchParams(params)
        }

        else {
            params.set(`page`, `${page}`)
            params.set(`query`, `${obterquery}`)
            setSearchParams(params)
        }
    }

    useEffect (() => {
        AtulizarPage()
    }, [page])

    return (
        <>
            <button onClick={() => {verificarClique(page - 1)}}>Voltar pag</button>
            <p>{page}...{totalPages}</p>
            <button onClick={() => {setPage(page + 1)}}>Prox pag</button>
        </>
    )
}

export default BtnPages