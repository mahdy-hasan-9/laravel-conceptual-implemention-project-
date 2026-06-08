import { renderRoutes, routes } from "./routes/routes"


const App = () => {
  return (
    <>
      {renderRoutes(routes)}
    </>
  )
}

export default App