import React, { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelationsFriends from '../src/components/ProfileRelationsFriends';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

export default function Home() {
  const githubUser = 'felipessac';

  const [comunidades, setComunidades] = useState([]);  

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: { 
        'Authorization' : '74e58f8106249c219633c1927e087c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',        
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          name
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then(async(response) => await response.json())
    .then((response) => {
      const comunidadesDato = response.data.allCommunities
      setComunidades(comunidadesDato)
    });
  }, [])

  const handleCriaComunidade = (e) => {
    e.preventDefault();

    const dadosForm = new FormData(e.target);

    const comunidade = {
      name: dadosForm.get('title'),
      imageUrl: dadosForm.get('image'),
      creatorSlug: githubUser,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (response) => {
      const dados = await response.json();
      const novacomunidade = dados.record;
      setComunidades([...comunidades, novacomunidade]);
    })
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />
        </Box>
        
        <Box>
          <h2 className="subTitle" >O que você deseja fazer?</h2>
          <form onSubmit={handleCriaComunidade} >
            <div>
              <input 
                type="text" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?" 
                placeholder="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input 
                type="text" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa." 
                placeholder="Coloque uma URL para usarmos de capa."
              />
            </div>
            <button>
              Criar comunidade.
            </button>
          </form>
        </Box>
      </div>
      <div className="relationsArea" style={{gridArea: 'relationsArea'}}> 
        <ProfileRelationsFriends />
        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Comunidades ({comunidades.length})
            </h2>
            <ul>
            {comunidades.map((itemAtual, i) => {
              if(i > 5){
                return null
            }
              return (
                <li key={i}>
                  <a href={`/comunity/${itemAtual.name}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.name}</span>
                  </a>
                </li>
              )
            })}
            </ul>  
        </ProfileRelationsBoxWrapper> 
      </div>
      </MainGrid>
    </>
  )
}