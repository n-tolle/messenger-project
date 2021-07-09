const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  user1Check: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  user2Check: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.updateConversation = async function (userPosition, time, convo) {
  convo[`user${userPosition}Check`] = time;
  const conversation = await convo.save();
  return conversation;
}

module.exports = Conversation;
