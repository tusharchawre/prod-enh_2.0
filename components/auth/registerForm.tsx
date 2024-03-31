"use client"



import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schema"
import { Input } from "../ui/input"

import {Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Button } from "../ui/button"

import { FormSuccess } from "../Form-success"
import { FormError } from "../Form-error"
import { register } from "@/actions/register"
import { useState, useTransition } from "react"



export const RegisterForm = () =>{
  const [error, setError] = useState<string | undefined>("")
  const [success, setSucess] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()



  const form = useForm<z.infer<typeof RegisterSchema>>({

    resolver:  zodResolver(RegisterSchema),
    defaultValues:{
      email: "",
      password: ""
    }

  })


  const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
    setError("")
    setSucess("")



startTransition(()=>{
  register(values)
  .then((data)=>{
    setError(data.error)
    setSucess(data.success)
  })

})

  }




    return (
  <CardWrapper headerLabel="Sign Up!" backButtonLabel="Already have an account?" backButtonHref="/login" showSocials>
<h1>Register</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      >
        <div className="space-y-4 w-[20vw]" >
        <FormField control={form.control}  name="name" render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="text-black" disabled={isPending} {...field} placeholder="Enter your name"  />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}/>
          <FormField control={form.control}   name="email" render={({field})=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="text-black" disabled={isPending} {...field} placeholder="Enter your Email" type="email" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>

          <FormField control={form.control}  name="password" render={({field})=>(
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="text-black" disabled={isPending} {...field} placeholder="shhhhh...." type="password" />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}/>
           

           
        </div>
        <FormError message={error}/>
        <FormSuccess message={success} />



          <Button type="submit" disabled={isPending} className="w-full">Create an Account</Button>




      </form>
    </Form>
  </CardWrapper>
    )
}