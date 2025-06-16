import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import React from "react";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helpers/helpers";

const MessageInput =({message,attachmentClick}) => {
const currentUser = usePage().props.auth.user;

    return(
        <div
            className={
                `chat `+(
                    message.sender_id === currentUser.id ? ' chat-end' : ' chat-start'
                )
            }
        >
            {<UserAvatar user={message.sender} />}
            <div className="chat-bubble">
                {
                    message.sender_id !== currentUser.id 
                    ? message.sender.name 
                    : ''
                }
                <time className="text-xs opacity-50">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={`chat-bubble relative ${message.sender_id === currentUser.id ? 'chat-bubble-info' : ''}`}
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MessageInput;