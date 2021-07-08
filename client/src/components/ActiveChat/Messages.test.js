import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Messages from './Messages';

let messages = [{
    conversationId: 4,
    createdAt: "2021-07-08T15:07:34.011Z",
    id: 17,
    senderId: 8,
    text: "test chat",
    updatedAt: "2021-07-08T15:07:34.011Z"},
  {
    conversationId: 4,
    createdAt: "2021-07-08T15:07:34.011Z",
    id: 19,
    senderId: 8,
    text: "new best chat",
    updatedAt: "2021-07-08T15:08:30.011Z"
  }];

  let otherUser = {id: 1, username: "thomas", photoUrl: "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png", online: false};

  it('renders messages', () => {
    render(<Messages messages={messages} otherUser={otherUser} userId={8} />);
    expect(screen.getByText('test chat')).toBeInTheDocument();
  });

  it('renders messages in correct order', () => {
    render(<Messages messages={messages} otherUser={otherUser} userId={8} />);
    let entries = document.getElementsByTagName('p');
    // entries[0] and entries[2] are timestamps
    expect(entries[1].textContent).toMatch('test chat');
    expect(entries[3].textContent).toMatch('new best chat');
  });