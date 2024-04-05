import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authService } from "./services/authService";
// import auth from "./reducers/authSlice";
import { authSlice } from "./reducers/authSlice";
// import { truckCalculatorReducer } from './reducers/truckCalculatorReducer';
// import { windproofCurtainsCalculatorReducer } from './reducers/windproofCuratinsCalculatorReducer';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // truckCalculatorReducer,
  // windproofCurtainsCalculatorReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: authService,
      },
      serializableCheck: false,
    }),
});
