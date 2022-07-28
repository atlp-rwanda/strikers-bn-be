import { Message,ChatRoom } from '../models';

// to add a message
exports.addMessage = async (req, res) => {
    
    try {
        const message = await Message.create({
            userId:req.userId,
            chatRoomId:req.params.chatRoomId,
            message:req.body.message
        }) 
        return res.status(201).json({
            success: true,
            status: 201,
            message: 'message added successfully!',
            data: message
        });
    } catch (error) {
       res.send(error);
    }
  };
// to add a chatting room
exports.addRoom = async (req, res) => {
    
    try {
        const room = await ChatRoom.create({
            userId:req.userId,
            messageId:req.params.messageId,
            name:req.body.name
        }) 
        return res.status(201).json({
            success: true,
            status: 201,
            message: 'room added successfully!',
            data: room
        });
    } catch (error) {
       res.send(error);
    }
  };

// to get Rooms
exports.getRooms = async (req,res) =>{
  
  try {
  const room = await ChatRoom.findAll({include: [
    { model: User, as : 'user' },
    { model: ChatRoom, as : 'chatRoom' },
  ]});  

  return res.status(200).json({
    success: true,
    status: 200,
    message: "Rooms fetched successfully!",
    data: room
});

  } catch (error) {
    res.send(error)
  }
}

// Get new messages from chatroom since user logged in
exports.getNewMessages = async (req, res) => {
   
    try {

    Message.findAll({where: {
        createdAt: {
          $gt: req.user.lastLogout,
        },
      },
      include: [
        { model: User, as : 'user' },
        { model: ChatRoom, as : 'chatRoom' },
      ],
      order: [
        ['createdAt', 'ASC'],
      ],
    })
    .then((foundMessages) => {
      res.send(foundMessages);
    })    
    } catch (error) {
        res.send(error);
    }

  }

// to get all messages of a chatroom
exports.getMessages =  async (req,res) => {

    try {
        Message.findAll({
            where: {
              chatroomId: req.params.chatroomId,
            },
            include: [
                { model: User, as : 'user' },
                { model: ChatRoom, as : 'chatRoom' },
            ],
            order: [
              ['createdAt', 'ASC'],
            ],
          })
          .then((foundMessages) => {
            res.send(foundMessages);
          })
    } catch (error) {
        res.send(error)
    }
}
