import {
  SET_SHADE_CEILING_PRICE,
  SET_SEMI_TRAILER_PRICE,
  SET_SEMI_TRAILER_WITH_COVERS_PRICE,
  SET_SEMI_TRAILER_THREE_WAY_PRICE,
  SET_RATCHET_COVER_PRICE,
  SET_SIMPLE_TRAILER_COVER_PRICE
} from "../actionTypes";

export const initialState = {
  shade_ceiling: '',
  semi_trailer: '',
  semi_trailer_with_covers: '',
  semi_trailer_three_way: '',
  ratchet_cover: '',
  simple_trailer_cover: ''
};

export const truckCoversReducer = (state, action) => {
  switch (action.type) {
    case SET_SHADE_CEILING_PRICE:
      return { ...state, shade_ceiling: action.value };
    case SET_SEMI_TRAILER_PRICE:
      return { ...state, semi_trailer: action.value };
    case SET_SEMI_TRAILER_WITH_COVERS_PRICE:
      return { ...state, semi_trailer_with_covers: action.value };
    case SET_SEMI_TRAILER_THREE_WAY_PRICE:
      return { ...state, semi_trailer_three_way: action.value };
    case SET_RATCHET_COVER_PRICE:
      return { ...state, ratchet_cover: action.value };
    case SET_SIMPLE_TRAILER_COVER_PRICE:
      return { ...state, simple_trailer_cover: action.value };

    default:
      return state;
  }
};