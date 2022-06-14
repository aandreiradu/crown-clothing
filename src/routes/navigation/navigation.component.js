import {useContext} from 'react'
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import { UserAuthContext } from '../../contexts/user';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import { CartContext } from '../../contexts/cart';

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLink} from  './navigation.styles';


const Navigation = () => {
  const {isCartOpen,setIsCartOpen} = useContext(CartContext)
  const {currentUser} = useContext(UserAuthContext);

  // console.log(currentUser);

  const signOutHandler = async () => {
    await signOutUser();
  };

  const openCartHandler = () => {
    console.log('triggered')
    setIsCartOpen((prevState) => !prevState);
  }
  
  return (
    <>
      <NavigationContainer className="navigation">
        <LogoContainer to={"/"}>
          <div>
            <CrownLogo className="logo" />
          </div>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink  to={"/home"}>
            Home
          </NavLink>
          <NavLink  to={"/shop"}>
            Shop
          </NavLink>
          {currentUser && <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>}
          {!currentUser && <NavLink  to={"/auth"}>Sign In</NavLink>}
        <CartIcon/>
        </NavLinksContainer>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
