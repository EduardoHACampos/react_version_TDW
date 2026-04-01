import httpClient from "./httpClient";

export interface Job {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await httpClient.get<Job[]>("/jobs/");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export interface ApplyFormData {
  name: string;
  email: string;
  portfolioLink: string;
  message: string;
  jobName: string;
}

export const applyToJob = async (jobId: number, data: ApplyFormData) => {
  try {
    const response = await httpClient.post(`/jobs/${jobId}/apply`, data);
    return response.data;
  } catch (error) {
    console.error("Error applying to job:", error);
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
    const response = await httpClient.post("/jobs/contact/", data);
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
  try {
    const response = await httpClient.post("/jobs/user-info/", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting join the hunt form:", error);
    throw error;
  }
};
