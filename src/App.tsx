import { RouterProvider } from "react-router-dom";
import { routesData } from "./routes";

function App() {
  return (
    <div className="app">
      <RouterProvider router={routesData} />
    </div>
  )
}

export default App
