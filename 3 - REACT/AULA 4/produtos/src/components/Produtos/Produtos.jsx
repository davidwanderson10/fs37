import { useState, useEffect } from 'react'
import './Produtos.css'

export default function Produtos () {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fecthProduts() {
            try {
                setLoading(true)
                const response = await fetch('https://fakestoreapi.com/products?limit=4')
                const data = await response.json
                setProducts(data)
            } catch(err) {
                setError(err.message)
            }
            
        }
    })



    return (''
    )
}

