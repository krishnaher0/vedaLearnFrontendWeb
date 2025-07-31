import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useGetCourses } from "../../hooks/admin/useAdminCourse";
import { 
  FaChartBar, 
  FaChartPie, 
  FaChartLine, 
  FaUsers, 
  FaBookOpen, 
  FaTrophy,
  FaPercentage,
  FaGraduationCap,
  FaSpinner 
} from "react-icons/fa";

const Dashboard = () => {
  const { data: courses = [], isLoading, isError, error } = useGetCourses();

  const [enrollmentChart, setEnrollmentChart] = useState(null);
  const [donutChart, setDonutChart] = useState(null);
  const [lineChart, setLineChart] = useState(null);
  const [overallStats, setOverallStats] = useState([]);

  useEffect(() => {
    if (!courses.length) return;

    const fetchStats = async () => {
      try {
        const labels = courses.map((c) => c.language);
        const totalEnrolledArray = [];
        const completionRatesArray = [];
        const overallStatsArr = [];

        await Promise.all(
          courses.map(async (course) => {
            try {
              const statsRes = await axios.get(
                `http://localhost:3001/api/user/progress/courses/${course._id}/stats`
              );
              if (statsRes.data.success) {
                const data = statsRes.data.data;
                totalEnrolledArray.push(data.totalEnrolled);
                completionRatesArray.push(data.completionRate);
                overallStatsArr.push({
                  courseId: course._id,
                  language: course.language,
                  ...data,
                });
              }
            } catch (err) {
              console.error(
                `Error fetching stats for course ${course._id}:`,
                err
              );
              totalEnrolledArray.push(0);
              completionRatesArray.push(0);
              overallStatsArr.push({
                courseId: course._id,
                language: course.language,
                totalEnrolled: 0,
                completionRate: 0,
              });
            }
          })
        );

        // Bar chart: total enrolled - Enhanced dark theme
        setEnrollmentChart({
          series: [{ name: "Users", data: totalEnrolledArray }],
          options: {
            chart: { 
              type: "bar",
              background: 'transparent',
              toolbar: { show: false }
            },
            theme: { mode: 'dark' },
            title: { 
              text: "Total Enrolled Users by Language",
              style: { color: '#e2e8f0', fontSize: '16px', fontWeight: 600 }
            },
            xaxis: { 
              categories: labels,
              labels: { style: { colors: '#94a3b8' } }
            },
            yaxis: { 
              title: { text: "Users", style: { color: '#94a3b8' } },
              labels: { style: { colors: '#94a3b8' } }
            },
            colors: ['#3b82f6'],
            grid: { borderColor: '#334155' },
            plotOptions: {
              bar: {
                borderRadius: 4,
                columnWidth: '60%'
              }
            }
          },
        });

        // Donut chart: popularity - Enhanced dark theme
        setDonutChart({
          series: totalEnrolledArray,
          options: {
            chart: { 
              type: "donut",
              background: 'transparent'
            },
            theme: { mode: 'dark' },
            labels,
            title: { 
              text: "Language Popularity",
              style: { color: '#e2e8f0', fontSize: '16px', fontWeight: 600 }
            },
            colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'],
            legend: { 
              labels: { colors: '#94a3b8' },
              position: 'bottom'
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '70%'
                }
              }
            }
          },
        });

        // Line chart: average lessons completed per user - Enhanced dark theme
        setLineChart({
          series: [
            {
              name: "Avg Lessons/User",
              data: overallStatsArr.map((c) =>
                Number(c.averageLessonCompletedPerUser ?? 0)
              ),
            },
          ],
          options: {
            chart: { 
              type: "line",
              background: 'transparent',
              toolbar: { show: false }
            },
            theme: { mode: 'dark' },
            title: { 
              text: "Average Lessons Completed per User",
              style: { color: '#e2e8f0', fontSize: '16px', fontWeight: 600 }
            },
            xaxis: { 
              categories: overallStatsArr.map((c) => c.language),
              labels: { style: { colors: '#94a3b8' } }
            },
            yaxis: { 
              title: { text: "Lessons", style: { color: '#94a3b8' } },
              labels: { style: { colors: '#94a3b8' } }
            },
            colors: ['#8b5cf6'],
            grid: { borderColor: '#334155' },
            stroke: {
              curve: 'smooth',
              width: 3
            },
            markers: {
              size: 6,
              colors: ['#8b5cf6'],
              strokeColors: '#1e293b',
              strokeWidth: 2
            }
          },
        });

        setOverallStats(overallStatsArr);
      } catch (error) {
        console.error("Error fetching courses or stats:", error);
      }
    };

    fetchStats();
  }, [courses]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <FaSpinner className="animate-spin text-blue-400 text-xl" />
          <span className="text-white font-medium">Loading courses...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">!</span>
          </div>
          <span className="text-red-300 font-medium">Error: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaChartBar className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">
              Loaded {courses.length} {courses.length === 1 ? "course" : "courses"}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        {enrollmentChart && (
          <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-600/5 pointer-events-none"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-white text-sm" />
                </div>
                <h3 className="text-lg font-semibold text-white">User Enrollment</h3>
              </div>
              <Chart
                options={enrollmentChart.options}
                series={enrollmentChart.series}
                type="bar"
                height={280}
              />
            </div>
          </div>
        )}

        {/* Donut Chart */}
        {donutChart && (
          <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-emerald-600/5 pointer-events-none"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <FaChartPie className="text-white text-sm" />
                </div>
                <h3 className="text-lg font-semibold text-white">Language Popularity</h3>
              </div>
              <Chart
                options={donutChart.options}
                series={donutChart.series}
                type="donut"
                height={280}
              />
            </div>
          </div>
        )}

        {/* Line Chart */}
        {lineChart && (
          <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
            <div className="relative z-10 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-white text-sm" />
                </div>
                <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
              </div>
              <Chart
                options={lineChart.options}
                series={lineChart.series}
                type="line"
                height={280}
              />
            </div>
          </div>
        )}
      </div>

      {/* Course Overview Table */}
      {overallStats.length > 0 && (
        <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-indigo-600/5 pointer-events-none"></div>
          <div className="relative z-10 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FaBookOpen className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Course Overview</h2>
                <p className="text-slate-400">Detailed statistics for all courses</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="px-5 py-4 text-left">
                      <div className="flex items-center space-x-2">
                        <FaGraduationCap className="text-blue-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Language</span>
                      </div>
                    </th>
                    <th className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <FaUsers className="text-emerald-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Enrolled</span>
                      </div>
                    </th>
                    <th className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <FaBookOpen className="text-purple-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Lessons</span>
                      </div>
                    </th>
                    <th className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <FaTrophy className="text-orange-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Completed</span>
                      </div>
                    </th>
                    <th className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <FaPercentage className="text-pink-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Rate (%)</span>
                      </div>
                    </th>
                    <th className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <FaChartLine className="text-teal-400" />
                        <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Avg/User</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overallStats.map((course, index) => (
                    <tr
                      key={course.courseId}
                      className={`border-b border-slate-700/50 transition-all duration-300 ${
                        index % 2 === 0
                          ? "bg-slate-800/30 hover:bg-slate-700/50"
                          : "bg-slate-900/30 hover:bg-slate-700/50"
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {course.language?.charAt(0)?.toUpperCase() || 'L'}
                            </span>
                          </div>
                          <span className="font-semibold text-white">{course.language}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {course.totalEnrolled}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {course.totalLessons}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          {course.totalUsersCompletedCourse}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-500/20 text-pink-300 border border-pink-500/30">
                          {course.completionRate}%
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {course.averageLessonCompletedPerUser ?? "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;