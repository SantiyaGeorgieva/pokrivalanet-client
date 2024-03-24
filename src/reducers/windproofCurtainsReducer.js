import {
  SET_THICK_FIRST_PRICE,
  SET_THICK_SECOND_PRICE,
  SET_PLASTIC_KNOBS_PRICE,
  SET_METAL_KNOBS_PRICE,
  SET_STRAP_PLATES_PRICE,
  SET_POCKETS_PRICE,
  SET_ZIP_PRICE,
  SET_KNOBS_PRICE,
  SET_CURTAIN_PRICE
} from "../actionTypes";

export const initialState = {
  price_thick_1: '',
  price_thick_2: '',
  price_plastic_knobs: '',
  price_metal_knobs: '',
  price_strap_plates: '',
  price_pockets: '',
  price_zip: '',
  price_knobs: '',
  price_curtain: ''
};

export const windproofCurtainsReducer = (state, action) => {
  switch (action.type) {
    case SET_THICK_FIRST_PRICE:
      return { ...state, price_thick_1: action.value };
    case SET_THICK_SECOND_PRICE:
      return { ...state, price_thick_2: action.value };
    case SET_PLASTIC_KNOBS_PRICE:
      return { ...state, price_plastic_knobs: action.value };
    case SET_METAL_KNOBS_PRICE:
      return { ...state, price_metal_knobs: action.value };
    case SET_STRAP_PLATES_PRICE:
      return { ...state, price_strap_plates: action.value };
    case SET_POCKETS_PRICE:
      return { ...state, price_pockets: action.value };
    case SET_ZIP_PRICE:
      return { ...state, price_zip: action.value };
    case SET_KNOBS_PRICE:
      return { ...state, price_knobs: action.value };
    case SET_CURTAIN_PRICE:
      return { ...state, price_curtain: action.value };

    default:
      return state;
  }
};