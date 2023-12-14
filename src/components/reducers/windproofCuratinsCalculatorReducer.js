export const initialState = {
  width: '',
  height: '',
  thick: '0.8',
  edge: '',
  description: '',
  selectedDate: '',
  dateManufacture: '',
  zipsCheck: false,
  lowerApronCheck: false,
  pipePocketCheck: false,
  knobsCheck: false,
};

export const windproofCurtainsCalculatorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return [...action.payload];
    case 'ADD_CHECK':
      return [...state, { [action.payload]: "+" }];
    case 'REMOVE_CHECK':
      return [...state, { [action.payload]: "-" }];
    case 'SET_WIDTH':
      return { ...state, width: action.value };
    case 'SET_HEIGHT':
      return { ...state, height: action.value };
    case 'SET_THICK':
      return { ...state, thick: action.value };
    case 'SET_EDGE':
      return { ...state, edge: action.value };
    case 'SET_DESCREPTION':
      return { ...state, description: action.value };
    case 'SET_SELECTEDDATE':
      return { ...state, selectedDate: action.value };
    case 'SET_DATEMANUFACTURE':
      return { ...state, dateManufacture: action.value };
    case 'SET_ZIPSCHECK':
      return { ...state, zipsCheck: action.payload };
    case 'SET_LOWERAPRONCHECK':
      return { ...state, lowerApronCheck: action.payload };
    case 'SET_PIPEPOCKETCHECK':
      return { ...state, pipePocketCheck: action.payload };
    case 'SET_KNOBSCHECK':
      return { ...state, knobsCheck: action.payload };
    case 'CLEAR_WIDTH':
      return { ...state, width: '' };
    case 'CLEAR_HEIGHT':
      return { ...state, height: '' };
    case 'CLEAR_EDGE':
      return { ...state, edge: '' };
    case 'CLEAR_DESCRIPTION':
      return { ...state, description: '' };
    case 'CLEAR_SELECTEDDATE':
      return { ...state, selectedDate: '' };
    case 'CLEAR_DATEMANUFACTURE':
      return { ...state, dateManufacture: '' };
    case 'CLEAR_ALL':
      return initialState;

    default:
      return state;
  }
};