// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify'
// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../../redux/authSlice'
// import 'react-toastify/dist/ReactToastify.css'

// const Signup = () => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmpassword, setConfirmpassword] = useState('')
//   const [loading, setLoading] = useState(false)
  
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const submitHandler = async () => {
//     setLoading(true)
//     if (!name || !email || !password || !confirmpassword) {
//       toast.warning('Please fill all the fields')
//       setLoading(false)
//       return
//     }
//     if (password !== confirmpassword) {
//       toast.error('Passwords do not match')
//       setLoading(false)
//       return
//     }

//     try {
//       const config = {
//         headers: {
//           'Content-type': 'application/json',
//         },
//       }
      
//       const { data } = await axios.post(
//         '/api/user',
//         { name, email, password },
//         config
//       )

//       toast.success('Registration Successful!')
      
//       // REDUX ACTION: Save user to global store
//       dispatch(setCredentials(data))

//       setLoading(false)
//       navigate('/chats')
      
//     } catch (error) {
//       toast.error('Error Occured: ' + (error.response?.data?.message || error.message))
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <ToastContainer />
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Name</label>
//         <input 
//           type="text" 
//           placeholder="Enter your name"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Email Address</label>
//         <input 
//           type="email" 
//           placeholder="Enter your email"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Password</label>
//         <input 
//           type="password" 
//           placeholder="Enter password"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="font-semibold text-gray-600">Confirm Password</label>
//         <input 
//           type="password" 
//           placeholder="Confirm password"
//           className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//           onChange={(e) => setConfirmpassword(e.target.value)}
//         />
//       </div>
      
//       <button 
//         onClick={submitHandler}
//         disabled={loading}
//         className={`mt-4 p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {loading ? 'Signing Up...' : 'Sign Up'}
//       </button>
//     </div>
//   )
// }

// export default Signup


import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/authSlice'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  // --- LOGIC STARTS HERE (Untouched) ---
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmpassword) {
      toast.warning('Please fill all the fields')
      setLoading(false)
      return
    }
    if (password !== confirmpassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      
      // const { data } = await axios.post(
      //   '/api/user',
      //   { name, email, password },
      //   config
      // )
      const { data } = await axios.post(
         'https://chatapp-backend-nj3a.onrender.com/api/user', // <-- यहाँ पूरा Render URL आएगा
         { name, email, password },
          config
         );

      toast.success('Registration Successful!')
      
      // REDUX ACTION: Save user to global store
      dispatch(setCredentials(data))

      setLoading(false)
      navigate('/chats')
      
    } catch (error) {
      toast.error('Error Occured: ' + (error.response?.data?.message || error.message))
      setLoading(false)
    }
  }
  // --- LOGIC ENDS HERE ---

  return (
    <div className="flex flex-col gap-5">
      <ToastContainer position="bottom-center" autoClose={3000} />
      
      {/* Name Field */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
          Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <i className="fas fa-user text-gray-400"></i>
          </div>
          <input 
            type="text" 
            placeholder="Enter your name"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium placeholder-gray-400"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

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
            type="password" 
            placeholder="Enter password"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium placeholder-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <i className="fas fa-key text-gray-400"></i>
          </div>
          <input 
            type="password" 
            placeholder="Confirm password"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 font-medium placeholder-gray-400"
            onChange={(e) => setConfirmpassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitHandler()}
          />
        </div>
      </div>
      
      {/* Sign Up Button */}
      <button 
        onClick={submitHandler}
        disabled={loading}
        className={`mt-2 w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <i className="fas fa-circle-notch fa-spin"></i> Signing Up...
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </div>
  )
}

export default Signup