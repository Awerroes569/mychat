const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = () => {
    let user = userNameInput.value;
    if (!user) {
        alert('Please enter your name');
    } else {
        messagesSection.classList.add('show');
        loginForm.classList.remove('show');
        userName = user;
    }
};

const appendMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message','message--received');
    if (author === userName) {
        message.classList.add('message--self');
    }
    const currAuthor = author === userName ? 'You' : author;
    message.innerHTML = `
        <h3 class="message__author">${currAuthor}</h3>
        <div class="message__content">${content}</div>
    `;
    messagesList.appendChild(message);
};

const addMessage = () => {  
    if (messageContentInput.value && userName) {
        const message = { author: userName, content: messageContentInput.value };
        appendMessage(message.author, message.content);
        messageContentInput.value = '';
    } else {
        alert('Please enter your message');
    }
};

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
});

addMessageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addMessage();
});