import SignInForm from "@/components/signin-form";
import SignInWithPasskey from "@/components/signin-with-passkey-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";


export default async function AuthPage() {
    // @ts-ignore
    const session = await getServerSession(authOptions)

    if (session) {
        return redirect('/dashboard')
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Ingresar a Mercado Agro</CardTitle>
                    <CardDescription className="">Ingresa tu correo para registro o usa tu
                        passkey para iniciar sesión si ya tienes una cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <SignInForm/>
                        <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    O continua con
                                </span>
                            </div>
                        </div>
                        <SignInWithPasskey/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
