import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormatDate } from "@/utility/FormatDate"

const UserHistory = ({user, selectedUser, setSelectedUser}) =>
{
    return (
    <Dialog open={selectedUser} onOpenChange={setSelectedUser}>
        <DialogTrigger asChild>
            <Button className='h-12 text-sm md:text-base'>Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{user.name}</DialogTitle>
                <DialogDescription>
                  Account created on {FormatDate(user.createdAt)}
                </DialogDescription>
            </DialogHeader>

            <div>
              <p>{user.email}</p>
              <p>{user?.contact}</p>
              <p>{user?.experience}</p>
              <p>{user?.domain}</p>
              <p>{user?.country}</p>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default UserHistory

