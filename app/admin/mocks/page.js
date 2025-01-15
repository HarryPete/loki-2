'use client'

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
import { z } from "zod"
 
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessageeFormMessage} from "@/components/ui/form"
import axios from "axios"
import { toast } from "sonner"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Loading from "@/app/components/Loading"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  question: z.string().min(10, {
    message: "required",
  }),
 options: z.array(z.object({
    option: z.string().min(1, {
        message : "option is required"
    }),
    isCorrect : z.boolean().default(false)
 })).min(2).max(6)
})

const Page = () =>
{
    const [ isLoading, setIsLoading ] = useState(true);
    const [ courses, setCourses ] = useState(null);

    useEffect(()=>
    {
        getCourses();
    },[])

    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data);
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: 
            {
                question: "",
                options: Array(6).fill({ option : "", isCorrect: false})
            },
        })

    async function onSubmit(data) 
    {
        try
        {
            console.log(data)
            // const url = '/api/batch'
            // const response = await axios.post(url, batchDetails);
            // toast(response.data.message);
            // setNewBatch(false)
        }   
        catch(error)
        {
            console.log(error)
        }
    }

    if(isLoading)
        return <Loading/>

    return (
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Course</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='md:h-12 h-10 text-sm'>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {courses.map((course)=>
                (
                    <SelectItem className='md:h-12 h-10 text-sm' value={course._id} key={course._id}>{course.title}</SelectItem>
                ))}                  
                </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>)}
            /> */}
                <h1 className="text-base font-semibold">Question </h1>

                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Question</FormLabel> */}
                        <FormControl>
                        <Textarea className='md:h-12 h-10 text-sm' {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>)}
                />

                <h1 className="text-base font-semibold">Options</h1>

                {form.watch("options").map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`options.${index}.option`}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Option {index + 1}</FormLabel> */}
                <div className="flex items-center space-x-4">
                  {/* Option Input */}
                  <FormControl>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      {...field}
                      className="flex-1 border p-2 text-sm rounded"
                    />
                  </FormControl>

                  {/* Correct Checkbox */}
                  <FormField
                    control={form.control}
                    name={`options.${index}.isCorrect`}
                    render={({ field }) => (
                      <FormItem className="flex items-center text-sm  space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        {/* <FormDescription>Correct</FormDescription> */}
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

                
                

                <Button type="submit" className='md:h-12 h-10 text-sm'>Create</Button>
              </form>
              </Form>
  )
}

export default Page


