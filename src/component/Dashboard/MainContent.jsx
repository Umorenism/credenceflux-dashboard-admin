import { Outlet } from 'react-router-dom';

export default function MainContent() {
  return (
    <div className="flex-1 p-5 min-h-screen bg-white">
      <Outlet />
    </div>
  );
}





