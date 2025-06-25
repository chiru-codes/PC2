import Navbar from '../components/common/Navbar';
import { Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
}
