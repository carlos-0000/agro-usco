import { NextPage } from "next";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { SignInButton } from "@/components/signin-button";
import { GettingStartButton } from "@/components/getting-start-button";
import CustomHeader from "./header/header";
import Home from "./home/home";
import Footer from "./footer/footer";

const caveat = Caveat({ subsets: ['latin'] })

const HomePage: NextPage = () => {

    return <>
        {/* Header */}
        <CustomHeader />

        <Home />

        {/* <div className={'bg-gradient-to-r from-lime-400 to-lime-500 min-h-dvh p-10'}>
            <div className={'bg-white rounded-3xl'}>
                <div className={'p-5 pl-7 flex justify-between'}>
                    <Link href={'/'} className={'text-xl'}>Mercado Agro</Link>
                    <div>
                        <SignInButton />
                    </div>
                </div>
                <div className={'flex p-10 pb-0 items-center gap-16'}>
                    <div className={'pb-10 max-w-xl'}>
                        <h1 className={'text-7xl font-bold leading-none mb-10 ' + caveat.className}>
                            Compra y vende productos del agro sin complicaciones
                        </h1>
                        <p className={'text-lg'}>
                            MercadoAgro conecta a agricultores y compradores de manera directa, facilitando la compra y
                            venta de
                            productos agroindustriales sin intermediarios.
                        </p>
                        <GettingStartButton />
                    </div>
                    <div className={'flex justify-center w-full'}>
                        <img src="/delivery_men.png"
                            className={'max-w-sm'}
                            alt={'Hombre deliverador con caja de cartón y mujer con bolsa de compras'}
                        />
                    </div>
                </div>
            </div>
        </div> */}

        <Footer />
    </>
}

export default HomePage;
