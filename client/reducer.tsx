import { Alex_Brush } from "next/font/google";
import { combineReducers } from "redux";
import { generateTimePeriods } from "./utils/generateTimePeriods";

const initialStateProgress = {
  userInput: "",
  percentage: 0,
};

const progressChartReducer = (state = initialStateProgress, action) => {
  if (action.type === "GENERATE") {
    const newState = {
      userInput: action.payload.inputValue,
      percentage: action.payload.percent,
    };
    return newState;
  }

  return state;
};

const initialStateBar = {
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  monthsArray: [],
};

const barChartReducer = (state = initialStateBar, action) => {
  if (action.type === "SET_BAR_OPTION") {
    const newState = {
      ...state,
      option1: action.payload.option1,
      option2: action.payload.option2,
      option3: action.payload.option3,
    };
    return newState;
  }
  if (action.type === "SET_MONTH") {
    console.log("payload", action.payload);
    return {
      ...state,
      monthsArray: action.payload,
    };
  }
  return state;
};

const pieChartReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PIECHART_SELECTION":
      return action.payload;
    default: return state
  }
};

const lineChartReducer = (state = { axes: {}, period: {}, filters: [], filterNames: [] } as { axes: any, filters: object[], period: any, filterNames: string[] }
  , action) => {
  switch (action.type) {
    case "ADD_FILTER":
      const newState = { ...state };
      const index = newState.filterNames.findIndex((filterName) => filterName === action.payload.filter);
      index === -1 ?
        (newState.filters.push(action.payload.obj),
          newState.filterNames.push(action.payload.filter))
        : newState.filters[index] = action.payload.obj;
      ;
      return newState;
    case "SET_AXES":
      const copy = { ...state };
      copy.axes = action.payload;
      return copy;
    case "FETCH_DATA":
      console.log(state);
      let requests = [];
      if (state.axes.x && state.axes.x[1]) {
        const { startDates, endDates } = generateTimePeriods({
          start: state.period.start,
          end: state.period.end,
          unit: state.axes.x[1]
        });
        for (let i = 0; i < startDates.length; i++) {
          requests.push([[startDates[i], endDates[i]], state.filters])
        }
        console.log('Need to make requests with:', requests);
      }
      return state;
    case "SET_DATES": {
      const adjust = { ...state };
      adjust.period = action.payload;
      return adjust;
    }
    default: return state
  }
};

const rootReducer = combineReducers({
  progressChart: progressChartReducer,
  barChart: barChartReducer,
  pieChart: pieChartReducer,
  lineChart: lineChartReducer
});

export default rootReducer;
