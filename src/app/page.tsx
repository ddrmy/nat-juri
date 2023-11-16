// src/pages/legis.tsx
'use client'
import { useGetLegisAll } from '@/api/legis';
import { legisItem } from '@/types/legis';
import { executePythonCodigo, executePythonScript } from '@/utils/axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Legis: React.FC = () => {
  const [legisData, setLegisData] = useState<legisItem[]>([]);
  const { legis } = useGetLegisAll();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<string[]>([]);
  const currentTextIndexRef = useRef(0);
  const speedRef = useRef(1);
  const speakingRef = useRef(false);

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

  const readText = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = speedRef.current;
    speakingRef.current = true;

    utterance.onend = () => {
      speakingRef.current = false;
      if (currentTextIndexRef.current < textsRef.current.length - 1) {
        currentTextIndexRef.current++;
        readText(textsRef.current[currentTextIndexRef.current]);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          speakingRef.current = false;
        } else {
          window.speechSynthesis.resume();
          speakingRef.current = true;
          readText(textsRef.current[currentTextIndexRef.current]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [readText]);

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
    return <p>Nenhuma legislação encontrada.</p>;
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

export default Legis;
