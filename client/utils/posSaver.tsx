export default function savePositionLocal(key, size, position) {
  console.log(arguments);
  let positions = window.localStorage.getItem("widgetPositions")
    ? JSON.parse(window.localStorage.getItem("widgetPositions"))
    : [];
  positions.push({
    key: key,
    size: size,
    position: position
  });
  window.localStorage.setItem("widgetsPositions", JSON.stringify(positions));
};
