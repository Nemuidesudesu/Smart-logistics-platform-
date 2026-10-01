package com.example.deliveryapp.model

data class Order(
    val id: Int,
    val from: String,
    val to: String,
    val status: OrderStatus,
    val price: Int
)

enum class OrderStatus(val title: String) {
    NEW("Новый"),
    ACCEPTED("Принят"),
    IN_PROGRESS("В пути"),
    COMPLETED("Завершён"),
    CANCELLED("Отменён")
}

val demoOrders = listOf(
    Order(
        1024,
        "ул. Абая, 10",
        "пр. Республики, 25",
        OrderStatus.NEW,
        1800
    ),
    Order(
        1025,
        "ул. Сарыарка, 18",
        "ул. Кенесары, 42",
        OrderStatus.ACCEPTED,
        2200
    ),
    Order(
        1026,
        "ул. Бейбитшилик, 5",
        "пр. Кабанбай батыра, 12",
        OrderStatus.IN_PROGRESS,
        2500
    ),
    Order(
        1027,
        "ул. Достык, 7",
        "ул. Алматы, 30",
        OrderStatus.COMPLETED,
        1600
    )
)