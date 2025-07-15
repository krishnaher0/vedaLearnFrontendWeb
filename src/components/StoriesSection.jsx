import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Joshi",
    country: "Nepal",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Learning my native Newar Bhasa through this app felt like talking to my grandparents again. The stories made it so relatable and fun!",
  },
  {
    id: 2,
    name: "Maya Sharma",
    country: "India",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "I never thought I could enjoy language learning this much! The conversational style and practice quizzes kept me motivated every day.",
  },
  {
    id: 3,
    name: "Tenzing Lama",
    country: "Bhutan",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    quote:
      "I used to struggle with vocabulary retention. But the way this platform blends culture and language helped me remember naturally.",
  },
 {
    id: 4,
    name: "Aiko Tanaka",
    country: "Japan",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Learning here feels like traveling the world from my desk. The cultural context made me feel connected and motivated every day.",
  },
  {
    id: 5,
    name: "Carlos Mendoza",
    country: "Mexico",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I finally overcame my fear of speaking in public. The interactive lessons and community support gave me so much confidence.",
  },
  {
    id: 6,
    name: "Fatima Zahra",
    country: "Morocco",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote:
      "I always wanted to learn at my own pace. This platform respects my schedule and makes learning fun, not stressful.",
  },

];

export default function StoriesSection() {
  return (
    <section className="bg-white py-16" id="testimonials">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">🌟 Learner Stories</h2>
        <p className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto">
          Hear how learners across the world are mastering their language skills with VedLingua.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-blue-400 mr-4"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.country}</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
