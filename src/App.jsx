import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Toaster } from "react-hot-toast";


function App() {
  
  return (
    <>
    <button onClick={notify}>Make me a toast</button>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
