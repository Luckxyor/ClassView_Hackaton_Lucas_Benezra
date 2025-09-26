import type { PropsWithChildren, ChangeEvent } from 'react';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { useUserStore } from '@/stores/userStore';

export function DashboardLayout ({ children }: PropsWithChildren): JSX.Element {
  const { email, setEmail } = useUserStore();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="pointer-events-none absolute -top-40 right-10 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />

      <header className="relative border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 text-lg font-semibold text-white shadow-lg">
              SD
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-600">Semillero Digital</p>
              <h1 className="text-2xl font-semibold text-slate-900">Panel de acompañamiento</h1>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
            <div className="flex w-full flex-col gap-1 md:w-64">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="session-email">
                Sesión activa
              </label>
              <input
                id="session-email"
                value={email}
                onChange={handleEmailChange}
                className="h-11 rounded-xl border border-white/70 bg-white/90 px-4 text-sm shadow-inner focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="correo@semillerodigital.org"
              />
            </div>
            <RoleSwitcher />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
