import { useContext, useEffect } from "react";
import Routing from './Router.jsx'
import { auth } from "./Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import {Type} from "./Utility/action.type";
function App() {
    const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    // check the auth state change from sign in to sign out vice versa and if the user signed in userInfo will be populated with the user data if not userInfo becomes null
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        dispatch({ type: "SET_USER", user: userInfo });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  return <Routing />;
}

export default App
 
