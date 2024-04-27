import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Quizes from '../pages/Quizes/Quizes';
import SignUp from '../pages/signUp/SignUp';
import Question from '../pages/Question/Question';
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
            {
                path: '/question',
                element: <Question/>,
            },
        ],
    },
   {
    path: "/signUp",
    element: <SignUp />,
   }
]);

export default routes;
