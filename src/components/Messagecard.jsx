import { useState } from 'react';

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

export default function MessageCard({ message, canDelete, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Excluir a mensagem "${message.title}"? Essa ação não pode ser desfeita.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await onDelete(message.id);
    } catch (err) {
      window.alert(err.message || 'Não foi possível excluir a mensagem.');
      setDeleting(false);
    }
    // Se der certo, o card some da lista quando o mural for atualizado —
    // não precisamos resetar "deleting" nesse caso.
  }

  return (
    <article className="msg-card">
      {canDelete && (
        <button
          type="button"
          className="msg-delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Excluir mensagem "${message.title}"`}
          title="Excluir mensagem"
        >
          {deleting ? (
            '...'
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7h10z" />
            </svg>
          )}
        </button>
      )}

      {message.image_url && (
        <div className="msg-image-wrap">
          <img
            className="msg-image"
            src={message.image_url}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.parentElement.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="msg-card-body">
        <h3 className="msg-title">{message.title}</h3>
        <p className="msg-body">{message.content}</p>
        <div className="msg-meta">
          <span className="who">
            De <b>{message.author || 'Anônimo'}</b>
            <br />
            {formatDate(message.created_at)}
          </span>
          {message.spirit && <span className="spirit">{message.spirit}</span>}
        </div>
      </div>
    </article>
  );
}