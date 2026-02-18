import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';


const GameList = () => {
  const [versions, setVersions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/version-group?limit=20')
      .then(res => res.json())
      .then(data => setVersions(data.results));
  }, []);

  return (
    <div className="app-container">
      <h1>POKÉ-WIKI PWA</h1>
      <p>SELECCIONA UNA EDICIÓN</p>
      <div className="grid">
        {versions.map(v => (
          <div key={v.name} className="retro-card" onClick={() => navigate(`/game/${v.name}`)}>
            <img 
              src={`/covers/${v.name}.jpg`} 
              alt={v.name} 
              className="game-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Pokemon'} 
            />
            <span>{v.name.replace('-', ' ')}</span>
            <small style={{marginTop: '10px', display: 'block', color: '#666'}}>VER POKÉMON</small>
          </div>
        ))}
      </div>
    </div>
  );
};


const PokemonByGame = () => {
  const { gameName } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    fetch(`https://pokeapi.co/api/v2/version-group/${gameName}`)
      .then(res => res.json())
      .then(data => fetch(data.generation.url))
      .then(res => res.json())
      .then(data => setPokemon(data.pokemon_species));
  }, [gameName]);

  return (
    <div>
      <button className="btn-back" onClick={() => navigate('/')}> {"<"} VOLVER</button>
      <h2>EDICIÓN: {gameName.toUpperCase()}</h2>
      <div className="grid">
        {pokemon.map(p => {
          const id = p.url.split('/')[6];
          return (
            <div key={id} className="retro-card" onClick={() => navigate(`/pokemon/${id}`)}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={p.name} />
              <p>{p.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const PokemonDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>CARGANDO DATOS...</p>;

  return (
    <div>
      <button className="btn-back" onClick={() => navigate(-1)}> {"<"} VOLVER</button>
      <div className="pokemon-detail-card">
        <h1 style={{textTransform: 'uppercase'}}>{data.name} #0{data.id}</h1>
        
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <div>
            <p style={{fontSize: '0.5rem'}}>NORMAL</p>
            <img src={data.sprites.front_default} alt="normal" style={{width: '120px'}} />
          </div>
          <div>
            <p style={{fontSize: '0.5rem'}}>SHINY</p>
            <img src={data.sprites.front_shiny} alt="shiny" style={{width: '120px'}} />
          </div>
        </div>

        <div style={{margin: '20px 0'}}>
          {data.types.map(t => (
            <span key={t.type.name} className="type-badge">{t.type.name}</span>
          ))}
        </div>

        <div style={{textAlign: 'left', fontSize: '0.6rem'}}>
          <p>ALTURA: {data.height/10} M</p>
          <p>PESO: {data.weight/10} KG</p>
          <p>STATS BASE:</p>
          {data.stats.map(s => (
            <div key={s.stat.name} style={{margin: '5px 0'}}>
              {s.stat.name}: {s.base_stat}
              <div style={{background: '#ccc', height: '10px', width: '100%'}}>
                <div style={{background: 'red', height: '10px', width: `${(s.base_stat/255)*100}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:gameName" element={<PokemonByGame />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;