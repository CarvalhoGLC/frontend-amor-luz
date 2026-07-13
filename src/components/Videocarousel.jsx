import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

export default function VideoCarousel({ videos, canDelete, onDelete }) {
  const [index, setIndex] = useState(0);

  // Mantém o índice dentro dos limites quando a lista de vídeos muda
  // (ex.: um novo vídeo adicionado ou removido).
  useEffect(() => {
    if (index > videos.length - 1) setIndex(0);
  }, [videos, index]);

  if (videos.length === 0) {
    return (
      <div className="empty-state">
        <p>Ainda não há vídeos indicados pelo mantenedor.</p>
      </div>
    );
  }

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(videos.length - 1, i + 1));

  return (
    <>
      <div className="carousel">
        <button
          type="button"
          className="carousel-btn prev"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Vídeo anterior"
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
            {videos.map((v) => (
              <div className="carousel-slide" key={v.id}>
                <VideoCard video={v} canDelete={canDelete} onDelete={onDelete} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-btn next"
          onClick={goNext}
          disabled={index === videos.length - 1}
          aria-label="Próximo vídeo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {videos.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className={`carousel-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir para vídeo ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}