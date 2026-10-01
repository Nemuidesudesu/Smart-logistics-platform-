package com.example.deliveryapp.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun DeliveryApp() {

    var currentScreen by remember {
        mutableStateOf("login")
    }

    var selectedRole by remember {
        mutableStateOf("")
    }

    when (currentScreen) {

        "login" -> {
            LoginScreen(
                onLogin = { role ->
                    selectedRole = role
                    currentScreen = role
                }
            )
        }

        "client" -> {
            ClientScreen(
                onOrders = {
                    currentScreen = "orders"
                },
                onProfile = {
                    currentScreen = "profile"
                }
            )
        }

        "courier" -> {
            CourierScreen()
        }

        "dispatcher" -> {
            DispatcherScreen()
        }

        "orders" -> {
            OrdersScreen(
                onBack = {
                    currentScreen = selectedRole
                }
            )
        }

        "profile" -> {
            ProfileScreen(
                onBack = {
                    currentScreen = "client"
                }
            )
        }
    }
}

@Composable
fun LoginScreen(
    onLogin: (String) -> Unit
) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Text(
            text = "Delivery App",
            style = MaterialTheme.typography.headlineLarge,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text("Система управления доставкой")

        Spacer(modifier = Modifier.height(32.dp))

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = {
                Text("Логин")
            },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = {
                Text("Пароль")
            },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = {
                onLogin("client")
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Войти как клиент")
        }

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedButton(
            onClick = {
                onLogin("courier")
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Войти как курьер")
        }

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedButton(
            onClick = {
                onLogin("dispatcher")
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Войти как диспетчер")
        }
    }
}