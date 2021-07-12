const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  unread: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Message.findMessages = async function (conversation, senderId) {
  const messages = await Message.findAll({
    where: {
      conversation: conversation,
      senderId: senderId
    }
  });

  return messages;
};

Message.updateMessages = async function (messages) {
  const updatedMessages = await messages.update({
    unread: false
  });
  return updatedMessages;
};

module.exports = Message;
