export default function savePositionLocal(widgetId, size, position) {
  let positions = window.localStorage.getItem("widgetPositions")
    ? JSON.parse(window.localStorage.getItem("widgetPositions"))
    : [];
  let index = positions.findIndex(element => element.widgetId === widgetId);
  if (index >= 0) {
    positions[index] = {
      widgetId: widgetId,
      size: size,
      position: position
    }
  } else {
    positions.push({
      widgetId: widgetId,
      size: size,
      position: position
    });
  }
  window.localStorage.setItem("widgetPositions", JSON.stringify(positions));
};

export function removePositionLocal(widgetId) {
  let positions = window.localStorage.getItem("widgetPositions")
    ? JSON.parse(window.localStorage.getItem("widgetPositions"))
    : [];
  let index = positions.findIndex(element => element.widgetId === widgetId);
  if (index >= 0) {
    positions = positions.filter(element => element.widgetId !== widgetId);
  }
  window.localStorage.setItem("widgetPositions", JSON.stringify(positions));
}

export function restorePosition(id, setPosition, setSize) {
  try {
    let positions = JSON.parse(window.localStorage.getItem("widgetPositions"));
    let index = positions.findIndex(element => element.widgetId === id);
   
    if (index >= 0) {
      setPosition(positions[index].position);
      setSize(positions[index].size);
    }
  } catch (error) {
    console.log(error);
  }
};