import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import ConversationHeader from '../Components/App/ConversationHeader';
import MessageItem from '../Components/App/MessageItem';
import MessageInput from '@/Components/App/MessageInput';
import { useEventBus } from '@/helpers/EventBus';


export default function Home({ selectedConversation = null, messages = null }) {

    const [localMessages, setLocalMessages] = useState([]);
    const messagesCtrlRef = useRef(null);

    const { on } = useEventBus();

    const messageCreated = (message) => {
         
        if (
            selectedConversation &&  
            selectedConversation.is_group && 
            message.group_id == selectedConversation.id 
         ) {
            setLocalMessages((prevMessages) => [...prevMessages, message]);
        }
        if (
            selectedConversation && 
            selectedConversation.is_user &&
            message.sender_id == selectedConversation.id || message.receiver_id == selectedConversation.id
        ) {
            setLocalMessages((prevMessages) => [...prevMessages, message]);
        }
    };

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            if (!messagesCtrlRef.current) return;
            messagesCtrlRef.current.scrollTop = messagesCtrlRef.current.scrollHeight;
        }
            , 10);

        const offCreated = on('message.created', messageCreated);
        return () => {
            offCreated();
        }
    }, [selectedConversation]);

    return (
        <>
            {
                !messages && (
                    <div className='flex flex-col gap-8 justify-center items-center text-center h-full opacity-35'>
                        <div className='text-2xl md:text-4xl p-16 text-slate-200'>
                            Please select a conversation to start chatting
                        </div>
                        <ChatBubbleLeftRightIcon className='w-32 h-32 text-slate-400 inline-block' />
                    </div>
                )
            }
            {
                messages && (
                    <>
                        <ConversationHeader
                            selectedConversation={selectedConversation}
                        />
                        <div
                            ref={messagesCtrlRef}
                            className='flex-1 overflow-y-auto p-5'
                        >
                            {
                                localMessages.length === 0 && (
                                    <div className='flex justify-center items-center h-full '>
                                        <div className='text-lg text-slate-200'>
                                            No messages yet. Start the conversation!
                                        </div>
                                    </div>
                                )
                            }
                            {
                                localMessages.length > 0 && (
                                    <div className='flex flex-1 flex-col '>
                                        {
                                            localMessages.map((message) => {
                                                return (
                                                    <MessageItem
                                                        key={message.id}
                                                        message={message}
                                                        className="mb-4"
                                                    />
                                                );
                                            })

                                        }
                                    </div>
                                )
                            }
                        </div>
                        <MessageInput
                            conversation={selectedConversation}
                        />
                    </>
                )
            }
        </>
    );
}
Home.layout = (page) => <AuthenticatedLayout><ChatLayout children={page} /></AuthenticatedLayout>;
