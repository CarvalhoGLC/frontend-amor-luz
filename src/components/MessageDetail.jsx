function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function MessageDetail({ message, onBack }) {
  const imageUrl = message.imageUrl || message.image_url || message.image;

  return (
    <section className="message-detail">
      <div className="wrap">
        <button type="button" className="back-btn" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Voltar ao mural
        </button>

        <article className="detail-card">
          {imageUrl && (
            <img
              className="detail-image"
              src={imageUrl}
              alt={message.title}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          <div className="detail-body">
            <h1 className="detail-title">{message.title}</h1>
            
            <div className="detail-meta">
              <span>DE {message.author ? message.author.toUpperCase() : 'ANÔNIMO'}</span>
              <span>•</span>
              <span>{formatDate(message.created_at)}</span>
              {message.spirit && (
                <>
                  <span>•</span>
                  <span>{message.spirit}</span>
                </>
              )}
            </div>

            <div className="detail-content">{message.content}</div>
          </div>
        </article>
      </div>
    </section>
  );
}