import React, { useEffect, useState } from 'react';
import myIcon from '../../i.png';

function DashboardCard13() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await fetch('https://skeletonserver.onrender.com/secrets', {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setUsers(data.secrets);
        } else {
          setError("An error occurred while fetching secrets");
        }
      } catch (error) {
        setError("An error occurred while fetching secrets");
      } finally {
        setLoading(false);
      }
    };

    fetchSecrets();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedSecret) return;

    setDeleting(true);
    try {
      const response = await fetch('https://skeletonserver.onrender.com/delete_secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret_id: selectedSecret.secret_id }),
      });

      if (response.ok) {
        setUsers(users.filter(user => user.secret_id !== selectedSecret.secret_id));
        setError("");
      } else {
        const result = await response.json();
        setDeleteError(result.message || "Failed to delete secret");
      }
    } catch (error) {
      setDeleteError("An error occurred during deletion");
    } finally {
      setDeleting(false);
      setShowModal(false);
      setSelectedSecret(null);
    }
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Secrets</h2>
      </header>
      <div className="p-3">
        {loading ? (
          <div className='px-2'>Loading all secrets...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <table className="table-auto w-full dark:text-gray-300">
                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Secret ID</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Secret Title and Body</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Email</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <div className="flex items-center space-x-3">
                          <img src={myIcon} alt="User Icon" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                          <div className="text-gray-800 dark:text-gray-100">{user.secret_id}</div>
                        </div>
                      </td>
                      <td className="p-2 px-10">
                        <div className="text-left text-green-500">{`${user.secret_body} + ${user.secret_title}`}</div>
                      </td>
                      <td className="p-2 px-5">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            setSelectedSecret(user);
                            setShowModal(true);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Are you sure you want to delete this secret?</h3>
            <p className="text-gray-600 dark:text-gray-400">It can't be recovered once deleted.</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCard13;
