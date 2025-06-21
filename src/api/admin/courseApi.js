// // routes/courseRoutes.js
// const express=require("express")
// const router = express.Router();
// const Course = require('../models/Course');
// import axios from "../api";

// // Create a new course
// // router.post('/', async (req, res) => {
// //   try {
// //     const { language, description, flagPath } = req.body;
// //     const course = new Course({ language, description, flagPath });
// //     await course.save();
// //     res.status(201).json(course);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });
// export const createOneCourseApi = async (courseData) => {
//   const response = await axios.post('/admin/', courseData);
//   return response.data;
// };

// // Get all courses
// router.get('/', async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
