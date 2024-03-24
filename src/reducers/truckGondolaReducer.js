import {
  SET_LONGITUDIALPOCKET_PRICE,
  SET_FITTING_PRICE,
  SET_ASSEMBLY_PRICE,
  SET_TARPAULIN_PRICE_FIRST,
  SET_TARPAULIN_PRICE_SECOND
} from "../actionTypes";

export const initialState = {
  longitudinal_pocket_price: '',
  fitting_price: '',
  assembly_price: '',
  tarpaulin_price_1: '',
  tarpaulin_price_2: ''
};

export const truckGondolaReducer = (state, action) => {
  switch (action.type) {
    case SET_LONGITUDIALPOCKET_PRICE:
      return { ...state, longitudinal_pocket_price: action.value };
    case SET_FITTING_PRICE:
      return { ...state, fitting_price: action.value };
    case SET_ASSEMBLY_PRICE:
      return { ...state, assembly_price: action.value };
    case SET_TARPAULIN_PRICE_FIRST:
      return { ...state, tarpaulin_price_1: action.value };
    case SET_TARPAULIN_PRICE_SECOND:
      return { ...state, tarpaulin_price_2: action.value };

    default:
      return state;
  }
};