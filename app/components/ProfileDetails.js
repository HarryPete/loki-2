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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessageeFormMessage} from "@/components/ui/form"
  import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  contact: z.string().min(10, {
    message: "Invalid contact number",
  }),
  linkedIn: z.string().min(10, {
    message: "Enter valid URL",
  }),
  organisation: z.string().min(4, {
    message: "Enter valid company name",
  }),
  domain: z.string().min(3, {
    message: "Select a domain",
  }),
  experience: z.string().min(1, {
    message: "Invalid experience",
  }),
  country: z.string().min(4, {
    message: "Enter valid country",
  }),
})

export const domains = 
[
    {
        id: 1,
        domain: 'Transaction Monitoring'
    },
    {
        id: 2,
        domain: 'KYC'
    },
    {
        id: 3,
        domain: 'CDD'
    },
    {
        id: 4,
        domain: 'SAR/STR'
    },
    {
        id: 5,
        domain: 'Teller/Front Office'
    },
    {
        id: 6,
        domain: 'QC/QA'
    },
    {
        id: 7,
        domain: 'Legal'
    },
    {
        id: 8,
        domain: 'Audit'
    },
    {
        id: 9,
        domain: 'Fraud'
    },
    {
        id: 10,
        domain: 'Risk Ops'
    },
    {
        id: 11,
        domain: 'Others'
    },
] 

const ProfileDetails = ({userData, setEditInfo, editInfo, getUserData}) =>
{
    const { name, contact, linkedIn, organisation, experience, country, domain } = userData;
    const [ isLoading, setIsLoading ] = useState(false);

    console.log(userData)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: 
        {
            name: name ?? "",
            contact: contact ?? "",
            linkedIn: linkedIn ?? "",
            organisation: organisation ?? "",
            experience: experience ?? "",
            country: country ?? "", 
            domain: domain ?? ""
        },
    })

    async function onSubmit(data) 
    {
        try
        {
            setIsLoading(true);
            const url = `api/user/${userData._id}`
            const response = await axios.put(url, data);
            getUserData();
            toast(response.data.message);
            setEditInfo(false)
        }   
        catch(error)
        {
            console.log(error)
        }
    }

    return (
    <Dialog open={editInfo} onOpenChange={setEditInfo}>
        <DialogTrigger asChild>
            <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />
                
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />
                <FormField
                    control={form.control}
                    name="organisation"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Organisation</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />

            <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Domain</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='md:h-12 h-10 text-sm'>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your domain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {domains.map((data)=>
                  (
                    <SelectItem className='md:h-12 h-10 text-sm' value={data.domain} key={data.id}>{data.domain}</SelectItem>
                  ))}                  
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
            />

                <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />      
                <FormField
                    control={form.control}
                    name="linkedIn"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Linked in</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                        <Input className='md:h-12 h-10 md:text-base text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />
{ isLoading ? <Button className='lg:h-12 h-10 text-md'>
                <Loader2 className='animate-spin'/>
                Updating...
            </Button> :                       
                <Button type="submit">Update</Button>}
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default ProfileDetails
