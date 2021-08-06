const loginBtn = document.querySelector('.loginBtn');
const registerBtn = document.querySelector('.registerBtn');
const dashboardBtn = document.querySelector('.dashboardBtn');


loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/login');
});

registerBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/register');
});

dashboardBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/dashboard');
});


