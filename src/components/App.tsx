import { Outlet } from "react-router-dom";
import { Aside } from "./Aside/Aside";

function App() {
  return (
    <div className="bg-screen-light text-white w-full h-screen flex items-start">
      <div className="w-full h-full flex">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
