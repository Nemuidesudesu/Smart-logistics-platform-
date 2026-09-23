export const MOCK_ORDERS = [
  {
    id: 101,
    clientName: "ООО 'ТехноМаркет'",
    origin: "ул. Абая 150, Алматы",
    destination: "пр. Достык 42, Алматы",
    weight: 45.0,
    cargoType: "Бытовая техника",
    price: 3500,
    status: "created",
    courierId: null,
    vehicleId: null,
  },
  {
    id: 102,
    clientName: "ИП Смагулов",
    origin: "ул. Гоголя 88, Алматы",
    destination: "ул. Сейфуллина 500, Алматы",
    weight: 5.5,
    cargoType: "Документы",
    price: 1200,
    status: "courier_assigned",
    courierId: 1,
    vehicleId: 10,
  },
  {
    id: 103,
    clientName: "Айтеке Би 12",
    origin: "ул. Толе Би 10, Алматы",
    destination: "ул. Розыбакиева 200, Алматы",
    weight: 600.0,
    cargoType: "Строительные материалы",
    price: 18000,
    status: "in_transit",
    courierId: 2,
    vehicleId: 12,
  }
];

export const MOCK_COURIERS = [
  { id: 1, name: "Иван Иванов", phone: "+7 (701) 111-2233", status: "on_delivery" },
  { id: 2, name: "Пётр Петров", phone: "+7 (707) 444-5566", status: "free" },
  { id: 3, name: "Алексей Сидоров", phone: "+7 (777) 888-9900", status: "free" }
];

export const MOCK_VEHICLES = [
  { id: 10, name: "Hyundai Accent (Легковой)", maxWeight: 300 },
  { id: 11, name: "Gazelle NEXT (Фургон)", maxWeight: 1500 },
  { id: 12, name: "MAN TGX (Грузовик)", maxWeight: 10000 }
];