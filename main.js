const BASE_URL = 'http://tiny-lasagna-server.herokuapp.com/collections/cohort-covid';

const $container = document.querySelector('ul');

function buildHTML(data) {
  let html = '';
  let editButton = `<button id='edit'>Edit<button>`
  data.forEach(function(item){
    const id = item._id;
    html += `<li>${item.username} ${item.message} ${editButton} <button type='button' data-id=${id} onclick="deleteButton('${id}')">Delete<button></li>`
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


function deleteButton(id) {
  console.log('id', id);
  event.target.parentNode.remove();
  // const  id = event.target.dataset.id
  fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}







  ///////
