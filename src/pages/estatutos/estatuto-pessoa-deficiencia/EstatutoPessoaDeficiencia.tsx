// src/pages/codigos/codigo-civil/codigo-civil.tsx
'use client';
import { useGetLegisAll } from '@/api/legis';
import { legisItem } from '@/types/legis';
import { executePythonCodigo, executePythonScript } from '@/utils/axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const EstatutoPessoaDeficiencia: React.FC = () => {
  const [legisData, setLegisData] = useState<legisItem[]>([]);
  const { legis } = useGetLegisAll();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<string[]>([]);
  const currentTextIndexRef = useRef(0);
  const speedRef = useRef(1);
  const speakingRef = useRef(false);
  const pausedRef = useRef(false);
  const articleNumberRef = useRef<string | null>(null);

  const readText = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = speedRef.current;
    speakingRef.current = true;

    utterance.onend = () => {
      speakingRef.current = false;
      if (currentTextIndexRef.current < textsRef.current.length - 1 && !pausedRef.current) {
        currentTextIndexRef.current++;
        readText(textsRef.current[currentTextIndexRef.current]);
      } else if (articleNumberRef.current) {
        // Se houver um número de artigo pendente, inicie a leitura
        readText(textsRef.current[currentTextIndexRef.current]);
        articleNumberRef.current = null;
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [currentTextIndexRef, textsRef, speedRef, pausedRef]);

  const scrollToArticle = useCallback(() => {
    const articleNumber = prompt('Digite o número do artigo:');
    if (articleNumber) {
      // Removendo possíveis espaços em branco do input
      const cleanedArticleNumber = articleNumber.replace(/\s/g, '');

      // Construindo o regex para aceitar "Art. 2.002" e "2.002" com prefixo "Art."
      const regex = new RegExp(`(?:^|\\s|Art\\.\\s*)${cleanedArticleNumber.replace('.', '\\.?')}\\b`, 'i');

      // Procurando na variável de texto
      const foundIndex = textsRef.current.findIndex((text) => regex.test(text));
      if (foundIndex !== -1) {
        // Buscar o próximo índice que corresponde ao artigo desejado
        const nextIndex = textsRef.current.findIndex((text, index) => index > foundIndex && /^Art\.\s*\d+(\.\d+)?$/.test(text));
        
        currentTextIndexRef.current = nextIndex !== -1 ? nextIndex : foundIndex;

        if (!speakingRef.current) {
          readText(textsRef.current[currentTextIndexRef.current]);
        } else {
          window.speechSynthesis.cancel(); // Cancela a leitura atual
          readText(textsRef.current[currentTextIndexRef.current]);
        }
      }
    }
  }, [readText, textsRef, speakingRef]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' && currentTextIndexRef.current < textsRef.current.length - 1) {
      window.speechSynthesis.cancel();
      currentTextIndexRef.current++;
      readText(textsRef.current[currentTextIndexRef.current]);
    } else if (event.key === 'ArrowLeft' && currentTextIndexRef.current > 0) {
      window.speechSynthesis.cancel();
      currentTextIndexRef.current--;
      readText(textsRef.current[currentTextIndexRef.current]);
    } else if (event.key === ' ') {
      event.preventDefault();
      if (speakingRef.current) {
        window.speechSynthesis.pause();
        pausedRef.current = true;
        speakingRef.current = false;
      } else {
        window.speechSynthesis.resume();
        pausedRef.current = false;
        speakingRef.current = true;
        readText(textsRef.current[currentTextIndexRef.current]);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      scrollToArticle();
    } else if (/^\d$/.test(event.key) && speakingRef.current) {
      window.speechSynthesis.resume();
      pausedRef.current = false;
      speakingRef.current = true;
      readText(textsRef.current[currentTextIndexRef.current]);
    }
  }, [readText, scrollToArticle, currentTextIndexRef, textsRef, speakingRef]);

  useEffect(() => {
    if (legis && legis.length > 0) {
      const specificLegis = legis.find((item) => item.titulo === 'Teste de request');
      setLegisData(specificLegis ? [specificLegis] : []);
    }
  }, [legis]);

  useEffect(() => {
    if (legisData.length > 0) {
      const descriptionHtml = legisData[0].descricao || '';
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = descriptionHtml;

      const textArray: string[] = [];
      tempDiv.querySelectorAll('p').forEach((paragraph) => {
        const text = paragraph.textContent?.trim();
        if (text) {
          textArray.push(text);
        }
      });

      textsRef.current = textArray;
    }
  }, [legisData]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleExecutePythonScript = async () => {
    try {
      await executePythonScript();
      setLegisData(legis);
    } catch (error) {
      console.error('Erro ao executar o script Python:', error);
    }
  };

  const handleExecutePythonCodigo = async () => {
    try {
      await executePythonCodigo();
      setLegisData(legis);
    } catch (error) {
      console.error('Erro ao executar o script Python:', error);
    }
  };

  if (!legisData.length) {
    return <p>Nenhuma legislação encontrada. deu certo</p>;
  }

  return (
    <div ref={textContainerRef}>
      <h1>Legislação:</h1>
      <button onClick={handleExecutePythonScript}>Executar Script Python</button>
      <button onClick={handleExecutePythonCodigo}>Executar Script Codigo</button>
      <div dangerouslySetInnerHTML={{ __html: legisData[0].descricao }} />
    </div>
  );
};

export default EstatutoPessoaDeficiencia;
