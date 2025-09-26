import { create } from 'zustand';

type Role = 'student' | 'teacher' | 'coordinator';

interface UserState {
  role: Role;
  email: string;
  setRole: (role: Role) => void;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: 'teacher',
  email: 'profesor@semillerodigital.org',
  setRole: (role: Role) => set({ role }),
  setEmail: (email: string) => set({ email })
}));
