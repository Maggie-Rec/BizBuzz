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
