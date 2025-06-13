import React from 'react'

const UserAvatar = ({ user, online = null, profile = false }) => {
    let onlineClass = online === true ? 'avatar-online' : online === false ? 'avatar-offline' : '';

    const sizeClass = profile ? 'w-40 ' : 'w-8 '; ``
    return (
        <>
            {
                user.avatar_url && (
                    <div className={` chat-image avatar ${onlineClass} `}>
                        <div className={`rounded-full ${sizeClass} flex items-center justify-center`}>
                            <img src={user.avatar_url} />
                        </div>
                    </div>
                )
            }
            {
                !user.avatar_url && (
                    <div className={`avatar avatar-placeholder ${onlineClass}`}>
                        <div className={`bg-gray-400 text-gray-800 ${sizeClass} rounded-full`}>
                             {user.name.substring(0, 1)}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserAvatar