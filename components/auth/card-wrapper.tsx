"use client"
import "@/app/(auth)/login/login.css"
import "@/app/notes/notes.css"
import { Socials } from "./social";

import { Card,
    CardContent,
    CardHeader,
    CardFooter 
} from "../ui/card";
import { BackButton } from "./back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocials?: boolean
}

export const CardWrapper = ({children,headerLabel,backButtonHref,backButtonLabel,showSocials}: CardWrapperProps)=>{
    return(
        <>



              <div className="blur"></div>
        <div className="tealblob2"></div>
      <div className="purblob2"></div>
        <Card className="login glassblur bg-card-foreground-none">

            <CardContent>
        <h1>Login</h1>

            {children}
            </CardContent>
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}

                />


            </CardFooter>
        </Card>
        </>
    )

}