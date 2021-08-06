const $addUserBtn = document.getElementById("addUser");
const homeBtn = document.querySelector('.homeBtn')
const loginBtn = document.querySelector('.loginBtn');

$addUserBtn.addEventListener('click', function() {
   const username = document.querySelector('#name').value.trim();
   const password = document.querySelector('#password1').value.trim();
   fetch('api/users/register', { 
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
    }),
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => {
    console.log(response);
    if (response.ok) {
        window.location.href = '/login';
    } else {
        alert('FAILED!!!')
    }
});

});

homeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/');
  });
  
  loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/login');
  });