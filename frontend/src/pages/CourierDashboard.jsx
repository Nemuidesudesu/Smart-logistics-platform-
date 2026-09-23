import React, { useState } from 'react';
import { MOCK_ORDERS } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import { MapPin, Navigation, CheckCircle, AlertCircle } from 'lucide-react';

export default function CourierDashboard() {
  // Имитация авторизованного курьера с ID: 1
  const CURRENT_COURIER_ID = 1;
  const [courierOrders, setCourierOrders] = useState(
    MOCK_ORDERS.filter(o => o.courierId === CURRENT_COURIER_ID)
  );

  const updateOrderStatus = (orderId, newStatus) => {
    setCourierOrders(courierOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-10">
      <div className="bg-slate-900 text-white p-4 shadow-md">
        <h1 className="text-lg font-bold">Личный кабинет курьера</h1>
        <p className="text-xs text-slate-400">Иван Иванов (ID: {CURRENT_COURIER_ID})</p>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="font-bold text-gray-700">Мои назначения ({courierOrders.length})</h2>

        {courierOrders.map(order => (
          <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <span className="font-extrabold text-lg text-gray-800">Заказ #{order.id}</span>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="text-red-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-xs text-gray-400">Забрать:</div>
                  <div className="font-medium text-gray-800">{order.origin}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-gray-600">
                <Navigation className="text-blue-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-xs text-gray-400">Доставить:</div>
                  <div className="font-medium text-gray-800">{order.destination}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-lg text-xs grid grid-cols-2 gap-2 mt-2">
                <div>Груз: <strong>{order.cargoType}</strong></div>
                <div>Вес: <strong>{order.weight} кг</strong></div>
              </div>
            </div>

            {/* Кнопки действия (Business-flow статусов) */}
            <div className="pt-2 border-t flex flex-col gap-2">
              {order.status === 'courier_assigned' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'in_transit')}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <Navigation size={16} /> Начать доставку (В пути)
                </button>
              )}

              {order.status === 'in_transit' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Подтвердить доставку
                </button>
              )}

              {order.status !== 'delivered' && (
                <button
                  onClick={() => alert("Сообщение передано диспетчеру")}
                  className="w-full py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1"
                >
                  <AlertCircle size={14} /> Сообщить о проблеме
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}