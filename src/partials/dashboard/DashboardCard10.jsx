import React, { useEffect, useState } from 'react';
import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://skeletonserver.onrender.com/get_users_all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const resp2 = await response.json();

        if (resp2.status === 200) {
          setUsers(resp2.users);
        } else {
          setError("An error occurred while fetching users");
        }
      } catch (error) {
        setError("An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };


  const delUser = async (email) => {
    try {
      const formData = new FormData()
      formData.append("email", email)
      const response = await fetch(`https://skeletonserver.onrender.com/delete_account`, {
        method: 'POST',
        body: formData
      })
      if (!response.ok){
        console.log("E: ", response)
        console.log("Whatever: ", await response.json())
        setError("Unable to delete user, check your network")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
        return
      }
      const resp2 = await response.json()
      if (resp2.status === 200){
        console.log("It was succesfully deleted")
        window.location.reload()
      }
      else{
        setError("Network Error, please try again later")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }

    } catch (error) {
      console.error("Error: ", error)
    }
  }
  const handleConfirmDelete = () => {
    // Add your delete logic here
    setUsers(users.filter(u => u.id !== selectedUser.id));
    delUser(selectedUser.email)
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Delete A User's Account</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto overflow-y-auto h-80">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {loading ? (
              <div className='mt-5'>Loading All Users</div>
            ) : (
              error !== "" ? (
                <div className="text-red-500 mt-5">{error}</div>
              ) : (
                <tbody className="mt-5 text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {users.map(user => (
                    <tr key={user.id} onClick={() => handleDeleteClick(user)} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={user.image} width="40" height="40" alt={user.name} />
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{user.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )
            )}
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Are you sure you want to delete this user?
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
  );
}

export default DashboardCard10;
