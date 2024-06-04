import { Route, Routes } from "react-router-dom";
import App from "../components/App";

export function RouterHandler() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="/" element={<CreatePassword />} /> */}
        {/* <Route path="*" element={<p>Not found</p>} /> */}
      </Route>
    </Routes>
  );
}
