

import React from 'react'

const Loading = () => {
  return (
    <div className='pt-2'>
      <div className="animate-pulse space-y-4 p-4 border border-gray-300 rounded-lg mb-4">
      <div className="h-6 bg-gray-300 rounded w-3/5"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
    </div>
  )
}

export default Loading