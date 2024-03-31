"use client"


import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schema"
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
import { login } from "@/actions/login"
import { useState, useTransition } from "react"



export const LoginForm = () =>{

  const searchParams =  useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";





  const [error, setError] = useState<string | undefined>("")
  const [success, setSucess] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()



  const form = useForm<z.infer<typeof LoginSchema>>({

    resolver:  zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: ""
    }

  })


  const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
    setError("")
    setSucess("")



startTransition(()=>{
  login(values)
  .then((data)=>{
    setError(data?.error)
    setSucess(data?.success)
  })

})

  }




    return (
  <CardWrapper headerLabel="Welcome back!" backButtonLabel="Dont have an account?" backButtonHref="/register" showSocials>
    <h1>Login</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      >
        <div className="space-y-4 w-[20vw]" >
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
        <FormError message={error || urlError}/>
        <FormSuccess message={success} />



          <Button type="submit" disabled={isPending} className="w-full">Login</Button>




      </form>
    </Form>
  </CardWrapper>
    )
}