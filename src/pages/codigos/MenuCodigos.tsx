// src/pages/codigos/CodigosMenu.tsx
import Link from 'next/link';
import React from 'react';

const CodigosMenu: React.FC = () => {
  return (
    <div>
      <h1>Menu de Códigos</h1>
      <ul>
        <li>
          <Link href="/codigos/codigo-civil/CodigoCivil">
            Código Civil
          </Link>
        </li>
        <li>
          <Link href="/codigos/codigo-defesa-consumidor/CodigoDefesaConsumidor">
            Código de Defesa do Consumidor
          </Link>
        </li>
        <li>
          <Link href="/codigos/codigo-penal/CodigoPenal">
            Código Penal
          </Link>
        </li>
        <li>
          <Link href="/codigos/codigo-processo-civil/CodigoProcessoCivil">
            Código de Processo Civil
          </Link>
        </li>
        <li>
          <Link href="/codigos/codigo-processo-penal/CodigoProcessoPenal">
            Código de Processo Penal
          </Link>
        </li>
        <li>
          <Link href="/codigos/consolidacao-leis-trabalho/ConsolidacaoLeisTrabalho">
            Consolidação das Leis do Trabalho
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CodigosMenu;