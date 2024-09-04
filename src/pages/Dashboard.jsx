import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardCard14 from '../partials/dashboard/DashboardCard14';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [errorO, seterrorO] = useState(false)
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [sendingMessage, setsendingMessage] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordSubmit = () => {
    if (password === 'Justbella') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    // Handle sending the message to all users
    try {
      setsendingMessage(true)
    const formData = new FormData()
    formData.append("message", message)
      const response = await fetch(`https://skeletonserver.onrender.com/send_toast_to_app`, {
        method: "POST",
        body: formData
      })

      if (!response.ok){
        seterrorO(true)
        return
      }
      else{
        setSuccess(true)
        setModalOpen(false)
      }
    } catch (error) {
      console.log("Error: ", error)
      seterrorO(true)
    } finally{
      setsendingMessage(false)
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
                    {/* Plus button */}
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                    </button>
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

                {/* Modal */}
                {modalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                      <h2 className="text-xl font-semibold mb-4">Send Message</h2>
                      {errorO && <div>Error occurred when sending toast</div>}
                      {success && <div>Successfully sent toast</div>}
                      <textarea
                        rows="4"
                        placeholder="Enter your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      />
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="py-2 px-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          disabled={sendingMessage}
                        >
                          {sendingMessage ? "Sending": "Send to all users"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
