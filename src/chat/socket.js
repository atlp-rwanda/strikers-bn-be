import { Server } from 'socket.io';

const io = new Server(4300,{
    cors: {
        origin: '*',
            methods: ['GET', 'POST']
    }
});
let users = [];

const addUser = (userId,socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}
const removeUser = (socketId) =>{
    users = users.filter((user)=>user.socketId !== socketId);
};
io.on('connection', (socket) => {
  console.log(`A user has connected! SocketId: ${socket.id}`); 
      //when connect
  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers',users);
  });
  socket.on('addUser', (data) => {
    io.emit('isTypingStatus',data)
  })

  //send and get message
  socket.on('sendMessage', ({senderName, conversationId, senderId, receiverId, text,file,sentDate}) => {
    io.emit('getMessage', {
        senderName,
        conversationId: conversationId,
        receiverId: receiverId,
        senderId: senderId,
        text,
        file,
        conversationId,
        sentDate
    });
  });

  socket.on('deletedMessage',(data)=>{
    io.emit('deletedMessage', data);
  })

   //get groups

   socket.on('deletedMessage', (data)=>{
    io.emit('deletedMessage', data)
     
    //get groups after creating new group

    socket.on('getNewGroups',(data)=>{
        io.emit('getNewGroups',data)
    })

    //remove partcipants
    socket.on('removedParticipant', (data)=>{
        io.emit('removedParticipant', data);
    });

    socket.on('newGroupMessage',(data)=>{
		io.emit('newGroupMessage', data)
	})

     socket.on('deletedGroupMessage',(data)=>{
      io.emit('deletedGroupMessage', data)
    })

    socket.on('makeAdmin',(data)=>{
      io.emit('makeAdmin', data)
    })

    socket.on('groupIsTyping', (data)=>{
      io.emit('groupIsTyping', data)
    })

    socket.on('groupIsNotTyping', (data)=>{
      io.emit('groupIsNotTyping', data)
    })
  
  //when disconnected
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
})
})
