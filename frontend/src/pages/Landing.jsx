import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { useState } from 'react';
const Landing = () => {
    const [userData, setUserData] = useState({
        username: '',
      });
      const proxyUrl = 'http://localhost:8080/';

    
      const [prediction, setPrediction] = useState(null);
      const [loading, setLoading] = useState(false);
      const [data,setData] = useState()

    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
      
    const predictHandler = async () => {
        try {
          setLoading(true);  
          // Replace 'https://your-api-endpoint' with your actual API endpoint
          const response = await fetch('http://localhost:8000/api/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch prediction from the API');
          }
    
          const result = await response.json();
          setData(result?.results)
          setPrediction(result?.prediction)
          return result.prediction; // Adjust this based on your API response structure
        } catch (error) {
          console.error('Error fetching prediction:', error);
          return 'Error fetching prediction';
        } finally {
          setLoading(false);
        }
      };
console.log(data?.profile_pic_url)
      const handlePredict = async () => {
        // Call the predictHandler function here
        const result = await predictHandler();
    
        // Update the state with the prediction result
      };
    return (
        <div>
            <div className='w-full items-center justify-center grid'>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                <div>
                    <h1 className='text-[50px] font-bold my-12 text-center'>Instagram Fake<br></br> Account checker</h1>
                    <p className=' mt-[-20px]  text-center'>Get an influencer's audience audit & identify fake, dormant or suspect followers to<br></br> evaluate an influencer's audience quality.</p>
                </div>
                <div className='max-w-3xl my-12 ml-6'>
                    <input className='border border-[black] p-6 w-[340px] outline-none' placeholder='Enter instagram username' 
                     type="text"
                     id="username"
                     name="username"
                     value={userData.username}
                     onChange={handleInputChange}
                    />
                    <button className='bg-black text-white p-6 border ml-2 w-[240px] border-[black]'
                    onClick={handlePredict}
                    >Check Profile</button>
                </div>
            </div>
            {data?<div className='mx-12 border border-gray-200 grid grid-cols-2'>
                <div className='border-r-2 my-16'>
                    <div className='w-full grid justify-center items-center'>
                        {data?.profile_pic_url?<img src={`${proxyUrl}${data?.profile_pic_url}`}
                         referrerPolicy="no-referrer"
                         crossOrigin="anonymous"
                         headers={{ "X-Requested-With": "XMLHttpRequest" }}
                            className='w-28 h-28 rounded-full'
                        />:""}
                        <p className='font-bold my-4 text-center'>@{userData?.username}</p>

                    </div>
                    <div className='grid justify-center items-center pt-12'>
                    <ReactSpeedometer
                value={prediction}
                minValue={0}
                maxValue={1}
                needleColor="#eee"
                startColor="#eee"
                endColor="#eee"
                segments={1}  
                height={300}
                ringWidth={10}
                // width={3} 
            />
                    </div>
                </div>
                <div className='border m-16 shadow-lg max-h-[420px]'>
                    <div className='flex justify-between items-center'>
                            <h1 className='p-12 font-bold text-[24px]'>Total Followers</h1>
                            <p className='p-12'>{data?.edge_followed_by.count}</p>
                    </div>
                    <hr className='mx-12 w-[4] h-[4]'></hr>
                    <div className='flex justify-between items-center'>
                            <h1 className='p-12 font-bold text-[24px]'>Total Following</h1>
                            <p className='p-12'>{data?.edge_follow?.count}</p>
                    </div>
                    <hr className='mx-12 w-[4] h-[4]'></hr>
                    <div className='flex justify-between items-center'>
                            <h1 className='p-12 font-bold text-[24px]'>Total Posts</h1>
                            <p className='p-12'>{data?.edge_owner_to_timeline_media?.count}</p>
                    </div>
                </div>
            </div>:""}
        </div>
    );
}

export default Landing;