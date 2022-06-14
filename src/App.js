
import Directory from "./components/Directory/Directory";
import Home from "./routes/home/home.component";
import { Route,Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/sign-in/authentication.component";
import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/Checkout";

const App = () => {

return (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Directory/>} />
      <Route path="home" element={<Home />}></Route>
      <Route path="auth" element={<Authentication />}></Route>
      <Route path='shop/*' element={<Shop/>}></Route>
      <Route path='/checkout' element={<Checkout/>}></Route>
    </Route>
  </Routes>
);
};

export default App;
