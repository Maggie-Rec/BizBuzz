export default function getManager() {
  const managers = [
    "Chicken Lover",
    "Chicken Master",
    "Chicken Enjoyer",
    "Chicken Overlord",
    "Chicken Supervisor",
    "Chicken Lord",
    "Chicken Leader Foxtrot",
    "Chicken Chief",
    "Chicken General",
    "Chicken Chairman",
    "Chicken Boss",
    "Chicken Ringleader",
    "Supreme Chicken",
    "Chicken Champion",
    "Chicken Evangelist",
    "Chicken Taskmaster",
    "Chicken Handler",
    "Chickenmonger",
    "Chicken Peddler",
    "Chicken Capo",
    "Куриный предводитель"
  ];
  let index = Math.floor(Math.random() * managers.length);
  return managers[index];
};