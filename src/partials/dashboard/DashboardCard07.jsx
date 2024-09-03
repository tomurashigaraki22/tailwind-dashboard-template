import React, { useEffect, useState } from 'react';
import myIcon from '../../i.png';

function DashboardCard07() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.43.47:1234/get_users_all', {
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

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Users</h2>
      </header>
      <div className="p-3">
        {loading ? (
          <div>Loading all users...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto h-80" >
            <table className="table-auto w-full dark:text-gray-300">
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Skulls Balance</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Gender</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Age</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60" style={{ height: '350px', overflowY: 'auto'}}>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center space-x-3">
                        <img src={myIcon} alt="User Icon" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                        <div className="text-gray-800 dark:text-gray-100">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-2">  
                      <div className="text-center text-green-500">{`${user.balance.toLocaleString()}`}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{user.gender}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">{`${user.age}`}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard07;
