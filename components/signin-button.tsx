'use client';

import React from "react";
import {LogIn} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const SignInButton: React.FC = () => {
    const {push} = useRouter();

    return (
        <Button onClick={() => push('/login')} className="bg-green-500 text-white py-2 px-4 flex items-center rounded-md hover:bg-green-600 transition">
            <LogIn className="mr-2 h-4 w-4"/>
            Iniciar sesión
        </Button>
    );
}
