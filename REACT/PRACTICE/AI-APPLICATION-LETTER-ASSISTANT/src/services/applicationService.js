import { supabase } from "./supabaseClient.js";

export const createApplication = async ({
  userId,
  title,
  category,
  documentType,
  language,
  tone,
  formData,
}) => {
  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: userId,
      title,
      category,
      document_type: documentType,
      content: JSON.stringify(formData),
      language,
      tone,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getApplications = async (userId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const updateApplication = async (applicationId, updates) => {
  const { data, error } = await supabase
    .from("applications")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteApplication = async (applicationId) => {
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", applicationId);

  if (error) {
    throw error;
  }
};

export const getApplicationById = async (applicationId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};