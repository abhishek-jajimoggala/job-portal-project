import jobs from "../data/jobs";

export const getJobs = () => {
  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  return [...jobs, ...adminJobs];
};

export const getJobById = (id) => {
  const allJobs = getJobs();

  return allJobs.find(
    (job) => Number(job.id) === Number(id)
  );
};