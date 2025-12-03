# 🏗️ SAD - Software Architecture Document
## Vacacional Rental Platform

**Versión:** 1.0.0 | **Fecha:** Diciembre 2025

---

## 1. Introducción

### 1.1 Propósito
Definir la arquitectura de software para la plataforma de alquiler vacacional, estableciendo decisiones técnicas, patrones y componentes del sistema.

### 1.2 Alcance
- Aplicación web (Next.js)
- API REST
- Base de datos PostgreSQL
- Sistema de caché Redis
- Infraestructura en DigitalOcean

---

## 2. Representación Arquitectónica

### 2.1 Patrón: Clean Architecture + Feature-Based

```
┌────────────────────────────────────────────────┐
│                 PRESENTATION                    │
│  (Pages, Components, Layouts)                  │
├────────────────────────────────────────────────┤
│                 APPLICATION                     │
│  (Hooks, Services, State Management)           │
├────────────────────────────────────────────────┤
│                   DOMAIN                        │
│  (Entities, Types, Business Logic)             │
├────────────────────────────────────────────────┤
│               INFRASTRUCTURE                    │
│  (Database, Cache, External APIs)              │
└────────────────────────────────────────────────┘
```

### 2.2 Vista de Componentes

| Componente | Responsabilidad | Tecnología |
|------------|-----------------|------------|
| Web Client | UI/UX | Next.js + React |
| API Layer | Endpoints REST | Next.js API Routes |
| Auth Service | Autenticación/Autorización | NextAuth.js |
| Data Layer | Persistencia | Prisma + PostgreSQL |
| Cache Layer | Rendimiento | Redis |
| Storage | Archivos/Imágenes | DO Spaces |

---

## 3. Decisiones Arquitectónicas

### ADR-001: Next.js como Framework Principal
- **Contexto:** Necesidad de SSR, SEO y rendimiento
- **Decisión:** Next.js 14 con App Router
- **Consecuencias:** Mejor SEO, más complejidad inicial

### ADR-002: PostgreSQL como Base de Datos
- **Contexto:** Datos relacionales complejos
- **Decisión:** PostgreSQL 16 con Prisma ORM
- **Consecuencias:** Queries tipadas, migraciones automáticas

### ADR-003: Autenticación con NextAuth
- **Contexto:** Login social + credenciales
- **Decisión:** NextAuth.js con JWT
- **Consecuencias:** Sesiones seguras, OAuth integrado

### ADR-004: Contenido Multiidioma en JSON
- **Contexto:** 10 idiomas europeos
- **Decisión:** Campos JSON en DB para contenido dinámico
- **Consecuencias:** Flexibilidad, queries más complejas

---

## 4. Vista de Despliegue

```
┌─────────────────────────────────────┐
│           DigitalOcean              │
│  ┌─────────────────────────────┐    │
│  │      Load Balancer          │    │
│  └──────────┬──────────────────┘    │
│             │                        │
│  ┌──────────▼──────────┐            │
│  │   Droplet (Docker)  │ x2         │
│  │   - Next.js App     │            │
│  │   - Nginx           │            │
│  └──────────┬──────────┘            │
│             │                        │
│  ┌──────────▼──────────┐            │
│  │ Managed PostgreSQL  │            │
│  │ Managed Redis       │            │
│  │ Spaces (S3)         │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

---

## 5. Requisitos No Funcionales

| Requisito | Métrica | Estrategia |
|-----------|---------|------------|
| Disponibilidad | 99.9% | Load balancer, health checks |
| Rendimiento | LCP < 2.5s | SSR, CDN, optimización imágenes |
| Escalabilidad | 10K usuarios | Horizontal scaling, caché |
| Seguridad | OWASP Top 10 | Headers, sanitización, HTTPS |
| Mantenibilidad | Cobertura 80% | Tests, documentación, CI/CD |

---

## 6. Flujos Principales

### 6.1 Búsqueda de Propiedades
```
Usuario → Filtros → API → Cache Check → DB Query → Respuesta → UI
```

### 6.2 Proceso de Reserva
```
Selección → Disponibilidad → Cálculo Precio → Pago → Confirmación → Email
```

### 6.3 Autenticación
```
Login → Validación → JWT Access Token → Refresh Token → Session
```

---

## 7. Consideraciones de Seguridad

- **HTTPS obligatorio** con TLS 1.3
- **JWT con rotación** de tokens
- **Rate limiting** por IP y usuario
- **Sanitización** de todas las entradas
- **RBAC** para control de acceso
- **Auditoría** de acciones críticas

---

## 8. Estrategia de Datos

### 8.1 Backup
- Snapshots diarios automáticos
- Retención: 7 días
- Point-in-time recovery

### 8.2 Caché
- Redis para sesiones y datos frecuentes
- TTL configurado por tipo de dato
- Invalidación selectiva

---

**Autor:** Equipo Desarrollo | **Aprobado:** Diciembre 2025
