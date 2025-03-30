import { Session } from "../models/session.model.js";

class sessionService
{
    async addNewSession(id, lecture)
    {
        try
        {
            const newSession = await Session.create({id, lecture})
            await newSession.save();
            return newSession
        }
        catch(error)
        {
            throw error
        }
    }

    async updateSessionStatus(sessionId, newStatus)
    {
        try
        {
            await Session.findByIdAndUpdate(sessionId, {$set : {isCompleted : newStatus}},{new : true}) 
        }
        catch(error)
        {
            throw new Error('Failed to update status')
        }
    }

}

export default sessionService