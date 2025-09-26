import { DashboardLayout } from '@/layouts/DashboardLayout';
import { StudentView } from '@/pages/StudentView';
import { TeacherView } from '@/pages/TeacherView';
import { CoordinatorView } from '@/pages/CoordinatorView';
import { useUserStore } from '@/stores/userStore';

export default function App (): JSX.Element {
  const { role } = useUserStore();

  return (
    <DashboardLayout>
      {role === 'student' && <StudentView />}
      {role === 'teacher' && <TeacherView />}
      {role === 'coordinator' && <CoordinatorView />}
    </DashboardLayout>
  );
}
