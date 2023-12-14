export const initialState = {
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
    case 'SET_ITEMS':
      return [...action.payload];
    case 'ADD_CHECK':
      return [...state, { [action.payload]: "+" }];
    case 'REMOVE_CHECK':
      return [...state, { [action.payload]: "-" }];
    case 'SET_WIDTH':
      return { ...state, width: action.value };
    case 'SET_LENGTH':
      return { ...state, length: action.value };
    case 'SET_HOOD':
      return { ...state, hood: action.value };
    case 'SET_BACKCOVER':
      return { ...state, backCover: action.value };
    case 'SET_FALLINGPIPE':
      return { ...state, fallingPipe: action.value };
    case 'SET_FALLINGRIGHT':
      return { ...state, fallingRight: action.value };
    case 'SET_NUMBERSTRETCHES':
      return { ...state, numberStretches: action.value };
    case 'SET_SELECTEDDATE':
      return { ...state, selectedDate: action.value };
    case 'SET_DATEMANUFACTURE':
      return { ...state, dateManufacture: action.value };
    case 'SET_LONGITUDIALPOCKETCHECK':
      return { ...state, longitudinalPocketCheck: action.payload };
    case 'SET_FITTINGLEFTCHECK':
      return { ...state, fittingLeftCheck: action.payload };
    case 'SET_FITTINGRIGHTCHECK':
      return { ...state, fittingRightCheck: action.payload };
    case 'SET_ASSEMBLYCHECK':
      return { ...state, assemblyCheck: action.payload };
    case 'CLEAR_WIDTH':
      return { ...state, width: '' };
    case 'CLEAR_LENGHT':
      return { ...state, length: '' };
    case 'CLEAR_HOOD':
      return { ...state, hood: '' };
    case 'CLEAR_BACKCOVER':
      return { ...state, backCover: '' };
    case 'CLEAR_FALLINGPIPE':
      return { ...state, fallingPipe: '' };
    case 'CLEAR_FALLINGRIGHT':
      return { ...state, fallingRight: '' };
    case 'CLEAR_NUMBERSTRETCHES':
      return { ...state, numberStretches: '' };
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