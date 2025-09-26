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

### Requisitos previos

- Node.js 18 o superior (idealmente la versión LTS más reciente).
- npm 9+ (se instala junto con Node.js).
- Acceso a dos terminales de PowerShell para ejecutar frontend y backend en paralelo.

> Si actualizás Node.js, reiniciá PowerShell antes de continuar para que se tome la nueva versión.

### 1. Preparar variables de entorno

**Backend**

```powershell
Copy-Item backend/.env.example backend/.env
```

- `USE_CLASSROOM_MOCK=true` permite probar sin credenciales de Google.
- Para usar datos reales, completá `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_ADMIN_EMAIL` y las variables OAuth.
- `DATABASE_URL` y `NOTIFIER_WEBHOOK_URL` son opcionales hasta integrar servicios externos.

**Frontend**

```powershell
Copy-Item frontend/.env.example frontend/.env
```

- Dejá `VITE_API_BASE_URL=http://localhost:4000/api` mientras uses el backend local.

> No subas los archivos `.env` al repositorio: están ignorados por git y deben compartirse de forma segura.

### 2. Levantar el backend

En una terminal de PowerShell:

```powershell
cd backend
npm install
npm run dev
```

- El servidor quedará escuchando en `http://localhost:4000`.
- Endpoints útiles para probar con el navegador o herramientas como Thunder Client/Postman:
  - `GET http://localhost:4000/health`
  - `GET http://localhost:4000/api/progress?teacherEmail=profesor@semillerodigital.org`
  - `GET http://localhost:4000/api/metrics?teacherEmail=profesor@semillerodigital.org`
  - `POST http://localhost:4000/api/communications`

Si usás los datos mock (valor por defecto), cualquier email devolverá siempre la misma muestra de progreso.

### 3. Levantar el frontend

En otra terminal de PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

- La aplicación se abre en `http://localhost:5173`.
- El proxy de Vite redirige todas las llamadas a `/api` hacia el backend (`http://localhost:4000`).
- Cambiá el correo desde el selector de la esquina superior derecha para simular distintos roles.

### Datos reales vs. mock de Classroom

- **Modo mock** (`USE_CLASSROOM_MOCK=true`): no requiere credenciales; ideal para demos rápidas.
- **Modo real** (`USE_CLASSROOM_MOCK=false`):
  1. Configurá la delegación de la cuenta de servicio en Google Workspace siguiendo la guía de la sección anterior.
  2. Cargá las credenciales en el `.env` del backend.
  3. Reiniciá `npm run dev` para que tome las nuevas variables.

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