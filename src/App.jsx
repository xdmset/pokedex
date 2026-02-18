import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// --- COMPONENTE: LISTA DE JUEGOS (HOME) ---
const GameList = () => {
  const [versions, setVersions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/version-group?limit=20')
      .then(res => res.json())
      .then(data => setVersions(data.results));
  }, []);

  return (
    <>
      <h1>POKÉDEX </h1>
      <p>SELECCIONA UNA EDICIÓN</p>
      <div className="grid">
        {versions.map(v => (
          <div key={v.name} className="retro-card" onClick={() => navigate(`/game/${v.name}`)}>
           
            <span>{v.name.replace(/-/g, ' ')}</span>
            <small style={{ marginTop: '15px', display: 'block', color: '#666', fontSize: '0.5rem' }}>
              VER POKÉMON
            </small>
          </div>
        ))}
      </div>
    </>
  );
};

// --- COMPONENTE: POKÉMON POR JUEGO ---
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
    <>
      <button className="btn-back" onClick={() => navigate('/')}> {"<"} VOLVER</button>
      <h2>EDICIÓN: {gameName.replace(/-/g, ' ').toUpperCase()}</h2>
      <div className="grid">
        {pokemon.map(p => {
          const id = p.url.split('/')[6];
          return (
            <div key={id} className="retro-card" onClick={() => navigate(`/pokemon/${id}`)}>
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                alt={p.name} 
                style={{ width: '80px' }}
              />
              <p style={{ fontSize: '0.6rem' }}>{p.name.toUpperCase()}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

// --- COMPONENTE: DETALLE DEL POKÉMON ---
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
    <>
      <button className="btn-back" onClick={() => navigate(-1)}> {"<"} VOLVER</button>
      <div className="pokemon-detail-card">
        <h1>{data.name} #0{data.id}</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.5rem' }}>NORMAL</p>
            <img src={data.sprites.front_default} alt="normal" style={{ width: '120px' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.5rem' }}>SHINY</p>
            <img src={data.sprites.front_shiny} alt="shiny" style={{ width: '120px' }} />
          </div>
        </div>

        <div style={{ margin: '20px 0' }}>
          {data.types.map(t => (
            <span key={t.type.name} className="type-badge">{t.type.name}</span>
          ))}
        </div>

        <div className="stats-container">
          <p>ALTURA: {data.height/10} M</p>
          <p>PESO: {data.weight/10} KG</p>
          <p style={{ marginTop: '20px' }}>STATS BASE:</p>
          {data.stats.map(s => (
            <div key={s.stat.name} style={{ margin: '10px 0' }}>
              <span style={{ textTransform: 'uppercase' }}>{s.stat.name}: {s.base_stat}</span>
              <div className="stat-bar-bg">
                <div className="stat-bar-fill" style={{ width: `${Math.min((s.base_stat/255)*100, 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// --- APP PRINCIPAL ---
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