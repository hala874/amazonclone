import { Type } from "./action.type";

export const initialState = {
    basket: [],
    user:null
};

// ADD THIS FUNCTION - it was missing
const updateLocalStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        const newBasket = [...state.basket, {...action.item, amount: 1}];
        updateLocalStorage(newBasket); // ADD THIS
        return {
           ...state,
            basket: newBasket
      }
     } else {
         const updatedBasket = state.basket.map((item) =>
           item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
      );
      updateLocalStorage(updatedBasket); // ADD THIS
        return{
            ...state,
            basket: updatedBasket
        }
    };

    case Type.REMOVE_FROM_BASKET:
        const index = state.basket.findIndex(item => item.id === action.id);
        let newBasket = [...state.basket];

        if(index >= 0) {
            if(newBasket[index].amount > 1) {
                newBasket[index] = {...newBasket[index], amount: newBasket[index].amount - 1};
            } else {
                newBasket.splice(index, 1);
            }
        }
        updateLocalStorage(newBasket); // ADD THIS
        return {
            ...state,
            basket: newBasket
        }

    case Type.EMPTY_BASKET:
      updateLocalStorage([]); // THIS WAS CAUSING THE ERROR
      return {
        ...state,
        basket: []
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};