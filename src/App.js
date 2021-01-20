import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [txtTitle, setTxtTitle] = useState("");
  const [txtTechs, setTxtTechs] = useState("");

  useEffect(() => {
    (async function () {
      const { data } = await api.get("repositories");
      setRepositories([...data]);
    })();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const newRepo = await api.post("repositories", {
      title: txtTitle,
      url: "https://github.com/alzo91/gostack-template-conceitos-nodejs",
      techs: txtTechs.split(","),
    });

    console.log(newRepo);
    setRepositories([...repositories, { ...newRepo.data }]);
    setTxtTechs("");
    setTxtTitle("");
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log("handleRemoveRepository", id);
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <>
      <form onSubmit={(e) => handleAddRepository(e)}>
        <div className="form">
          <label htmlFor="txtRepositoryName">Nome do Repositório</label>
          <input
            id="txtRepositoryName"
            type="text"
            placeholder="Nome do Repositório"
            value={txtTitle}
            onChange={(e) => setTxtTitle(e.target.value)}
          />
          <label htmlFor="txtRepositoryTechs">Tecnologias:</label>
          <input
            id="txtRepositoryTechs"
            type="text"
            placeholder="Tecnologias separado por virgula"
            value={txtTechs}
            onChange={(e) => setTxtTechs(e.target.value)}
          />
          <button className="add" type="submit">
            Adicionar
          </button>
        </div>
      </form>
      <div className="list">
        <ul data-testid="repository-list">
          {repositories.map((repository) => (
            <li key={repository.id}>
              <p>{repository.title}</p>
              <span>{repository.techs.join(", ")}</span>
              <button
                className="remove"
                onClick={() => handleRemoveRepository(repository.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
