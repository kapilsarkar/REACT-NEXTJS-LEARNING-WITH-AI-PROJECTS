import { create } from "zustand";
import { persist } from "zustand/middleware";

const useInterviewStore = create(
  persist(
    (set) => ({
      // ==========================
      // Interview Configuration
      // ==========================
      role: "",
      experience: "",
      difficulty: "",
      questionCount: 5,

      // ==========================
      // Interview Data
      // ==========================
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      evaluation: null,
      // ==========================
      // API State
      // ==========================
      loading: false,
      error: null,

      // ==========================
      // Configuration
      // ==========================
      setInterviewConfig: (config) =>
        set({
          // Configuration
          role: config.role,
          experience: config.experience,
          difficulty: config.difficulty,
          questionCount: config.questionCount,

          // Reset previous interview
          questions: [],
          currentQuestionIndex: 0,
          answers: [],
          score: 0,
          evaluation: null,
          loading: false,
          error: null,
        }),

      // ==========================
      // Questions
      // ==========================
      setQuestions: (questions) =>
        set({
          questions,
          currentQuestionIndex: 0,
          answers: [],
          score: 0,
          evaluation: null,
        }),

      clearQuestions: () =>
        set({
          questions: [],
          currentQuestionIndex: 0,
        }),

      // ==========================
      // Navigation
      // ==========================
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex:
            state.currentQuestionIndex < state.questions.length - 1
              ? state.currentQuestionIndex + 1
              : state.currentQuestionIndex,
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex:
            state.currentQuestionIndex > 0
              ? state.currentQuestionIndex - 1
              : 0,
        })),

      setCurrentQuestionIndex: (index) =>
        set((state) => ({
          currentQuestionIndex: Math.max(
            0,
            Math.min(index, state.questions.length - 1)
          ),
        })),
      // ==========================
      // Answers
      // ==========================
      addAnswer: (answer) =>
        set((state) => ({
          answers: [...state.answers, answer],
        })),

      updateAnswer: (index, answer) =>
        set((state) => {
          const updatedAnswers = [...state.answers];
          updatedAnswers[index] = answer;

          return {
            answers: updatedAnswers,
          };
        }),

      clearAnswers: () =>
        set({
          answers: [],
        }),

      // ==========================
      // Score
      // ==========================
      setScore: (score) =>
        set({
          score,
        }),

      // ==========================
      // Evaluation
      // ==========================
      setEvaluation: (evaluation) =>
        set({
          evaluation,
        }),

      clearEvaluation: () =>
        set({
          evaluation: null,
        }),

      // ==========================
      // Loading
      // ==========================
      setLoading: (loading) =>
        set({
          loading,
        }),

      // ==========================
      // Error
      // ==========================
      setError: (error) =>
        set({
          error,
        }),

      clearError: () =>
        set({
          error: null,
        }),

      // ==========================
      // Reset
      // ==========================
      resetInterview: () =>
        set({
          role: "",
          experience: "",
          difficulty: "",
          questionCount: 5,

          questions: [],
          currentQuestionIndex: 0,

          answers: [],
          evaluation: null,
          score: 0,

          loading: false,
          error: null,
        }),
    }),
    {
      name: "interview-storage",
    }
  )
);

export default useInterviewStore;