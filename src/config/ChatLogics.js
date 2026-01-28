// frontend/src/config/ChatLogics.js

// Returns the name of the OTHER user in a 1-on-1 chat
export const getSender = (loggedUser, users) => {
  if (!users || !loggedUser || users.length < 2) return "";
  // users[0] is the first person, users[1] is the second
  // If users[0] is me, return users[1].name
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// Returns the full user object of the OTHER user (for avatar, etc.)
export const getSenderFull = (loggedUser, users) => {
  if (!users || !loggedUser || users.length < 2) return {};
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};