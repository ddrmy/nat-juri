'use client'
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const MenuLeis: React.FC = () => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Verificar se o elemento atualmente focado é uma LI dentro do UL
      if (menuRef.current?.contains(document.activeElement)) {
        if (event.key === 'ArrowLeft') {
          // Lógica para navegar para a esquerda
          console.log('Seta para a esquerda pressionada');
        } else if (event.key === 'ArrowRight') {
          // Lógica para navegar para a direita
          console.log('Seta para a direita pressionada');
        } else if (event.key === 'Enter') {
          // Lógica para lidar com a tecla Enter (por exemplo, navegar para o link)
          const focusedLink = document.activeElement as HTMLAnchorElement;
          if (focusedLink) {
            focusedLink.click(); // Simular um clique no link
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Menu Principal de Leis</h1>
      <ul ref={menuRef}>
        <li>
          <Link href="/codigos/MenuCodigos">Menu de Códigos</Link>
        </li>
        <li>
          <Link href="/estatutos/MenuEstatutos">Menu de Estatutos</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuLeis;
