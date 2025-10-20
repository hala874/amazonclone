import React, { useEffect, useState } from 'react'
import styles from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints'
import ProductCard from '../../Components/Product/ProductCard'
import Spinner from "../../Components/Loader/Spinner";

function Results() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams() 

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`) 
      .then((res) => {
        setResults(res.data)
        setIsLoading(false);
      })
      .catch((err) => 
        console.log(err))
        setIsLoading(false); 
  }, [categoryName])

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category / {categoryName}</p>
        <hr />
        <div className={styles.products__container}>
          {results?.map((product) => (
            <ProductCard
             key={product.id}
             product={product}
             renderDisc={false}
             renderAdd={true}
              />
          ))}
        </div>
      </section>
    </LayOut>
  )
}

export default Results

