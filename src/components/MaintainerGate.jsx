import { useState } from 'react';

export default function MaintainerGate({ onLogin }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) return;

    setSubmitting(true);
    setError('');
    try {
      await onLogin(password);
      setPassword('');
    } catch (err) {
      setError(err.message || 'Senha incorreta.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="gate-card">
      <svg
        className="gate-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        style={{ color: 'var(--gold-soft)' }}
      >
        <rect x="4" y="11" width="16" height="9" rx="1.5" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <div className="gate-text">
        <p className="gate-title">Mural de leitura</p>
        <p>
          As mensagens deste mural são publicadas apenas pelo mantenedor do
          site. Você pode ler livremente todas as mensagens abaixo.
        </p>
      </div>
      <button type="button" className="gate-toggle" onClick={() => setOpen((o) => !o)}>
        Área do mantenedor
      </button>

      {open && (
        <form className="gate-auth open" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Senha do mantenedor"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <div className="gate-error">{error}</div>}
        </form>
      )}
    </div>
  );
}