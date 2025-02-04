import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Quiz } from "@/models/quiz.model";
import { Test } from "@/models/test.model";
import { Trigger } from "@/models/trigger.model";
import { TriggerResponse } from "@/models/triggerResponse.model";
import { User } from "@/models/user.model";

class triggerResponseService
{
    async createTriggerResponse(trigger, batch, enrollment)
    {
        try
        {
            const test = await TriggerResponse.create({ trigger, batch, enrollment });
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
            const quizzes = await TriggerResponse.find();
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
            const triggerResponse = await TriggerResponse.findById(id).populate(
                [{
                    path: 'batch',
                    ref: Batch,
                    populate:
                    {
                        path: 'course',
                        ref: Course
                    }
                },
                {
                    path: 'trigger',
                    ref: Trigger
                }]
            )
            return triggerResponse
        }
        catch(error)
        {
            throw error
        }
    }

    async updateTriggerResponses(mockId, triggerResponseDetails)
    {
        try
        {
            return await TriggerResponse.findByIdAndUpdate(mockId, {$set: triggerResponseDetails})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default triggerResponseService