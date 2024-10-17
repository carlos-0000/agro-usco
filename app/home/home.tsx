'use client'

import Link from 'next/link';
import { Title, Text, Button, Container, MantineProvider, Grid } from '@mantine/core';
import { FaCheckCircle } from "react-icons/fa";
import { Covered_By_Your_Grace } from "next/font/google";
import { GettingStartButton } from '@/components/getting-start-button';

const covered = Covered_By_Your_Grace({
    subsets: ['latin'],
    weight: '400'
});

export default function Home() {
    return (
        <MantineProvider>
            <div className="relative bg-cover bg-center md:h-screen md:bg-[url('/fondo.png')] bg-white">
                <Container className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-24 lg:px-48">
                    {/* Sección de ESCRITORIO */}
                    <div className="hidden md:block">
                        <Text component="h2" className="text-white text-sm mb-2 animate-fadeIn">
                            FRESCURA GARANTIZADA
                        </Text>
                        <Title className={'text-white text-[140px] md:text-[140px] font-bold mb-4 leading-[1.0] animate-fadeIn ' + covered.className}>
                            Del campo <br /> a tu mesa
                        </Title>
                        <Text className="text-white text-lg md:text-xl mb-6 max-w-md animate-fadeIn">
                            Disfruta de frutas y verduras frescas, cultivadas con amor por agricultores locales.
                        </Text>
                        <Link href="/registro">
                            <GettingStartButton />
                        </Link>

                        {/* Imagen del agricultor solo para ESCRITORIO */}
                        <div className="absolute bottom-0 right-0 mb-8 mr-8 hidden md:block">
                            <img 
                                src="/farmer-illustration.png" 
                                alt="Agricultor" 
                                className="w-80 md:w-[50rem] h-auto animate-fadeIn" 
                            />
                        </div>
                    </div>

                    {/* Sección para MÓVIL */}
                    <div className="block md:hidden w-full flex flex-col justify-center items-center bg-white py-4">
                        {/* Imagen del agricultor para móviles (tamaño ajustado) */}
                        <div className="mb-2">
                            <img 
                                src="/mobile.png" 
                                alt="Agricultor móvil" 
                                className="w-64 h-auto animate-fadeIn"  
                            />
                        </div>

                        {/* Texto de móvil */}
                        <Text component="h2" className="text-green-500 text-sm mb-2 animate-fadeIn text-center">
                            DEL CAMPO A TU MESA
                        </Text>
                        <Title className={'text-yellow-500 text-[40px] font-bold mb-4 leading-tight text-center animate-fadeIn ' + covered.className}>
                            ¡Frutas y verduras frescas!
                        </Title>
                        <Text className="text-gray-600 text-md mb-4 max-w-xs text-center animate-fadeIn">
                            Cultivadas con dedicación por agricultores locales y traídas directamente a tu hogar.
                        </Text>

                        {/* Botón */}
                        <Link href="/registro">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700">
                                Registrarme
                            </button>
                        </Link>
                    </div>
                </Container>

                {/* Imagen del agricultor para escritorio */}
                <div className="absolute bottom-0 right-0 mb-8 mr-8 hidden md:block">
                    <img 
                        src="/farmer-illustration.png" 
                        alt="Agricultor" 
                        className="w-80 md:w-[50rem] h-auto animate-fadeIn" 
                    />
                </div>
            </div>



            <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Columna para la imagen */}
                    <div className="flex justify-center">
                        {/* Imagen para móvil */}
                        <img
                            src="mobile2.png" // Esta es la imagen para móvil
                            alt="Agricultura Móvil"
                            className="rounded-full w-100 h-100 md:hidden object-cover animate-fadeIn" // Solo visible en móvil
                        />
                        {/* Imagen para escritorio */}
                        <img
                            src="elements.png" // Esta es la imagen para escritorio
                            alt="Agricultura"
                            className="rounded-full w-100 h-100 hidden md:block object-cover animate-fadeIn" // Solo visible en escritorio
                        />
                    </div>

                    {/* Columna para el texto */}
                    <div>
                        <Text className={'uppercase font-semibold mb-2 text-yellow-500 text-3xl ' + covered.className}>
                            Conócenos
                        </Text>
                        <Text component="h2" className="text-4xl font-bold mb-4">
                            conectamos a los <br /> agricultores colombianos
                        </Text>
                        <Text className="text-lg mb-6 text-gray-500">
                            Nuestro propósito es ofrecer frutas y verduras cultivadas con dedicación, directamente del campo a tu hogar. Creemos en la importancia de apoyar a nuestros agricultores, promoviendo una alimentación saludable y sostenible.
                        </Text>

                        {/* Iconos de características */}
                        <div className="flex justify-center md:justify-start space-x-8 mb-6">
                            {/* Primer ítem: Productos Frescos */}
                            <div className="flex items-center space-x-4">
                                <img src="/icon1.png" alt="Productos Frescos" className="w-10 h-10" />
                                <Text className="font-semibold">Productos <br /> Frescos</Text>
                            </div>

                            {/* Segundo ítem: Alimentación Saludable y Sostenible */}
                            <div className="flex items-center space-x-4">
                                <img src="/icon2.png" alt="Alimentación Saludable y Sostenible" className="w-10 h-10" />
                                <Text className="font-semibold">Alimentación <br /> Saludable y Sostenible</Text>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 justify-center md:justify-start">
                            <FaCheckCircle size={48} className="text-green-500" />
                            <Text className="text-md font-medium">
                                Cada compra que haces no solo garantiza productos frescos, sino que también contribuye al bienestar de las comunidades rurales.
                            </Text>
                        </div>
                        <Link href="/registro">
                            <GettingStartButton />
                        </Link>
                    </div>
                </div>
            </Container>

            <Container className="bg-[#FAF8F5] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Text className={'uppercase font-semibold mb-2 text-yellow-500 text-2xl ' + covered.className}>
                            ¿Tienes alguna pregunta?
                        </Text>
                        <Text component='h2' className="text-4xl font-bold text-gray-900">
                            ¡Estamos aquí para ayudarte!
                        </Text>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Información de contacto */}
                        <div className="space-y-4">
                            <div className="bg-yellow-500 text-white py-6 px-8 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <img src="/phone-icon.png" alt="Teléfono" className="w-6 h-6" />
                                    <div>
                                        <Text className={'font-bold text-2xl ' + covered.className}>
                                            Teléfono
                                        </Text>
                                        <Text>313 725 70 16</Text>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-yellow-500 text-white py-6 px-8 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <img src="/email-icon.png" alt="Correo" className="w-6 h-6" />
                                    <div>
                                        <Text className={'font-bold text-2xl ' + covered.className}>
                                            Correo
                                        </Text>
                                        <Text>
                                            comercial@mercadoagro.com
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de contacto */}
                        <div className="p-8 rounded-md">
                            <form className="space-y-4">
                            <div className="flex space-x-4">
                                <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <input
                                type="email"
                                name="correo"
                                placeholder="Correo electrónico"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <textarea
                                name="mensaje"
                                placeholder="Mensaje"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                            >
                                Enviar mensaje
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </MantineProvider>
    );
};