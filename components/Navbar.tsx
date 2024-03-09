"use client"

import { LogIn, Menu, User } from "lucide-react"
import { ModeToggle } from "./mode-toggle-switch"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
  

const Navbar = () => {

    const router = useRouter()

  return (
    <div className="p-4 px-8 flex flex-row items-center justify-between">
        <h3 className="text-3xl">Sagittarius</h3>

        {/* MOBILE NAVIGATION */}
        <Sheet>
            <SheetTrigger className="sm:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <div className="my-5 flex flex-col justify-center gap-3">
                    <Button onClick={() => router.push('/login')} variant="outline">Login <LogIn size={18} className="mx-1" /></Button>
                    <Button onClick={() => router.push('/signup')} variant="outline">Sign up <User size={18} className="mx-1" /></Button>
                    <ModeToggle />
                </div>
            </SheetContent>
        </Sheet>

        {/* DESKTOP NAVIGATION */}
        <div className="flex-row hidden sm:flex items-center gap-2">
            <ModeToggle />
            <Button onClick={() => router.push('/login')} variant="outline">Login <LogIn size={18} className="mx-1" /></Button>
            <Button onClick={() => router.push('/signup')} variant="outline">Sign up <User size={18} className="mx-1" /></Button>
        </div>
    </div>
  )
}

export default Navbar