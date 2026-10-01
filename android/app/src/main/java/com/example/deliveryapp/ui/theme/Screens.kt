@file:OptIn(ExperimentalMaterial3Api::class)

package com.example.deliveryapp.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.deliveryapp.model.OrderStatus
import com.example.deliveryapp.model.demoOrders
@Composable
fun ClientScreen(
    onOrders: () -> Unit,
    onProfile: () -> Unit
) {

    Scaffold(

        bottomBar = {

            NavigationBar {

                NavigationBarItem(
                    selected = true,
                    onClick = {},
                    icon = {
                        Text("⌂")
                    },
                    label = {
                        Text("Главная")
                    }
                )

                NavigationBarItem(
                    selected = false,
                    onClick = onOrders,
                    icon = {
                        Text("≡")
                    },
                    label = {
                        Text("Заказы")
                    }
                )

                NavigationBarItem(
                    selected = false,
                    onClick = onProfile,
                    icon = {
                        Text("●")
                    },
                    label = {
                        Text("Профиль")
                    }
                )
            }
        }

    ) { padding ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(20.dp),

            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {

            item {

                Text(
                    text = "Здравствуйте!",
                    style = MaterialTheme.typography.headlineMedium,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    "Создайте новый заказ или проверьте текущие доставки."
                )
            }

            item {

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Text(
                            "Новый заказ",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(
                            modifier = Modifier.height(8.dp)
                        )

                        Text(
                            "Укажите адрес отправления и адрес доставки."
                        )

                        Spacer(
                            modifier = Modifier.height(16.dp)
                        )

                        Button(
                            onClick = {},
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("Создать заказ")
                        }
                    }
                }
            }

            item {

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Text(
                            "Мои заказы",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )

                        Text(
                            "Количество заказов: ${demoOrders.size}"
                        )

                        Spacer(
                            modifier = Modifier.height(12.dp)
                        )

                        OutlinedButton(
                            onClick = onOrders,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("Открыть заказы")
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun OrdersScreen(
    onBack: () -> Unit
) {

    Scaffold(

        topBar = {

            TopAppBar(
                title = {
                    Text("Мои заказы")
                },

                navigationIcon = {

                    TextButton(
                        onClick = onBack
                    ) {
                        Text("Назад")
                    }
                }
            )
        }

    ) { padding ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),

            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            items(demoOrders) { order ->

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {

                        Text(
                            "#${order.id}",
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(
                            modifier = Modifier.height(8.dp)
                        )

                        Text(
                            "Откуда: ${order.from}"
                        )

                        Text(
                            "Куда: ${order.to}"
                        )

                        Spacer(
                            modifier = Modifier.height(8.dp)
                        )

                        Text(
                            "Статус: ${order.status.title}"
                        )

                        Text(
                            "Стоимость: ${order.price} ₸",
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun CourierScreen() {

    Scaffold(

        topBar = {
            TopAppBar(
                title = {
                    Text("Кабинет курьера")
                }
            )
        }

    ) { padding ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),

            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            item {

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Text(
                            "Текущая смена",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )

                        Text("Статус: На линии")

                        Spacer(
                            modifier = Modifier.height(12.dp)
                        )

                        Button(
                            onClick = {}
                        ) {
                            Text("Изменить статус")
                        }
                    }
                }
            }

            item {

                Text(
                    "Доступные заказы",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
            }

            items(
                demoOrders.filter {
                    it.status == OrderStatus.NEW
                }
            ) { order ->

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {

                        Text(
                            "#${order.id}",
                            fontWeight = FontWeight.Bold
                        )

                        Text("Откуда: ${order.from}")
                        Text("Куда: ${order.to}")

                        Spacer(
                            modifier = Modifier.height(8.dp)
                        )

                        Button(
                            onClick = {}
                        ) {
                            Text("Принять заказ")
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DispatcherScreen() {

    Scaffold(

        topBar = {
            TopAppBar(
                title = {
                    Text("Панель диспетчера")
                }
            )
        }

    ) { padding ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),

            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {

            item {

                Text(
                    "Мониторинг заказов",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    "Контроль статусов и распределение заказов."
                )
            }

            item {

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        Text("Статистика")

                        Text(
                            "Новые: ${
                                demoOrders.count {
                                    it.status == OrderStatus.NEW
                                }
                            }"
                        )

                        Text(
                            "В пути: ${
                                demoOrders.count {
                                    it.status == OrderStatus.IN_PROGRESS
                                }
                            }"
                        )

                        Text(
                            "Завершено: ${
                                demoOrders.count {
                                    it.status == OrderStatus.COMPLETED
                                }
                            }"
                        )
                    }
                }
            }

            items(demoOrders) { order ->

                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {

                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {

                        Text(
                            "#${order.id}",
                            fontWeight = FontWeight.Bold
                        )

                        Text(
                            "Статус: ${order.status.title}"
                        )

                        Text(
                            "${order.from} → ${order.to}"
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun ProfileScreen(
    onBack: () -> Unit
) {

    Scaffold(

        topBar = {

            TopAppBar(

                title = {
                    Text("Профиль")
                },

                navigationIcon = {

                    TextButton(
                        onClick = onBack
                    ) {
                        Text("Назад")
                    }
                }
            )
        }

    ) { padding ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(24.dp)
        ) {

            Text(
                "Профиль пользователя",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold
            )

            Spacer(
                modifier = Modifier.height(16.dp)
            )

            Text("Имя: Демо-пользователь")
            Text("Роль: Клиент")

            Spacer(
                modifier = Modifier.height(20.dp)
            )

            OutlinedButton(
                onClick = {}
            ) {
                Text("Изменить данные")
            }
        }
    }
}