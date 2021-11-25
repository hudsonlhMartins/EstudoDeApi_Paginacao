import React, { useEffect, useRef, useState } from "react";
import './app.css'
import Seach from "./component/Seaches";
import Pagination from "./component/Pagination";
import qs from 'qs'

function App() {
  const [busca, setBusca] = useState('')
  const [animes, setAnimes] = useState({})
  const [offset, setOffset] = useState(0)
  const LIMIT = 12
  const api = 'https://kitsu.io/api/edge/'

  console.log(busca)
  const getApi = async (url)=>{
    const res = await fetch(url)
    const data = res.ok ? await res.json() : Promise.reject(res.statusText)
    return data
  }

  useEffect(()=>{
    
      const query = {
        page:{
          limit: LIMIT,
          offset: offset
          // isso pq a paginaçã dessa api e assim
          ///anime?page[limit]=5&page[offset]=0
        }
      }
      
      if(busca){
        query.filter = {
          text: busca
          // esse text e a chave dele ali filter[text]
        }
        // isso e o mesmo formada da api esse filter e do filte ali em baixo na api
      }

      let url = `${api}anime?${qs.stringify(query)}}`
      // usamos para ele transforma aquele objeto em uma busca por text 

      setAnimes({})
      getApi(url).then(value => {
        console.log(value.data)
        setAnimes(value)
      })
  
  },[busca, offset])

  return (
    <div>
        <header>Anime</header>
        <div className='container'>
          <div className='buscador'>
            <Seach value={busca} onChange={(seach) =>setBusca(seach)} />
          </div>

          <div>
              {busca && !animes.data &&(
                 <span>Carregando...</span>
              ) }
              {animes.data &&(
                  <ul className='conteudo'>
                    {animes.data.map((item, index)=>{
                      
                      return <li key={item.id} >
                        <img src={item.attributes.posterImage.small} />
                        <h3>{item.attributes.canonicalTitle}</h3>
                      </li>
                    })}
                  </ul>
              )}
            
          </div>
          {animes.meta&&(
            <Pagination limit={LIMIT} total={animes.meta.count} offset={offset} setOffset={setOffset} />
          )}
   
        </div>
    </div>
  );
}

export default App;
