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
  // option2: "",
  // option3: "",
  monthsArray: [],
};

const barChartReducer = (state = initialStateBar, action) => {
  if (action.type === "SET_BAR_OPTION") {
    const newState = {
      ...state,
      option1: action.payload.option1,
      // option2: action.payload.option2,
      // option3: action.payload.option3,
    };
    return newState;
  }
  if (action.type === "SET_MONTH") {
    return {
      ...state,
      monthsArray: action.payload,
    };
  }
  return state;
};

function stringifyWidgets(newState) {
  console.log(newState)
  return JSON.stringify(
    newState.map((item) => {
      if (item !== null) {
        console.log(item.props);
        const widgetType = item.props.type;
        const toSave = {} as { widgetType: string };
        toSave.widgetType = widgetType;
        Object.assign(toSave, item);
        return toSave;
      }
    })
  );
}


const lineChartReducer = (state = { axes: {}, period: {}, filters: [], filterNames: [] } as { axes: any, filters: object[], period: any, filterNames: string[] }
  , action) => {
  switch (action.type) {
    case "ADD_FILTER":
      const newState = { ...state };
      const newFilter = [action.payload.filter, action.payload.obj[action.payload.filter]];
      console.log('Filter to be added, should be array', newFilter);
      const index = newState.filterNames.findIndex((filterName) => filterName === action.payload.filter);
      index === -1 ?
        (newState.filters.push(newFilter),
          newState.filterNames.push(action.payload.filter))
        : newState.filters[index] = newFilter;
      console.log('New set of filters:', newState.filterNames, newState.filters);
      return newState;
    case "SET_AXES":
      const copy = { ...state };

      // The code below is very awkward; for reasons unknown, the indication of the y-axis sometimes comes wrapped in an array.
      // Moreover, if the user requests to recieve the data for only some locations, there will be an array of unknown length somewhere,
      // but all maximally-nested arrays will be of length 3, so this is my attempt to separate out those cases for processing differently,
      // and to avoid having unnecessarily-nested values in the y-axis indicator.
      let convert = false;
      let current = action.payload.y;
      let parent = action.payload.y;
      while (Array.isArray(current)) {
        if (current.length === 3) {
          convert = true;
          break;
        }
        parent = current;
        current = current[0];
      }
      if (convert) {
        const collection = [];
        parent.forEach((array) => {
          collection.push(array[2])
        });
        copy.axes.y = [action.payload.y[0][0], 'inSpecificLocations', collection];
      } else {
        copy.axes.y = parent;
      }
      if (action.payload.x) copy.axes.x = action.payload.x;
      return copy;
    case "FETCH_DATA":
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
      console.log(action.type, action.payload);
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
});

export default rootReducer;
