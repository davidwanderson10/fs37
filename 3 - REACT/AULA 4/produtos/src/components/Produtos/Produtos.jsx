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
                const response = await fetch('https://fakestoreapi.com/products?limit=10')

                if (!response.ok){
                    throw new Error("Erro ao carregar os produtos!")
                }

                const data = await response.json();
                setProducts(data)
            } catch(err) {
                setError(err.message)
            }
            
        }
        fecthProduts();
    },[]);

    const resultado = products.length > 0 ? products[1] : ''
    return (
        <div className='grid'>
            {products.map((product) => (
                <div key={product.id} className='card'>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title}/>
                    <p>R$ {product.price}</p>
                </div>            
            ))}
        </div>
    )
}

