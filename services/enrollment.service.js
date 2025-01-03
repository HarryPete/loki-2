import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Lecture } from "@/models/lecture.model";
import { Mentor } from "@/models/mentor.model";
import { Session } from "@/models/session.model";
import { Test } from "@/models/test.model";
import { User } from "@/models/user.model";

class enrollmentService
{

    async enroll(user, batch)
    {
        try
        {
            const enrollment = await Enrollment.create({user, batch})
            await enrollment.save();
            return enrollment;
        }
        catch(error)
        {
            return error
        }
    }

    async getEnrollmentById(enrollmentId)
    {
        try
        {
            const enrollment = await Enrollment.findById(enrollmentId)
            .populate(
            {
                path: 'batch', 
                model: Batch,
                populate:
                [{
                    path: 'course',
                    model: Course
                },
                {
                    path: 'sessions',
                    model: Session,
                    populate:
                    {
                        path: 'lecture',
                        model: Lecture
                    }
                },
                {
                    path: 'mentor',
                    model: Mentor
                }]
            })

            return enrollment
        }
        catch(error)
        {
            throw error
        }
    }

    async assignTest(userId, testId)
    {
        try
        {
            return await Enrollment.findOneAndUpdate({user: userId}, {$push : {assessments: testId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async getEnrollments()
    {
        try
        {
            const enrollments = await Enrollment.find({}).populate([{path: 'user', module: User},{ path: 'batch', module: Batch}]);
            return enrollments
        }
        catch(error)
        {
            throw error
        }
    }

    async updateAccess(enrollmentId, access)
    {
        try
        {
            return await Enrollment.findByIdAndUpdate(enrollmentId, {$set : {access}})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default enrollmentService