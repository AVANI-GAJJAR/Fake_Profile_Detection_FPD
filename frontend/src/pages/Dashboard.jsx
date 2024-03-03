import React from 'react';
import { useEffect } from 'react';

const Dashboard = () => {
const logout = () => {
  localStorage.clear()
  window.location.replace('/login')

}

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
        window.location.replace('/login')
    }
  })
  return (
    <div className="flex bg-black text-white min-h-screen">
      <div className="w-60 bg-black p-4 transition-all">
        <ul className="list-none">
          <li className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white">
              <img src="https://i.postimg.cc/SxbYPS5c/userimg.webp" alt="User" className="w-full" />
            </div>
            <h2 className="text-white text-lg ml-3">user</h2>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">dashboard</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">clients</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">product</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">charts</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">posts</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">favorite</p>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:bg-white bg-opacity-25 rounded p-2 transition duration-500">
              <p className="text-white ml-3">settings</p>
            </a>
          </li>
          <li className="log-out">
              <p className="text-white ml-3" onClick={logout}>Log Out</p>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-10">
        <div className="title-info bg-blue-700 p-4 rounded mb-4 flex items-center justify-between">
          <p className="text-white">Insightio | Dashboard</p>
        </div>
        <div className="data-info flex items-center justify-between flex-wrap gap-10">
          <div className="box bg-black h-48 flex-shrink-0 flex items-center justify-around rounded">
            <div className="text-white text-4xl">
              <p>user</p>
              <span>100</span>
            </div>
          </div>
          <div className="box bg-black h-48 flex-shrink-0 flex items-center justify-around rounded">
            <div className="text-white text-4xl">
              <p>posts</p>
              <span>101</span>
            </div>
          </div>
          <div className="box bg-black h-48 flex-shrink-0 flex items-center justify-around rounded">
            <div className="text-white text-4xl">
              <p>Likes</p>
              <span>102</span>
            </div>
          </div>
          <div className="box bg-black h-48 flex-shrink-0 flex items-center justify-around rounded">
            <div className="text-white text-4xl">
              <p>Comments</p>
              <span>100</span>
            </div>
          </div>
        </div>
        <div className="title-info bg-blue-700 p-4 rounded my-4">
          <p className="text-white">Stats</p>
        </div>
        <table className="w-full text-white text-center">
          <thead>
            <tr>
              <th className="rounded p-4">Username</th>
              <th className=" rounded">Followers</th>
              <th className=" rounded">Following</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 bg-black rounded">user1</td>
              <td className="rounded"><span className="p-1 rounded">123</span></td>
              <td className="bg-gold-500 rounded"><span className="p-1 rounded text-white">312</span></td>
            </tr>
      
            <tr>
              <td className="mt-2 p-4 bg-black rounded">user2</td>
              <td className="rounded"><span className="p-1 rounded">45</span></td>
              <td className="bg-gold-500 rounded"><span className="p-1 rounded text-white">30</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
