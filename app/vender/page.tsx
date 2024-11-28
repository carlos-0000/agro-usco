import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { VenderPage } from "@/modules";

const Page: NextPage = async () => {
    const session = await auth();

    // if (session) {
    //     redirect('/');
    // }

    return (
        <>
            <VenderPage />
        </>
    );
};

export default Page;
