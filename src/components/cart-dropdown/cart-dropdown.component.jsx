import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { checkoutStart } from '../../store/user/user1.reducer';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
  EmptyCartDropdownContainer
} from './cart-dropdown.styles';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector'; 

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const goToCheckoutHandler = () => {
    dispatch(checkoutStart());
    dispatch(setIsCartOpen(false));
    navigate('/checkout');
  };
   if(location.pathname !== '/checkout') {  
      return (
        <CartDropdownContainer>
          <CartItems>
            {cartItems.length ? (
              cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
            ) : (
              <EmptyMessage>Your cart is empty</EmptyMessage>
            )}
          </CartItems>
          <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button> 
        </CartDropdownContainer>
      );
  } else {
    return (
      <div></div>
    );
  }
  
};

export default CartDropdown;
