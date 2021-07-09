import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { updateConversation } from '../../store/utils/thunkCreators';
import moment from 'moment';

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    if (conversation.messages.length > 0) {
      let time = new Date();
      console.log('WHY ARE YOU DOING THIS?: ', conversation);
      let currentUser = conversation.otherUser.id === conversation.user1Id ? conversation.user2Id : conversation.user1Id;
      let body = {
        time: time,
        currentUser: currentUser,
        otherUser: conversation.otherUser.id
      };
      await updateConversation(body);
    }
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const currentUser = this.props.conversation.otherUser.id === this.props.conversation.user1Id ? 2 : 1;
    const pending = this.props.conversation.messages.filter(message => moment(this.props.conversation[`user${currentUser}Check`]).isBefore(message.createdAt)).length;

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} pending={pending} />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
