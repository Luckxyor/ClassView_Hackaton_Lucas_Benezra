# Semillero Digital Companion

Aplicación fullstack que complementa Google Classroom para Semillero Digital, brindando dashboards de progreso, herramientas de comunicación y métricas operativas para alumnos, profesores y coordinadores.

## Este proyecto está desplegado públicamente en [https://class-view-hackaton-lucas-benezra.vercel.app/](https://class-view-hackaton-lucas-benezra.vercel.app/).

Si llegás a encontrar errores en la versión online, seguí este mini tutorial para levantarlo en tu máquina:

### Backend en localhost

```powershell
cd backend
npm install
npm run dev
```

### Frontend en localhost

```powershell
cd frontend
npm install
npm run dev
```

## 🚀 Stack tecnológico

- **Backend**: Node.js + Express + TypeScript
  - Integración con Google Classroom API mediante cuentas de servicio (OAuth 2.0 con delegación)
  - Normalización de datos de progreso, métricas agregadas y endpoint para notificaciones
  - Testing con Vitest y utilitarios puros para cálculos
- **Frontend**: React + Vite + TypeScript
  - React Query para data fetching, Zustand para estado de sesión y Tailwind CSS para UI
  - Dashboards diferenciados por rol (alumno, profesor, coordinador)
  - Gráficos con Recharts y envío de notificaciones desde la interfaz