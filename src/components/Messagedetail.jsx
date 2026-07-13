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
  return (
    <section className="message-detail">
      <div className="wrap">
        <button type="button" className="back-link" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Voltar ao mural
        </button>

        <article className="message-detail-card">
          {message.image_url && (
            <div className="msg-image-wrap detail">
              <img
                className="msg-image"
                src={message.image_url}
                alt=""
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="msg-card-body">
            <h1 className="message-detail-title">{message.title}</h1>
            <div className="msg-meta detail">
              <span className="who">
                De <b>{message.author || 'Anônimo'}</b> · {formatDate(message.created_at)}
              </span>
              {message.spirit && <span className="spirit">{message.spirit}</span>}
            </div>
            <p className="message-detail-body">{message.content}</p>
          </div>
        </article>
      </div>
    </section>
  );
}