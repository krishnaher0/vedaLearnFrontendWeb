// // components/ChatPopup.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { X, Send } from "lucide-react";
// import io from "socket.io-client";

// const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3000");

// export default function ChatPopup({ currentUser, targetUser, onClose }) {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const messagesEndRef = useRef(null);

//   const roomId = [currentUser._id, targetUser._id].sort().join("-");

//   useEffect(() => {
//     socket.emit("join", { userId: currentUser._id, roomId });

//     socket.on("chatMessage", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     return () => socket.disconnect();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     const newMsg = {
//       roomId,
//       message,
//       sender: {
//         _id: currentUser._id,
//         name: currentUser.name,
//       },
//     };
//     socket.emit("chatMessage", newMsg);
//     setChat((prev) => [...prev, { ...newMsg, timestamp: new Date() }]);
//     setMessage("");
//   };

//   return (
//     <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col">
//       {/* Header */}
//       <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
//         <span className="font-semibold">{targetUser.name}</span>
//         <button onClick={onClose}><X size={20} /></button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-2">
//         {chat.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.sender._id === currentUser._id ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`rounded-lg px-3 py-1 max-w-[70%] text-sm ${
//                 msg.sender._id === currentUser._id
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-2 border-t flex items-center gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message..."
//           className="flex-1 px-3 py-1 border rounded-full focus:outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="text-blue-600 hover:text-blue-800"
//         >
//           <Send size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }
