import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin, { autoConnect: false });
<<<<<<< HEAD

socket.onAny((event, ...args) => console.log('CLIENT SOCKET: ', event, args));
=======
>>>>>>> 7bd434222c7938280a8e77294250d2ff4ba40730

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("add-online-user", (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});
socket.on("new-message", (data) => {
  store.dispatch(setNewMessage(data.message, data.sender));
});

export default socket;
