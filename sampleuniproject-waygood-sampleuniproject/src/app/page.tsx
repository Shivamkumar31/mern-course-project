'use client';

import { useState, useMemo, useEffect } from 'react';
import { universities } from '@/lib/data/universities';
import type { Course, University } from '@/lib/types';
import CourseCard from '@/components/course-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Compass, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Home() {

  // ✅ STATES
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [tuitionRange, setTuitionRange] = useState([0, 50000]);
  const [courseLevel, setCourseLevel] = useState('all');

  const [courses, setCourses] = useState<Course[]>([]); // ✅ dynamic data

  // ✅ FETCH API
  const fetchCourses = async (query = '') => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses?search=${query}`
      );
      const data = await res.json();

      console.log("API RESPONSE:", data);

      setCourses(data.data); // ✅ IMPORTANT
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOAD INITIAL DATA
  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ UNIVERSITY OPTIONS
  const universityOptions = useMemo(() => {
    return universities.map((uni) => ({
      value: uni.uniqueCode,
      label: uni.universityName,
    }));
  }, []);

  // ✅ COURSE LEVELS (from API data)
  const courseLevels = useMemo(() => {
    const levels = new Set(courses.map((course: any) => course.courseLevel));
    return ['all', ...Array.from(levels)];
  }, [courses]);

  // ✅ OPTIONAL LOCAL FILTERS (keep UI same)
  const filteredCourses = useMemo(() => {
    return courses.filter((course: any) => {
      return (
        (selectedUniversity === 'all' || course.universityCode === selectedUniversity) &&
        (courseLevel === 'all' || course.courseLevel === courseLevel)
      );
    });
  }, [courses, selectedUniversity, courseLevel]);

  return (
    <div className="bg-background text-foreground">
      
      {/* HERO SECTION */}
      <section className="text-center py-20 px-4 bg-card border-b">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Find Your Perfect Course
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Navigate the world of education with Course Compass.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#search">
              <Compass className="mr-2" /> Start Exploring
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/course-match">
              <Sparkles className="mr-2" /> AI Course Match
            </Link>
          </Button>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section id="search" className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="p-6 rounded-lg bg-card shadow-sm sticky top-24">

              <h3 className="font-headline text-2xl font-semibold mb-6 flex items-center gap-2 text-primary">
                <SlidersHorizontal />
                Filters
              </h3>

              <div className="space-y-6">

                {/* 🔍 SEARCH INPUT */}
                <div>
                  <label className="text-sm font-medium">Search by Keyword</label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    
                    <Input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        fetchCourses(e.target.value); // ✅ FIXED SEARCH
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* UNIVERSITY FILTER */}
                <div>
                  <label className="text-sm font-medium">University</label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Universities</SelectItem>
                      {universityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* COURSE LEVEL */}
                <div>
                  <label className="text-sm font-medium">Course Level</label>
                  <Select value={courseLevel} onValueChange={setCourseLevel}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* TUITION */}
                <div>
                  <label className="text-sm font-medium">Max Tuition</label>
                  <Slider
                    min={0}
                    max={50000}
                    step={1000}
                    value={[tuitionRange[1]]}
                    onValueChange={(value) => setTuitionRange([0, value[0]])}
                  />
                </div>

              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="lg:col-span-3">
            <h2 className="font-headline text-3xl font-bold mb-6 text-primary">
              {filteredCourses.length} Courses Found
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course: any) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center mt-10">
                <h3>No Courses Found</h3>
              </div>
            )}
          </main>

        </div>
      </section>
    </div>
  );
}