import React from 'react';
import { FaEdit, FaDollarSign, FaListUl } from 'react-icons/fa';

export default function PlanCard({ plan, onClick }) {
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-emerald-500 to-emerald-600', 
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600'
  ];
  
  // Use plan ID to consistently assign gradient
  const gradientIndex = Math.abs(plan._id?.charCodeAt(0) || 0) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-600 hover:border-slate-500 overflow-hidden transform hover:scale-105"
      onClick={() => onClick(plan)}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-16 h-16 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Header with gradient accent */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-lg transition-all duration-300`}>
          <span className="text-white font-bold text-lg">
            {plan.name?.charAt(0)?.toUpperCase() || 'P'}
          </span>
        </div>
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
          <FaEdit className="text-white text-xs" />
        </div>
      </div>

      {/* Plan Name */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
          <FaDollarSign className="text-white text-xs" />
        </div>
        <div>
          <span className="text-2xl font-bold text-emerald-400">Rs. {plan.price}</span>
          <span className="text-slate-400 text-sm ml-1">/month</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
            <FaListUl className="text-white text-xs" />
          </div>
          <span className="text-slate-300 text-sm font-medium">Features</span>
        </div>
        
        <ul className="space-y-2 pl-2">
          {plan.description?.slice(0, 2).map((desc, i) => (
            <li key={i} className="flex items-start text-sm text-slate-300">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
          {plan.description?.length > 2 && (
            <li className="flex items-center text-sm text-blue-400 font-medium">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
              <span>+ {plan.description.length - 2} more features...</span>
            </li>
          )}
        </ul>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}