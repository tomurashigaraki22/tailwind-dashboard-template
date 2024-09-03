import React, { useEffect, useState } from 'react';
import myIcon from '../../i.png';

function DashboardCard14() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://192.168.43.47:1234/get_locations_from_db', {
          method: 'GET',
        });

        const resp2 = await response.json();
        console.log("Response: ", resp2)

        if (resp2.status === 200) {
          setUsers(resp2.popular_locations);
        } else {
          setError("An error occurred while fetching locations");
        }
      } catch (error) {
        setError("An error occurred while fetching locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);


  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Popular Locations</h2>
      </header>
      <div className="p-3">
        {loading ? (
          <div className='px-2'>Loading locations...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <table className="table-auto w-full dark:text-gray-300">
                <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">State</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Country</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Number of Emails</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {users.length > 0 ? (
                    <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <div className="text-gray-800 dark:text-gray-100 text-left">{user.state}</div>
                        </td>
                        <td className="p-2 px-5">
                          <div className="text-left">{user.country}</div>
                        </td>
                        <td className="p-2 px-5">
                          <div className="text-center">{user.email_count}</div>
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => {
                              setSelectedLocation(user);
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
                ) : (
                    <div className='text-gray-800 dark:text-gray-100 w-full'>No locations found</div>
                )}
                
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Are you sure you want to delete this location?</h3>
            <p className="text-gray-600 dark:text-gray-400">It can't be recovered once deleted.</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default DashboardCard14;
