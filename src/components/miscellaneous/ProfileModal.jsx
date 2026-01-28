import React, { useState } from "react";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // If no children (trigger) is passed, we just return null (or handle it differently),
  // but here we expect a button to be wrapped.

  return (
    <>
      {/* 1. THE TRIGGER (Whatever button you wrap becomes clickable) */}
      <span onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {/* 2. THE MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
           
           {/* Close when clicking outside */}
           <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

           {/* 3. MODAL CARD */}
           <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center pb-8 z-10 animate-scale-in">
              
              {/* Decorative Header Gradient */}
              <div className="h-32 w-full bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  {/* Close X Button */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/30 rounded-full h-8 w-8 flex items-center justify-center"
                  >
                     <i className="fas fa-times"></i>
                  </button>
              </div>

              {/* Profile Image (Floating overlap) */}
              <div className="-mt-16 p-1.5 bg-white rounded-full shadow-lg">
                <img 
                    src={user.pic} 
                    alt={user.name} 
                    className="h-32 w-32 rounded-full object-cover border-4 border-white bg-gray-200"
                />
              </div>

              {/* User Details */}
              <div className="mt-4 text-center px-6">
                 <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    {user.name.toUpperCase()}
                 </h1>
                 
                 <div className="mt-2 flex items-center justify-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                    <i className="fas fa-envelope"></i>
                    {user.email}
                 </div>
              </div>

              {/* Footer / Close Action */}
              <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-8 py-2 border border-gray-300 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;