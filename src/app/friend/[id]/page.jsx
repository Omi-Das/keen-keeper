"use client";
import { useState, useEffect } from "react";
import { useTimeline } from "@/context/TimelineContext";
import { Phone, MessageSquare, Video, Bell, Archive, Trash2, Edit2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Toaster } from 'react-hot-toast'; // Toaster components only

export default function FriendDetail() {
  const { id } = useParams();
  const { addActivity } = useTimeline();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await fetch("/data/friends.json");
        const data = await response.json();
        const foundFriend = data.find(f => f.id === parseInt(id));
        setFriend(foundFriend);
      } catch (error) {
        console.error("Error fetching friend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriendData();
  }, [id]);

  const handleInteraction = (type) => {
    if (!friend) return;
    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
    addActivity(formattedType, friend.name);
  };

  if (loading) return <p className="p-20 text-center font-bold">Loading...</p>;
  if (!friend) return <p className="p-20 text-center text-red-500 font-bold">Friend not found!</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN - PROFILE & ACTIONS */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-xl border text-center shadow-sm">
            <img src={friend.picture} alt={friend.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-50" />
            <h2 className="text-2xl font-bold text-gray-800">{friend.name}</h2>
            <div className="flex flex-col items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${friend.status === 'overdue' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                {friend.status}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Family</span>
            </div>
            <p className="mt-4 text-gray-500 italic text-sm">"Former colleague, great mentor"</p>
            <p className="text-xs text-gray-400 mt-1">Preferred: email</p>
          </div>

          <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-center gap-2 py-4 border-b hover:bg-gray-50 transition text-sm font-medium text-gray-700">
              <Bell size={16} /> Snooze 2 Weeks
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-4 border-b hover:bg-gray-50 transition text-sm font-medium text-gray-700">
              <Archive size={16} /> Archive
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-4 hover:bg-red-50 transition text-sm font-medium text-red-500">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - STATS & QUICK CHECK-IN */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Top Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl border text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-800">{friend.days_since_contact}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Days Since Contact</div>
            </div>
            <div className="bg-white p-6 rounded-xl border text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-800">30</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Goal (Days)</div>
            </div>
            <div className="bg-white p-6 rounded-xl border text-center shadow-sm">
              <div className="text-xl font-bold text-gray-800">Feb 27, 2026</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Next Due</div>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="bg-white p-8 rounded-xl border shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Relationship Goal</h3>
              <p className="text-gray-500 mt-1">Connect every <span className="font-bold text-gray-800">30 days</span></p>
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-50"><Edit2 size={16}/></button>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white p-8 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleInteraction('call')} className="flex flex-col items-center gap-3 p-6 border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <Phone className="text-gray-400 group-hover:text-emerald-600" size={24} />
                <span className="text-sm font-semibold text-gray-600">Call</span>
              </button>
              <button onClick={() => handleInteraction('text')} className="flex flex-col items-center gap-3 p-6 border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <MessageSquare className="text-gray-400 group-hover:text-emerald-600" size={24} />
                <span className="text-sm font-semibold text-gray-600">Text</span>
              </button>
              <button onClick={() => handleInteraction('video')} className="flex flex-col items-center gap-3 p-6 border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <Video className="text-gray-400 group-hover:text-emerald-600" size={24} />
                <span className="text-sm font-semibold text-gray-600">Video</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
