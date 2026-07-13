import { useState, useRef, useEffect } from 'react';
import PublishForm from './PublishForm';
import VideoForm from './VideoForm';

export default function MaintainerMenu({
  isAuthenticated,
  token,
  onLogin,
  onLogout,
  onMessagePublished,
  onVideoPublished,
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const menuRef = useRef(null);

  // Fecha o painel ao clicar fora dele.
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  async function handleLogin(e) {
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

  function handleLogout() {
    onLogout();
    setOpen(false);
  }

  return (
    <div className="maintainer-menu" ref={menuRef}>
      <button
        type="button"
        className={`maintainer-toggle${isAuthenticated ? ' active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Área do mantenedor"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="11" width="16" height="9" rx="1.5" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{isAuthenticated ? 'Mantenedor' : 'Área do mantenedor'}</span>
      </button>

      {open && (
        <div className="maintainer-panel">
          {isAuthenticated ? (
            <div className="maintainer-stack">
              <PublishForm token={token} onPublished={onMessagePublished} onLogout={handleLogout} />
              <VideoForm token={token} onPublished={onVideoPublished} />
            </div>
          ) : (
            <form className="maintainer-login" onSubmit={handleLogin}>
              <p className="maintainer-login-title">Área do mantenedor</p>
              <p className="maintainer-login-desc">
                Entre com a senha para publicar mensagens e vídeos no mural.
              </p>
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
      )}
    </div>
  );
}