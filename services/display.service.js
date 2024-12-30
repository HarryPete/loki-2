import { Display } from "@/models/display.model";
import { Feedback } from "@/models/feedback.model";
import { User } from "@/models/user.model";

class displayService
{
    async getDisplayData()
    {
        try
        {
            const data = await Display.find().populate([{ path: 'feedbacks', model: Feedback, populate:{ path: 'user', model: User}}, { path: 'recentGraduates', model: User}]);
            return data
        }
        catch(error)
        {
            throw error
        }
    }
}

export default displayService