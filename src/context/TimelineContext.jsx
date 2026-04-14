"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast"; 

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [activities, setActivities] = useState([
    { id: 1, type: "Meetup", friend: "Emma Wilson", date: "Apr 10, 2024", icon: "🤝" }
  ]);

  const addActivity = (type, friendName) => {
     const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newActivity = {
      id: Date.now(),
      type,
      friend: friendName,
      date: currentDate,
    };

    setActivities([newActivity, ...activities]);
    
    toast.success(`${type} with ${friendName} logged on ${currentDate} !`, {
      style: {
        borderRadius: '10px',
        background: '#1B3D2F',
        color: '#fff',
      },
    });
  };

  return (
    <TimelineContext.Provider value={{ activities, addActivity, setActivities }}>
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimeline = () => useContext(TimelineContext);
