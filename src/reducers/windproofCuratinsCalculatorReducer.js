import {
  ADD_CHECK,
  CLEAR_ALL,
  CLEAR_DATEMANUFACTURE,
  CLEAR_DESCRIPTION,
  CLEAR_EDGE,
  CLEAR_EMAIL,
  CLEAR_HEIGHT,
  CLEAR_NAMES,
  CLEAR_SELECTEDDATE,
  CLEAR_TELEPHONE,
  CLEAR_WIDTH,
  REMOVE_CHECK,
  SET_CURTAINHAVEDOORCHECK,
  SET_DATEMANUFACTURE,
  SET_DESCRIPTION,
  SET_EDGE,
  SET_EMAIL,
  SET_HEIGHT,
  SET_ITEMS,
  SET_KNOBSCHECK,
  SET_LOWERAPRONCHECK,
  SET_NAMES,
  SET_PIPEPOCKETCHECK,
  SET_RADIOCHECK,
  SET_SELECTEDDATE,
  SET_TELEPHONE,
  SET_THICK,
  SET_WIDTH,
  SET_ZIPSCHECK
} from "../actionTypes";

export const initialState = {
  names: '',
  email: '',
  telephone: '',
  width: '',
  height: '',
  thick: '0.8',
  edge: '',
  description: '',
  selectedDate: '',
  dateManufacture: '',
  radioCheck: 'without_fitting',
  zipsCheck: false,
  lowerApronCheck: false,
  pipePocketCheck: false,
  knobsCheck: false,
  curtainHaveDoorCheck: false
};

export const windproofCurtainsCalculatorReducer = (state, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return [...action.payload];
    case ADD_CHECK:
      return [...state, { [action.payload]: "+" }];
    case REMOVE_CHECK:
      return [...state, { [action.payload]: "-" }];
    case SET_NAMES:
      return { ...state, names: action.value };
    case SET_EMAIL:
      return { ...state, email: action.value };
    case SET_TELEPHONE:
      return { ...state, telephone: action.value };
    case SET_WIDTH:
      return { ...state, width: action.value };
    case SET_HEIGHT:
      return { ...state, height: action.value };
    case SET_THICK:
      return { ...state, thick: action.value };
    case SET_EDGE:
      return { ...state, edge: action.value };
    case SET_RADIOCHECK:
      return { ...state, radioCheck: action.value };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_SELECTEDDATE:
      return { ...state, selectedDate: action.value };
    case SET_DATEMANUFACTURE:
      return { ...state, dateManufacture: action.value };
    case SET_ZIPSCHECK:
      return { ...state, zipsCheck: action.payload };
    case SET_LOWERAPRONCHECK:
      return { ...state, lowerApronCheck: action.payload };
    case SET_PIPEPOCKETCHECK:
      return { ...state, pipePocketCheck: action.payload };
    case SET_KNOBSCHECK:
      return { ...state, knobsCheck: action.payload };
    case SET_CURTAINHAVEDOORCHECK:
      return { ...state, curtainHaveDoorCheck: action.payload };
    case CLEAR_NAMES:
      return { ...state, names: '' };
    case CLEAR_EMAIL:
      return { ...state, email: '' };
    case CLEAR_TELEPHONE:
      return { ...state, telephone: '' };
    case CLEAR_WIDTH:
      return { ...state, width: '' };
    case CLEAR_HEIGHT:
      return { ...state, height: '' };
    case CLEAR_EDGE:
      return { ...state, edge: '' };
    case CLEAR_DESCRIPTION:
      return { ...state, description: "" };
    case CLEAR_SELECTEDDATE:
      return { ...state, selectedDate: '' };
    case CLEAR_DATEMANUFACTURE:
      return { ...state, dateManufacture: '' };
    case CLEAR_ALL:
      return initialState;

    default:
      return state;
  }
};