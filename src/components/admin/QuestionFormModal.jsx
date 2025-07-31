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

    const dataToSend = new FormData();
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
      if (cleanedChoices.length > 0) {
        dataToSend.set("choices", JSON.stringify(cleanedChoices));
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
      dataToSend.append("audioUrl", audioFile);
    }

    onSave(dataToSend);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-700/50">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          {getQuestionTypeIcon(formData.questionType)}
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            {initialData ? "Edit Question" : "Create New Question"}
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Configure the question details and settings below
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-300">
            Question Type
          </label>
          <div className="relative">
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70 appearance-none cursor-pointer"
              required
              disabled={!!initialData}
            >
              <option value="Translation">Translation</option>
              <option value="MultipleChoice">Multiple Choice</option>
              <option value="TrueFalse">True/False</option>
              <option value="Listening">Listening</option>
              <option value="FillInTheBlank">Fill in the Blank</option>
              <option value="MatchingPairs">Matching Pairs</option>
              <option value="Ordering">Ordering</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {!!initialData && (
            <p className="text-xs text-slate-500">Question type cannot be changed when editing</p>
          )}
        </div>

        {/* Prompt */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-300">
            Prompt <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
            placeholder="Enter a prompt for context (optional)"
          />
        </div>

        {/* Question Text (conditional) */}
        {["Translation", "MultipleChoice", "TrueFalse", "Listening"].includes(
          formData.questionType
        ) && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              Question Text
              {formData.questionType === "Listening" && (
                <span className="text-slate-500 font-normal"> (optional for listening)</span>
              )}
            </label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
              placeholder="Enter the question text"
              required={formData.questionType !== "Listening"}
            />
          </div>
        )}

        {/* Sentence with Blank */}
        {formData.questionType === "FillInTheBlank" && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              Sentence with Blank
            </label>
            <input
              type="text"
              name="sentenceWithBlank"
              value={formData.sentenceWithBlank}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
              placeholder="I ___ to school every day."
              required
            />
            <p className="text-xs text-slate-500">Use underscores (_) to indicate where the blank should be</p>
          </div>
        )}

        {/* Choices Section */}
        {["MultipleChoice", "Translation", "Listening", "FillInTheBlank"].includes(
          formData.questionType
        ) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <label className="text-sm font-semibold text-slate-300">Answer Choices</label>
            </div>
            <div className="space-y-3">
              {formData.choices.map((choice, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 text-sm font-semibold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <input
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(idx, e)}
                    placeholder={`Choice ${idx + 1}`}
                    className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                    required
                  />
                  {formData.choices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChoice(idx)}
                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addChoice}
              className="group flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Choice
            </button>
          </div>
        )}

        {/* Matching Pairs */}
        {formData.questionType === "MatchingPairs" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <label className="text-sm font-semibold text-slate-300">Matching Pairs</label>
            </div>
            <div className="space-y-3">
              {formData.pairs.map((pair, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1 flex gap-3">
                    <input
                      type="text"
                      value={pair.left}
                      onChange={(e) => handlePairChange(idx, "left", e)}
                      placeholder="Left side"
                      className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                      required
                    />
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={pair.right}
                      onChange={(e) => handlePairChange(idx, "right", e)}
                      placeholder="Right side"
                      className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                      required
                    />
                  </div>
                  {formData.pairs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePair(idx)}
                      className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPair}
              className="group flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Pair
            </button>
          </div>
        )}

        {/* Ordering Section */}
        {formData.questionType === "Ordering" && (
          <div className="space-y-6">
            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <label className="text-sm font-semibold text-slate-300">Items to Order</label>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(idx, e)}
                      placeholder={`Item ${idx + 1}`}
                      className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                      required
                    />
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addItem}
                className="group flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Item
              </button>
            </div>

            {/* Correct Order */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <label className="text-sm font-semibold text-slate-300">Correct Order</label>
              </div>
              <div className="space-y-3">
                {formData.correctOrder.map((order, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <input
                      type="text"
                      value={order}
                      onChange={(e) => handleCorrectOrderChange(idx, e)}
                      placeholder={`Position ${idx + 1}`}
                      className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                      required
                    />
                    {formData.correctOrder.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCorrectOrder(idx)}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addCorrectOrder}
                className="group flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Order
              </button>
            </div>
          </div>
        )}

        {/* Correct Answer (for non-choice questions) */}
        {!["MatchingPairs", "Ordering"].includes(formData.questionType) && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              Correct Answer
            </label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 hover:border-slate-500/70"
              placeholder={
                formData.questionType === "TrueFalse"
                  ? "Enter 'true' or 'false'"
                  : "Enter the correct answer"
              }
              required
            />
            {formData.questionType === "TrueFalse" && (
              <p className="text-xs text-slate-500">Please enter exactly "true" or "false" (lowercase)</p>
            )}
          </div>
        )}

        {/* Audio File Upload */}
        {["Translation", "MultipleChoice", "Listening", "TrueFalse"].includes(
          formData.questionType
        ) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <label className="text-sm font-semibold text-slate-300">
                Audio File <span className="text-slate-500 font-normal">(optional)</span>
              </label>
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="audio-upload"
              />
              <label 
                htmlFor="audio-upload"
                className="flex items-center justify-center gap-3 w-full p-6 bg-slate-800/30 border-2 border-dashed border-slate-600/50 rounded-xl hover:border-slate-500/70 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-all duration-300">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-slate-300 font-medium">Upload Audio File</p>
                  <p className="text-slate-500 text-sm">Click to browse or drag and drop</p>
                </div>
              </label>
            </div>

            {audioPreview && (
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-400 text-sm font-medium">Audio Preview</span>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <audio 
                    controls 
                    src={audioPreview} 
                    className="w-full [&::-webkit-media-controls-panel]:bg-slate-800 [&::-webkit-media-controls-current-time-display]:text-slate-300 [&::-webkit-media-controls-time-remaining-display]:text-slate-300"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-slate-700/50">
          <button
            type="button"
            onClick={onCancel}
            className="group relative px-6 py-3 bg-slate-800/50 text-slate-300 font-semibold rounded-xl border border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-slate-500/70 hover:text-slate-200 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Cancel</span>
          </button>
          
          <button
            type="submit"
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              {initialData ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Update Question
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Question
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>)}