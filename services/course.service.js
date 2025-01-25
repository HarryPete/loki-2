import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Feedback } from "@/models/feedback.model";
import { Lecture } from "@/models/lecture.model";
import { User } from "@/models/user.model";

class courseService
{
    async create(id, title, description, price, offerPrice, imageURL)
    {
        try
        {
            const newCourse = await Course.create({id, title, description, price, offerPrice, imageURL})
            if(!newCourse)
                throw new Error('Failed to create new course')
            return await newCourse.save();
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
            const courses = await Course.find({}).populate({path: 'lectures', model: Lecture});
            if(!courses)
                throw new Error('Courses not found')
            return courses
        }
        catch(error)
        {
            throw error
        }
    }

    async getByCourseId(id)
    {
        try
        {
            const course = await Course.findById(id).populate({path: 'lectures', model: Lecture})
            if(!course)
                throw new Error('Course not found')
            return course
        }
        catch(error)
        {
            throw error
        }
    }

    async findById(id)
    {
        try
        {
            const course = await Course.findOne({id})
            .populate({path: 'lectures', model: Lecture})
            .populate({path: 'batches', model: Batch, populate: {path: 'enrollments', model: Enrollment}})
            .populate({path:'feedbacks', model:Feedback, populate: {path: 'user', model:User}})
            if(!course)
                throw new Error('Course not found')
            return course
        }
        catch(error)
        {
            throw error
        }
    }

    async addLectureToCourse(courseId, lectureId)
    {
        try
        {
            return await Course.findOneAndUpdate({id: courseId}, {$push: {lectures: lectureId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async addFeedbacktoCourse(courseId, feedback)
    {
        try
        {
            return await Course.findByIdAndUpdate(courseId, {$push: {feedbacks: feedback}})
        }
        catch(error)
        {
            throw error
        }
    }

    async deleteFeedbackFromCourse(courseId, feedbackId)
    {
        try
        {
            return await Course.findByIdAndUpdate(courseId, {$pull: {feedbacks: feedbackId}})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default courseService