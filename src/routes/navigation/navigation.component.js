import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdown from "../../components/CartDropdown/CartDropdown";
// import { UserAuthContext } from "../../contexts/user";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { signOutStart } from "../../store/user/user.action";
// import { CartContext } from "../../contexts/cart";

// redux
import {  useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

  const signOutHandler = async () => {
    // await signOutUser();
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer className="navigation">
        <LogoContainer to={"/"}>
          <div>
            <CrownLogo className="logo" />
          </div>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to={"/home"}>Home</NavLink>
          <NavLink to={"/shop"}>Shop</NavLink>
          {currentUser && (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          )}
          {!currentUser && <NavLink to={"/auth"}>Sign In</NavLink>}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
