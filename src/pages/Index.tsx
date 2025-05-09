
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Kosteneinsparungs-Dashboard</h1>
        </div>
      </header>
      
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
