import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({
  isOpen, 
  onClose,
  title,
  children
}) => {
  return (
    <div className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-auto transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"}
    `}
    tabIndex="-1"
    aria-labelledby="drawer-right-label"
    
    >
      <div  className="flex items-center justify-between mb-4">
        <h5
        id="drawer-right-label"
        className="inline-flex items-center text-base font-semibold text-black"
        >
          {title}
        </h5>
        <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
        onClick={onClose}
        >
          <LuX className="text-lg"/>
        </button>
      </div>

      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  )
}

export default Drawer