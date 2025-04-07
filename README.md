# DevHub ERP

Sistema de Planificación de Recursos Empresariales (ERP) desarrollado con NestJS.

## 🚀 Descripción

DevHub ERP es un sistema integral de gestión empresarial que incluye módulos para:
- Gestión de usuarios y autenticación
- Gestión de productos
- Gestión de órdenes
- Gestión de carritos de compra

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- Bun (v1.0 o superior)
- PostgreSQL
- TypeScript

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd devhub-erp
```

2. Instalar dependencias:
```bash
bun install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/devhub_erp
JWT_SECRET=tu_secreto_jwt
PORT=3000
NODE_ENV=development
```

4. Ejecutar migraciones de la base de datos:
```bash
bun run migration:run
```

5. Iniciar la aplicación:
```bash
bun run start:dev
```

## 📁 Estructura del Proyecto

```
src/
├── auth/           # Módulo de autenticación
├── cart/           # Módulo de carritos
├── database/       # Configuración de base de datos
├── order/          # Módulo de órdenes
├── product/        # Módulo de productos
└── user/           # Módulo de usuarios
```

## 📚 Documentación de la API

La documentación de la API está disponible en:
```
http://localhost:3000/api/swagger
```

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a los endpoints protegidos, incluye el token en el header de la siguiente manera:

```
Authorization: Bearer <tu_token>
```

## 🧪 Testing

Para ejecutar los tests:
```bash
bun run test
```

Para ejecutar tests con cobertura:
```bash
bun run test:cov
```

## 🚀 Scripts Disponibles

- `bun run start` - Inicia la aplicación en modo producción
- `bun run start:dev` - Inicia la aplicación en modo desarrollo
- `bun run build` - Compila la aplicación
- `bun run test` - Ejecuta los tests
- `bun run test:cov` - Ejecuta los tests con cobertura
- `bun run lint` - Ejecuta el linter
- `bun run format` - Formatea el código

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para cualquier consulta o soporte, por favor contacta al equipo de desarrollo.
