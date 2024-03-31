"use client"

import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { RingLoader } from "react-spinners"
import { FormError } from "../Form-error"
import { FormSuccess } from "../Form-success"



export const NewVerificationForm = () =>{
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()



    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const onSubmit = useCallback(() =>{
        if (!token) {
            setError("Missing token")
            return;
        }
        newVerification(token)
        .then((data)=>{
            setSuccess(data.success)
            setError(data.error)
        })
        .catch(()=>{
            setError("Something Went Wrong")
        })
    },[token])

    useEffect(()=>{
        onSubmit();
    },[onSubmit])




    return(<>
    <CardWrapper headerLabel="Confirming Your verification" backButtonHref="/login" backButtonLabel="Back to login">
        <h1>Confirming Your Verification</h1>
        <div className="flex items-center w-full justify-center">
            {!success && !error &&(
                <RingLoader size={40} color="#ffffff" />

            )}
            

            <FormError message={error}/>
            <FormSuccess message={success}/>

        </div>
    </CardWrapper>

    </>) 
}