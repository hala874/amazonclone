import { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import styles from "./Orders.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Modular SDK - FIXED COMMENT SYNTAX
      const unsubscribe = onSnapshot(
        query(
          collection(db, "users", user.uid, "orders"),
          orderBy("created", "desc")
        ),
        (snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
      );

      // ADD CLEANUP FUNCTION
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // ADD USER AS DEPENDENCY

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders__container}>
          <h2>Your Orders</h2>
          {/* ordered items */}
          {orders?.length == 0 && (
            <div>
              <p>You don't have orders yet</p>
            </div>
          )}
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order, index) => (
                  <ProductCard product={order} key={index} flex={true} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;