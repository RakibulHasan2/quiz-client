import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Quizes from '../pages/Quizes/Quizes';
const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/quiz',
                element: <Quizes/>,
            },
        ],
    },
]);

export default routes;
