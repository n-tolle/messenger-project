const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, unread } = req.body;

    // determine whether conversation exists
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId && (conversation.user1Id === senderId || conversation.user2Id === senderId)) {
      const message = await Message.create({ senderId, text, conversationId, unread });
      return res.json({ message, sender });
    }

    // if conversation id is provided, but the sender is not included in that conversation
    if (conversationId && !(conversation.user1Id === senderId || conversation.user2Id === senderId)) {
      res.status(403).send('You are not a participant of this conversation.');
    }

    // if we don't have conversation id
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      unread,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  const messages = await Message.updateMessages(req.body.conversation, req.body.otherUser);
  res.json(messages);
});

module.exports = router;
