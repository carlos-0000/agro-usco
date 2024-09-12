'use client';

import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const GettingStartButton: React.FC = () => {
    const {push} = useRouter();

    return (
        <Button onClick={() => push('/login')} className={'mt-5'}>
            Vamos a empezar! (DEV)
        </Button>
    );
}
