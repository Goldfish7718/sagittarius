"use server"

import { getIronSession } from "iron-session"
import { SessionData, defaultSession, sessionOptions } from "./auth"
import { cookies } from "next/headers"
import connectDB from "@/utils/db"
import User from "@/models/user"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

interface PrevStateProps {
    error: undefined | string;
    description: undefined | string;
}

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.isAdmin = defaultSession.isAdmin;
    }

    return session;
}

export const signUp = async (prevState: PrevStateProps, formData: FormData) => {

    await connectDB()
    const session = await getSession()

    const formUsername = formData.get("username") as string
    const formPassword = formData.get("password") as string
    const formFName = formData.get("fName") as string
    const formLName = formData.get("lName") as string

    console.log(formUsername, formPassword, formFName, formLName);

    const potentialUser = await User.findOne({ username: formUsername })

    if (potentialUser) {
        return {
            error: "Username not available",
            description: "Please try another username."
        }
    }

    const hashedPassword = await bcrypt.hash(formPassword, 10)

    const newUser = await User.create({
        fName: formFName,
        lName: formLName,
        username: formUsername,
        password: hashedPassword
    })

    session.userId = newUser._id
    session.username = newUser.username
    session.isLoggedIn = true
    session.isAdmin = newUser.isAdmin

    await session.save()
    redirect('/feed')
}

export const login = async (prevState: PrevStateProps, formData: FormData) => {
    await connectDB()
    const session = await getSession()

    const formUsername = formData.get("username") as string
    const formPassword = formData.get("password") as string

    const potentialUser = await User.findOne({ username: formUsername })

    if (!potentialUser) 
        return { 
            error: "Incorrect Credentials",
            description: "Please try again."
        }

    const match = await bcrypt.compare(formPassword, potentialUser.password)

    if (!match)
        return { 
            error: "Incorrect Credentials",
            description: "Please try again."
        }

    session.isLoggedIn = true
    session.isAdmin = potentialUser.isAdmin
    session.username = potentialUser.username
    session.userId = potentialUser._id

    await session.save()
    redirect('/feed')
}

export const logout = async () => {
    const session = await getSession()
    session.destroy()
    redirect('/')
}

