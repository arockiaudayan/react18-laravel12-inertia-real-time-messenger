import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon, PencilIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { Fragment } from 'react'

const UserOptionsDropdown = ({ conversation }) => {
  const onBlockUser = () => {
    console.log('Blocking user:', conversation.id)
    if(!conversation.is_user){
      return;
    }

    axios.post(route('user.blockUnblock', conversation.id))
      .then(response => {
        console.log('User blocked successfully:', response.data);
      })
      .catch(error => {
        console.error('Error blocking user:', error);
      });
  }
  const changeUserRole = () => {
    console.log('Changing user role for:', conversation.id)
    if(!conversation.is_user){
      return;
    }

    axios.post(route('user.changeRole', conversation.id))
      .then(response => {
        console.log('User role changed successfully:', response.data);
      })
      .catch(error => {
        console.error('Error changing user role:', error);
      });
  }
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </MenuButton>

        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            transition
            anchor="bottom end"
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘E</kbd>
              </button>
            </MenuItem>
            <div className="py-1">
              <MenuItem>
                {({ active }) => (

                  <button
                    onClick={onBlockUser}
                    className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ${active ? 'bg-white/10' : ''}`}
                  >
                    {
                      conversation.is_blocked
                        ? <LockOpenIcon className="size-4 fill-white/30" />
                        : <LockClosedIcon className="size-4 fill-white/30" />
                    }
                    {conversation.is_blocked ? 'Unblock User' : 'Block User'}

                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘B</kbd>
                  </button>
                )}
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                {({ active }) => (

                  <button
                    onClick={changeUserRole}
                    className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ${active ? 'bg-white/10' : ''}`}
                  >
                    {
                      conversation.is_admin
                        ? <UserIcon className="size-4 fill-white/30" />
                        : <ShieldCheckIcon className="size-4 fill-white/30" />
                    }
                    {conversation.is_blocked ? 'Make Regular   User' : 'Make Admin'}
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘R</kbd>
                  </button>
                )}
              </MenuItem>
            </div>
            {/* <MenuItem>
              {({ active }) => (
                <button
                  onClick={onDeleteConversation}
                  className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 ${active ? 'bg-white/10' : ''}`}
                >
                  <TrashIcon className="size-4 fill-white/30" />
                  Delete Conversation
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
                </button>
              )}
            </MenuItem> */}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default UserOptionsDropdown