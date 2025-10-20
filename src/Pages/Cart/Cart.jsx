import React from 'react';
import styles from './Cart.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import CurrencyFormatter from '../../Components/CurrencyFormatter/CurrencyFormatter';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{basket},dispatch]=React.useContext(DataContext)
  const total = basket.reduce((amount, item) => {
    return item.price*item.amount + amount},
    0
  );
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    });
  }
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  }


  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.cart__container}>
          <h2>Hello</h2>
                <h3>Your shopping basket</h3>
                <hr />
                {
                  basket?.length==0 ? (<p>No items in the cart</p>) : (
                    basket?.map((item,i)=> {
                      return <section className={styles.cart_product}> <ProductCard
                        key={i}
                        product={item}
                        renderDisc={true}
                        flex={true}
                        />

                        <div className={styles.btn_container}>
                          <button className={styles.btn} onClick={()=>increment(item)}>{<IoIosArrowUp size={24} />}</button>
                          <span>{item.amount}</span>
                          <button className={styles.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={24} /></button>
                        </div>
                        </section> 
                    })
                  )
                  
                }

              
        </div>
        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormatter amount={total} />
              </div> 
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payment">Continue to checkout</Link>        
         </div>
        )}
        <div>           
         </div>
      </section>
    </LayOut>
  );
}

export default Cart; 
