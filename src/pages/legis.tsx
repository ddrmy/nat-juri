'use client'
import { useGetLegisAll } from '@/api/legis';
import { legisItem } from '@/types/legis';
import { useEffect, useState } from 'react';


const tableHead = ["Titulo", "Descrição", "Ano"]


function Legis() {
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