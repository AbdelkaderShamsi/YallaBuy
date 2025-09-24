import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstants";

export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: product._id || product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
