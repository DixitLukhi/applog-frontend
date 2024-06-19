function addClass(Id, db) {
  var element = document.querySelector(Id);
  element.classList.add(db);
}
function removeClass(Id, db) {
  var element = document.querySelector(Id);
  element.classList.remove(db);
}

 export { removeClass, addClass};