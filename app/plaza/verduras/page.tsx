import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Header } from '@/components';
import CategoryContent from '@/components/tabs-content/CategoryContent';

const VerdurasPage = async () => {
    const session = await auth();

    if (!session) {
        redirect('/ingresar');
    }

    return (
        <>
            <Header />
            <CategoryContent selectedCategory={3} />
        </>
    );
};

export default VerdurasPage;