import React from "react";

export default function QuestionCard({ question, onEdit, onDelete }) {
  const parsedChoices = (choices) => {
    if (
      Array.isArray(choices) &&
      choices.length === 1 &&
      typeof choices[0] === "string" &&
      choices[0].startsWith("[") &&
      choices[0].endsWith("]")
    ) {
      try {
        return JSON.parse(choices[0]);
      } catch {
        return choices;
      }
    }
    return choices;
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "Translation":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        );
      case "MultipleChoice":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "TrueFalse":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "Listening":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        );
      case "FillInTheBlank":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case "MatchingPairs":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        );
      case "Ordering":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case "Translation":
        return "from-blue-500 to-cyan-500";
      case "MultipleChoice":
        return "from-green-500 to-emerald-500";
      case "TrueFalse":
        return "from-purple-500 to-violet-500";
      case "Listening":
        return "from-orange-500 to-amber-500";
      case "FillInTheBlank":
        return "from-red-500 to-rose-500";
      case "MatchingPairs":
        return "from-indigo-500 to-blue-500";
      case "Ordering":
        return "from-pink-500 to-rose-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 p-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-blue-500/20 transition-all duration-300"></div>
      
      <div className="relative z-10 space-y-4">
        {/* Header with question type and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getQuestionTypeColor(question.questionType)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              {getQuestionTypeIcon(question.questionType)}
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-slate-800/50 text-slate-300 text-xs font-medium rounded-full border border-slate-600/50">
                {question.questionType}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(question)}
              className="group/btn relative w-8 h-8 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 rounded-lg border border-amber-500/30 hover:border-amber-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
              title="Edit Question"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(question._id)}
              className="group/btn relative w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
              title="Delete Question"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prompt */}
        {question.prompt && (
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-slate-400 text-sm font-medium">Prompt</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-100 leading-relaxed">
              {question.prompt}
            </h3>
          </div>
        )}

        {/* Question text */}
        {question.question && (
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-400 text-sm font-medium">Question</span>
            </div>
            <p className="text-slate-200 leading-relaxed">{question.question}</p>
          </div>
        )}

        {/* Sentence with blank */}
        {question.sentenceWithBlank && (
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-slate-400 text-sm font-medium">Fill in the Blank</span>
            </div>
            <p className="text-slate-200 leading-relaxed font-mono bg-slate-900/50 px-3 py-2 rounded-lg">
              {question.sentenceWithBlank}
            </p>
          </div>
        )}

        {/* Audio */}
        {question.audioUrl && (
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-slate-400 text-sm font-medium">Audio</span>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <audio 
                controls 
                className="w-full [&::-webkit-media-controls-panel]:bg-slate-800 [&::-webkit-media-controls-current-time-display]:text-slate-300 [&::-webkit-media-controls-time-remaining-display]:text-slate-300"
              >
                <source src={`http://localhost:3001${question.audioUrl}`} type="audio/mpeg" />
                Your browser does not support audio.
              </audio>
            </div>
          </div>
        )}

        {/* Choices */}
        {question.choices && question.choices.length > 0 && (
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-slate-400 text-sm font-medium">Answer Choices</span>
            </div>
            <div className="space-y-2">
              {parsedChoices(question.choices).map((choice, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    choice === question.correctAnswer
                      ? "bg-green-500/10 border-green-500/30 text-green-300"
                      : "bg-slate-900/30 border-slate-700/30 text-slate-300 hover:bg-slate-900/50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    choice === question.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1">{choice}</span>
                  {choice === question.correctAnswer && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs font-medium text-green-400">Correct</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Correct Answer (for non-choice questions) */}
        {question.correctAnswer && !question.choices?.length && (
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400 text-sm font-medium">Correct Answer</span>
            </div>
            <p className="text-green-300 font-semibold">{question.correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
}