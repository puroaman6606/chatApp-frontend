// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify'
// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../../redux/authSlice'
// import 'react-toastify/dist/ReactToastify.css'

// const Login = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
  
//   const navigate = useNavigate()
//   const dispatch = useDispatch() // Hook to trigger Redux actions

//   const submitHandler = async () => {
//     setLoading(true)
//     if (!email || !password) {
//       toast.warning('Please fill all the fields')
//       setLoading(false)
//       return
//     }

//     try {
//       const config = {
//         headers: {
//           'Content-type': 'application/json',
//         },
//       }

//       // API Call
//       const { data } = await axios.post(
//         '/api/user/login',
//         { email, password },
//         config
//       )

//       toast.success('Login Successful')
      
//       // REDUX ACTION: Save user to global store
//       dispatch(setCredentials(data))
      
//       setLoading(false)
//       navigate('/chats')
      
//     } catch (error) {
//       toast.error('Error Occured: ' + (error.response?.data?.message || error.message))
//       setLoading(false)
//     }
//   }

//   // Helper for testing
//   const fillGuestCredentials = () => {
//     setEmail("aman@example.com")
//     setPassword("123")
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <ToastContainer />
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Email Address</label>
//         <input 
//           value={email}
//           type="email" 
//           placeholder="Enter your email"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Password</label>
//         <input 
//           value={password}
//           type="password" 
//           placeholder="Enter password"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
      
//       <button 
//         onClick={submitHandler}
//         disabled={loading}
//         className={`mt-4 p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {loading ? 'Logging in...' : 'Login'}
//       </button>
      
//       <button 
//         onClick={fillGuestCredentials}
//         className="p-2 text-white bg-red-500 rounded hover:bg-red-600 transition font-bold"
//       >
//         Get Guest User Credentials
//       </button>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/authSlice'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  // --- LOGIC STARTS HERE (Untouched) ---
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast.warning('Please fill all the fields')
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      )

      toast.success('Login Successful')
      dispatch(setCredentials(data))
      
      setLoading(false)
      navigate('/chats')
      
    } catch (error) {
      toast.error('Error Occured: ' + (error.response?.data?.message || error.message))
      setLoading(false)
    }
  }

  const fillGuestCredentials = () => {
    setEmail("aman@example.com")
    setPassword("123")
  }
  // --- LOGIC ENDS HERE ---

  return (
    <div className="flex flex-col gap-5">
      <ToastContainer position="bottom-center" autoClose={3000} />
      
      {/* Email Field */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <i className="fas fa-envelope text-gray-400"></i>
          </div>
          <input 
            value={email}
            type="email" 
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium placeholder-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <i className="fas fa-lock text-gray-400"></i>
          </div>
          <input 
            value={password}
            type="password" 
            placeholder="Enter password"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium placeholder-gray-400"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitHandler()}
          />
        </div>
      </div>
      
      {/* Login Button */}
      <button 
        onClick={submitHandler}
        disabled={loading}
        className={`mt-2 w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <i className="fas fa-circle-notch fa-spin"></i> Processing...
          </>
        ) : (
          'Login'
        )}
      </button>
      
      {/* Guest Button */}
      <button 
        onClick={fillGuestCredentials}
        className="w-full py-3 px-4 bg-rose-500 text-white font-bold rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg transition-all transform active:scale-[0.98] flex justify-center items-center gap-2"
      >
        <i className="fas fa-user-secret"></i> Get Guest Credentials
      </button>
    </div>
  )
}

export default Login