'use client'
import { useGetLegisAll } from '@/api/legis';
import { legisItem } from '@/types/legis';
import { executePythonScript } from '@/utils/axios'; // Certifique-se de importar corretamente o caminho para o seu arquivo axios
import { useEffect, useState } from 'react';


const tableHead = ["Titulo", "Descrição", "Ano"]


function Legis() {

  const handleExecutePythonScript = async () => {
    try {
      await executePythonScript();
      // Adicione qualquer lógica adicional após a execução do script Python, se necessário
    } catch (error) {
      console.error('Erro ao executar o script Python:', error);
    }
  };

  const [legisData, setLegisData] = useState<legisItem[]>([]);
  const {legis} = useGetLegisAll();

  useEffect(() => {

    if(legis.length){
      setLegisData(legis);
    }
  }
  ,
  [legis]
  )
  return (

    <div>
      <h1>Legislação:</h1>
      <button onClick={handleExecutePythonScript}>Executar Script Python</button>
      <table>
        <thead>
          <tr>{tableHead.map((head) => (
            <th key={head}>{head}</th>
          ))}
          </tr>
        </thead>
      </table>
      <ul>
      </ul>
      <ul>
        {legisData.map((legis) => (
          <li key={legis._id}>{legis.titulo}</li>
          
        ))}
      </ul>
    </div>
  );
}

export default Legis;