// src/pages/codigos/CodigosMenu.tsx
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';


  const CodigosMenu: React.FC = () => {
    const menuItems = [
      'ESTA É A PÁGINA DO CÓDIGOS',
      'Codigo Civil',
      'Codigo de Defesa do Consumidor',
      'Codigo Penal',
      'Codigo de Processo Civil',
      'Codigo de Processo Penal',
      'Consolidação das Leis do Trabalho',
      'Voltar ao Menu Principal',
    ];
    const links = ['/codigos/codigo-civil/CodigoCivil', '/codigos/codigo-defesa-consumidor/CodigoDefesaConsumidor', '/codigos/codigo-penal/CodigoPenal', '/codigos/codigo-processo-civil/CodigoProcessoCivil', '/codigos/codigo-processo-penal/CodigoProcessoPenal', '/codigos/consolidacao-leis-trabalho/ConsolidacaoLeisTrabalho', '../'];
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
        if (menuItems[newIndex] === 'Codigo Civil' && event.key === ' ') {
          window.location.href = links[0];
        } else if (menuItems[newIndex] === 'Codigo de Defesa do Consumidor' && event.key === ' ') {
          window.location.href = links[1];
        } else if (menuItems[newIndex] === 'Codigo Penal' && event.key === ' ') {
          window.location.href = links[2];
        } else if (menuItems[newIndex] === 'Codigo de Processo Civil' && event.key === ' ') {
          window.location.href = links[3];
        } else if (menuItems[newIndex] === 'Codigo de Processo Penal' && event.key === ' ') {
          window.location.href = links[4];
        } else if (menuItems[newIndex] === 'Consolidação das Leis do Trabalho' && event.key === ' ') {
          window.location.href = links[5];
        } else if (menuItems[newIndex] === 'Voltar ao Menu Principal' && event.key === ' ') {
          window.location.href = links[6];
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
        <li>
          <Link href="../">
            Voltar ao Menu Principal
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CodigosMenu;