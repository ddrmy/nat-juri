// src/pages/MenuLeis.tsx
import Link from 'next/link';
import React from 'react';

const MenuLeis: React.FC = () => {
  return (
    <div>
      <h1>Menu Principal de Leis</h1>
      <ul>
        <li>
          <Link href="/codigos/CodigosMenu">
            <a>Menu de Códigos</a>
          </Link>
        </li>
        <li>
          <Link href="/estatutos/EstatutosMenu">
            <a>Menu de Estatutos</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuLeis;
