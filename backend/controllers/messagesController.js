const Conversation = require("../models/participants");
const Message = require("../models/messages");
const { io, getReceiverSocketId } = require("../socket/socket");

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create a conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save the new message
    const newMessage = await new Message({
      senderId,
      receiverId,
      message
    });
    await newMessage.save();

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Respond to the client with the new message
    res.status(200).json(newMessage);

    // Emit the new message to the receiver if they are online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(400).json({ error: "An error occurred while sending the message" });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { id: userChatId } = req.params;
    const senderId = req.user._id;

    // Find the conversation with both participants
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userChatId] }
    });

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found. Start a new message." });
    }

    // Populate and retrieve messages sorted by creation date
    const populatedConversation = await conversation.populate({
      path: "messages",
      options: { sort: { createdAt: 1 } }
    });
    const messages = populatedConversation.messages || [];

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(400).json({ error: "An error occurred while retrieving messages" });
  }
};
