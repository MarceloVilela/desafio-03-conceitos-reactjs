import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const repo  = { 
      title: `Desafio Conceitos ReactJS ${Date.now()}`, 
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs", 
      techs: ["Node.js", 'ReactJS'] 
    } 

    const response = await api.post('repositories', repo);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(item => item.id !== id));
  }

  //return JSON.stringify(repositories)

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item =>
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
