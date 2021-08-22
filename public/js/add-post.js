const homeBtn = document.querySelector('.homeBtn');

homeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    document.location.replace('/');
});

async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const blogPosts_text = document.querySelector('textarea[name="post-text"]').value;

    const response = await fetch('/api/blogPost', {
        method: 'POST',
        body: JSON.stringify({
            title,
            blogPosts_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);