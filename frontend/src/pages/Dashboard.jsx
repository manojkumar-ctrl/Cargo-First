import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import JobForm from '../components/JobForm';
import Profile from '../pages/Profile';
import JobList from '../components/JobList';
import CustomerAnalysis from '../pages/CustomerAnalysis';
export default function Dashboard() {
  const [currentView, setCurrentView] = useState('job-posted');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar (fixed) */}
      <Sidebar
        current={currentView}
        onSelect={setCurrentView}
        onLogout={handleLogout}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 mt-14 lg:mt-6">
          {/* Job Posted View */}
          {currentView === 'job-posted' && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <JobForm onCreated={() => console.log('Job created!')} />
              </div>

              {/* Job List Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Posted Jobs
                </h2>
                <JobList />
              </div>
            </div>
          )}

          {/* Profile View */}
          {currentView === 'profile' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <Profile />
            </div>
          )}

          {/* Customer Analysis View */}
          {currentView === 'analysis' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Customer Analysis
              </h3>
              <p className="text-gray-600"><CustomerAnalysis /></p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
