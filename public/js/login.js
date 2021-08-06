const homeBtn = document.querySelector('.homeBtn');
const registerBtn = document.querySelector('.registerBtn');

const loginFormHandler = async (event) => {
    event.preventDefault();

    console.log("help me")
    const username = document.getElementById('userLogin').value.trim();
    console.log("Hello");
    const password = document.getElementById('passwordLogin').value.trim();
    
    console.log(username, password);
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};

homeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/');
});

registerBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/register');
});


document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);
