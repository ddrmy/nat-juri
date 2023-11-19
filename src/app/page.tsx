// src/app/MenuLeis.tsx
'use client'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const MenuLeis: React.FC = () => {
  const menuItems = [
    'Seja muito bem-vindo ao aplicativo NATI, JURI. Um sistema adaptado para pessoas portadoras da deficiência visual realizarem consulta de leis e códigos penais da legislação brasileira.',
    'PÁGINA -  MENU PRINCIPAL DE LEIS',
    'Menu de Códigos',
    'Menu de Estatutos',
    'Como usar o sistema?',
  ];
  const links = ['/codigos/MenuCodigos', '/estatutos/MenuEstatutos', '/ajuda/Ajuda'];
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
        // Cancel speaking when any arrow key is pressed during reading
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

      // Read the current item when arrow key is pressed
      await speakText(menuItems[newIndex]);

      // Check for redirection conditions
      if (menuItems[newIndex] === 'Menu de Códigos' && event.key === ' ') {
        window.location.href = links[0];
      } else if (menuItems[newIndex] === 'Menu de Estatutos' && event.key === ' ') {
        window.location.href = links[1];
      } else if (menuItems[newIndex] === 'Como usar o sistema?' && event.key === ' ') {
        window.location.href = links[2];
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
      <h1 className=''>MENU PRINCIPAL DE LEIS</h1>
      <ul>
        <li>
          <Link href={links[0]}>Menu de Códigos</Link>
        </li>
        <li>
          <Link href={links[1]}>Menu de Estatutos</Link>
        </li>
        <li>
          <Link href={links[2]}>Como usar o sistema?</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuLeis;
