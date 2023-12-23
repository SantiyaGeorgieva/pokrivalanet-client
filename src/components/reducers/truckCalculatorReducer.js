import {
  ADD_CHECK,
  SET_ASSEMBLYCHECK,
  SET_BACKCOVER,
  SET_DATEMANUFACTURE,
  SET_EMAIL,
  SET_FALLINGPIPE,
  SET_FALLINGRIGHT,
  SET_FITTINGLEFTCHECK,
  SET_FITTINGRIGHTCHECK,
  SET_HOOD, SET_ITEMS,
  SET_LENGTH,
  SET_LONGITUDIALPOCKETCHECK,
  SET_NAMES,
  SET_NUMBERSTRETCHES,
  SET_SELECTEDDATE,
  SET_TELEPHONE,
  SET_WIDTH,
  REMOVE_CHECK,
  CLEAR_ALL,
  CLEAR_BACKCOVER,
  CLEAR_DATEMANUFACTURE,
  CLEAR_EMAIL,
  CLEAR_TELEPHONE,
  CLEAR_FALLINGPIPE,
  CLEAR_FALLINGRIGHT,
  CLEAR_HOOD,
  CLEAR_LENGHT,
  CLEAR_NAMES,
  CLEAR_WIDTH,
  CLEAR_NUMBERSTRETCHES,
  CLEAR_SELECTEDDATE
} from "../../actionTypes";

export const initialState = {
  names: '',
  email: '',
  telephone: '',
  width: '',
  length: '',
  hood: '',
  backCover: '',
  fallingPipe: '',
  fallingRight: '',
  numberStretches: '',
  selectedDate: '',
  dateManufacture: '',
  longitudinalPocketCheck: false,
  fittingLeftCheck: false,
  fittingRightCheck: false,
  assemblyCheck: false,
};

export const truckCalculatorReducer = (state, action) => {
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
    case SET_LENGTH:
      return { ...state, length: action.value };
    case SET_HOOD:
      return { ...state, hood: action.value };
    case SET_BACKCOVER:
      return { ...state, backCover: action.value };
    case SET_FALLINGPIPE:
      return { ...state, fallingPipe: action.value };
    case SET_FALLINGRIGHT:
      return { ...state, fallingRight: action.value };
    case SET_NUMBERSTRETCHES:
      return { ...state, numberStretches: action.value };
    case SET_SELECTEDDATE:
      return { ...state, selectedDate: action.value };
    case SET_DATEMANUFACTURE:
      return { ...state, dateManufacture: action.value };
    case SET_LONGITUDIALPOCKETCHECK:
      return { ...state, longitudinalPocketCheck: action.payload };
    case SET_FITTINGLEFTCHECK:
      return { ...state, fittingLeftCheck: action.payload };
    case SET_FITTINGRIGHTCHECK:
      return { ...state, fittingRightCheck: action.payload };
    case SET_ASSEMBLYCHECK:
      return { ...state, assemblyCheck: action.payload };
    case CLEAR_NAMES:
      return { ...state, names: '' };
    case CLEAR_EMAIL:
      return { ...state, email: '' };
    case CLEAR_TELEPHONE:
      return { ...state, telephone: '' };
    case CLEAR_WIDTH:
      return { ...state, width: '' };
    case CLEAR_LENGHT:
      return { ...state, length: '' };
    case CLEAR_HOOD:
      return { ...state, hood: '' };
    case CLEAR_BACKCOVER:
      return { ...state, backCover: '' };
    case CLEAR_FALLINGPIPE:
      return { ...state, fallingPipe: '' };
    case CLEAR_FALLINGRIGHT:
      return { ...state, fallingRight: '' };
    case CLEAR_NUMBERSTRETCHES:
      return { ...state, numberStretches: '' };
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