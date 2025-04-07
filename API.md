# Documentación de la API - DevHub ERP

## 📋 Información General

- **URL Base**: `http://localhost:3000`
- **Documentación Swagger**: `http://localhost:3000/api/swagger`
- **Autenticación**: JWT Bearer Token

## 🔐 Autenticación

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 👤 Usuarios

### Crear Usuario
```http
POST /user
```

**Request Body:**
```json
{
  "name": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "roleId": 1,
  "role": "ADMIN",
  "accountStatus": "ACTIVE",
  "createdAt": "2024-04-06T00:00:00.000Z",
  "updatedAt": "2024-04-06T00:00:00.000Z"
}
```

### Actualizar Usuario
```http
PUT /user/:id
```

**Request Body:**
```json
{
  "name": "Nuevo Nombre",
  "email": "nuevo@ejemplo.com",
  "password": "nuevacontraseña123",
  "roleId": 2,
  "role": "USER"
}
```

## 📦 Productos

### Listar Productos
```http
GET /product
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Producto 1",
    "description": "Descripción del producto",
    "barcode": "123456789",
    "image": "url_imagen",
    "category": {
      "id": 1,
      "name": "Categoría 1"
    },
    "brand": {
      "id": 1,
      "name": "Marca 1"
    },
    "price": 100.00,
    "stock": 50,
    "expiration": "2024-12-31"
  }
]
```

### Crear Producto
```http
POST /product
```

**Request Body:**
```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "barcode": "987654321",
  "image": "url_imagen",
  "supplierId": 1,
  "categoryId": 1,
  "price": 150.00,
  "stock": 100,
  "expiration": "2024-12-31"
}
```

### Actualizar Producto
```http
PUT /product/:id
```

**Request Body:**
```json
{
  "name": "Producto Actualizado",
  "description": "Nueva descripción",
  "barcode": "987654321",
  "image": "nueva_url_imagen",
  "supplierId": 1,
  "categoryId": 1,
  "price": 200.00,
  "stock": 75,
  "expiration": "2024-12-31"
}
```

## 🛒 Órdenes

### Crear Orden
```http
POST /order
```

**Request Body:**
```json
{
  "customerId": "1",
  "sellerId": "2",
  "orderNumber": "ORD-2024-001",
  "orderDate": "2024-04-06T00:00:00.000Z",
  "status": "PENDING",
  "totalAmount": 1000.00,
  "totalAmountPaid": 0.00,
  "totalAmountPending": 1000.00,
  "totalNegotiable": 0.00,
  "deliveryDate": "2024-04-10T00:00:00.000Z",
  "paymentMethod": "CASH",
  "proofOfPayment": "url_comprobante",
  "details": [
    {
      "productId": "1",
      "productName": "Producto 1",
      "productImage": "url_imagen",
      "quantity": 2,
      "unitlPrice": 500.00,
      "negotiablePrice": 500.00,
      "totalPrice": 1000.00,
      "totalNegotiablePrice": 1000.00
    }
  ]
}
```

### Actualizar Orden
```http
PUT /order/:id
```

**Request Body:**
```json
{
  "status": "COMPLETED",
  "totalAmountPaid": 1000.00,
  "totalAmountPending": 0.00,
  "sellerNotes": "Orden completada exitosamente"
}
```

## 🔒 Seguridad

- Todos los endpoints (excepto login) requieren autenticación
- Incluir el token en el header:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

## ⚠️ Códigos de Error

- `400`: Bad Request - Datos inválidos
- `401`: Unauthorized - No autenticado
- `403`: Forbidden - Sin permisos
- `404`: Not Found - Recurso no encontrado
- `500`: Internal Server Error - Error del servidor

## 📝 Notas Adicionales

- Las fechas deben estar en formato ISO 8601
- Los precios deben ser números con decimales
- Las cantidades deben ser números enteros positivos
- Los IDs son strings para productos y números para usuarios
- Las imágenes deben ser URLs válidas 