import { Toaster } from "react-hot-toast"
import { renderRoutes, routes } from "./routes/routes"


const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      {renderRoutes(routes)}
    </>
  )
}

export default App