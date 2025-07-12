import React, { useState, useEffect } from "react";

export default function QuestionFormModal({
  initialData,
  onSave,
  onCancel,
  lessonId,
}) {
  const [formData, setFormData] = useState({
    questionType: "Translation",
    prompt: "",
    question: "",
    correctAnswer: "",
    sentenceWithBlank: "",
    choices: [""],
    pairs: [{ left: "", right: "" }],
    items: [""],
    correctOrder: [""],
    lesson: lessonId || "",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState("");
useEffect(() => {
  if (initialData) {
    setFormData({
      questionType: initialData.questionType || "Translation",
      prompt: initialData.prompt || "",
      question: initialData.question || "",
      correctAnswer: initialData.correctAnswer ?? "",
      sentenceWithBlank: initialData.sentenceWithBlank || "",
      choices:
        initialData.choices && initialData.choices.length > 0
          ? initialData.choices
          : [""],
      pairs: initialData.pairs || [{ left: "", right: "" }],
      items: initialData.items || [""],
      correctOrder: initialData.correctOrder || [""],
      lesson: initialData.lesson || lessonId || "",
    });
    setAudioFile(null);
    setAudioPreview(initialData.audioUrl || "");
  } else {
    setFormData((prev) => ({
      ...prev,
      lesson: lessonId || "",
    }));
    setAudioFile(null);
    setAudioPreview("");
  }
}, [initialData, lessonId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle choices change (for MultipleChoice, Translation, etc)
  const handleChoiceChange = (index, e) => {
    const newChoices = [...formData.choices];
    newChoices[index] = e.target.value;
    setFormData((prev) => ({ ...prev, choices: newChoices }));
  };

  const addChoice = () =>
    setFormData((prev) => ({ ...prev, choices: [...prev.choices, ""] }));
  const removeChoice = (index) =>
    setFormData((prev) => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));

  // Handle pairs change (for MatchingPairs)
  const handlePairChange = (index, side, e) => {
    const newPairs = [...formData.pairs];
    newPairs[index][side] = e.target.value;
    setFormData((prev) => ({ ...prev, pairs: newPairs }));
  };

  const addPair = () =>
    setFormData((prev) => ({
      ...prev,
      pairs: [...prev.pairs, { left: "", right: "" }],
    }));
  const removePair = (index) =>
    setFormData((prev) => ({
      ...prev,
      pairs: prev.pairs.filter((_, i) => i !== index),
    }));

  // Handle items change (for Ordering)
  const handleItemChange = (index, e) => {
    const newItems = [...formData.items];
    newItems[index] = e.target.value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };
  const addItem = () =>
    setFormData((prev) => ({ ...prev, items: [...prev.items, ""] }));
  const removeItem = (index) =>
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

  // Handle correctOrder change (for Ordering)
  const handleCorrectOrderChange = (index, e) => {
    const newOrder = [...formData.correctOrder];
    newOrder[index] = e.target.value;
    setFormData((prev) => ({ ...prev, correctOrder: newOrder }));
  };
  const addCorrectOrder = () =>
    setFormData((prev) => ({
      ...prev,
      correctOrder: [...prev.correctOrder, ""],
    }));
  const removeCorrectOrder = (index) =>
    setFormData((prev) => ({
      ...prev,
      correctOrder: prev.correctOrder.filter((_, i) => i !== index),
    }));

  // Handle audio file change & preview
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      const audioURL = URL.createObjectURL(file);
      setAudioPreview(audioURL);
    } else {
      setAudioFile(null);
      setAudioPreview("");
    }
  };

  // Submit form with FormData to support file upload
  // Submit form with FormData to support file upload
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      questionType,
      prompt,
      question,
      correctAnswer,
      lesson,
      sentenceWithBlank,
      choices,
      pairs,
      items,
      correctOrder,
    } = formData;

    const dataToSend = new FormData(); // dataToSend is declared here
    dataToSend.append("questionType", formData.questionType);
    dataToSend.append("prompt", formData.prompt);
    dataToSend.append("question", formData.question);
    dataToSend.append("correctAnswer", formData.correctAnswer);
    dataToSend.append("lesson", lesson);

    if (questionType === "FillInTheBlank" && formData.sentenceWithBlank) {
      dataToSend.append("sentenceWithBlank", formData.sentenceWithBlank);
    }

    if (
      formData.choices &&
      ["Translation", "MultipleChoice", "Listening", "FillInTheBlank"].includes(
        formData.questionType
      )
    ) {
      const cleanedChoices = choices.filter((c) => c.trim() !== "");
      // Debug log to check the value before appending
      console.log("cleanedChoices", cleanedChoices);
      console.log("JSON.stringify(cleanedChoices)", JSON.stringify(cleanedChoices));
      if (cleanedChoices.length > 0) {
        dataToSend.set("choices", JSON.stringify(cleanedChoices)); // Use set to avoid accidental array wrapping
      }
    }

    if (questionType === "MatchingPairs") {
      const validPairs = pairs.filter(
        (p) => p.left.trim() !== "" && p.right.trim() !== ""
      );
      if (validPairs.length > 0) {
        dataToSend.append("pairs", JSON.stringify(validPairs));
      }
    }

    if (questionType === "Ordering") {
      const validItems = items.filter((i) => i.trim() !== "");
      const validOrder = correctOrder.filter((o) => o.trim() !== "");
      if (validItems.length > 0) {
        dataToSend.append("items", JSON.stringify(validItems));
      }
      if (validOrder.length > 0) {
        dataToSend.append("correctOrder", JSON.stringify(validOrder));
      }
    }

   if (audioFile) {
  dataToSend.append("audioUrl", audioFile); // not "audioUrl"
}

    // ✅ Debug log - NOW THESE ARE IN THE CORRECT PLACE
    console.log("FormData being sent:");
    for (let pair of dataToSend.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    // Specifically check this:
    console.log("questionType before appending (should be correct now):", formData.questionType);

    onSave(dataToSend);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4 border rounded shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {initialData ? "Edit Question" : "Add New Question"}
      </h3>

      <div>
        <label className="block mb-1 font-medium">Question Type</label>
        <select
          name="questionType"
          value={formData.questionType}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
          disabled={!!initialData} // disable if editing existing question
        >
          <option value="Translation">Translation</option>
          <option value="MultipleChoice">Multiple Choice</option>
          <option value="TrueFalse">True/False</option>
          <option value="Listening">Listening</option>
          <option value="FillInTheBlank">Fill in the Blank</option>
          <option value="MatchingPairs">Matching Pairs</option>
          <option value="Ordering">Ordering</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Prompt (optional)</label>
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          placeholder="Prompt (optional)"
        />
      </div>

      {/* Question text (if applicable) */}
      {["Translation", "MultipleChoice", "TrueFalse", "Listening"].includes(
        formData.questionType
      ) && (
        <div>
          <label className="block mb-1 font-medium">Question Text</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder="Question Text"
            required={formData.questionType !== "Listening"}
          />
        </div>
      )}

      {/* Sentence with blank for FillInTheBlank */}
      {formData.questionType === "FillInTheBlank" && (
        <div>
          <label className="block mb-1 font-medium">Sentence with Blank</label>
          <input
            type="text"
            name="sentenceWithBlank"
            value={formData.sentenceWithBlank}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder="Sentence with blank (e.g. I ___ to school.)"
            required
          />
        </div>
      )}

      {/* Choices input for MultipleChoice, Translation, Listening, FillInTheBlank */}
      {[
        "MultipleChoice",
        "Translation",
        "Listening",
        "FillInTheBlank",
      ].includes(formData.questionType) && (
        <div>
          <label className="block mb-1 font-medium">Choices</label>
          {formData.choices.map((choice, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(idx, e)}
                placeholder={`Choice ${idx + 1}`}
                className="flex-grow border rounded px-2 py-1"
                required
              />
              {formData.choices.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChoice(idx)}
                  className="text-red-600 font-bold text-xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addChoice}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Choice
          </button>
        </div>
      )}

      {/* Matching Pairs */}
      {formData.questionType === "MatchingPairs" && (
        <div>
          <label className="block mb-1 font-medium">Pairs</label>
          {formData.pairs.map((pair, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={pair.left}
                onChange={(e) => handlePairChange(idx, "left", e)}
                placeholder="Left"
                className="flex-1 border rounded px-2 py-1"
                required
              />
              <input
                type="text"
                value={pair.right}
                onChange={(e) => handlePairChange(idx, "right", e)}
                placeholder="Right"
                className="flex-1 border rounded px-2 py-1"
                required
              />
              {formData.pairs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePair(idx)}
                  className="text-red-600 font-bold text-xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPair}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Pair
          </button>
        </div>
      )}

      {/* Ordering */}
      {formData.questionType === "Ordering" && (
        <>
          <label className="block mb-1 font-medium">Items</label>
          {formData.items.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(idx, e)}
                placeholder={`Item ${idx + 1}`}
                className="flex-grow border rounded px-2 py-1"
                required
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="text-red-600 font-bold text-xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Item
          </button>

          <label className="block mt-4 mb-1 font-medium">Correct Order</label>
          {formData.correctOrder.map((order, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={order}
                onChange={(e) => handleCorrectOrderChange(idx, e)}
                placeholder={`Order ${idx + 1}`}
                className="flex-grow border rounded px-2 py-1"
                required
              />
              {formData.correctOrder.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCorrectOrder(idx)}
                  className="text-red-600 font-bold text-xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCorrectOrder}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Order
          </button>
        </>
      )}

      {/* Correct Answer (for all except MatchingPairs and Ordering) */}
      {!["MatchingPairs", "Ordering"].includes(formData.questionType) && (
        <div>
          <label className="block mb-1 font-medium">Correct Answer</label>
          <input
            type={formData.questionType === "TrueFalse" ? "text" : "text"}
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            placeholder={
              formData.questionType === "TrueFalse"
                ? "true or false"
                : "Correct Answer"
            }
            required
          />
        </div>
      )}

      {/* Audio file input for applicable types */}
      {["Translation", "MultipleChoice", "Listening", "TrueFalse"].includes(
        formData.questionType
      ) && (
        <div>
          <label className="block mb-1 font-medium">
            Audio File (optional)
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="w-full border rounded px-2 py-1"
          />
          {audioPreview && (
            <audio controls src={audioPreview} className="mt-2 w-full" />
          )}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? "Update Question" : "Create Question"}
        </button>
      </div>
    </form>
  );
}
