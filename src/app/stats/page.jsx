"use client"; 

import dynamic from 'next/dynamic';
import { useTimeline } from "@/context/TimelineContext";


const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), { 
  ssr: false, 
  loading: () => <div className="h-[350px] flex items-center justify-center bg-gray-50 rounded-xl">Loading Chart...</div>
});

export default function StatsPage() {
  const { activities } = useTimeline();
  
  const data = [
    { name: "Call", value: activities.filter(a => a.type === "Call").length || 0 },
    { name: "Text", value: activities.filter(a => a.type === "Text").length || 0 },
    { name: "Video", value: activities.filter(a => a.type === "Video").length || 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-black">Friendship Analytics</h1>
      <div className="bg-white p-10 rounded-3xl border shadow-sm">
        <p className="font-bold text-3xl text-green-600 mb-8">By Interaction Type</p>
        
        <AnalyticsChart data={data} />
      </div>
    </div>
  );
}
