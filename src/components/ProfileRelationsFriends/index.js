import { useEffect, useState } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations';


export default function ProfileRelationsFriends (props) {
  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${props.githubUser}/followers`)
    .then((respostaDoServidor) => {
      return respostaDoServidor.json();
    })
    .then((respostaCompleta) => {
      setSeguidores(respostaCompleta);
    }) 
  }, [])

  return (
    <ProfileRelationsBoxWrapper>  
          <h2 className='smallTitle'>
            Amigos ({seguidores.length})
          </h2>
          <ul>
          { seguidores.map((itemAtual, i) => {
            if (i > 5) return null
            return (
              <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.login}`}>
                    <img src={itemAtual.avatar_url} />
                    <span>{itemAtual.login}</span>
                  </a>
                </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}