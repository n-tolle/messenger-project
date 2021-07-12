import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ChatContent from './ChatContent';

let conversation = {
  id: 4,
  messages: [{
    conversationId: 4,
    createdAt: "2021-07-08T15:07:34.011Z",
    id: 17,
    senderId: 8,
    text: "test chat",
    updatedAt: "2021-07-08T15:07:34.011Z",
    unread: true,
  },
  {
    conversationId: 4,
    createdAt: "2021-07-08T15:07:34.011Z",
    id: 19,
    senderId: 8,
    text: "new best chat",
    updatedAt: "2021-07-08T15:08:30.011Z",
    unread: true,
  }],
  otherUser: {id: 1, username: "thomas", photoUrl: "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png", online: false},
  user1: null,
  latestMessageText: "new best chat"
};

it('displays pending messages', () => {
  render(<ChatContent conversation={conversation} pending={2} />);
  expect(screen.getByText('2')).toBeInTheDocument();
});

it('does not display when no pending messages', () => {
  render(<ChatContent conversation={conversation} pending={0} />);
  const noPending = screen.queryByText('0');
  expect(noPending).toBeNull();
});