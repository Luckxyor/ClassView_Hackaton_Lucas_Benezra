import { useState, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sendNotification } from '@/lib/api';
import { Loader2, Send } from 'lucide-react';

export function NotificationComposer (): JSX.Element {
  const [to, setTo] = useState('estudiante@example.com');
  const [body, setBody] = useState('Recordatorio: nueva tarea disponible.');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (): Promise<void> => {
    try {
      setStatus('loading');
      await sendNotification({ to, body });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <Card variant="glass" className="relative overflow-hidden">
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <Send className="h-6 w-6" />
          </span>
          Notificación instantánea
        </CardTitle>
        <CardDescription>
          Envía recordatorios personalizados a estudiantes o docentes con un solo clic y mantén a la comunidad informada.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-4">
        <div className="grid gap-3">
          <label className="text-sm font-medium text-slate-600" htmlFor="notification-to">
            Destinatario
          </label>
          <input
            id="notification-to"
            value={to}
            onChange={(event: ChangeEvent<HTMLInputElement>) => { setTo(event.target.value); }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm shadow-inner focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="correo@semillerodigital.org"
          />
        </div>
        <div className="grid gap-3">
          <label className="text-sm font-medium text-slate-600" htmlFor="notification-body">
            Mensaje
          </label>
          <textarea
            id="notification-body"
            value={body}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => { setBody(event.target.value); }}
            className="min-h-[120px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
            rows={3}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleSubmit} disabled={status === 'loading'} size="lg" className="min-w-[200px] justify-center">
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
              </>
            ) : (
              'Enviar notificación'
            )}
          </Button>
          {status === 'success' && <span className="text-sm font-medium text-success-600">¡Enviada con éxito!</span>}
          {status === 'error' && <span className="text-sm font-medium text-warning-600">Algo falló. Reintenta.</span>}
        </div>
      </CardContent>
    </Card>
  );
}
