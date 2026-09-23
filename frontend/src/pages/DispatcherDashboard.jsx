import React, { useState } from 'react';
import { MOCK_ORDERS, MOCK_COURIERS, MOCK_VEHICLES } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import { Package, Truck, UserCheck, AlertTriangle } from 'lucide-react';

export default function DispatcherDashboard() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAssign = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const vehicle = MOCK_VEHICLES.find(v => v.id === Number(selectedVehicle));
    
    // Проверка бизнес-логики грузоподъемности
    if (vehicle && vehicle.maxWeight < selectedOrder.weight) {
      setErrorMsg(`Ошибка! Макс. грузоподъемность (${vehicle.maxWeight} кг) меньше веса груза (${selectedOrder.weight} кг).`);
      return;
    }

    // Обновление состояния заказа
    setOrders(orders.map(o => o.id === selectedOrder.id ? {
      ...o,
      status: 'courier_assigned',
      courierId: Number(selectedCourier),
      vehicleId: Number(selectedVehicle)
    } : o));

    setSelectedOrder(null);
    setSelectedCourier("");
    setSelectedVehicle("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Панель Диспетчера</h1>

      {/* Карточки метрик */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Всего заказов</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <Package className="text-blue-500" size={32} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ожидают назначения</p>
            <p className="text-2xl font-bold text-amber-600">
              {orders.filter(o => o.status === 'created').length}
            </p>
          </div>
          <AlertTriangle className="text-amber-500" size={32} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Свободные курьеры</p>
            <p className="text-2xl font-bold text-green-600">
              {MOCK_COURIERS.filter(c => c.status === 'free').length}
            </p>
          </div>
          <UserCheck className="text-green-500" size={32} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Транспорт в рейсе</p>
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'in_transit').length}
            </p>
          </div>
          <Truck className="text-purple-500" size={32} />
        </div>
      </div>

      {/* Список заказов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Клиент</th>
              <th className="p-4">Маршрут</th>
              <th className="p-4">Вес (кг)</th>
              <th className="p-4">Стоимость</th>
              <th className="p-4">Статус</th>
              <th className="p-4">Действие</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 font-semibold">#{order.id}</td>
                <td className="p-4">{order.clientName}</td>
                <td className="p-4">
                  <div className="text-xs text-gray-500">Из: {order.origin}</div>
                  <div className="text-xs text-gray-800 font-medium">В: {order.destination}</div>
                </td>
                <td className="p-4 font-medium">{order.weight} кг</td>
                <td className="p-4">{order.price} ₸</td>
                <td className="p-4"><StatusBadge status={order.status} /></td>
                <td className="p-4">
                  {order.status === 'created' ? (
                    <button 
                      onClick={() => { setSelectedOrder(order); setErrorMsg(""); }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium"
                    >
                      Назначить
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">Распределён</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно назначения курьера и транспорта */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Назначение курьера на Заказ #{selectedOrder.id}</h3>
            <p className="text-sm text-gray-600 mb-4">Вес груза: <strong>{selectedOrder.weight} кг</strong></p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Выбрать курьера</label>
                <select 
                  required
                  className="w-full border rounded-lg p-2 text-sm"
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                >
                  <option value="">-- Выберите курьера --</option>
                  {MOCK_COURIERS.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.status === 'free' ? 'Свободен' : 'В рейсе'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Выбрать транспорт</label>
                <select 
                  required
                  className="w-full border rounded-lg p-2 text-sm"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <option value="">-- Выберите транспорт --</option>
                  {MOCK_VEHICLES.map(v => (
                    <option key={v.id} value={v.id}>{v.name} (до {v.maxWeight} кг)</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-lg"
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                >
                  Подтвердить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}