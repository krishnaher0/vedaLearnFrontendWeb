

import React, { useEffect, useState } from "react";
import { getBackendMediaUrl } from "../utils/backend-media";
import { useSearchParams } from "react-router-dom";
import { useGetCourses } from "../hooks/admin/useAdminCourse";
import { useLearningsByCourse } from "../hooks/learningHook";
import Header from "./userPage/Header";
import { Link } from "react-router-dom";

export default function AudioGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCourseId = searchParams.get("course");

  const { data: courses = [], isLoading: loadingCourses } = useGetCourses();
  const [courseId, setCourseId] = useState(selectedCourseId);

  const { data: learnings = [], isLoading: loadingLearnings } =
    useLearningsByCourse(courseId);

  useEffect(() => {
    if (!selectedCourseId && courses.length > 0) {
      const firstCourseId = courses[0]._id;
      setCourseId(firstCourseId);
      setSearchParams({ course: firstCourseId });
    }
  }, [courses, selectedCourseId, setSearchParams]);

  const onlyAudios = learnings?.filter((item) => item.type === "audio") || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f2187] via-[#203a43] to-[#2c5364] text-white">
      <Header />
     
      <div className="max-w-5xl mx-auto px-2 py-30">


        <div className="text-center mb-10">
    <div className="flex justify-end px-6 mt-5 items-end py-4">
  <Link
    to="/user/learn/video"
    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition duration-300 hover:scale-105"
  >
    🎬 Learn Through Videos
  </Link>
</div>

          <h1 className="text-4xl font-extrabold mb-2 tracking-wide">🎧 Learn {courses.language} Sounds</h1>
          <p className="text-lg text-gray-300">
            Train your ears and master pronunciation with real audio
          </p>
        </div>

        {/* Course Selector */}
        <div className="max-w-md mx-auto mb-12">
          <label className="block mb-2 text-sm font-medium text-gray-300">Select a Course</label>
          <select
            className="w-full bg-[#1a2e39] text-white p-3 rounded-lg border border-gray-600 shadow-sm focus:ring-2 focus:ring-blue-400"
            value={courseId || ""}
            onChange={(e) => {
              const selected = e.target.value;
              setCourseId(selected);
              setSearchParams({ course: selected });
            }}
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.language}
              </option>
            ))}
          </select>
        </div>

        {/* Audio Grid */}
        <h2 className="text-2xl font-semibold mb-6 border-b border-white/10 pb-2">🗣️ Vowels</h2>
        {loadingLearnings ? (
          <div className="text-center text-gray-400">Loading audio...</div>
        ) : onlyAudios.length === 0 ? (
          <div className="text-center text-gray-400">No audio lessons found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {onlyAudios.map((audio, index) => (
              <div
                key={index}
                className="bg-[#1a2e39] rounded-xl p-5 shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-lg font-bold mb-1">{audio.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{audio.textContent}</p>
                <audio controls className="w-full rounded">
                  <source
                    src={getBackendMediaUrl(audio.mediaUrl)}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
