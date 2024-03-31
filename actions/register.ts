"use server"

import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schema"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerficationToken } from "@/lib/token"
import { sendVerficationMail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Invalid fields"}
    }

    const { email,password,name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return({error:"Email Already in use!"})
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    //TO-DO send verification token
        const verificationToken = await generateVerficationToken(email)
        await sendVerficationMail(verificationToken.email, verificationToken.token)

    return {
        success: "Confirmation Email Sent!"
    }
}