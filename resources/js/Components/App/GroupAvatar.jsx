import React from 'react'
import { UserIcon } from '@heroicons/react/24/outline'

const GroupAvatar = () => {
  return (
    <>
      <div className="avatar avatar-placeholder">
        <div className='bg-gray-400 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center'>
          <span className='text-xl'><UserIcon className="w-4" /></span>
        </div>
      </div>
    </>
  )
}

export default GroupAvatar