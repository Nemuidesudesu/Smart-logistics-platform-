import React from 'react';

const STATUS_MAP = {
  created: { label: "Создан", bg: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Подтверждён", bg: "bg-blue-100 text-blue-800" },
  courier_assigned: { label: "Назначен курьер", bg: "bg-purple-100 text-purple-800" },
  in_transit: { label: "В пути", bg: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "Доставлен", bg: "bg-green-100 text-green-800" },
  cancelled: { label: "Отменён", bg: "bg-red-100 text-red-800" },
};

export default function StatusBadge({ status }) {
  const config = STATUS_MAP[status] || { label: status, bg: "bg-gray-100 text-gray-800" };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg}`}>
      {config.label}
    </span>
  );
}