import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import React from "react";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helpers/helpers";

const MessageItem = ({ message, attachmentClick }) => {
    // This component displays a single message in the chat.
    // It shows the sender's avatar, name, message content, and timestamp.
    const currentUser = usePage().props.auth.user;

    return (
        <div
            className={
                `chat ` + (
                    message.sender_id === currentUser.id ? ' chat-end' : ' chat-start'
                )
            }
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    {<UserAvatar user={message.sender} />}
                </div>
            </div>
            <div className="chat-header dark:text-gray-200">
                {
                    message.sender_id !== currentUser.id
                        ? message.sender.name
                        : ''
                }
                <time className="text-xs dark:text-gray-200 opacity-50">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={`chat-bubble relative ${message.sender_id === currentUser.id ? 'chat-bubble-info' : 'chat-bubble-accent'}`}
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
export default MessageItem;