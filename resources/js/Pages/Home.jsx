import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

export default function Home({ messages }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messagesCtrlRef = useRef(null);

    useEffect(() => {
        setLocalMessages(messages);
    }
        , [messages]);
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
                            selectConversation={selectConversation}
                            setMessages={setLocalMessages}
                            className="flex-1 w-full flex overflow-hidden"
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
                            conversation={selectConversation}
                            setMessages={setLocalMessages}
                            className="w-full"
                        />
                    </>
                )
            }
        </>
    );
}
Home.layout = (page) => <AuthenticatedLayout><ChatLayout children={page} /></AuthenticatedLayout>;
