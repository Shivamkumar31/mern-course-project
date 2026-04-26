'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, CalendarDays, DollarSign } from 'lucide-react';

interface CourseCardProps {
  course: any; // ✅ allow flexible backend data
}

export default function CourseCard({ course }: CourseCardProps) {

  // ✅ SAFE MAPPING (backend → frontend)
  const title = course.courseName || course.title || "No Title";
  const university = course.universityName || "Unknown University";
  const description = course.overviewDescription || course.description || "No description";
  const level = course.courseLevel || "N/A";
  const duration = course.durationMonths || course.duration || "N/A";
  const language = course.languageOfInstruction || "N/A";

  const fee = course.firstYearTuitionFee || 0;
  const currency = course.tuitionFeeCurrency || "";

  const deadline = course.internationalApplicationDeadline
    ? new Date(course.internationalApplicationDeadline).toLocaleDateString('en-US')
    : "N/A";

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      <CardHeader>
        <CardTitle className="font-headline text-xl leading-tight">
          <Link href={course.courseUrl || "#"} className="hover:text-accent transition-colors">
            {title}
          </Link>
        </CardTitle>

        <CardDescription className="flex items-center gap-2 pt-1">
          <Building2 className="h-4 w-4" /> {university}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">

        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{level}</Badge>
          <Badge variant="secondary">{duration} months</Badge>
          <Badge variant="secondary">{language}</Badge>
        </div>

        <div className="space-y-2 text-sm">

          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent" />
            <span>
              <span className="font-semibold">
                {fee ? fee.toLocaleString() : "N/A"} {currency}
              </span> / year
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>Int'l Deadline: {deadline}</span>
          </div>

        </div>

      </CardContent>

      <CardFooter className="bg-muted/50 p-4">
        <Button asChild className="w-full" variant="outline">
          <Link href={course.courseUrl || "#"}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>

    </Card>
  );
}