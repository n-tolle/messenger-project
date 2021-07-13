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

Message.updateMessages = async function (conversation, senderId) {
  const updatedMessages = await Message.update({
    unread: false
  }, {where:
  {
    conversationId: conversation,
    senderId: senderId
  }});
  return updatedMessages;
};

module.exports = Message;
