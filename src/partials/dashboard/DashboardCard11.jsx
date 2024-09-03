import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {
  const [reportedUsers, setreportedUsers] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState("")


  useEffect(() => {
    const getDeets = async () => {
      try {
        const response = await fetch(`http://192.168.43.47:1234/get_reported_users`, {
          method: "POST"
        })
        if (!response.ok){
          console.log("Response error")
          seterror("Network Error")
          return
        }

        const resp2 = await response.json()
        if (resp2.status === 200){
          setreportedUsers(resp2.reported)
        } else if (resp2.status === 404){
          setreportedUsers([])
        }
        else{
          seterror("An error occurred when fetching reported users")
        }

      } catch (error) {
        console.log("Error: ", error)
        seterror("Unknown error occurred")
      } finally{
        setloading(false)
      }
    }
    getDeets();
  }, [])

  const chartData = {
    labels: ['Reasons'],
    datasets: [
      {
        label: 'Having difficulties using the product',
        data: [131],
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Missing features I need',
        data: [100],
        backgroundColor: tailwindConfig().theme.colors.violet[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[800],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Not satisfied about the quality of the product',
        data: [81],
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'The product doesn’t look as advertised',
        data: [65],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: 'Other',
        data: [72],
        backgroundColor: tailwindConfig().theme.colors.gray[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Show Reported Users</h2>
      </header>     
      {/* Chart built with Chart.js 3 */}
      <div className="grow px-5" style={{ height: '350px', overflowY: 'auto' }}>
        {/* Your content goes here */}
        {loading ? (
          <div>Loading Reported Users</div>
        ) : (
          error !== "" ? (
            <div className='text-red-500 mt-5'>{error}</div>
          ) : (reportedUsers.length > 0 ? (
            reportedUsers.map((users, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div className='text-gray-800 dark:text-gray-100'>{users.email}</div>
                <div className='text-gray-800 dark:text-gray-100'>{users.reason}</div>
              </div>
            ))
          ) : (
            <div className='text-gray-800 dark:text-gray-100'>No reported users</div>
          )
            
          )
        )}
      </div>
    </div>
  );
}

export default DashboardCard11;
