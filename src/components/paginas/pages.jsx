import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const BtnPages = () => {

    const [searchParams] = useSearchParams([])
    const [page, setPage] = useState(1)

    return (
        <>
            <button onClick={() => { setPage(page - 1) } }>Voltar pag</button>
            <p>{page}...teste</p>
            <button onClick={() => { setPage(page + 1) } }>Prox pag</button>
        </>
    )
}

export default BtnPages