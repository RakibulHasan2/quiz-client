import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Quizes from '../pages/Quizes/Quizes';
import SignUp from '../pages/signUp/SignUp';
import Question from '../pages/Question/Question';
import QuizOptionPage from './../pages/QuizOptionPage/QuizOptionPage';
import Profile from './../pages/Profile/Profile';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
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
            {
                path: '/myProfile',
                element: <Profile/>,
            },
            {
                path: '/leaderboard',
                element: <LeaderBoard/>,
            },
            {
                path: '/quizPage/:getByCatName',
                element: <QuizOptionPage/>,
                loader:async ({questionCategory}) =>{
                    return fetch(`http://localhost:5000/api/Question/getByCatName/${questionCategory}`)
                }
            },
        ],
    },
   {
    path: "/signUp",
    element: <SignUp />,
   }
]);

export default routes;
