import { useState, useMemo } from 'react';
import Carousel from './Carousel';

export default function Mural({ messages = [], loading, canDelete, onDelete, onOpen }) {
  const [sortOrder, setSortOrder] = useState('recentes');

  // Ordena as mensagens por data ("recentes" ou "antigas")
  const processedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
      const dateB = new Date(b.createdAt || b.created_at || 0).getTime();

      return sortOrder === 'recentes' ? dateB - dateA : dateA - dateB;
    });
  }, [messages, sortOrder]);

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

        <div className="mural-controls" style={{ justifyContent: 'flex-end' }}>
          <div className="filter-selects">
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