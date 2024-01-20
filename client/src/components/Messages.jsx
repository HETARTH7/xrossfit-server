import React from "react";

const Messages = ({ user1, user2 }) => {
  return <div>{!user2 ? "" : `Messages: ${user1} and ${user2}`}</div>;
};

export default Messages;
