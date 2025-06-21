import React, { useState } from "react";

// Mock Data
const stats = [
  { label: "Enrolled", value: 120 },
  { label: "Completed", value: 80 },
  { label: "In Progress", value: 40 },
  { label: "Avg Time", value: "5h 30m" },
];

const lessonsMock = [
  { id: 1, title: "Intro to Sanskrit", duration: 10 },
  { id: 2, title: "Sanskrit Grammar", duration: 20 },
  // ...
];

export default function Course() {
  const [lessons, setLessons] = useState(lessonsMock);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("");

  const addLesson = () => {
    setLessons([...lessons, {
      id: Date.now(),
      title: newLessonTitle,
      duration: Number(newLessonDuration),
    }]);
    setNewLessonTitle("");
    setNewLessonDuration("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar placeholder */}
    

      <main className="flex-1 p-6">
        {/* Hero */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-semibold mb-2">Sanskrit A1</h1>
          <p className="text-gray-600 mb-4">Basic Sanskrit language course for beginners.</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Publish Course</button>
            <button className="bg-gray-200 px-4 py-2 rounded">Preview</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-500">{lesson.duration} min</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="New lesson title"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              className="flex-1 border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={newLessonDuration}
              onChange={(e) => setNewLessonDuration(e.target.value)}
              className="w-28 border px-3 py-2 rounded"
            />
            <button
              onClick={addLesson}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Lesson
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
