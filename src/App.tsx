import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter.tsx';

function App() {
    return (
        <Router>
            <AppRouter />
        </Router>
    );
}

export default App;
