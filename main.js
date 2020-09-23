const BASE_URL = 'http://tiny-lasagna-server.herokuapp.com/collections/cohort-covid';

const $container = document.querySelector('ul');
function buildHTML(data) {
  let html = '';
  let editButton = `<button id='edit'>Edit<button>`
  let deleteButton = `<button id='delete'>Delete<button>`
  data.forEach(function(item){
    html += `<li>${item.username} ${item.message} ${editButton} ${deleteButton}</li>`
  });
  $container.innerHTML = html;
}
function fetchMessages() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      buildHTML(res);
    })
    .catch(error => console.log(error));
}
function saveMessage(message) {
  fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(message)
  });
}
let submit = document.getElementById('myForm');
submit.addEventListener('submit', function() {
  event.preventDefault();
  const username = document.querySelector('#name').value;
  const message = document.querySelector('#message').value;
  console.log(username);
  const newMessage = {
    username,
    message
  }
  saveMessage(newMessage);
});
fetchMessages();
setInterval(fetchMessages, 3000);









  ///////
