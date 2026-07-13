import { useState } from 'react';
import { createVideo } from '../api';

const EMPTY_FORM = { title: '', youtubeUrl: '', description: '' };

export default function VideoForm({ token, onPublished }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    const youtubeUrl = form.youtubeUrl.trim();

    if (!title || !youtubeUrl) {
      setStatus({ type: 'err', text: 'Preencha o título e o link do vídeo.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      await createVideo(token, {
        title,
        youtube_url: youtubeUrl,
        description: form.description.trim(),
      });
      await onPublished();
      setForm(EMPTY_FORM);
      setStatus({ type: 'ok', text: 'Vídeo adicionado à seção de vídeos.' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Não foi possível adicionar o vídeo agora.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-card">
      <div className="form-head">
        <h2>Adicionar vídeo do YouTube</h2>
        <p>
          Cole o link de um vídeo avulso ou de uma playlist inteira do
          YouTube — o tipo é reconhecido automaticamente pelo link.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="v-title">Título</label>
          <input
            id="v-title"
            type="text"
            maxLength={120}
            placeholder="Ex.: Palestra sobre O Evangelho Segundo o Espiritismo"
            value={form.title}
            onChange={updateField('title')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="v-url">
            Link do vídeo ou da playlist <span className="hint">(YouTube)</span>
          </label>
          <input
            id="v-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=... ou .../playlist?list=..."
            value={form.youtubeUrl}
            onChange={updateField('youtubeUrl')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="v-desc">
            Descrição <span className="hint">(opcional)</span>
          </label>
          <textarea
            id="v-desc"
            rows={3}
            maxLength={500}
            placeholder="Uma breve descrição do vídeo..."
            value={form.description}
            onChange={updateField('description')}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Adicionando...' : 'Adicionar vídeo'}
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