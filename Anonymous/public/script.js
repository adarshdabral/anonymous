function sendMessage() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Send the message to the server
    fetch('/submit-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const resultContainer = document.getElementById('result');
            const messageLinkInput = document.getElementById('messageLink');

            // Generate a simple link
            const messageLink = window.location.origin + '/view';
            
            // Display the result container and set the link value
            resultContainer.classList.remove('hidden');
            messageLinkInput.value = messageLink;
        } else {
            alert('Error sending message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    });
}
