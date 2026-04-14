"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function HomePage() {
  const [friendsData, setFriendsData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/data/friends.json"); 
        const data = await response.json();
        setFriendsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-800">Loading your friends...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Banner */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Friends to keep close in your life</h1>
        <p className="text-sm text-gray-600 mb-4">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the 
          <br />
          relationships that matter most.
        </p>
        <button className="bg-[#2D4F3F] text-white px-6 py-2 rounded-sm flex items-center gap-2 mx-auto">
          <UserPlus size={18}/> Add a Friend
        </button>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[ 
          {l: 'Total Friends', v: friendsData.length}, 
          {l: 'On Track', v: friendsData.filter(f => f.status !== 'overdue').length}, 
          {l: 'Need Attention', v: friendsData.filter(f => f.status === 'overdue').length}, 
          {l: 'Interactions', v: 12} 
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border text-center">
            <div className="text-3xl font-bold text-[#244d3f]">{s.v}</div>
            <div className="text-xs text-[#64748B] uppercase">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {friendsData.map((f) => (
          <Link href={`/friend/${f.id}`} key={f.id} className="bg-white p-6 rounded-2xl border text-center hover:shadow-lg transition">
            <img src={f.picture} alt={f.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="font-bold text-black">{f.name}</h3>
            <p className="text-xs text-gray-400 mb-4">{f.days_since_contact} days ago</p>
     {/* TAG SECTION */}
<div className="flex flex-wrap justify-center gap-2 mb-3">
  {f.tags && f.tags.map((tag, index) => (
    <span 
      key={index} 
      className="bg-[#D1FAE5] text-[#059669] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
    >
      {tag}
    </span>
  ))}
</div>


      <div className={`py-1 px-4 rounded-full text-xs font-bold inline-block ${f.status === 'overdue' 
    ? 'bg-red-400 text-white' 
    : f.status === 'almost due' 
      ? 'bg-[#efad44] text-white' 
      : 'bg-green-900 text-white'
            }`}>
              {f.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
