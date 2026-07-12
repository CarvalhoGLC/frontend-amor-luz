import { useState } from 'react';
import { createMessage } from '../api';

const EMPTY_FORM = { title: '', content: '', author: '', spirit: '' };

export default function PublishForm({ token, onPublished, onLogout }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'ok' | 'err', text }

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    const content = form.content.trim();

    if (!title || !content) {
      setStatus({ type: 'err', text: 'Preencha ao menos o título e a mensagem.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      await createMessage(token, {
        title,
        content,
        author: form.author.trim(),
        spirit: form.spirit.trim(),
      });
      await onPublished();
      setForm(EMPTY_FORM);
      setStatus({
        type: 'ok',
        text: 'Mensagem publicada no mural. Que ela traga conforto a quem a ler.',
      });
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Não foi possível publicar agora.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <div className="form-head publish-header">
        <div>
          <h2>Publicar mensagem</h2>
          <p>
            Como mantenedor, a mensagem que você publicar aqui ficará
            visível a todas as pessoas que visitarem este mural.
          </p>
        </div>
        <button type="button" className="logout-link" onClick={onLogout}>
          Sair
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="f-title">Título</label>
          <input
            id="f-title"
            type="text"
            maxLength={90}
            placeholder="Ex.: A Semeadura do Bem"
            value={form.title}
            onChange={updateField('title')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="f-content">Mensagem</label>
          <textarea
            id="f-content"
            rows={6}
            maxLength={4000}
            placeholder="Escreva aqui a mensagem que deseja compartilhar..."
            value={form.content}
            onChange={updateField('content')}
            required
          />
        </div>

        <div className="row2">
          <div className="field">
            <label htmlFor="f-author">
              Seu nome <span className="hint">(ou "anônimo")</span>
            </label>
            <input
              id="f-author"
              type="text"
              maxLength={60}
              placeholder="Ex.: Maria de Fátima"
              value={form.author}
              onChange={updateField('author')}
            />
          </div>
          <div className="field">
            <label htmlFor="f-spirit">
              Mentor espiritual <span className="hint">(opcional)</span>
            </label>
            <input
              id="f-spirit"
              type="text"
              maxLength={60}
              placeholder="Ex.: Espírito Emmanuel"
              value={form.spirit}
              onChange={updateField('spirit')}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Publicando...' : 'Publicar mensagem'}
        </button>

        {status && (
          <div className={`form-msg ${status.type === 'ok' ? 'ok' : 'err'}`}>
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}