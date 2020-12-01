import Home from '../screens/Home'
import DetailPlanet from '../screens/DetailPlanet'
import Result from '../screens/Result';

const routes = [
    {
        path: '/',
        name: 'Home',
        Component: Home
    },
    {
        path: '/DetailPlanet/:id',
        name: 'Detail',
        Component: DetailPlanet
    },
    {
        path: '/Result/:name',
        name: 'Result',
        Component: Result
    }
];

export {
    routes
}