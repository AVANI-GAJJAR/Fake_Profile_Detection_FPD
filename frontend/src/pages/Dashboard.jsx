import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-60 bg-blue-900 p-4 transition-all">
        <ul className="list-none">
          <li className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white">
              <img src="https://i.postimg.cc/SxbYPS5c/userimg.webp" alt="User" className="w-full" />
            </div>
            <h2 className="text-white text-lg ml-3">user</h2>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-home text-white text-2xl"></i>
              <p className="text-white ml-3">dashboard</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-user-group text-white text-2xl"></i>
              <p className="text-white ml-3">clients</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-table text-white text-2xl"></i>
              <p className="text-white ml-3">product</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-chart-pie text-white text-2xl"></i>
              <p className="text-white ml-3">charts</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-pen text-white text-2xl"></i>
              <p className="text-white ml-3">posts</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-star text-white text-2xl"></i>
              <p className="text-white ml-3">favorite</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <i className="fas fa-cog text-white text-2xl"></i>
              <p className="text-white ml-3">settings</p>
            </a>
          </li>
          <li className="log-out">
            <a href="#" className="flex items-center hover:bg-red-700 rounded p-2 transition duration-500">
              <i className="fas fa-sign-out text-white text-2xl"></i>
              <p className="text-white ml-3">Log Out</p>
            </a>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        <div className="title-info bg-blue-700 p-4 rounded mb-4 flex items-center justify-between">
          <p className="text-white">Insightio | Dashboard</p>
          <i className="fas fa-chart-bar text-white text-2xl"></i>
        </div>
        <div className="data-info flex items-center justify-between flex-wrap gap-10">
          <div className="box bg-blue-900 h-48 flex-shrink-0 flex items-center justify-around rounded">
            <i className="fas fa-user text-white text-4xl"></i>
            <div className="data text-white text-center">
              <p>user</p>
              <span>100</span>
            </div>
          </div>
          <div className="box bg-blue-900 h-48 flex-shrink-0 flex items-center justify-around rounded">
            <i className="fas fa-pen text-white text-4xl"></i>
            <div className="data text-white text-center">
              <p>posts</p>
              <span>101</span>
            </div>
          </div>
          <div className="box bg-blue-900 h-48 flex-shrink-0 flex items-center justify-around rounded">
            <i className="fas fa-table text-white text-4xl"></i>
            <div className="data text-white text-center">
              <p>Likes</p>
              <span>102</span>
            </div>
          </div>
          <div className="box bg-blue-900 h-48 flex-shrink-0 flex items-center justify-around rounded">
            <i className="fas fa-table text-white text-4xl"></i>
            <div className="data text-white text-center">
              <p>Comments</p>
              <span>100</span>
            </div>
          </div>
        </div>
        <div className="title-info bg-blue-700 p-4 rounded my-4">
          <p className="text-white">Stats</p>
          <i className="fas fa-table text-white text-2xl"></i>
        </div>
        <table className="w-full text-white text-center border-spacing-8">
          <thead>
            <tr>
              <th className="bg-blue-700 rounded">Username</th>
              <th className="bg-blue-700 rounded">Followers</th>
              <th className="bg-blue-700 rounded">Following</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-blue-900 rounded">user1</td>
              <td className="bg-green-500 rounded"><span className="p-1 rounded">123</span></td>
              <td className="bg-gold-500 rounded"><span className="p-1 rounded text-black">312</span></td>
            </tr>
            <tr>
              <td className="bg-blue-900 rounded">user2</td>
              <td className="bg-green-500 rounded"><span className="p-1 rounded">45</span></td>
              <td className="bg-gold-500 rounded"><span className="p-1 rounded text-black">30</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
