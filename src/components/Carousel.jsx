import { useState, useEffect } from 'react';
import MessageCard from './MessageCard';

export default function Carousel({ messages, canDelete, onDelete }) {
  const [index, setIndex] = useState(0);

  // Mantém o índice dentro dos limites quando a lista de mensagens muda
  // (ex.: uma nova mensagem publicada).
  useEffect(() => {
    if (index > messages.length - 1) setIndex(0);
  }, [messages, index]);

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        <p>
          Ainda não há mensagens neste mural. Em breve o mantenedor publicará
          a primeira palavra de luz.
        </p>
      </div>
    );
  }

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(messages.length - 1, i + 1));

  return (
    <>
      <div className="carousel">
        <button
          type="button"
          className="carousel-btn prev"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Mensagem anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {messages.map((m) => (
              <div className="carousel-slide" key={m.id}>
                <MessageCard message={m} canDelete={canDelete} onDelete={onDelete} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-btn next"
          onClick={goNext}
          disabled={index === messages.length - 1}
          aria-label="Próxima mensagem"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {messages.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={`carousel-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para mensagem ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}