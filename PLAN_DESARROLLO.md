# Plan de Desarrollo - Catálogo de Productos

## 📋 Estructura de Ramas Git

```
main (producción)
  ↑
  └─ dev (desarrollo)
      ├─ feature/header-navigation
      ├─ feature/product-card
      ├─ feature/product-grid
      ├─ feature/product-detail
      ├─ feature/api-integration
      └─ feature/filters
```

**Flujo de trabajo:**
1. Crear rama `dev` desde `main`
2. Crear ramas `feature/*` desde `dev`
3. Hacer commits semánticos en cada feature
4. Merge a `dev` cuando feature esté completa
5. Merge a `main` cuando todo esté listo

---

## 🎯 Fases de Desarrollo

### Fase 1: Setup Inicial
- [ ] Inicializar proyecto con Vite + React + TypeScript
- [ ] Configurar estructura de carpetas
- [ ] Instalar dependencias (axios, react-router, etc.)
- [ ] Crear rama `dev`
- **Rama:** `dev`

### Fase 2: Componentes Base
- [ ] Header Navigation Component
  - Logo/placeholder
  - Menú hamburguesa (móvil)
  - Navegación horizontal (desktop)
  - Buscador funcional
- **Rama:** `feature/header-navigation`

### Fase 3: Componente Product Card
- [ ] Imagen del producto
- [ ] Título y descripción corta
- [ ] Precio
- [ ] Rating con estrellas
- [ ] Botón "Ver detalle"
- [ ] Badge "Nuevo"/"Oferta" (condicional)
- **Rama:** `feature/product-card`

### Fase 4: Product Grid/List View
- [ ] Vista de grilla (1, 2, 3, 4 columnas según breakpoint)
- [ ] Vista de lista
- [ ] Toggle entre vistas
- [ ] Lazy loading (mínimo 20 productos)
- [ ] Paginación
- **Rama:** `feature/product-grid`

### Fase 5: Filtros
- [ ] Dropdown simple para categorías
- [ ] Integración con grid
- [ ] Actualizar URL con filtros
- **Rama:** `feature/filters`

### Fase 6: Integración API
- [ ] Conectar con FakeStore API
- [ ] Manejo de errores
- [ ] Estados de carga
- **Rama:** `feature/api-integration`

### Fase 7: Product Detail Modal/Page
- [ ] Imagen grande
- [ ] Descripción completa
- [ ] Especificaciones técnicas
- [ ] Botón cerrar (si es modal)
- **Rama:** `feature/product-detail`

### Fase 8: Responsive & Polish
- [ ] Verificar breakpoints (320px, 768px, 1024px)
- [ ] Touch-friendly (botones 44px mínimo)
- [ ] Imágenes optimizadas
- [ ] Tipografía legible
- [ ] Contraste WCAG AA
- [ ] Estados visuales (hover, active, disabled, loading)
- **Rama:** `dev` (commits directos o feature/responsive)

### Fase 9: Testing & QA
- [ ] Pruebas en navegadores
- [ ] Pruebas en dispositivos móviles
- [ ] Validar accesibilidad
- [ ] Revisar código
- **Rama:** `dev`

### Fase 10: Deploy a Main
- [ ] Merge final a `main`
- [ ] README.md documentado
- **Rama:** `main`

---

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── Header/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── ProductDetail/
│   └── Filters/
├── pages/
│   ├── Home.tsx
│   └── ProductDetail.tsx
├── services/
│   └── api.ts
├── hooks/
│   └── useProducts.ts
├── styles/
│   ├── variables.css
│   └── global.css
├── types/
│   └── product.ts
├── App.tsx
└── main.tsx
```

---

## 🔧 Stack Técnico

- **Framework:** React 18 + Vite
- **Lenguaje:** TypeScript
- **Estilos:** CSS3 (Flexbox/Grid) + Variables CSS
- **API:** FakeStore API (https://fakestoreapi.com/)
- **Versionamiento:** Git con ramas

---

## 📝 Commits Semánticos

```
feat: agregar componente Header Navigation
fix: corregir responsive en ProductCard
style: ajustar espaciado en grid
refactor: optimizar llamadas API
docs: actualizar README
```

---

## ✅ Checklist Final

- [ ] Código limpio y documentado
- [ ] Responsive en todos los breakpoints
- [ ] Accesibilidad WCAG AA
- [ ] README.md completo
- [ ] Todas las features en `main`
- [ ] Sin errores en consola

