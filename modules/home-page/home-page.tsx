'use client';

import React from 'react';
import { Covered_By_Your_Grace } from 'next/font/google';
import Link from 'next/link';
import {
  FaBars,
  FaCheckCircle,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { Container, Text, Title } from '@mantine/core';
import { GettingStartButton, SignInButton, RegisterButton } from '@/components/home';

const covered = Covered_By_Your_Grace({
  subsets: ['latin'],
  weight: '400',
});

export const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6 max-w-7xl">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600 flex items-center space-x-2">
            <img src="/Header.png" alt="Mercado Agro" className="h-24 md:h-auto" />
          </Link>

          {/* Icono de hamburguesa para móvil */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars className="text-2xl text-green-600" />
          </div>

          {/* Menú de iconos (escritorio) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://facebook.com" className="text-black text-xl hover:text-green-600">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" className="text-black text-xl hover:text-green-600">
              <FaInstagram />
            </a>
            <a href="https://wa.me/3137257016" className="text-black text-xl hover:text-green-600">
              <FaWhatsapp />
            </a>
          </div>

          {/* Contacto (escritorio) */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Contáctanos</p>
                <a href="tel:3137257016" className="text-black font-bold hover:text-green-500">
                  313 725 70 16
                </a>
              </div>
            </div>

            <div className="h-12 border-l border-gray-300"></div>

            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Escríbenos</p>
                <a
                  href="mailto:comercial@mercadoagro.com.co"
                  className="text-black font-bold hover:text-green-500"
                >
                  comercial@mercadoagro.com.co
                </a>
              </div>
            </div>
          </div>

          {/* Botón de inicio de sesión (escritorio) */}
          <div className="hidden md:block">
            <SignInButton />
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4 bg-white shadow-md rounded-lg py-4">
            {/* Enlaces de redes sociales en el menú móvil */}
            <div className="flex space-x-6 mb-4">
              <a href="https://facebook.com" className="text-black text-xl hover:text-green-600">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" className="text-black text-xl hover:text-green-600">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/3137257016"
                className="text-black text-xl hover:text-green-600"
              >
                <FaWhatsapp />
              </a>
            </div>

            {/* Información de contacto en el menú móvil */}
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaPhoneAlt className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">
                  Contáctanos:
                  <a href="tel:3137257016" className="text-black font-bold hover:text-green-500">
                    313 725 70 16
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">
                  Escríbenos:
                  <a
                    href="mailto:comercial@mercadoagro.com.co"
                    className="text-black font-bold hover:text-green-500"
                  >
                    comercial@mercadoagro.com.co
                  </a>
                </p>
              </div>
            </div>

            {/* Botón de iniciar sesión (móvil) */}
            <div className="mt-4">
              <SignInButton />
            </div>
          </div>
        )}
      </header>

      <div className="relative bg-cover bg-center md:h-screen md:bg-[url('/fondo.png')] bg-white">
        <Container className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-24 lg:px-48">
          {/* Sección de ESCRITORIO */}
          <div className="hidden md:block" style={{ marginLeft: '-200px' }}>
            <Text component="h2" className="text-white text-sm mb-2 animate-fadeIn">
              FRESCURA GARANTIZADA
            </Text>
            <Title
              className={`text-white text-[140px] md:text-[140px] font-bold mb-4 leading-[1.0] animate-fadeIn ${covered.className}`}
            >
              Del campo <br /> a tu mesa
            </Title>
            <Text className="text-white text-lg md:text-xl mb-6 max-w-md animate-fadeIn">
              Disfruta de frutas y verduras frescas, cultivadas con amor por agricultores locales.
            </Text>
            <RegisterButton />

            {/* Imagen del agricultor solo para ESCRITORIO */}
            <div className="absolute bottom-0 right-0 mb-8 mr-8 hidden md:block" style={{ marginRight: '-20rem' }}>
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
            <Title
              className={`text-yellow-500 text-[40px] font-bold mb-4 leading-tight text-center animate-fadeIn ${covered.className}`}
            >
              ¡Frutas y verduras frescas!
            </Title>
            <Text className="text-gray-600 text-md mb-4 max-w-xs text-center animate-fadeIn">
              Cultivadas con dedicación por agricultores locales y traídas directamente a tu hogar.
            </Text>

            {/* Botón */}
            <RegisterButton />
          </div>
        </Container>
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
            <Text
              className={`uppercase font-semibold mb-2 text-yellow-500 text-3xl ${covered.className}`}
            >
              Conócenos
            </Text>
            <Text component="h2" className="text-4xl font-bold mb-4">
              conectamos a los <br /> agricultores colombianos
            </Text>
            <Text className="text-lg mb-6 text-gray-500">
              Nuestro propósito es ofrecer frutas y verduras cultivadas con dedicación, directamente
              del campo a tu hogar. Creemos en la importancia de apoyar a nuestros agricultores,
              promoviendo una alimentación saludable y sostenible.
            </Text>

            {/* Iconos de características */}
            <div className="flex justify-center md:justify-start space-x-8 mb-6">
              {/* Primer ítem: Productos Frescos */}
              <div className="flex items-center space-x-4">
                <img src="/icon1.png" alt="Productos Frescos" className="w-10 h-10" />
                <Text className="font-semibold">
                  Productos <br /> Frescos
                </Text>
              </div>

              {/* Segundo ítem: Alimentación Saludable y Sostenible */}
              <div className="flex items-center space-x-4">
                <img
                  src="/icon2.png"
                  alt="Alimentación Saludable y Sostenible"
                  className="w-10 h-10"
                />
                <Text className="font-semibold">
                  Alimentación <br /> Saludable y Sostenible
                </Text>
              </div>
            </div>

            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <FaCheckCircle size={48} className="text-green-500" />
              <Text className="text-md font-medium">
                Cada compra que haces no solo garantiza productos frescos, sino que también
                contribuye al bienestar de las comunidades rurales.
              </Text>
            </div>
            <RegisterButton />
          </div>
        </div>
      </Container>

      <div className="w-full bg-[#FAF8F5] py-16">
        <Container>
          <div className="text-center mb-12">
            <Text
              className={`uppercase font-semibold mb-2 text-yellow-500 text-2xl ${covered.className}`}
            >
              ¿Tienes alguna pregunta?
            </Text>
            <Text component="h2" className="text-4xl font-bold text-gray-900">
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
                    <Text className={`font-bold text-2xl ${covered.className}`}>Teléfono</Text>
                    <a href="tel:+573137257016">
                    <Text>313 725 70 16</Text>
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500 text-white py-6 px-8 rounded-md">
                <div className="flex items-center space-x-4">
                  <img src="/email-icon.png" alt="Correo" className="w-6 h-6" />
                  <div>
                    <Text className={`font-bold text-2xl ${covered.className}`}>Correo</Text>
                    <a href="mailto:comercial@mercadoagro.com.co">
                    <Text>comercial@mercadoagro.com.co</Text>
                    </a>
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
        </Container>
      </div>

      <footer className="bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className="text-2xl font-bold text-green-600 flex items-center space-x-2"
              >
                <img src="/Header.png" alt="Mercado Agro" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Menú</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://mercadoagro.com.co/" className="hover:underline">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="https://mercadoagro.com.co/ingresar" className="hover:underline">
                      Iniciar sesión
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">
                      Políticas de privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terminos y condiciones
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Contáctanos</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="tel:3137257016" className="hover:underline">
                      Teléfono: 313 725 7016
                    </a>
                  </li>
                  <li>
                    <a href="mailto:comercial@mercadoagro.com.co" className="hover:underline">
                      Correo electrónico: comercial@mercadoagro.com.co
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{' '}
              <a href="" className="hover:underline">
                MercadoAgro
              </a>
              . Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
