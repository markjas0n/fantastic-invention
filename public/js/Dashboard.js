document.querySelector('#new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If post creation is successful, redirect to the homepage
            document.location.replace('/');
        } else {
            alert('Failed to create post. Please try again.');
        }
    }
});
