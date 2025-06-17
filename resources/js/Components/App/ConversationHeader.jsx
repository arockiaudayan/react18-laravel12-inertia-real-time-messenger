import { Link } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import UserAvatar from "./UserAvatar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ConversationHeader = ({ selectedConversation }) => {

    
    return (
        <>
        {
            selectedConversation && (
                <div className="p-3 flex justify-between items-center border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('dashboard')}
                            className="inline-block sm:hidden dark:text-gray-200 hover:text-gray-300 transition-all"
                        >
                            <ArrowLeftIcon className="w-6" />
                        </Link>
                        {selectedConversation.is_group && (
                            <GroupAvatar/>
                        )}
                        {selectedConversation.is_user && (
                            <UserAvatar
                                user={selectedConversation}
                                className="w-10 h-10"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold dark:text-gray-200">{selectedConversation.name}</h3>
                            {
                                selectedConversation.is_group && (
                                    <p className="text-sm text-slate-400 dark:text-gray-500">
                                        {selectedConversation.users.length} members
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
        </>
    );
};

export default ConversationHeader;