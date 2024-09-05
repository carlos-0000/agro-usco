import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Home() {
    // @ts-ignore
    const session = await getServerSession(authOptions)
    const user = session?.user
    console.log(session?.user)
    return (
        <div className='mt-20 text-2xl font-bold m-20'>
           Bienvenido {user?.email}! Ir a {<Link href="/dashboard/settings" className='text-blue-500 underline'>configuraciones</Link>} para registrar una nueva passkey.
        </div>
    )
}
