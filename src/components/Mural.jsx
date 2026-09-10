import { useState } from 'react';
import Carousel from './Carousel';

export default function Mural({ messages, loading, canDelete, onDelete, onOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [sortOrder, setSortOrder] = useState('recentes');

  // Filtra as mensagens pelo termo de busca
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <section id="mural" className="mural">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">✦ PALAVRAS QUE FLORESCEM</div>
          <h2 className="section-title">Mural de mensagens</h2>
          <p className="section-subtitle">
            Para ler com calma, guardar no coração e voltar quando precisar.
          </p>
        </div>

        <div className="mural-controls">
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar uma palavra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-selects">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="todas">Todas</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="recentes">Mais recentes</option>
              <option value="antigas">Mais antigas</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-row">Abrindo o mural...</div>
        ) : (
          <Carousel
            messages={filteredMessages}
            canDelete={canDelete}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        )}
      </div>
    </section>
  );
}