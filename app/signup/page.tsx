"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowUpRightFromSquare, LogIn } from 'lucide-react'
import { useFormState } from 'react-dom'
import { signUp } from '@/lib/authActions'
import { useRouter } from 'next/navigation'

const Signup = () => {

    const [state, formAction] = useFormState<any, FormData>(signUp, undefined)
    const router = useRouter()

  return (
    <div className="flex items-center h-screen">
        <Card className="w-1/3 mx-10">
            <CardHeader>
                <h3>Sagittarius.signup</h3>
            </CardHeader>
            <Separator />
            <CardContent className="py-4">
                <div id="body">
                    <form action={formAction} className="flex flex-col gap-2">
                        <div className="my-2 text-left">
                            <Label>First Name:</Label>
                            <Input name="fName" />
                        </div>

                        <div className="my-2 text-left">
                            <Label>Last Name:</Label>
                            <Input name="lName" />
                        </div>

                        <div className="my-2 text-left">
                            <Label>Username:</Label>
                            <Input name="username" />
                        </div>

                        <div className="my-2 text-left">
                            <Label>Password:</Label>
                            <Input name="password" type="password" />
                        </div>

                        {state?.error &&
                            <Alert variant='destructive'>
                                <AlertCircle size={20} />
                                <AlertTitle>{state.error}</AlertTitle>
                                <AlertDescription>{state.description}</AlertDescription>
                            </Alert>
                        }

                        <div className="flex flex-row gap-2">
                            <Button className="w-full">Sign Up <LogIn size={18} className="mx-1" /></Button>
                            <Button className="w-full" variant='outline' onClick={() => router.push('/login')}>Log In <ArrowUpRightFromSquare size={18} className="mx-1" /></Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>    
    </div>
  )
}

export default Signup