import React from 'react';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  // 1. Users per Language (Bar)
  const userPerLanguage = {
    series: [{
      name: 'Users',
      data: [120, 85, 65]
    }],
    options: {
      chart: { type: 'bar' },
      title: { text: 'Users per Language' },
      xaxis: {
        categories: ['Sanskrit', 'Newari', 'Nepali']
      }
    }
  };

  // 2. Lessons Completed Over Time (Line)
  const lessonsOverTime = {
    series: [{
      name: 'Lessons Completed',
      data: [20, 35, 40, 50, 60]
    }],
    options: {
      chart: { type: 'line' },
      title: { text: 'Lessons Completed Over Time' },
      xaxis: {
        categories: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5']
      }
    }
  };

  // 3. Language Popularity (Donut)
  const languagePopularity = {
    series: [40, 30, 20, 10],
    options: {
      chart: { type: 'donut' },
      labels: ['Sanskrit', 'Newari', 'Nepali', 'Japanese'],
      title: { text: 'Language Popularity' }
    }
  };

  // 4. Course Completion % (Radial Bar)
  const courseCompletion = {
    series: [65, 80, 55],
    options: {
      chart: { type: 'radialBar' },
      labels: ['Sanskrit Beginner', 'Newari Beginner', 'Nepali Beginner'],
      title: { text: 'Course Completion Rate' }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white rounded shadow p-4">
        <Chart options={userPerLanguage.options} series={userPerLanguage.series} type="bar" height={300} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <Chart options={lessonsOverTime.options} series={lessonsOverTime.series} type="line" height={300} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <Chart options={languagePopularity.options} series={languagePopularity.series} type="donut" height={300} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <Chart options={courseCompletion.options} series={courseCompletion.series} type="radialBar" height={300} />
      </div>
    </div>
  );
};

export default Dashboard;
