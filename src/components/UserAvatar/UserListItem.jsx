import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="cursor-pointer bg-gray-200 hover:bg-blue-500 hover:text-white w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-lg transition-colors duration-200"
    >
      <img 
        className="w-8 h-8 rounded-full object-cover" 
        src={user.pic} 
        alt={user.name} 
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-xs">
          <b>Email : </b>{user.email}
        </span>
      </div>
    </div>
  )
}

export default UserListItem