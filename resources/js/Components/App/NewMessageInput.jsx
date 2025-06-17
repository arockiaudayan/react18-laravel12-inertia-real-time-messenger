import { useEffect, useRef } from "react";

const NewMessageInput = ({ value, onChange, onSend }) => {
    const input = useRef();
    const onInputKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value.trim() !== '') {
                onSend();
                input.current.value = '';
            }
        }
    }

    const onChangeEvent = (ev) => {
        setTimeout(() => {
            adjustHeight();
        }, 10)
        onChange(ev);
    }

    const adjustHeight = () => {
        setTimeout(() => {
            input.current.style.height = 'auto';
            input.current.style.height = input.current.scrollHeight + 1 + 'px';
        }, 100)
    }

    useEffect(() => {
        adjustHeight();
    }, [value])
    return (
        <textarea
            ref={input}
            value={value}
            rows={1}
            placeholder="Type your message here..."
            onKeyDown={onInputKeyDown}
            onChange={(ev) => onChangeEvent(ev)}
            className="input input-bordered w-full rounded-r-none resize-none overflow-y-auto max-h-40 dark:text-gray-200"
            
        >
        </textarea >
    )
}

export default NewMessageInput;