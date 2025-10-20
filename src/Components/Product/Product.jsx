import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import styles from './Product.module.css'
import Spinner from '../Loader/Spinner'

function Product() {
  const [Products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
    .then((res) => {
    setProducts( res.data)
    isLoading(false) 
  }).catch((err) => {
    console.log(err)
    isLoading(false)
  })
  }, [])

  return (
     <>

      {
        isLoading ? (<Spinner />) : ( <section className={styles.products__container}>
      {Products.length > 0 ? (
        Products.map((singleProduct) => (
          <ProductCard key={singleProduct.id}
           product={singleProduct}
           renderAdd={true}
           addToCart={(item) => console.log("Added:", item)}
            />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </section>)
      }
       
     </>
  )
}

export default Product
