import { Job } from "@/models/job.model";

class jobService
{
    async postNewJob(data)
    {
        try
        {
            const newJob = await Job.create(data)
            await newJob.save();
            return newJob
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllJobs()
    {
        try
        {
            const jobs = await Job.find();
            return jobs
        }
        catch(error)
        {
            throw error
        }
    }
}

export default jobService