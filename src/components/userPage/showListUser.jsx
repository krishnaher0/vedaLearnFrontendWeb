// import ChatPopup from "./components/ChatPopup";

// export default function UsersListPage({ currentUser, users }) {
//   const [chatTarget, setChatTarget] = useState(null);

//   return (
//     <div>
//       {users.map((user) => (
//         <div key={user._id} className="flex justify-between items-center py-2">
//           <span>{user.name}</span>
//           <button onClick={() => setChatTarget(user)} className="text-blue-500">
//             Chat
//           </button>
//         </div>
//       ))}

//       {chatTarget && (
//         <ChatPopup
//           currentUser={currentUser}
//           targetUser={chatTarget}
//           onClose={() => setChatTarget(null)}
//         />
//       )}
//     </div>
//   );
// }
