import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (id) => id.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((id) =>
            id.product === item.product ? item : id
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (id) => id.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
