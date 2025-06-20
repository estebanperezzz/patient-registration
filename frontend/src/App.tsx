import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;