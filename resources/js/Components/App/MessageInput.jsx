import { FaceSmileIcon, HandThumbUpIcon, PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from "@heroicons/react/24/outline";
import NewMessageInput from "./NewMessageInput";
import { useState } from "react";
import axios from "axios";

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState('');
    const [inputErrorMessage, setInputErrorMessage] = useState('');
    const [messageSending, setMessageSending] = useState(false);

    const onSendHandle = () => {
        if (newMessage.trim() === '') {
            setInputErrorMessage('Please enter a message');
            setTimeout(() => {
                setInputErrorMessage('');
            }, 3000);
            return;
        }
        const formData = new FormData();
        formData.append('message', newMessage);
        if (conversation.is_user) {
            formData.append('receiver_id', conversation.id);
        } else if (conversation.is_group) {
            formData.append('group_id', conversation.id);
        }
        setMessageSending(true);

        axios.post(route('message.store'), formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        })
            .then(response => {
                console.log('Message sent successfully:', response.data);
                setNewMessage('');
                setMessageSending(false);
            })
            .catch(error => {
                console.error('Error sending message:', error);
                setMessageSending(false);
            });
    }

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-2 flex flex-1 xs:flex-none xs:order-1 p-2">
                <button className="p-1 text-gray-400 hover:text-gray-300 relative transition-all">
                    <PaperClipIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        className="absolute left-0 top-0 bottom-0 z-20 opacity-0 cursor-pointer w-auto "
                        style={{ width: '-webkit-fill-available' }}
                    />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300 relative transition-all">
                    <PhotoIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute left-0 top-0 bottom-0 z-20 opacity-0 cursor-pointer " 
                        style={{ width: '-webkit-fill-available' }}
                    />
                </button>
            </div>
            <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
                <div className="flex">
                    <NewMessageInput
                        value={newMessage}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                            setInputErrorMessage('');
                        }}
                        onSend={onSendHandle}
                        placeholder="Type your message here..."
                    />
                    <button onClick={onSendHandle} className="btn btn-into rounded-1-none">
                        {
                            messageSending && (
                                <span className="loading loading-spinner loading-xs"></span>
                            )
                        }
                        <PaperAirplaneIcon className="w-6" />
                        <span className="sr-only hidden sm:inline">Send</span>
                    </button>
                </div>
                {inputErrorMessage && (
                    <p className='text-sm text-red-400'>{inputErrorMessage}</p>
                )}
            </div>
            <div className="order-3  xs:order-3 p-2 flex">
                <button className="p-1 text-gray-400 hover:text-gray-300 relative transition-all">
                    <FaceSmileIcon className="w-6 h-6" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300 relative transition-all">
                    <HandThumbUpIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default MessageInput;