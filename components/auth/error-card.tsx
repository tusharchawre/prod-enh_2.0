import { BackButton } from "./back-button";
import "@/app/(auth)/login/login.css"
import "@/app/(protected)/notes/notes.css"

import { Card,
    CardHeader,
    CardFooter
 } from "../ui/card";


 export const ErrorCard= () =>{
    return (
        <>
        
        <div className="blur"></div>
        <div className="tealblob2"></div>
      <div className="purblob2"></div>
        <Card className="login glassblur bg-card-foreground-none">
        <h1>Shit! Something went Wrong</h1>
        <p className="text-sm opacity-70">Try logging in with different account</p>
           <CardFooter>
            <BackButton label="Back to login" href="/login" />
           </CardFooter>

        </Card>
        </>
    )
 }