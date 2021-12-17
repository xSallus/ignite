import { Repositories } from '@types';
import { RepoCard } from './components/RepoCard';
import { useState, useEffect } from 'react';
import './styles/globals.scss';

const uri = 'https://api.github.com/users/xSallus/repos';
function Home() {
  const [repositories, setRepositories] = useState<Repositories>([]);

  useEffect(()=>{
    fetch(uri)
      .then(res=>res.json())
      .then(res=>{
        let tempRepos:Repositories = []
        res.map((ponse:any)=>{
          !ponse.private && tempRepos.push({
            id: ponse.id,
            name: ponse.name,
            description: ponse.description,
            url: ponse.html_url
          });
        })
        setRepositories(tempRepos);
        console.log(tempRepos);
      })
  }, []);

  return (
    <div className="container">
      <ul className="wrapper">
        {
          repositories.map(repository => <RepoCard key={repository.id} repository={repository} />)
        }
      </ul>
    </div>
  )
}

export { Home };
