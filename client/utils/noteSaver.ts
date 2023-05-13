export default function noteSaver(noteState) {
  window.localStorage.setItem("notes", JSON.stringify(noteState));
};