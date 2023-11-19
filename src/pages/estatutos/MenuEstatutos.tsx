// src/pages/estatutos/EstatutosMenu.tsx
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const EstatutosMenu: React.FC = () => {
  const menuItems = [
    'ESTA É A PÁGINA DOS ESTATUTOS',
    'Estatuto da Criança e do Adolescente',
    'Estatuto do Idoso',
    'Estatuto da OAB',
    'Estatuto da Pessoa com Deficiência',
    'Voltar ao menu principal'
    
  ];
  const links = ['/estatutos/estatuto-crianca-adolescente/EstatutoCriancaAdolescente', '/estatutos/estatuto-idoso/EstatutoIdoso', '/estatutos/estatuto-oab/EstatutoOAB', '/estatutos/estatuto-pessoa-deficiencia/EstatutoPessoaDeficiencia', '../'];
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
      
      if (event.key === 'v' || event.key === 'V') {
        // Voltar uma página no histórico do navegador
        window.location.href = '../'
      }

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
      if (menuItems[newIndex] === 'Estatuto da Criança e do Adolescente' && event.key === ' ') {
        window.location.href = links[0];
      } else if (menuItems[newIndex] === 'Estatuto do Idoso' && event.key === ' ') {
        window.location.href = links[1];
      } else if (menuItems[newIndex] === 'Estatuto da OAB' && event.key === ' ') {
        window.location.href = links[2];
      } else if (menuItems[newIndex] === 'Estatuto da Pessoa com Deficiência' && event.key === ' ') {
        window.location.href = links[3];
      } else if (menuItems[newIndex] === 'Voltar ao menu principal' && event.key === ' ') {
        window.location.href = links[4];
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
        <li>
          <Link href="/.">
            Voltar a Página principal
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EstatutosMenu;
