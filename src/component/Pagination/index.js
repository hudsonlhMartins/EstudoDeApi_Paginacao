import React from "react";

const MAX_ITENS = 9
// maximo de pagina que vamos mostrar, os botões de baixo__
// pq 9 para sempre ter um botão no meio
const MAX_LEFT = (MAX_ITENS - 1) / 2
// maximo de botão na esquerda
// no caso vai ficar 4.. -1 que o do meio

export default function Pagination({limit, total, offset, setOffset}){

    const current = offset ? (offset / limit) +1 : 1
    // pagina atual
    const pages = Math.ceil(total / limit)
    // caso temos 1200 item total / 12 limit , nesse caso teriamos 10 paginas
    const first=  Math.max(current - MAX_LEFT, 1)


    function onPageChange(page){
        setOffset((page -1)* limit)
        // isso para exibir o item certo ex: tem 1200 count 
        // estamos na pagina 45 e quermos ir para 46 vai ficar assim
        // 45 * 12 = 540 vai exbir do item 540 para la
    }

    return(
        <ul className='pagination'>

            <button onClick={()=>{onPageChange(current - 1)}} 
                disabled={current === 1}
            >Anterior</button>

            {Array.from({length: Math.min(MAX_ITENS, pages )}).map((_, index)=> index + first).map((page)=>(
                // esse 2 map ele vai passa por cada item que agr e a quantidade de pages
                
                //  Math.min(MAX_ITENS, pages )}) isso para caso tenha so 3 pagina não exibir 9 e asim 3__
                // ele vai sempre pegar o menor que namario das vezez vai ser 9 
                <li key={page}>
                    <button onClick={()=>{onPageChange(page)}}
                        className={page === current ? 'pagination__item--active' : null}
                    >
                        {page}
                    </button>
                </li>
            ))}

            <button onClick={()=>{onPageChange(current + 1)}} 
                disabled={current === pages}
            >Proximo</button>
        </ul>
    )
}