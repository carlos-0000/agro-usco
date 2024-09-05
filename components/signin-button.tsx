'use client';

import React from "react";
import {LogIn} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const SignInButton: React.FC = () => {
    const {push} = useRouter();

    return (
        <Button onClick={() => push('/login')}>
            <LogIn className="mr-2 h-4 w-4"/>
            Iniciar sesión
        </Button>
    );
}
