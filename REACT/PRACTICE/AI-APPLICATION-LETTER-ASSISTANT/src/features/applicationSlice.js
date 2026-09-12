import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: null,
    selectedDocumentType: null,
    formData: {},
    language: "English",
    tone: "Professional",
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            // Reset document type and form data when category changes
            state.selectedDocumentType = null;
            state.formData = {};
        },
        setSelectedDocumentType: (state, action) => {
            state.selectedDocumentType = action.payload;
            // Reset form data when switching to a different document type
            state.formData = {};
        },
        setFormField: (state, action) => {
            const { fieldId, value } = action.payload;
            state.formData[fieldId] = value;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setTone: (state, action) => {
            state.tone = action.payload;
        },
        resetToCategories: (state) => {
            state.selectedCategory = null;
            state.selectedDocumentType = null;
            state.formData = {};
        },
        resetToDocumentTypes: (state) => {
            state.selectedDocumentType = null;
            state.formData = {};
        },
        resetApplication: () => initialState,
    },
});

export const {
    setSelectedCategory,
    setSelectedDocumentType,
    setFormField,
    setLanguage,
    setTone,
    resetToCategories,
    resetToDocumentTypes,
    resetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;