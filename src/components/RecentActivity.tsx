"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface Activity {
  id: number;
  description: string;
  created_at: string;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  return date.toLocaleDateString();
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("id, description, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      if (!error && data) setActivities(data as Activity[]);
    };
    fetchActivities();
  }, []);
  return (
    <div className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Activity</h2>
      <ul className="divide-y divide-gray-100">
        {activities.length === 0 && <li className="py-2 text-gray-500">No recent activity.</li>}
        {activities.map((a) => (
          <li key={a.id} className="py-2 flex justify-between text-gray-800">
            <span>{a.description}</span>
            <span className="text-xs text-gray-500">{timeAgo(a.created_at)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
