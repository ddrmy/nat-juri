// src/pages/estatutos/EstatutosMenu.tsx
import Link from 'next/link';
import React from 'react';

const EstatutosMenu: React.FC = () => {
  return (
    <div>
      <h1>Menu de Estatutos</h1>
      <ul>
        <li>
          <Link href="/estatutos/estatuto-crianca-adolescente/EstatutoCriancaAdolescente">
            Código da Criança e do Adolescente
          </Link>
        </li>
        <li>
          <Link href="/estatutos/estatuto-idoso/EstatutoIdoso">
            Estatuto do Idoso
          </Link>
        </li>
        <li>
          <Link href="/estatutos/estatuto-oab/EstatutoOAB">
            Estatuto da OAB
          </Link>
        </li>
        <li>
          <Link href="/estatutos/estatuto-pessoa-deficiencia/EstatutoPessoaDeficiencia">
            Estatuto da Pessoa com Deficiência
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EstatutosMenu;
