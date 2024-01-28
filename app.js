const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Iltimos, barcha maydonlarni toʻldiring');
        return;
    }

    const data = {
        name: name,
        email: email,
        message: message
    };

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert('Xabaringiz jo\'natildi');
        // Update necessary parts of the page here
    })
    .catch((error) => {
        console.log(error);
        alert('Xatolik yuz berdi');
        // Handle error here
    });
});
