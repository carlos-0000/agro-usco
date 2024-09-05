"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { signIn } from "next-auth/react"
import { toast } from "sonner"


const SignInForm = () => {
    const [email, setEmail] = useState<null | string>(null)

    async function signInWithEmail() {
        const signInResult = await signIn('email', {
            email,
            callbackUrl: `${window.location.origin}/dashboard/settings`,
            redirect: false,
        })

        if (!signInResult?.ok) {
            return toast.error('Parece que algo salió mal, por favor inténtalo de nuevo')
        }

        return toast.success('Revisa tu correo electrónico para el enlace mágico')
    }

    return (
        <form action={signInWithEmail}>
            <div className="flex flex-col gap-y-2">
                <Label>Correo electrónico</Label>
                <Input onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="name@example.com" />
            </div>
            <Button type="submit" className="mt-4 w-full">Continuar</Button>
        </form>
    )
}

export default SignInForm
