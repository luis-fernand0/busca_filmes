import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import './pages.css'
import '../../css/movie_cards/movie_cards.css'

const BtnPages = () => {

    const [searchParams, setSearchParams] = useSearchParams([])
    const [page, setPage] = useState(1)

    const totalPages = searchParams.get(`total_pages`)

    function verificarVoltarPage (num) {
        if (num <= 0) {
            setPage(1)
        } else {
            setPage(page - 1)
        }
    }

    function verificarProxPage (num) {
        if (num >= totalPages) {
            setPage(totalPages)
        } else {
            setPage(page + 1)
        }
    }

    function AtulizarPage () {
        const params = new URLSearchParams(searchParams)
        const obterquery = params.get(`query`)

        if (!searchParams.has(`page`) || searchParams.get(`page`) === null) {
            params.set(`query`, `${obterquery}`)
            params.set(`page`, `${page}`)
            params.set(`total_pages`, `${totalPages}`)
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
            <div className='btns'>
                <button className='btn btn-voltar' onClick={() => {verificarVoltarPage(page - 1)}}>VOLTAR PAG</button>

                <p className='texto-pages'>{page}...{totalPages}</p>

                <button className='btn btn-prox' onClick={() => {verificarProxPage(page + 1)}}>PROX PAG</button>
            </div>
        </>
    )
}

export default BtnPages