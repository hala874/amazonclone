import React from 'react'
import styles from './ProductDetail.module.css'
import { useEffect, useState } from "react";
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from "axios";
import ProductCard from '../../Components/Product/ProductCard';
import Spinner from '../../Components/Loader/Spinner';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  return (
   <LayOut>
      {isLoading ? (
        <Spinner />
      ) : (
        <ProductCard
          product={product}
          flag
          flex={true}
          renderDisc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  )
}

export default ProductDetail
