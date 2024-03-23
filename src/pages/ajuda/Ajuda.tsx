/* eslint-disable react-hooks/exhaustive-deps */
// src/app/MenuLeis.tsx
'use client';

// src/app/MenuLeis.tsx

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const Ajuda: React.FC = () => {
  const menuItems = [
    'Seja muito bem vindo ao menu de ajuda. Nessa página, será ensinado como utilizar o sistema. Para começar, por gentileza avance com as setas do teclado.',
    '1 - Para voltar uma página anterior a qualquer momento, basta pressionar a tecla, V. apenas uma vez.',
    '2 - Para navegar entre os menus de leis, utilize as setas esquerda e direita, ao encontrar  o menu desejado, pressione a barra de espaço.',
    '3 - Ao acessar uma lei, recomenda-se aguardar cerca de 5 segundos para que o sistema leia o conteúdo da página. Caso não ouça nada nesse meio tempo, tecle uma das setas para ver se ocorre a leitura. Caso não ouça nada ainda, pressione a tecla F5.',
    '4 - Durante a leitura de uma lei, aperte a barra de espaço para parar ou continuar a leitura.',
    '5 - Para navegar entre os artigos, é necessário deixar o áudio correndo, em seguida pressionar a tecla ENTER, digitar o número do artigo, e apertar Enter novamente. Observação: caso você efetue a troca de artigo com o áudio pausado, ele vai executar a consulta normalmente, porém, será necessário usar as setas para que ele possa realizar a leitura do artigo selecionado, caso pressionado a tecla esquerda, ele realizará a leitura do artigo anterior ao selecionado, e caso presionado a tecla direita, ele realizará a leitura do artigo posterior ao selecionado.',
    '6 e último tópico - Para qualquer dúvida, entre em contato com o desenvolvedor do sistema, através do e-mail: gabriel_rti@hotmail.com.br ou através da coordenadora de sistemas, Maria Ludovina Bina Quintans',
    'Obrigado por utilizar o sistema. Desenvolvido pelo aluno Gabriel Fernandes Roberti, para sua colega Natalia. Bons estudos!',
    'Tecle espaço para voltar ao menu principal.'

  ];
  const links = ['/.'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const speakText = async (text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);

    return new Promise<void>((resolve) => {
      utterance.onend = () => {
        setSpeaking(false);
        resolve();
      };
    });
  };

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (speaking) {
        // Cancela a leitura caso esteja ocorrendo a mesma
        window.speechSynthesis.cancel();
        setSpeaking(false);
      }

      let newIndex = selectedIndex;

      if (event.key === 'ArrowLeft') {
        newIndex = selectedIndex === 0 ? menuItems.length - 1 : selectedIndex - 1;
      } else if (event.key === 'ArrowRight') {
        newIndex = selectedIndex === menuItems.length - 1 ? 0 : selectedIndex + 1;
      }

      console.log(`Selected Index: ${newIndex}`);
      console.log(`Reading Text: ${menuItems[newIndex]}`);

      setSelectedIndex(newIndex);

      // Le o item atual quando a tecla é pressionada
      await speakText(menuItems[newIndex]);

      // Verifica a redireção para a página de códigos ou estatutos
      if (menuItems[newIndex] === 'Tecle espaço para voltar ao menu principal.' && event.key === ' ') {
        window.location.href = links[0];
      } 
    },
    [speaking, menuItems, links, selectedIndex]
  );

  useEffect(() => {
    // Inicia a leitura do texto inicial quando a página é carregada
    (async () => {
      await speakText(menuItems[selectedIndex]);
    })();
  }, [selectedIndex]);

  useEffect(() => {
    // Attach event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Detach event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, selectedIndex]);

  useEffect(() => {
    // Reset speaking state when selectedIndex changes
    setSpeaking(false);
  }, [selectedIndex]);

  return (
    <div>
      <ul>
        <li>
          <Link href={links[0]}>Menu Principal</Link>
        </li>
        <li>
          Seja muito bem vindo ao menu de ajuda. Nessa página, será ensinado como utilizar o sistema. Para começar, por gentileza avance com as setas do teclado.
        </li>
        <li>
          1 - Para voltar uma página anterior a qualquer momento, basta pressionar a tecla, V. apenas uma vez.
        </li>
        <li>
          2 - Para navegar entre os menus de leis, utilize as setas esquerda e direita, ao encontrar  o menu desejado, pressione a barra de espaço.
        </li>
        <li>
          3 - Ao acessar uma lei, recomenda-se aguardar cerca de 5 segundos para que o sistema leia o conteúdo da página. Caso não ouça nada nesse meio tempo, tecle uma das setas para ver se ocorre a leitura. Caso não ouça nada ainda, pressione a tecla F5.
        </li>
        <li>
          4 - Para voltar uma página anterior a qualquer momento, basta pressionar a tecla ESC.
        </li>
        <li>
          5 - Durante a leitura de uma lei, aperte a barra de espaço para parar ou continuar a leitura.
        </li>
        <li>
          6 - Para navegar entre os artigos, é necessário deixar o áudio correndo, em seguida pressionar a tecla ENTER, digitar o número do artigo, e apertar Enter novamente. Observação: caso você efetue a troca de artigo com o áudio pausado, ele vai executar a consulta normalmente, porém, será necessário usar as setas para que ele possa realizar a leitura do artigo selecionado, caso pressionado a tecla esquerda, ele realizará a leitura do artigo anterior ao selecionado, e caso presionado a tecla direita, ele realizará a leitura do artigo posterior ao selecionado.
        </li>
        <li>
          7 e último tópico - Para qualquer dúvida, entre em contato com o desenvolvedor do sistema, através do e-mail: gabriel_rti@hotmail.com.br ou através da coordenadora de sistemas, Maria Ludovina Bina Quintans
        </li>
        <li>
          Obrigado por utilizar o sistema. Desenvolvido pelo aluno Gabriel Fernandes Roberti, para sua colega Natalia. Bons estudos!
        </li>
        <li>
          <Link href="../">
          Voltar a página inicial
          </Link>
        </li>
      </ul>
    </div>
  );
};


export default Ajuda;
