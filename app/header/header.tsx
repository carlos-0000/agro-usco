'use client';

import { SignInButton } from '@/components/signin-button';
import { MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const CustomHeader = () => {
  // Estado para manejar la visibilidad del menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <MantineProvider>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6 max-w-7xl">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600 flex items-center space-x-2">
            <img src="/header.png" alt="Mercado Agro" className="h-24 md:h-auto" />
          </Link>

          {/* Icono de hamburguesa para móvil */}
          <div className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                <a href="mailto:comercial@mercadoagro.com" className="text-black font-bold hover:text-green-500">
                  comercial@mercadoagro.com
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
              <a href="https://wa.me/3137257016" className="text-black text-xl hover:text-green-600">
                <FaWhatsapp />
              </a>
            </div>

            {/* Información de contacto en el menú móvil */}
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaPhoneAlt className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">Contáctanos: 
                  <a href="tel:3137257016" className="text-black font-bold hover:text-green-500">
                    313 725 70 16
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">Escríbenos: 
                  <a href="mailto:comercial@mercadoagro.com" className="text-black font-bold hover:text-green-500">
                    comercial@mercadoagro.com
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
    </MantineProvider>
  );
};

export default CustomHeader;
