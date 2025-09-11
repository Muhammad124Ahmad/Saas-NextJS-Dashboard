import React from "react";

export default function RecentActivity() {
  const activities = [
    { id: 1, text: "User John upgraded to Pro plan.", time: "2 min ago" },
    { id: 2, text: "Beta LLC subscription renewed.", time: "10 min ago" },
    { id: 3, text: "New user Alice signed up.", time: "30 min ago" },
    { id: 4, text: "Delta Ltd cancelled subscription.", time: "1 hour ago" },
  ];
  return (
    <div className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Activity</h2>
      <ul className="divide-y divide-gray-100">
        {activities.map((a) => (
          <li key={a.id} className="py-2 flex justify-between text-gray-800">
            <span>{a.text}</span>
            <span className="text-xs text-gray-500">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
