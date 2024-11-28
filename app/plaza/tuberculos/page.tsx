import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Header } from '@/components';
import CategoryContent from '@/components/tabs-content/CategoryContent';

const TuberculosPage = async () => {
    const session = await auth();

    if (!session) {
        redirect('/ingresar');
    }

    return (
        <>
            <Header />
            <CategoryContent selectedCategory={4} />
        </>
    );
};

export default TuberculosPage;
