"use server"

import { LoginSchema } from "@/schema"
import * as z from "zod"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateVerficationToken } from "@/lib/token"
import { sendVerficationMail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Invalid fields"}
    }

    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error:"Email does not exist!"}
    }

    if (!existingUser.emailVerified){
        const verficationToken = await generateVerficationToken(existingUser.email);
       
        await sendVerficationMail(verficationToken.email,verficationToken.token)

        return {success: "Confirmation Email sent!"}
    }



    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        
    } catch (error) {
        if (error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid Credentials"}
                default:
                    return {error: "Something Went wrong!"}
            }
        }
        throw error;
    }



   
}