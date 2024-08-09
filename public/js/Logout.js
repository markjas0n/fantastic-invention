document.querySelector('#logout').addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // Redirect to the homepage after logging out
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
});
