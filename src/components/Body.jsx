import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./Login"
import Browser from "./Browser"

const Body = () => {

    // Creating Routing that consist array of paths
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browser",
            element:<Browser/>
        }
    ]);
     
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body