'use client';

import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const GettingStartButton: React.FC = () => {
    const {push} = useRouter();

    return (
        <Button onClick={() => push('/login')} className={'mt-5 bg-green-500 text-white py-2 px-4 flex items-center rounded-md hover:bg-green-600 transition'}>
            Registrarme
        </Button>
    );
}
