import React, { useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

const ProfileSidebar = (props) => {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'felipessac';
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

  const [comunidades, setComunidades] = useState([{
    title: 'Eu odeio acordar cedo', 
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);  

  const handleCriaComunidade = (e) => {
    e.preventDefault();

    const dadosForm = new FormData(e.target);

    const comunidade = {
      title: dadosForm.get('title'),
      image: dadosForm.get('image'),
    }

    setComunidades([...comunidades, comunidade]);
    console.log(comunidades);

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
        <ProfileRelationsBoxWrapper>  
          <h2 className='smallTitle'>
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
          {pessoasFavoritas.map((itemAtual, i) => {
            if(i > 5){
              return null
            }
            return (
              <li key={i}>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
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
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image || `https://picsum.photos/id/${i * 36}/200/300`} />
                    <span>{itemAtual.title}</span>
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