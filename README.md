# Semillero Digital Companion

Aplicación fullstack que complementa Google Classroom para Semillero Digital, brindando dashboards de progreso, herramientas de comunicación y métricas operativas para alumnos, profesores y coordinadores.

## 🚀 Stack tecnológico

- **Backend**: Node.js + Express + TypeScript
  - Integración con Google Classroom API mediante cuentas de servicio (OAuth 2.0 con delegación)
  - Normalización de datos de progreso, métricas agregadas y endpoint para notificaciones
  - Testing con Vitest y utilitarios puros para cálculos
- **Frontend**: React + Vite + TypeScript
  - React Query para data fetching, Zustand para estado de sesión y Tailwind CSS para UI
  - Dashboards diferenciados por rol (alumno, profesor, coordinador)
  - Gráficos con Recharts y envío de notificaciones desde la interfaz

## 📂 Estructura del proyecto

```
backend/
  src/
    config/        # Validación de variables de entorno
    controllers/   # Endpoints Express (progreso, métricas, comunicaciones)
    services/      # Integraciones con Google Classroom y lógica de dominio
    utils/         # Helpers y funciones puras (incluye tests)
frontend/
  src/
    components/    # UI reutilizable, tablas, gráficos y formularios
    pages/         # Vistas según rol (alumno, profesor, coordinador)
    hooks/         # React Query hooks para consumir el backend
    stores/        # Zustand store para email/rol activo
```

## 🔐 Configuración de Google Workspace

1. Crear un proyecto en Google Cloud Console y habilitar las APIs:
   - Google Classroom API
   - Google Calendar API (opcional para futuros módulos de asistencia)
2. Configurar una **cuenta de servicio** con “Domain-wide delegation” y descargar el JSON de credenciales.
3. Compartir el correo de la cuenta de servicio dentro del dominio de Semillero Digital con rol de administrador.
4. En el Admin Console, autorizar los siguientes scopes para la cuenta de servicio:
   - `https://www.googleapis.com/auth/classroom.courses.readonly`
   - `https://www.googleapis.com/auth/classroom.coursework.students.readonly`
   - `https://www.googleapis.com/auth/classroom.coursework.me.readonly`
   - `https://www.googleapis.com/auth/classroom.rosters.readonly`
   - `https://www.googleapis.com/auth/classroom.profile.emails`
   - `https://www.googleapis.com/auth/classroom.profile.photos`
5. Completar el archivo `backend/.env` con las credenciales.

> Para escenarios donde se requiera actuar como usuarios finales (profesores) también se puede preparar un flujo OAuth Web (GOOGLE_CLIENT_ID / SECRET / REDIRECT_URI) para upgrades futuros.

## 🛠️ Puesta en marcha local

### 1. Backend

```powershell
cd backend
npm install
npm run dev
```

- El servidor arranca en `http://localhost:4000`.
- Endpoints disponibles:
  - `GET /health`
  - `GET /api/progress?teacherEmail=profesor@semillerodigital.org`
  - `GET /api/metrics?teacherEmail=profesor@semillerodigital.org`
  - `POST /api/communications`

### 2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

- La web queda disponible en `http://localhost:5173` y proxea las llamadas al backend (`/api`).
- Cambiá el correo en el header para simular distintos roles.

### Variables de entorno

- Copiá `backend/.env.example` a `backend/.env` y completa con las credenciales reales.
- Copiá `frontend/.env.example` a `frontend/.env` si querés apuntar a otra URL de backend.

## ✅ Scripts útiles

Backend:
- `npm run dev`: servidor en modo watch (tsx)
- `npm run build`: compilar a `dist/`
- `npm run test`: ejecutar Vitest (incluye coverage opcional)
- `npm run lint`: estilo y reglas de Typescript ESLint

Frontend:
- `npm run dev`: Vite + HMR
- `npm run build`: build de producción (Vite + TypeScript)
- `npm run preview`: vista previa del build
- `npm run lint`: ESLint para TSX

## 🧪 Cobertura inicial

- Pruebas unitarias sobre `summarizeStudentProgress` para garantizar la lógica central del seguimiento de entregas.
- El frontend utiliza componentes desacoplados para facilitar pruebas futuras con Testing Library.

## 🗺️ Roadmap sugerido

- **Integraciones externas**:
  - Conectar servicios de mensajería (Brevo, Twilio, WhatsApp Cloud API) en `CommunicationService`.
  - Integrar Google Calendar para asistencia automática.
- **Roles y autenticación**:
  - Implementar OAuth con Google y limitar vistas según rol real.
  - Persistir usuarios y cohortes en PostgreSQL (agregar Prisma/Drizzle).
- **Analítica avanzada**:
  - Dashboards históricos, comparativas entre cohortes y alertas automáticas.
  - Exportación a CSV / Google Sheets.
- **Infraestructura**:
  - Docker Compose para orquestar backend + frontend + base de datos.
  - Deploy en Render, Railway o GCP con CI/CD (GitHub Actions).

## 🤝 Contribuir

1. Fork & clone.
2. Crear branch `feat/<nombre>`.
3. Ejecutar linters/tests antes de hacer push.
4. Abrir PR describiendo cambios y capturas.

¡Listo! Con esta base el equipo puede iterar rápido y sumar nuevas capas de valor para Semillero Digital.
