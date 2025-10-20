import React, { useContext } from 'react'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from '../../Utility/firebase';
import { signOut } from "firebase/auth";

function Header() {
  const [{basket,user},dispatch]=useContext(DataContext)
  const totalItem =
    basket?.reduce((accumulator, item) => {
      return item.amount + accumulator; // ← Change to "amount"
    }, 0) || 0;
  return (
    <section className={classes.fixed}>
      <section>
        <div  className={classes.header_container}>
    <div className={classes.logo_container} >
        <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="Amazon logo" />
        </Link>
        <div className={classes.delivery}>
        <span>
            <SlLocationPin />
        </span>
        <div>
        <p> Delivered to</p>
        <span>Ethiopia</span>
      </div>
      </div>
    </div>
    
    <div className={classes.search}>
        <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={43} />
    </div>

    <div className={classes.order_container}>
        <Link to="/" className={classes.language}>
            <img src="https://pngimg.com/uploads/flags/small/flags_PNG14592.png" alt="" />
             <select name="" id="">
                <option value="">EN</option>
              </select>

        </Link>
        <Link to={!user && "/auth"}>
        <div>
                {user ? (
                  <>
                    <p>Hello {user?.email.split("@")[0]}</p>
                    <span onClick={() => signOut(auth)}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
        </div>
        </Link>
       <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
       </Link>
       <Link to="/cart"  className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem }</span>
            </Link>


    </div>
    </div>
    </section>
    <LowerHeader/>
    </section>
  )
}

export default Header
