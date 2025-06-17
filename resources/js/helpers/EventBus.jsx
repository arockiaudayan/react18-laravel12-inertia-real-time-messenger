import React, { createContext, useState } from "react";

export const EventBusContext = createContext();

export const EventBusProvider = ({ children }) => {
    const [events, setEvents] = useState({});

    const on = (name, callback) => {
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(callback);
        // Alternatively, you can use the following line to update state immutably:
        // setEvents((prevEvents) => ({
        //     ...prevEvents,
        //     [event]: [...(prevEvents[event] || []), callback],
        // }));
        return () => {
            events[name] = events[name].filter((cb) => cb !== callback);
        };
    };

    // const off = (event, callback) => {
    //     setEvents((prevEvents) => ({
    //         ...prevEvents,
    //         [event]: (prevEvents[event] || []).filter((cb) => cb !== callback),
    //     }));
    // };

    const emit = (name, data) => {
        // Emit an event with the given name and data to all registered callbacks.        
        if(!events[name]) return;
        for(let callback of events[name]) {
            callback(data);
        }
        // (events[event] || []).forEach((callback) => callback(...args));
    };

    return (
        <EventBusContext.Provider value={{ on,  emit }}>
            {children}
        </EventBusContext.Provider>
    );
}

export const useEventBus = () => {
    const context = React.useContext(EventBusContext);
    if (!context) {
        throw new Error("useEventBus must be used within an EventBusProvider");
    }
    return context;
}