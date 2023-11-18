// src/app/MenuLeis.tsx
import Link from 'next/link';
import React from 'react';

const MenuLeis: React.FC = () => {
  return (
    <div>
      <h1>Menu Principal de Leis</h1>
      <ul>
        <li>
          <Link href="/codigos/MenuCodigos">
            Menu de Códigos
          </Link>
        </li>
        <li>
          <Link href="/estatutos/MenuEstatutos">
            Menu de Estatutos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuLeis;
