import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./utils/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
