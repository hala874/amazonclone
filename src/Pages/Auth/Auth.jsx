import React, { useContext, useState } from "react";
import styles from './Auth.module.css'
import { Link,useNavigate, useLocation  } from 'react-router-dom'
import {auth} from '../../Utility/firebase'
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";


function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // console.log(email, password);
     const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
    const [{ user }, dispatch] = useContext(DataContext);
    console.log(user);

    const navigate = useNavigate();
    const navStateData = useLocation();
    console.log(navStateData);
    

    

    const authHandler = async (e,action) => {
    e.preventDefault();
    console.log(e.target.name);



    if (action === "signin") {
         setLoading({ ...loading, signIn: true });
         signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch ((err) =>{
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        })

    }else {
          setLoading({ ...loading, signUp: true });
          createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          }); 
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch ((err) =>{
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        })
    }
}
  return (
    <section className={styles.login}>
        {/* logo */}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
            alt=""
          />
        </Link>

        <div className={styles.login__container}>
            <h1>SignIn</h1>
              {navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {navStateData?.state?.msg}
            </small>
          )}
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="email" 
                     name="email"
                      id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password" />
                </div>
                <button 
                onClick={(e) => authHandler(e, "signin")}
                type="Submit"
                name="signin"
                className={styles.login__signInButton}>
                  {loading.signIn ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Sign In"
              )}
                </button>

                
            </form>
             {/* agreement statement */}
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>

          <button
            onClick={(e) => authHandler(e, "signup")}
            type="submit"
            name="signup"
           className={styles.login__registerButton}>
            {loading.signUp ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Create your Amazon Account"
            )}
           </button>
           {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
        </div>
    </section>
    
    
  )
}

export default Auth
