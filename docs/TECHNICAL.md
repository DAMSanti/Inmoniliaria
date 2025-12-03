# 📋 Documento Técnico
## Vacacional Rental Platform

**Versión:** 1.0.0  
**Fecha:** Diciembre 2025  
**Clasificación:** Interno

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Visión General del Sistema](#2-visión-general-del-sistema)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Arquitectura del Sistema](#4-arquitectura-del-sistema)
5. [Modelo de Datos](#5-modelo-de-datos)
6. [APIs y Endpoints](#6-apis-y-endpoints)
7. [Seguridad](#7-seguridad)
8. [Internacionalización](#8-internacionalización)
9. [Rendimiento y Optimización](#9-rendimiento-y-optimización)
10. [Infraestructura y Despliegue](#10-infraestructura-y-despliegue)
11. [Monitorización](#11-monitorización)
12. [Anexos](#12-anexos)

---

## 1. Introducción

### 1.1 Propósito del Documento

Este documento técnico describe la arquitectura, diseño y especificaciones técnicas de la plataforma **Vacacional Rental Platform**, un sistema web integral para la gestión y comercialización de alquileres vacacionales.

### 1.2 Alcance

El sistema abarca:
- **Plataforma web pública** para búsqueda y reserva de propiedades
- **Aplicación móvil nativa** (React Native - fase posterior)
- **Panel de administración** para gestión completa
- **APIs RESTful** para integraciones

### 1.3 Audiencia

- Equipo de desarrollo
- DevOps / Infraestructura
- Product Owners
- Stakeholders técnicos

### 1.4 Definiciones y Acrónimos

| Término | Definición |
|---------|------------|
| SSR | Server-Side Rendering |
| SSG | Static Site Generation |
| ISR | Incremental Static Regeneration |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| CDN | Content Delivery Network |
| RBAC | Role-Based Access Control |

---

## 2. Visión General del Sistema

### 2.1 Descripción del Negocio

**Vacacional Rental Platform** es una plataforma de alquiler vacacional de tamaño medio especializada en:
- Alquiler de viviendas vacacionales
- Gestión de propiedades para propietarios
- Búsqueda avanzada para huéspedes
- Tours virtuales 360°

### 2.2 Objetivos del Sistema

| Objetivo | Descripción | Métrica |
|----------|-------------|---------|
| Rendimiento | Tiempo de carga < 3s | Core Web Vitals |
| Disponibilidad | Uptime 99.9% | SLA |
| Escalabilidad | Soportar 10K usuarios concurrentes | Load Testing |
| Seguridad | Cumplimiento GDPR/LOPD | Auditorías |
| SEO | Indexación completa | Lighthouse Score > 90 |

### 2.3 Usuarios del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    TIPOS DE USUARIO                         │
├─────────────────┬───────────────────┬───────────────────────┤
│    VISITANTE    │     USUARIO       │       AGENTE          │
│  (Sin registro) │   (Registrado)    │    (Empleado)         │
├─────────────────┼───────────────────┼───────────────────────┤
│ • Ver propiedades│ • Todo visitante │ • Todo usuario        │
│ • Buscar        │ • Favoritos       │ • Gestionar props     │
│ • Contactar     │ • Reservar        │ • Responder consultas │
│                 │ • Valorar         │ • Ver estadísticas    │
├─────────────────┴───────────────────┼───────────────────────┤
│              ADMINISTRADOR          │    SUPER ADMIN        │
├─────────────────────────────────────┼───────────────────────┤
│ • Todo agente                       │ • Todo admin          │
│ • Gestionar usuarios                │ • Configuración       │
│ • Gestionar contenido               │ • Gestionar admins    │
│ • Ver analíticas                    │ • Logs de auditoría   │
└─────────────────────────────────────┴───────────────────────┘
```

---

## 3. Stack Tecnológico

### 3.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.2.x | Framework React con SSR/SSG |
| **React** | 18.3.x | Biblioteca UI |
| **TypeScript** | 5.5.x | Tipado estático |
| **Tailwind CSS** | 3.4.x | Framework CSS utility-first |
| **React Query** | 5.x | Gestión de estado servidor |
| **Zustand** | 4.5.x | Gestión de estado cliente |
| **React Hook Form** | 7.x | Formularios |
| **Zod** | 3.23.x | Validación de esquemas |
| **Framer Motion** | 11.x | Animaciones |
| **next-intl** | 3.17.x | Internacionalización |

### 3.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js API Routes** | 14.x | API endpoints |
| **Prisma** | 5.19.x | ORM |
| **NextAuth.js** | 4.24.x | Autenticación |
| **bcryptjs** | 2.4.x | Hashing contraseñas |
| **jsonwebtoken** | 9.x | JWT tokens |
| **nodemailer** | 6.9.x | Envío de emails |
| **ioredis** | 5.4.x | Cliente Redis |

### 3.3 Base de Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **PostgreSQL** | 16.x | Base de datos principal |
| **Redis** | 7.x | Caché y sesiones |

### 3.4 Infraestructura

| Tecnología | Propósito |
|------------|-----------|
| **Docker** | Contenedorización |
| **Docker Compose** | Orquestación local |
| **Nginx** | Reverse proxy / Load balancer |
| **DigitalOcean Droplets** | Servidores cloud |
| **DigitalOcean Spaces** | Almacenamiento S3-compatible |
| **DigitalOcean Managed DB** | PostgreSQL gestionado |
| **Let's Encrypt** | Certificados SSL |

### 3.5 Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **ESLint** | Linting código |
| **Prettier** | Formateo código |
| **Jest** | Testing unitario |
| **Playwright** | Testing E2E |
| **Husky** | Git hooks |
| **Commitlint** | Validación commits |

---

## 4. Arquitectura del Sistema

### 4.1 Diagrama de Arquitectura General

```
                                    ┌─────────────────┐
                                    │   CDN (Spaces)  │
                                    │  Static Assets  │
                                    └────────┬────────┘
                                             │
┌──────────────┐     ┌──────────────┐       │
│   Browser    │────▶│   Nginx      │◀──────┘
│   Mobile     │     │ Load Balancer│
└──────────────┘     └──────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │  Next.js  │ │  Next.js  │ │  Next.js  │
        │ Instance 1│ │ Instance 2│ │ Instance N│
        └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
              │             │             │
              └─────────────┼─────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │   Redis   │ │ PostgreSQL│ │  Spaces   │
        │   Cache   │ │  Database │ │  Storage  │
        └───────────┘ └───────────┘ └───────────┘
```

### 4.2 Arquitectura de Capas

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │ Components  │  │    Layouts              │  │
│  │  (Routes)   │  │    (UI)     │  │   (Structure)           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Hooks     │  │   Stores    │  │      Services           │  │
│  │ (Logic)     │  │   (State)   │  │   (API Calls)           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        API LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  API Routes │  │ Middleware  │  │     Validators          │  │
│  │ (Endpoints) │  │  (Auth/Log) │  │      (Zod)              │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                       DOMAIN LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Entities  │  │    Types    │  │      Constants          │  │
│  │  (Models)   │  │ (Interfaces)│  │    (Enums/Config)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Prisma    │  │    Redis    │  │   External Services     │  │
│  │    (ORM)    │  │   (Cache)   │  │  (Email, Storage, Maps) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Estructura de Directorios

```
vacacional-rental-platform/
├── 📁 .github/                  # GitHub workflows y configuración
├── 📁 docker/                   # Configuración Docker
│   ├── 📁 nginx/               # Configuración Nginx
│   └── 📁 postgres/            # Scripts inicialización DB
├── 📁 docs/                     # Documentación
│   ├── 📄 TECHNICAL.md         # Documento técnico
│   ├── 📄 SAD.md               # Software Architecture Document
│   ├── 📄 BEST_PRACTICES.md    # Guía de buenas prácticas
│   └── 📄 ROADMAP.md           # Roadmap del proyecto
├── 📁 prisma/                   # Esquema y migraciones
│   ├── 📄 schema.prisma        # Modelo de datos
│   ├── 📁 migrations/          # Migraciones
│   └── 📄 seed.ts              # Datos semilla
├── 📁 public/                   # Archivos estáticos
│   ├── 📁 images/              # Imágenes
│   ├── 📁 icons/               # Iconos
│   └── 📁 locales/             # Traducciones
├── 📁 src/
│   ├── 📁 app/                  # App Router (Next.js 14)
│   │   ├── 📁 (auth)/          # Rutas autenticación
│   │   ├── 📁 (main)/          # Rutas principales
│   │   ├── 📁 (admin)/         # Panel administración
│   │   ├── 📁 api/             # API Routes
│   │   ├── 📄 layout.tsx       # Layout raíz
│   │   └── 📄 page.tsx         # Página inicio
│   ├── 📁 components/           # Componentes React
│   │   ├── 📁 ui/              # Componentes UI base
│   │   ├── 📁 layout/          # Header, Footer, Nav
│   │   ├── 📁 properties/      # Componentes propiedades
│   │   ├── 📁 booking/         # Componentes reservas
│   │   ├── 📁 forms/           # Formularios
│   │   └── 📁 admin/           # Componentes admin
│   ├── 📁 hooks/                # Custom hooks
│   ├── 📁 lib/                  # Utilidades y configuración
│   │   ├── 📄 prisma.ts        # Cliente Prisma
│   │   ├── 📄 redis.ts         # Cliente Redis
│   │   ├── 📄 auth.ts          # Configuración NextAuth
│   │   └── 📄 utils.ts         # Funciones utilidad
│   ├── 📁 services/             # Servicios API
│   ├── 📁 stores/               # Zustand stores
│   ├── 📁 types/                # TypeScript types
│   ├── 📁 styles/               # Estilos globales
│   ├── 📁 i18n/                 # Internacionalización
│   │   ├── 📄 request.ts       # Configuración
│   │   └── 📁 messages/        # Traducciones
│   └── 📁 config/               # Configuración app
├── 📁 tests/                    # Tests
│   ├── 📁 unit/                # Tests unitarios
│   ├── 📁 integration/         # Tests integración
│   └── 📁 e2e/                 # Tests E2E
├── 📄 .env.example              # Variables de entorno ejemplo
├── 📄 docker-compose.dev.yml    # Docker desarrollo
├── 📄 docker-compose.prod.yml   # Docker producción
├── 📄 Dockerfile                # Dockerfile producción
├── 📄 Dockerfile.dev            # Dockerfile desarrollo
├── 📄 next.config.js            # Configuración Next.js
├── 📄 tailwind.config.ts        # Configuración Tailwind
├── 📄 tsconfig.json             # Configuración TypeScript
└── 📄 package.json              # Dependencias
```

---

## 5. Modelo de Datos

### 5.1 Diagrama Entidad-Relación

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      USER       │       │    PROPERTY     │       │     BOOKING     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id          PK  │       │ id          PK  │       │ id          PK  │
│ email           │       │ title      JSON │       │ bookingNumber   │
│ firstName       │◀──────│ agentId     FK  │───────│ propertyId  FK  │
│ lastName        │  1:N  │ type            │  1:N  │ userId      FK  │
│ role            │       │ status          │       │ checkIn         │
│ status          │       │ city            │       │ checkOut        │
└────────┬────────┘       │ pricePerNight   │       │ total           │
         │                └────────┬────────┘       │ status          │
         │                         │                └─────────────────┘
         │                         │
         │ 1:N              1:N    │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│    FAVORITE     │       │ PROPERTY_IMAGE  │
├─────────────────┤       ├─────────────────┤
│ id          PK  │       │ id          PK  │
│ userId      FK  │       │ propertyId  FK  │
│ propertyId  FK  │       │ url             │
└─────────────────┘       │ isPrimary       │
                          └─────────────────┘

┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     REVIEW      │       │    INQUIRY      │       │   VALUATION     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id          PK  │       │ id          PK  │       │ id          PK  │
│ propertyId  FK  │       │ propertyId  FK  │       │ propertyType    │
│ userId      FK  │       │ userId      FK  │       │ address         │
│ overallRating   │       │ type            │       │ estimatedValue  │
│ comment         │       │ message         │       │ status          │
└─────────────────┘       │ status          │       └─────────────────┘
                          └─────────────────┘
```

### 5.2 Entidades Principales

#### 5.2.1 User (Usuario)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | CUID | Identificador único |
| email | String | Email único |
| passwordHash | String | Contraseña hasheada |
| firstName | String | Nombre |
| lastName | String | Apellidos |
| role | Enum | USER, AGENT, ADMIN, SUPER_ADMIN |
| status | Enum | ACTIVE, INACTIVE, SUSPENDED, PENDING |
| preferredLanguage | String | Idioma preferido (es, en, fr...) |

#### 5.2.2 Property (Propiedad)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | CUID | Identificador único |
| title | JSON | Título multiidioma |
| description | JSON | Descripción multiidioma |
| slug | String | URL amigable única |
| type | Enum | APARTMENT, HOUSE, VILLA... |
| status | Enum | DRAFT, ACTIVE, RENTED... |
| pricePerNight | Float | Precio por noche |
| bedrooms | Int | Número de habitaciones |
| bathrooms | Float | Número de baños |
| maxGuests | Int | Capacidad máxima |
| amenities | String[] | Lista de servicios |

#### 5.2.3 Booking (Reserva)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | CUID | Identificador único |
| bookingNumber | String | Número de reserva único |
| propertyId | FK | Propiedad reservada |
| userId | FK | Usuario que reserva |
| checkIn | DateTime | Fecha entrada |
| checkOut | DateTime | Fecha salida |
| total | Float | Precio total |
| status | Enum | PENDING, CONFIRMED, CANCELLED... |

---

## 6. APIs y Endpoints

### 6.1 Estructura de la API

Base URL: `/api/v1`

#### 6.1.1 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión |
| POST | `/auth/logout` | Cerrar sesión |
| POST | `/auth/refresh` | Renovar token |
| POST | `/auth/forgot-password` | Solicitar reset password |
| POST | `/auth/reset-password` | Restablecer contraseña |
| GET | `/auth/me` | Obtener usuario actual |

#### 6.1.2 Propiedades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/properties` | Listar propiedades |
| GET | `/properties/:slug` | Obtener propiedad |
| GET | `/properties/:id/availability` | Disponibilidad |
| GET | `/properties/featured` | Propiedades destacadas |
| POST | `/properties` | Crear propiedad (Admin) |
| PUT | `/properties/:id` | Actualizar propiedad |
| DELETE | `/properties/:id` | Eliminar propiedad |

#### 6.1.3 Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/bookings` | Mis reservas |
| GET | `/bookings/:id` | Detalle reserva |
| POST | `/bookings` | Crear reserva |
| PUT | `/bookings/:id/cancel` | Cancelar reserva |
| POST | `/bookings/:id/review` | Añadir reseña |

#### 6.1.4 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users/profile` | Perfil usuario |
| PUT | `/users/profile` | Actualizar perfil |
| GET | `/users/favorites` | Mis favoritos |
| POST | `/users/favorites/:propertyId` | Añadir favorito |
| DELETE | `/users/favorites/:propertyId` | Quitar favorito |

### 6.2 Formato de Respuesta

```typescript
// Respuesta exitosa
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Respuesta de error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados no son válidos",
    "details": {
      "email": ["El email es requerido"]
    }
  }
}
```

### 6.3 Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado |
| 204 | No Content | Eliminación exitosa |
| 400 | Bad Request | Datos inválidos |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | Sin permisos |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: email duplicado) |
| 422 | Unprocessable | Error de validación |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Server Error | Error interno |

---

## 7. Seguridad

### 7.1 Autenticación y Autorización

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE AUTENTICACIÓN                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌────────┐ │
│  │  Login   │────▶│ Validate │────▶│  Create  │────▶│ Return │ │
│  │ Request  │     │ Creds    │     │  JWT     │     │ Token  │ │
│  └──────────┘     └──────────┘     └──────────┘     └────────┘ │
│                                                                  │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌────────┐ │
│  │ API Call │────▶│  Verify  │────▶│  Check   │────▶│ Allow/ │ │
│  │ + Token  │     │   JWT    │     │  Perms   │     │ Deny   │ │
│  └──────────┘     └──────────┘     └──────────┘     └────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 7.1.1 JWT Configuration

```typescript
// Token de acceso: 15 minutos
ACCESS_TOKEN_EXPIRES = '15m'

// Token de refresco: 7 días
REFRESH_TOKEN_EXPIRES = '7d'

// Algoritmo: RS256 para producción
ALGORITHM = 'RS256'
```

#### 7.1.2 Control de Acceso (RBAC)

| Recurso | USER | AGENT | ADMIN | SUPER_ADMIN |
|---------|------|-------|-------|-------------|
| Ver propiedades | ✅ | ✅ | ✅ | ✅ |
| Crear reserva | ✅ | ✅ | ✅ | ✅ |
| Ver mis reservas | ✅ | ✅ | ✅ | ✅ |
| Gestionar propiedades | ❌ | ✅ (propias) | ✅ | ✅ |
| Ver todas las reservas | ❌ | ✅ (propias) | ✅ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ | ✅ |
| Configuración sistema | ❌ | ❌ | ❌ | ✅ |
| Logs de auditoría | ❌ | ❌ | ❌ | ✅ |

### 7.2 Protección de Datos

#### 7.2.1 Encriptación

- **En tránsito:** TLS 1.3
- **En reposo:** AES-256 (datos sensibles en DB)
- **Contraseñas:** bcrypt con salt factor 12

#### 7.2.2 Sanitización

```typescript
// Todas las entradas se sanitizan
- HTML encoding para prevenir XSS
- Prepared statements para prevenir SQL injection
- Validación de tipos con Zod
```

### 7.3 Headers de Seguridad

```nginx
# Configuración Nginx
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=63072000";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'; ...";
```

### 7.4 Rate Limiting

| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `/api/auth/*` | 5 req | 1 min |
| `/api/properties` | 100 req | 1 min |
| `/api/bookings` | 20 req | 1 min |
| General | 1000 req | 1 min |

### 7.5 Cumplimiento GDPR/LOPD

- ✅ Consentimiento explícito para cookies
- ✅ Derecho al olvido (eliminación de datos)
- ✅ Exportación de datos personales
- ✅ Política de privacidad clara
- ✅ Registro de tratamiento de datos
- ✅ Notificación de brechas de seguridad

---

## 8. Internacionalización

### 8.1 Idiomas Soportados

| Código | Idioma | Estado |
|--------|--------|--------|
| es | Español | ✅ Principal |
| en | English | ✅ Completo |
| fr | Français | 🔄 En progreso |
| de | Deutsch | 🔄 En progreso |
| it | Italiano | 🔄 En progreso |
| pt | Português | 🔄 En progreso |
| nl | Nederlands | 📋 Planificado |
| pl | Polski | 📋 Planificado |
| ru | Русский | 📋 Planificado |
| sv | Svenska | 📋 Planificado |

### 8.2 Estrategia de Traducción

```typescript
// Contenido estático: Archivos JSON
src/i18n/messages/
  ├── es.json
  ├── en.json
  ├── fr.json
  └── ...

// Contenido dinámico: Campos JSON en DB
{
  "title": {
    "es": "Villa con vistas al mar",
    "en": "Villa with sea views",
    "fr": "Villa avec vue sur la mer"
  }
}
```

### 8.3 Detección de Idioma

1. Cookie `NEXT_LOCALE`
2. Header `Accept-Language`
3. Geolocalización IP
4. Idioma por defecto: `es`

---

## 9. Rendimiento y Optimización

### 9.1 Estrategias de Rendering

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| SSG | Páginas estáticas | Home, About, FAQ |
| SSR | Datos dinámicos | Búsqueda propiedades |
| ISR | Semi-dinámico | Detalle propiedad (revalidate: 60) |
| CSR | Interactivo | Favoritos, Carrito |

### 9.2 Caché

```
┌─────────────────────────────────────────────────────────────────┐
│                      ESTRATEGIA DE CACHÉ                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐                                             │
│  │  Browser Cache │  → Imágenes, CSS, JS (1 año)               │
│  └────────────────┘                                             │
│          ▼                                                       │
│  ┌────────────────┐                                             │
│  │   CDN Cache    │  → Assets estáticos (1 mes)                │
│  └────────────────┘                                             │
│          ▼                                                       │
│  ┌────────────────┐                                             │
│  │  Redis Cache   │  → Sesiones (7 días)                       │
│  │                │  → Propiedades populares (5 min)           │
│  │                │  → Resultados búsqueda (1 min)             │
│  └────────────────┘                                             │
│          ▼                                                       │
│  ┌────────────────┐                                             │
│  │   PostgreSQL   │  → Datos persistentes                      │
│  └────────────────┘                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Optimización de Imágenes

```typescript
// next/image con optimización automática
- Formatos: AVIF, WebP, JPEG
- Lazy loading nativo
- Responsive breakpoints
- Blur placeholder
```

### 9.4 Métricas Objetivo (Core Web Vitals)

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTFB | < 600ms | Time to First Byte |
| TTI | < 3.8s | Time to Interactive |

---

## 10. Infraestructura y Despliegue

### 10.1 Arquitectura DigitalOcean

```
┌─────────────────────────────────────────────────────────────────┐
│                     DIGITAL OCEAN                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Floating IP                          │    │
│  └──────────────────────────┬──────────────────────────────┘    │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────┐    │
│  │                    Load Balancer                         │    │
│  │                    (DO Managed)                          │    │
│  └──────────────┬───────────────────────────┬──────────────┘    │
│                 │                           │                    │
│  ┌──────────────▼──────────┐ ┌──────────────▼──────────────┐    │
│  │     Droplet App 1       │ │     Droplet App 2           │    │
│  │   ┌─────────────────┐   │ │   ┌─────────────────┐       │    │
│  │   │     Docker      │   │ │   │     Docker      │       │    │
│  │   │  ┌───────────┐  │   │ │   │  ┌───────────┐  │       │    │
│  │   │  │  Next.js  │  │   │ │   │  │  Next.js  │  │       │    │
│  │   │  └───────────┘  │   │ │   │  └───────────┘  │       │    │
│  │   │  ┌───────────┐  │   │ │   │  ┌───────────┐  │       │    │
│  │   │  │   Nginx   │  │   │ │   │  │   Nginx   │  │       │    │
│  │   │  └───────────┘  │   │ │   │  └───────────┘  │       │    │
│  │   └─────────────────┘   │ │   └─────────────────┘       │    │
│  │     4GB RAM / 2 vCPU    │ │     4GB RAM / 2 vCPU        │    │
│  └─────────────────────────┘ └─────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Managed Database                        │    │
│  │                    PostgreSQL 16                         │    │
│  │              2GB RAM / 1 vCPU / 25GB SSD                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Managed Redis                          │    │
│  │                     1GB RAM                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                      Spaces                              │    │
│  │                 (S3-compatible CDN)                      │    │
│  │              Imágenes, Documentos, Assets                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Estimación de Costes (DigitalOcean)

| Recurso | Especificaciones | Coste/mes |
|---------|------------------|-----------|
| Droplets (x2) | 4GB RAM, 2 vCPU | $48 |
| Managed PostgreSQL | 2GB RAM, 25GB | $30 |
| Managed Redis | 1GB RAM | $15 |
| Spaces | 250GB + CDN | $5 |
| Load Balancer | Managed | $12 |
| Backups | Automáticos | $10 |
| **Total** | | **~$120/mes** |

### 10.3 Pipeline CI/CD

```yaml
# GitHub Actions Workflow
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  test:
    - Lint & Type Check
    - Unit Tests
    - Integration Tests
    
  build:
    - Build Docker Image
    - Push to Registry
    
  deploy:
    - SSH to Droplets
    - Pull new image
    - Rolling restart
    - Health check
    - Notify team
```

### 10.4 Proceso de Despliegue

```
┌────────────────────────────────────────────────────────────────┐
│                    PROCESO DE DEPLOY                           │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Developer] ──▶ [Git Push] ──▶ [GitHub Actions]               │
│                                       │                         │
│                    ┌──────────────────┼──────────────────┐      │
│                    │                  ▼                  │      │
│                    │           [Run Tests]               │      │
│                    │                  │                  │      │
│                    │                  ▼                  │      │
│                    │         [Build Docker Image]        │      │
│                    │                  │                  │      │
│                    │                  ▼                  │      │
│                    │      [Push to DO Registry]          │      │
│                    │                  │                  │      │
│                    │      ┌───────────┴───────────┐      │      │
│                    │      ▼                       ▼      │      │
│                    │  [Deploy App1]         [Deploy App2]│      │
│                    │      │                       │      │      │
│                    │      ▼                       ▼      │      │
│                    │  [Health Check]       [Health Check]│      │
│                    │      │                       │      │      │
│                    │      └───────────┬───────────┘      │      │
│                    │                  ▼                  │      │
│                    │          [Notify Slack]             │      │
│                    │                                     │      │
│                    └─────────────────────────────────────┘      │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 11. Monitorización

### 11.1 Stack de Observabilidad

| Herramienta | Propósito |
|-------------|-----------|
| **Sentry** | Error tracking |
| **Uptime Robot** | Monitoring uptime |
| **Google Analytics** | Analytics usuario |
| **Prometheus + Grafana** | Métricas sistema |
| **Loki** | Agregación logs |

### 11.2 Alertas Configuradas

| Alerta | Condición | Severidad | Acción |
|--------|-----------|-----------|--------|
| Server Down | Uptime < 99.9% | Critical | Slack + Email |
| High CPU | CPU > 80% (5min) | Warning | Slack |
| High Memory | RAM > 85% | Warning | Slack |
| DB Connections | > 80% pool | Warning | Slack |
| Error Rate | > 1% requests | Critical | Slack + PagerDuty |
| Response Time | P95 > 3s | Warning | Slack |

### 11.3 Logs

```typescript
// Estructura de logs
{
  "timestamp": "2025-12-03T10:30:00.000Z",
  "level": "info",
  "service": "api",
  "traceId": "abc123",
  "userId": "user_xyz",
  "action": "property.view",
  "propertyId": "prop_123",
  "duration": 45,
  "status": 200
}
```

---

## 12. Anexos

### 12.1 Variables de Entorno

Ver archivo `.env.example` para la lista completa de variables de entorno requeridas.

### 12.2 Comandos Útiles

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up

# Migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Seed database
npx prisma db seed

# Tests
npm run test
npm run test:e2e

# Build producción
npm run build
```

### 12.3 Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)
- [DigitalOcean Docs](https://docs.digitalocean.com)

---

**Documento mantenido por:** Equipo de Desarrollo  
**Última actualización:** Diciembre 2025  
**Próxima revisión:** Marzo 2026
