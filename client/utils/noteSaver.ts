export default function noteSaver(noteStates) {
  let notes = window.localStorage.getItem("notes")
  ? JSON.parse(window.localStorage.getItem("notes"))
  : [];

  let index = notes.findIndex(element => element.id === noteStates.id);

  if (index >= 0) {
    notes[index] = noteStates;
  } else {
    notes.push(noteStates);
  }
  window.localStorage.setItem("notes", JSON.stringify(notes));
};