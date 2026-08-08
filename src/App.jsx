import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;

// import { useEffect } from "react";
// import { socket } from "./socket/socket";

// function App() {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//     };
//   }, []);

//   return <h1>ChatVerse</h1>;
// }

// export default App;
