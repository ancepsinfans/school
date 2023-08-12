import React from "react";
import { fetchDBStructure } from "@/middleware";
import AddQ from "./add-q-page";

export default async function Page() {
  const db = await fetchDBStructure({})
  const spheres = db.map(({ sphere, name }) => [sphere, name]);

  const courses = db.reduce((acc, { sphere, courses }) => {
    if (!acc[sphere]) {
      acc[sphere] = [];
    }
    const courseNames = courses.map(({ course, name }) => ({ course, name }));
    acc[sphere].push(...courseNames);
    return acc;
  }, {});

  const lessons = db.reduce((acc, { courses }) => {
    courses.forEach(({ course, lessons }) => {
      if (!acc[course]) {
        acc[course] = [];
      }
      const lessonNames = lessons.map(({ lesson, name }) => ({ lesson, name }));
      acc[course].push(...lessonNames);
    });
    return acc;
  }, {});
  return (<AddQ
    spheres={spheres}
    courses={courses}
    lessons={lessons}
  />)
}
