import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Graduate } from "@/models/graduate.model";
import { User } from "@/models/user.model";

class graduateService
{

    // async enroll(user, batch)
    // {
    //     try
    //     {
    //         const enrollment = await Enrollment.create({user, batch})
    //         await enrollment.save();
    //         return enrollment;
    //     }
    //     catch(error)
    //     {
    //         return error
    //     }
    // }

    async getGraduates()
    {
        try
        {
            const graduates = await Graduate.find({});
            return graduates
        }
        catch(error)
        {
            throw error
        }
    }

    async getMonthlyGraduates(id)
    {
        try
        {
            const monthlyGraduates = await Graduate.findById(id).populate([{path: 'enrollments', module: Enrollment, populate:{ path: 'user', model: User}},{ path: 'course', module: Course}]);
            return monthlyGraduates
        }
        catch(error)
        {
            throw error
        }
    }
}

export default graduateService