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

export default function MessageCard({ message }) {
  return (
    <article className="msg-card">
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
    </article>
  );
}