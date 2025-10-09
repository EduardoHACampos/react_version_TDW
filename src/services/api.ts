import axios from "axios";

const API_URL = "https://tdwbackend1-production.up.railway.app";

export interface Job {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get<Job[]>(`${API_URL}/jobs/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await axios.post(`${API_URL}/contact/`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
export interface HuntFormData {
  name: string;
  email: string;
}

export const submitJoinTheHuntForm = async (data: HuntFormData) => {
  console.log("Submitting Join The Hunt form:", data);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: "Successfully subscribed!" };
};