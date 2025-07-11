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

  return (
    <div className="border bg-white rounded-lg shadow hover:shadow-lg transition p-4 relative space-y-2">
      {/* Prompt */}
      {question.prompt && (
        <h3 className="text-lg font-semibold text-gray-800">
          {question.prompt}
        </h3>
      )}

      {/* Source question */}
      {question.question && (
        <p>
          <span className="font-medium"></span> {question.question}
        </p>
      )}

      {question.sentenceWithBlank && (
        <p>
          <span className="font-medium"></span> {question.sentenceWithBlank}
        </p>
      )}

      {/* Audio */}
      {question.audioUrl && (
        <div className="flex items-center gap-2">
          <span className="font-medium">Audio:</span>
          <audio controls className="w-full">
            <source
              src={`http://localhost:3001${question.audioUrl}`}
              type="audio/mpeg"
            />
            Your browser does not support audio.
          </audio>
        </div>
      )}

      {/* Choices */}
      {question.choices && question.choices.length > 0 && (
        <div>
          <span className="font-medium">Choices:</span>
          <ol className="list-decimal list-inside mt-1">
            {parsedChoices(question.choices).map((choice, idx) => (
              <li
                key={idx}
                className={
                  choice === question.correctAnswer
                    ? "text-green-600 font-semibold"
                    : ""
                }>
                {choice} {choice === question.correctAnswer ? "(Correct)" : ""}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(question)}
          className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Edit
        </button>
        <button
          onClick={() => onDelete(question._id)}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
