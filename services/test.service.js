import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Quiz } from "@/models/quiz.model";
import { Test } from "@/models/test.model";
import { User } from "@/models/user.model";

class testService
{
    async createNewTest(quiz, enrollment)
    {
        try
        {
            const test = await Test.create({ quiz, enrollment });
            await test.save(); 
            return test            
        }
        catch(error)
        {
            throw error
        }
    }

    async findAll()
    {
        try
        {
            const quizzes = await Test.find();
            return quizzes
        }
        catch(error)
        {
            return error
        }
    }

    async findById(id)
    {
        try
        {
            const test = await Test.findById(id).populate([
                {
                    path: 'quiz',
                    ref: Quiz,
                    populate:
                    {
                        path: 'course',
                        model: Course
                    }
                },
                {
                    path: 'enrollment',
                    ref: Enrollment,
                    populate:
                    [{
                        path: 'user',
                        ref: User
                    },
                    {
                        path: 'batch',
                        ref: Batch
                    }]
                },
            ])
            return test
        }
        catch(error)
        {
            throw error
        }
    }

    async updateScores(mockId, mockDetails)
    {
        try
        {
            return await Test.findByIdAndUpdate(mockId, {$set: mockDetails})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default testService