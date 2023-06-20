import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import RocketsSearchFilter from './components/organisms/RocketsSearchFilter';
import ShipsSearchFilter from './components/organisms/ShipsSearchFilter';

const rocketQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const productsQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <main>
            <QueryClientProvider client={rocketQueryClient}>
                <RocketsSearchFilter />
            </QueryClientProvider>
            <QueryClientProvider client={productsQueryClient}>
                <ShipsSearchFilter />
            </QueryClientProvider>
        </main>
    );
}

export default App;
