// src/components/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import { toast, Toaster } from 'react-hot-toast'
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formData.email === '' || formData.password === '') {
            toast.error("All fields are required");
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);
            localStorage.removeItem("token");
            if (data.status === 'success') {
                localStorage.setItem("token", data.jwt);
                window.location.replace('/dashboard');

            } else {
                toast.error(data.message);
            }

        }
        catch (error) {
            toast.error(error)
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            window.location.replace('/dashboard')
        }
    })
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
            <Toaster />
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm mb-2">Email</label>
                        <input type="text"
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
                    <button type="submit" onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600">
                        Login
                    </button>
                </form>
                <div className='mt-4'>
                    New User? <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
