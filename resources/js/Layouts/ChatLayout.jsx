import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import TextInput from '@/Components/TextInput';
import ConversationItem from '@/Components/App/ConservationItem';

const ChatLayout = ({ children }) => {
  const page = usePage();

  const conversation = page.props.conversations;
  const selectedConversation = page.props.selectedConversation;

  const [localConversation, setLocalConversation] = useState([]);
  const [sortedConversations, setSortedConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  const isUserOnline = (userId) => {
    return onlineUsers[userId] !== undefined;
  }

  // console.log('conversation', conversation);
  // console.log('selectedConversation', selectedConversation);
  // console.log('sortedConversations', sortedConversations);

  const onSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setLocalConversation(
      conversation.filter((conversation) => {
        const name = conversation.name ? conversation.name.toLowerCase() : '';
        return name.includes(searchTerm);
      })
    );
  }

  useEffect(() => {
    setLocalConversation(conversation);
  }, [conversation]);

  useEffect(() => {
    // if (!localConversation || !Array.isArray(localConversation)) return;

    const sorted = [...localConversation].sort((a, b) => {
      if (a.blocked_at && b.blocked_at) {
        return a.blocked_at > b.blocked_at ? 1 : -1;
      } else if (a.blocked_at) {
        return 1;
      } else if (b.blocked_at) {
        return -1;
      }

      if (a.last_message_date && b.last_message_date) {
        return a.last_message_date.localeCompare(b.last_message_date);
      } else if (a.last_message_date) {
        return 1;
      } else if (b.last_message_date) {
        return -1;
      } else {
        return 0;
      }
    });
    
    setSortedConversations(sorted);
  }, [localConversation]);

  // useEffect(() => {
  //   setSortedConversations(
  //     localConversation.sort((a, b) => {
  //       if(a.blocked_at &&  b.blocked_at){
  //         return a.blocked_at > b.blocked_at ? 1 : -1;
  //       }else if(a.blocked_at){
  //         return 1;
  //       }else if(b.blocked_at){
  //         return -1;
  //       }
  //       if(a.last_message_date && b.last_message_date){
  //         return a.last_message_date.localeCompare(b.last_message_date);
  //       }else if(a.last_message_date){
  //         return 1;

  //       }else if(b.last_message_date){
  //         return -1;
  //       }else{
  //         return 0;
  //       }
  //     })
  //   )
  // }, [localConversation]);

  useEffect(() => {
    const channel = Echo.join('online')
      .here((users) => {
        const onlineUserObj = Object.fromEntries(users.map(user => [user.id, user]));
        setOnlineUsers((prevUsers) => {
          return { ...prevUsers, ...onlineUserObj }
        });
        console.log('Users currently online:', users);
      })
      .joining((user) => {
        setOnlineUsers((prevUsers) => ({
          ...prevUsers,
          [user.id]: user,
        }));
        console.log('User joined:', user);
      })
      .leaving((user) => {
        setOnlineUsers((prevUsers) => {
          const updatedUsers = { ...prevUsers };
          delete updatedUsers[user.id];
          return updatedUsers;
        });
      })
      .error((error) => {
        console.error('Error joining channel:', error);
      });

    // Cleanup on component unmount
    return () => {
      Echo.leave('online');
    };
  }, [])

  return (

    <>
      {/* Render conversation and selectedConversation here */}
      <div className='flex-1 w-full flex overflow-hidden'>
        <div
          className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${selectedConversation ? '-ml-[100%] sm:ml-0' : ' '} `}
        >
          <div className='flex items-center justify-between py-2 px-3 text-xl font-medium'>
            My Conversations
            <div
              className='tooltip tooltip-left'
              data-tip="Create new conversation"
            >
              <button className='text-gray-400 hover:text-gray-200'>
                <PencilSquareIcon className='w-4 h-4 inline-block ml-2' />
              </button>
            </div>
          </div>
          <div className='p-3'>
            <TextInput onKeyUp={onSearch} placeholder="filter users groups" className="w-full" />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <div className='flex flex-col'>
              {sortedConversations &&
                sortedConversations.map((conversation) => {
                  return (
                    <ConversationItem
                      key={`${conversation.is_group ? 'group_' : 'user_'}${conversation.id}`}
                      conversation={conversation}
                      online={!!isUserOnline(conversation.id)}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className='flex-1 overflow-hidden flex flex-col'>
          {children}
        </div>

      </div>
    </>
  )
}

export default ChatLayout