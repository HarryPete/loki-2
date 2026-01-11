import { Lecture } from "@/models/lecture.model";

class lectureService
{
    async addNewLecture(title, modules, duration)
    {
        try
        {
            const lecture = await Lecture.create({title, modules, duration})
            await lecture.save();
            return lecture
        }
        catch(error)
        {
            throw error
        }
    }

    async getLecture(lectureId)
    {
        try
        {
            const lecture = await Lecture.findById(lectureId)
            return lecture
        }
        catch(error)
        {
            throw error
        }
    }
}

export default lectureService