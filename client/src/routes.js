import App from './App'
import NotFound from './components/NotFound'
import ArtistWrapper from './features/artist/ArtistWrapper'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/artists',
                element: <ArtistWrapper />
            },
            // {
            //     path: "/search",
            //     element: <SearchResults />
            // },
            // {
            //     path: '/myTickets',
            //     element: <MyTickets />
            // },
            // {
            //     path: '/artists',
            //     element: <Artists />
            // },
            // {
            //     path: '/artists/:id',
            //     element: <ArtistDetails />
            // },
            // {
            //     path: '/venues',
            //     element: <Venues />
            // },
            // {
            //     path: '/venues/:id',
            //     element: <VenueDetails />
            // },
            // {
            //     path: '/concerts',
            //     element: <Concerts />
            // },
            // {
            //     path: '/addConcert',
            //     element: <AddConcert />
            // },
            // {
            //     path: '/error',
            //     element: <ErrorComponent />
            // },
        ]
    }
]

export default routes