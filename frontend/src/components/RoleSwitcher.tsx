import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/utils/cn';
import { BarChart3, GraduationCap, Users } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Alumno', email: 'alumno@semillerodigital.org', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'teacher', label: 'Profesor', email: 'profesor@semillerodigital.org', icon: <Users className="h-4 w-4" /> },
  { id: 'coordinator', label: 'Coordinador', email: 'coordinador@semillerodigital.org', icon: <BarChart3 className="h-4 w-4" /> }
] as const;

export function RoleSwitcher (): JSX.Element {
  const { role, setRole, setEmail } = useUserStore();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cambiar vista</span>
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/70 bg-white/90 p-1 shadow-inner">
        {roles.map(r => {
          const isActive = role === r.id;
          return (
            <Button
              key={r.id}
              size="sm"
              variant={isActive ? 'primary' : 'ghost'}
              className={cn(
                'min-w-[120px] justify-start rounded-xl px-4 py-2 text-sm font-medium shadow-none transition-all',
                isActive
                  ? 'from-primary-500 via-primary-500 to-primary-500 text-white'
                  : 'text-slate-600 hover:text-primary-600'
              )}
              onClick={() => {
                setRole(r.id);
                setEmail(r.email);
              }}
            >
              <span className="flex items-center gap-2">
                <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg border border-transparent', isActive ? 'bg-white/25 text-white' : 'bg-primary-50 text-primary-600')}>
                  {r.icon}
                </span>
                {r.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
