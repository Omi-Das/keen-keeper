"use client";

import { useState } from "react";
import { useTimeline } from "@/context/TimelineContext";
import { Phone, MessageSquare, Video, Calendar, Search } from "lucide-react"; 

export default function TimelinePage() {
  const { activities } = useTimeline();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState("newest"); 

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = filter === "All" || activity.type === filter;
    const matchesSearch = activity.friend.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <Phone size={18} className="text-emerald-600" />;
      case "Text": return <MessageSquare size={18} className="text-blue-600" />;
      case "Video": return <Video size={18} className="text-purple-600" />;
      default: return <Calendar size={18} className="text-gray-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Timeline</h1>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        {/* 1. All Types (Moved to Left) */}
        <select 
          className="bg-white border border-gray-200 text-sm text-[#64748B] font-medium py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 min-w-[140px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter Timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search friend or type..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white placeholder-gray-400 text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="bg-white border border-gray-200 text-sm text-[#64748B] font-medium py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-gray-50">
                  {getIcon(activity.type)}
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800">
                    {activity.type} with {activity.friend}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {activity.date}
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                Completed
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed">
            No interactions found.
          </div>
        )}
      </div>
    </div>
  );
}
