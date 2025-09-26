import type { Request, Response } from 'express';
import { ProgressService } from '@services/progressService';
import { MetricsService } from '@services/metricsService';

const progressService = new ProgressService();
const metricsService = new MetricsService();

export async function getMetrics (req: Request, res: Response): Promise<void> {
  const teacherEmail = req.query.teacherEmail as string;

  if (!teacherEmail) {
    res.status(400).json({ message: 'teacherEmail es requerido' });
    return;
  }

  const progress = await progressService.getProgressForTeacher(teacherEmail);

  const metrics = progress.map(course => (
    metricsService.buildCourseSummary(
      course.courseId,
      course.courseName,
      course.teacherEmail,
      course.teacherName,
      course.students
    )
  ));

  res.json({ data: metrics });
}
