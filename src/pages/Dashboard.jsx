import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardCard14 from '../partials/dashboard/DashboardCard14';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = () => {
    if (password === 'Justbella') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {authenticated ? (
              <>
                {/* Dashboard actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  {/* Left: Title */}
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
                  </div>
                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Filter button */}
                    <FilterButton align="right" />
                    {/* Datepicker built with flatpickr */}
                    {/* Add view button */}
                  </div>
                </div>

                {/* Dashboard cards */}
                <div className="grid grid-cols-12 gap-6">
                  <DashboardCard01 />
                  <DashboardCard02 />
                  <DashboardCard03 />
                  <DashboardCard07 />
                  <DashboardCard10 />
                  <DashboardCard11 />
                  <DashboardCard12 />
                  <DashboardCard13 />
                  <DashboardCard14 />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center bg-gray-800 dark:bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h2 className="text-2xl font-semibold text-gray-100 dark:text-gray-800 mb-6">Admin Login</h2>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-800 font-semibold rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit
                </button>
                {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
              </div>

            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
