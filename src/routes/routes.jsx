import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Quizes from '../pages/Quizes/Quizes';
import SignUp from '../pages/signUp/SignUp';
const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/quiz',
                element: <Quizes/>,
            },
        ],
    },
   {
    path: "/signUp",
    element: <SignUp />,
   }
]);

export default routes;
