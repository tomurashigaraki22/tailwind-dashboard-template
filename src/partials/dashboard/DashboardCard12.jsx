import React, { useEffect, useState } from 'react';

function DashboardCard12() {
  const [reportedUsers, setReportedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getDeets = async () => {
      try {
        const response = await fetch(`https://skeletonserver.onrender.com/get_reported_secrets`, {
          method: "POST"
        });
        if (!response.ok) {
          console.log("Response error");
          setError("Network Error");
          return;
        }

        const resp2 = await response.json();
        if (resp2.status === 200) {
          setReportedUsers(resp2.reported);
        } 
        else if(resp2.status === 404){
          setError("No reported secrets found")
        }        
        else {
          setError("An error occurred when fetching reported users");
        }

      } catch (error) {
        console.log("Error: ", error);
        setError("Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    getDeets();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmDelete = async (secret_id) => {
    try {
      // Add your delete logic here
      const formData = new FormData()
      const secretIdArray = Array.from(secret_id)
      formData.append("secret_id", JSON.stringify(secretIdArray))
      formData.append("id", selectedUser.id)
      const response = await fetch(`https://skeletonserver.onrender.com/delete_secret`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData
      });

      if (response.ok) {
        setReportedUsers(reportedUsers.filter(u => u.id !== selectedUser.id));
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("An error occurred during deletion");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Show Reported Secrets</h2>
      </header>
      <div className="grow px-5" style={{ height: '350px', overflowY: 'auto' }}>
        {loading ? (
          <div>Loading Reported Secrets</div>
        ) : (
          error !== "" ? (
            <div className='text-red-500 mt-5'>{error}</div>
          ) : (
            reportedUsers.map((user, index) => (
              <div key={index} className="cursor-pointer" onClick={() => handleDeleteClick(user)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div className='text-gray-800 dark:text-gray-100'>{user.secret}</div>
                <div className='text-gray-800 dark:text-gray-100'>{user.name}</div> 
              </div> 
            )) 
          ) 
        )} 
      </div>
        {/* Modal */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Are you sure you want to delete this secret?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={handleCancelDelete}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>

); }

export default DashboardCard12;