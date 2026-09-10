import { useState, useMemo } from 'react';
import Carousel from './Carousel';

export default function Mural({ messages = [], loading, canDelete, onDelete, onOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [sortOrder, setSortOrder] = useState('recentes');

  // Extrai lista única de categorias presentes nas mensagens
  const categories = useMemo(() => {
    const cats = messages
      .map((m) => m.category)
      .filter((cat) => cat && typeof cat === 'string');
    return ['todas', ...Array.from(new Set(cats))];
  }, [messages]);

  // Aplica busca, filtro de categoria e ordenação por data
  const processedMessages = useMemo(() => {
    return messages
      .filter((m) => {
        const matchesSearch =
          (m.title && m.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (m.content && m.content.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory =
          categoryFilter === 'todas' || m.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
        const dateB = new Date(b.createdAt || b.created_at || 0).getTime();

        return sortOrder === 'recentes' ? dateB - dateA : dateA - dateB;
      });
  }, [messages, searchTerm, categoryFilter, sortOrder]);

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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas' : cat}
                </option>
              ))}
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
            messages={processedMessages}
            canDelete={canDelete}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        )}
      </div>
    </section>
  );
}