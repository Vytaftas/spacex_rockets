import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import RocketsSearchFilter from './components/organisms/RocketsSearchFilter';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <RocketsSearchFilter />
            </QueryClientProvider>
        </main>
    );
}

export default App;
