// src/components/AuthPage.js
import React from 'react';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import {toast,Toaster} from 'react-hot-toast' 

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        retypePassword:''
    });

        const handleInputChange = (e) => {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        };
    
    // Function to handle signup submission
    const handleSignup = async (e) => {
        e.preventDefault();
        if((formData.name === '' || formData.email === '' || formData.password === '') || formData.retypePassword === '') {
            toast.error('All fields are required');
            return;
        }
        if(formData.password !== formData.retypePassword){
            toast.error("Password Do Not Match")
            return;
        }
      

        // Create FormData object to send data
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        

        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            console.log(data);

            if (data.status === 'success') {
                toast.success('Successfully signed up');              
                window.location.replace('/login');
            } 
            
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
            <Toaster />
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                <form>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm mb-2">Name</label>
                        <input type="text" 
                         value={formData.name}
                         onChange={handleInputChange}
                        id="name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm mb-2">Email</label>
                        <input type="email"
                         value={formData.email}
                         onChange={handleInputChange}
                        id="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm mb-2">Password</label>
                        <input type="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                        id="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="retypePassword" className="block text-gray-600 text-sm mb-2">Retype Password</label>
                        <input type="password"
                        value={formData.retypePassword}
                        onChange={handleInputChange}
                        id="retypePassword" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <button type="submit"
                    onClick={handleSignup}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600">
                        Sign Up
                    </button>
                </form>
                <div className='mt-4'>Already Member? <Link to="/login">Login</Link></div>
            </div>
        </div>
    );
};

export default Signup;
