import { Alex_Brush } from "next/font/google";
import { generateTimePeriods } from "./utils/generateTimePeriods";
import { ReactComponentElement } from "react";
import { combineReducers } from "redux";
import PieChart from "./components/widgets/PieChart/pieChart";
import BarChart from "./components/widgets/BarChart/barChart";
import LineChart from "./components/widgets/LineChart/lineChart";
import ProgressChart from "./components/widgets/Progress/progressChart";
import randomAlphaNumeric from "./utils/randomizer";
import { removePositionLocal } from "./utils/posSaver";


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

function stringifyWidgets(newState) {
  return JSON.stringify(
    newState.map((item) => {
      let widgetType = item.props.type;
      let toSave = {} as { widgetType: string };
      toSave.widgetType = widgetType;
      Object.assign(toSave, item);
      return toSave;
    })
  );
}

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

const widgetReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_WIDGET":
      console.log(action.payload);
      window.localStorage.setItem("widgets",
        stringifyWidgets(state.concat([action.payload]))
      );
      const result = state.concat([action.payload]);
      console.log(result);
      return result;
    case "REMOVE_WIDGET":
      let newSelection = state.filter(element => action.payload !== element.props.id);
      window.localStorage.setItem("widgets",
        stringifyWidgets(newSelection)
      );
      removePositionLocal(action.payload);
      return newSelection;
    case "REPOPULATE_DASHBOARD":
      let savedWidgetsData = JSON.parse(window.localStorage.getItem("widgets"));
      if (savedWidgetsData) {
        let restoredWidgets = savedWidgetsData.map((item) => {
          try {
            if (item.widgetType === "PieChart") {
              return <PieChart {...item.props} key={randomAlphaNumeric()} />
            } else if (item.widgetType === "BarChart") {
              return <BarChart {...item.props} key={randomAlphaNumeric()} />
            } else if (item.widgetType === "LineChart") {
              return <LineChart {...item.props} key={randomAlphaNumeric()} />
            } else if (item.widgetType === "ProgressChart") {
              return <ProgressChart {...item.props} key={randomAlphaNumeric()} />
            } else {
              return null;
            };
          } catch (error) {
            console.error(error);
          }
        });
        console.log(restoredWidgets);
        return restoredWidgets;
      };
    default: return state;
  }
};

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      console.log(action.payload);
      const result = state.concat([action.payload]);
      return result;
    case "EDIT_NOTE": 
      let next = state.filter(element => element.props.id === action.payload.id);
      next.push(action.payload);
      return next;
    default: return state;
  }
};

const currentTabReducer = (state = 'dashboard', action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_TAB':
      state = action.payload;
      return state;
    default: return state;
  }
};

const rootReducer = combineReducers({
  progressChart: progressChartReducer,
  barChart: barChartReducer,
  lineChart: lineChartReducer,
  widgetSelection: widgetReducer,
  currentTab: currentTabReducer,
  notes: notesReducer
});

export default rootReducer;
