import type { Request, Response } from 'express';
import { ProgressService } from '@services/progressService';

const progressService = new ProgressService();

export async function getProgress (req: Request, res: Response): Promise<void> {
  const teacherEmail = req.query.teacherEmail as string;
  const courseId = req.query.courseId as string | undefined;

  if (!teacherEmail) {
    res.status(400).json({ message: 'teacherEmail es requerido' });
    return;
  }

  const result = await progressService.getProgressForTeacher(teacherEmail, courseId);
  res.json({ data: result });
}
