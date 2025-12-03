# Vacacional Rental Platform 🏖️

Plataforma de alquiler vacacional desarrollada con Next.js 14, TypeScript y PostgreSQL.

## 🚀 Quick Start

### Requisitos
- Docker y Docker Compose
- Git

### Desarrollo en DigitalOcean

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd vacacional-rental-platform

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Iniciar con Docker
docker-compose -f docker-compose.dev.yml up --build

# 4. Aplicar migraciones
docker exec -it vacacional_app npx prisma migrate dev

# 5. Abrir en navegador
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
├── docs/               # Documentación
├── docker/             # Configuración Docker
├── prisma/             # Schema y migraciones
├── public/             # Assets estáticos
├── src/
│   ├── app/           # App Router (páginas)
│   ├── components/    # Componentes React
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilidades
│   ├── services/      # Servicios API
│   ├── stores/        # Estado (Zustand)
│   ├── types/         # TypeScript types
│   └── i18n/          # Internacionalización
└── tests/             # Tests
```

## 📚 Documentación

- [Documento Técnico](./docs/TECHNICAL.md)
- [Arquitectura (SAD)](./docs/SAD.md)
- [Buenas Prácticas](./docs/BEST_PRACTICES.md)
- [Roadmap](./docs/ROADMAP.md)

## 🛠️ Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Estilos | Tailwind CSS |
| Estado | Zustand, React Query |
| Backend | Next.js API Routes |
| Database | PostgreSQL 16, Prisma |
| Cache | Redis |
| Auth | NextAuth.js |
| Infra | Docker, DigitalOcean |

## 🌍 Idiomas Soportados

🇪🇸 Español | 🇬🇧 English | 🇫🇷 Français | 🇩🇪 Deutsch | 🇮🇹 Italiano | 🇵🇹 Português

## 📝 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Iniciar producción
npm run lint         # Linting
npm run test         # Tests
npm run db:migrate   # Migraciones
npm run db:studio    # Prisma Studio
```

## 🔒 Variables de Entorno

Ver [.env.example](./.env.example) para la configuración completa.

## 📄 Licencia

Privado - Todos los derechos reservados.
