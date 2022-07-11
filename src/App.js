import { GlobalStyle } from "./global.styles";
import { useEffect,lazy,Suspense } from "react";
import {onAuthStateChangedListener,createUserDocumentAuth, getCurrentUser} from './utils/firebase/firebase.utils';
import Spinner from "./components/spinner/Spinner";

import Directory from "./components/Directory/Directory";
import { Route,Routes } from "react-router-dom";
// import Navigation from "./routes/navigation/navigation.component";
// import Authentication from "./routes/sign-in/authentication.component";
// import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/Checkout";
import { checkUserSession } from "./store/user/user.action";

import { useDispatch } from "react-redux";
// import { setCurrentUser } from "./store/user/user.action";

const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import('./routes/sign-in/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // without saga
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //     if(user) {
    //         createUserDocumentAuth(user);
    //     }

    //     dispatch(setCurrentUser(user));
        
    // });
    // return unsubscribe;

    // saga
    // getCurrentUser()
    dispatch(checkUserSession());

},[]);

return (
  <Suspense fallback={<Spinner/>}>
    <GlobalStyle/>
    <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
  </Suspense>
);
};

export default App;
