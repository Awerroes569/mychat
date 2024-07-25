const path = require('path');
const socket = require('socket.io');

const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
  });

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const io = socket(server);

const addUser= (user,id) => {
    const registeredUser = users.find(user => user.id===id);
    if(!registeredUser) {
        users.push({name:user,id:id});
        console.log('new user added',user);
        console.log('all logged users',users);
    }
};

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        users.splice(index,1)[0];
        console.log('user removed',id);
        console.log('all logged users',users);
    }
};

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
      });
    socket.on('user', ({ author, id }) => {
        addUser(author,id);
        const message = { author: 'Chat Bot', content: `<i>${author} has joined the conversation!</i>` };
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left');
        const user = users.find(user => user.id === socket.id);
        removeUser(socket.id);
        const message = { author: 'Chat Bot', content: `<i>${user.name} has left the conversation!</i>` };
        socket.broadcast.emit('newUser', message);
    });
    console.log('I\'ve added a listener on message event \n');
  });