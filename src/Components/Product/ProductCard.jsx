import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating'
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import styles from './Product.module.css'
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from '../../Utility/action.type'

function ProductCard({ product, flex,renderDisc,renderAdd }) {
  const { id, image, title, price, rating,description } = product;
  const [state, dispatch] = useContext(DataContext)
  console.log(state);

  const addToCart = () => {
    dispatch ({
      type:Type.ADD_TO_BASKET,
      item: {
        id, image, title, price, rating,description 
      }
    })
  }

   

  return (
    <div className={`${styles.card__container} ${flex ? styles.product__flexed : ""}`}>
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        {renderDisc && (
            <div style={{ maxWidth: "1000px", fontSize: "0.8rem" }}>
              <p>{description}</p>
            </div>
          )}
        <div className={styles.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>({rating?.count})</small>
        </div>
        <div>
          <CurrencyFormatter amount={price} />
        </div>

       {renderAdd && (
        <button className={styles.button} onClick={() => addToCart(product)}>
           Add to cart
        </button>
     )}

      </div>
    </div>
  )
}

export default ProductCard;

