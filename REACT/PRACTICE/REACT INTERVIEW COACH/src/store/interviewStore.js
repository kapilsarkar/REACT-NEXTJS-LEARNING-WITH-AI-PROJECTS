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

      // ==========================
      // API State
      // ==========================
      loading: false,
      error: null,

      // ==========================
      // Configuration Actions
      // ==========================
      setInterviewConfig: (config) =>
        set({
          role: config.role,
          experience: config.experience,
          difficulty: config.difficulty,
          questionCount: config.questionCount,
        }),

      // ==========================
      // Questions Actions
      // ==========================
      setQuestions: (questions) =>
        set({
          questions,
        }),

      setCurrentQuestionIndex: (index) =>
        set({
          currentQuestionIndex: index,
        }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex:
            state.currentQuestionIndex > 0
              ? state.currentQuestionIndex - 1
              : 0,
        })),

      // ==========================
      // Answers Actions
      // ==========================
      addAnswer: (answer) =>
        set((state) => ({
          answers: [...state.answers, answer],
        })),

      // ==========================
      // Score Actions
      // ==========================
      setScore: (score) =>
        set({
          score,
        }),

      // ==========================
      // Loading Actions
      // ==========================
      setLoading: (loading) =>
        set({
          loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      // ==========================
      // Reset Interview
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
          score: 0,

          loading: false,
          error: null,
        }),
        
    }),
    {
      name: "interview-storage", // Unique name for localStorage key
    }
  )
);

export default useInterviewStore;