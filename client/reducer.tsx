import { combineReducers } from "redux";

const initialState = {
  userInput: "",
  percentage: 0,
};

const progressChartReducer = (state = initialState, action) => {
  if (action.type === "GENERATE") {
    
      const newState = {
          userInput: action.payload.inputValue,
          percentage: action.payload.percent,
      }
      return newState;
    };
    
  return state
};

const rootReducer = combineReducers({ progressChart: progressChartReducer });

export default rootReducer;
