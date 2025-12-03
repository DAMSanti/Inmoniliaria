# ✅ Guía de Buenas Prácticas
## Vacacional Rental Platform

---

## 1. Código

### 1.1 TypeScript
```typescript
// ✅ BIEN: Tipos explícitos
interface Property {
  id: string;
  title: string;
  price: number;
}

// ❌ MAL: any
const property: any = fetchProperty();
```

### 1.2 Nombrado
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Variables | camelCase | `propertyList` |
| Constantes | UPPER_SNAKE | `MAX_GUESTS` |
| Componentes | PascalCase | `PropertyCard` |
| Archivos componentes | kebab-case | `property-card.tsx` |
| Hooks | use + PascalCase | `useProperties` |

### 1.3 Estructura de Componentes
```typescript
// 1. Imports
import { useState } from 'react';

// 2. Types
interface Props { ... }

// 3. Component
export function PropertyCard({ property }: Props) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false);
  
  // 5. Handlers
  const handleClick = () => { ... };
  
  // 6. Render
  return <div>...</div>;
}
```

---

## 2. Git

### 2.1 Commits (Conventional Commits)
```
feat: añadir filtro de precio
fix: corregir cálculo de noches
docs: actualizar README
style: formatear código
refactor: extraer hook useBooking
test: añadir tests para PropertyCard
chore: actualizar dependencias
```

### 2.2 Branches
```
main           → Producción
develop        → Desarrollo
feature/xxx    → Nueva funcionalidad
fix/xxx        → Corrección de bug
hotfix/xxx     → Fix urgente producción
```

### 2.3 Pull Requests
- Título descriptivo
- Descripción del cambio
- Screenshots si hay UI
- Mínimo 1 reviewer
- Tests pasando

---

## 3. Seguridad

### 3.1 Datos Sensibles
```typescript
// ✅ Variables de entorno
const apiKey = process.env.API_KEY;

// ❌ NUNCA hardcoded
const apiKey = "sk-1234567890";
```

### 3.2 Validación
```typescript
// Siempre validar con Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const result = schema.safeParse(data);
if (!result.success) {
  throw new ValidationError(result.error);
}
```

### 3.3 SQL Injection
```typescript
// ✅ Prisma (seguro por defecto)
prisma.property.findMany({ where: { city } });

// ❌ Raw queries sin parametrizar
prisma.$queryRaw`SELECT * FROM properties WHERE city = ${city}`;
```

---

## 4. Rendimiento

### 4.1 Imágenes
```tsx
// ✅ Usar next/image
import Image from 'next/image';

<Image
  src="/property.jpg"
  alt="Property"
  width={800}
  height={600}
  priority={isAboveFold}
/>
```

### 4.2 Data Fetching
```typescript
// ✅ React Query con caché
const { data } = useQuery({
  queryKey: ['properties', filters],
  queryFn: () => fetchProperties(filters),
  staleTime: 5 * 60 * 1000, // 5 min
});
```

### 4.3 Lazy Loading
```tsx
// Componentes pesados
const VirtualTour = dynamic(() => import('./VirtualTour'), {
  loading: () => <Skeleton />,
});
```

---

## 5. Testing

### 5.1 Estructura
```
tests/
├── unit/           # Funciones puras
├── integration/    # API + DB
└── e2e/           # Flujos completos
```

### 5.2 Nombrado
```typescript
describe('PropertyCard', () => {
  it('should render property title', () => { ... });
  it('should show price per night', () => { ... });
  it('should handle favorite click', () => { ... });
});
```

### 5.3 Cobertura Mínima
- Funciones críticas: 90%
- Componentes UI: 70%
- API endpoints: 85%

---

## 6. API

### 6.1 Respuestas Consistentes
```typescript
// Éxito
{ success: true, data: { ... } }

// Error
{ success: false, error: { code: "NOT_FOUND", message: "..." } }
```

### 6.2 Códigos HTTP
| Código | Uso |
|--------|-----|
| 200 | OK |
| 201 | Creado |
| 400 | Error cliente |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | No encontrado |
| 500 | Error servidor |

---

## 7. Base de Datos

### 7.1 Migraciones
```bash
# Desarrollo
npx prisma migrate dev --name descripcion

# Producción
npx prisma migrate deploy
```

### 7.2 Índices
- Campos de búsqueda frecuente
- Foreign keys
- Campos de ordenación

### 7.3 Queries
```typescript
// ✅ Seleccionar solo campos necesarios
prisma.property.findMany({
  select: { id: true, title: true, price: true },
});

// ❌ Traer todo
prisma.property.findMany();
```

---

## 8. Documentación

### 8.1 Código
- JSDoc para funciones públicas
- Comentarios para lógica compleja
- README en cada módulo principal

### 8.2 API
- Swagger/OpenAPI actualizado
- Ejemplos de request/response
- Códigos de error documentados

---

## 9. Checklist Pre-Deploy

- [ ] Tests pasando
- [ ] Lint sin errores
- [ ] Build exitoso
- [ ] Variables de entorno configuradas
- [ ] Migraciones aplicadas
- [ ] Performance verificada
- [ ] Seguridad revisada

---

**Última actualización:** Diciembre 2025
