import { useState } from 'react';

const EXCERPT_LENGTH = 180; // Aumentado levemente para acompanhar a expansão do card

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

  // Mapeia o campo da imagem considerando diferentes nomes do backend
  const imageUrl = message.imageUrl || message.image_url || message.image;

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

      {/* Exibe a foto da mensagem se houver uma URL informada */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={message.title}
          className="msg-card-image"
        />
      )}

      <div className="msg-content-wrapper">
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
      </div>
    </article>
  );
}