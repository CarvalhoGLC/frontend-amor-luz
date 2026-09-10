import { useState } from 'react';

const EXCERPT_LENGTH = 140;

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).toUpperCase();
  } catch {
    return '';
  }
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

export default function MessageCard({ message, canDelete, onDelete, onOpen }) {
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
  }

  return (
    <article className="msg-card-clean">
      {canDelete && (
        <button
          type="button"
          className="msg-delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Excluir mensagem "${message.title}"`}
        >
          ✕
        </button>
      )}

      <div className="msg-date">{formatDate(message.created_at)}</div>
      <h3 className="msg-clean-title">{message.title}</h3>
      <p className="msg-clean-excerpt">
        “{truncate(message.content, EXCERPT_LENGTH)}”
      </p>

      <button type="button" className="msg-link-action" onClick={() => onOpen(message)}>
        Ler mensagem completa ➔
      </button>

      <div className="msg-clean-footer">
        DE {message.author ? message.author.toUpperCase() : 'VISITANTE DO MURAL'}
      </div>
    </article>
  );
}