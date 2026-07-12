import { useAuth } from '../hooks/useAuth';
import { useMessages } from '../hooks/useMessages';
import { deleteMessage } from '../api';
import MaintainerGate from './MaintainerGate';
import PublishForm from './PublishForm';
import Carousel from './Carousel';

export default function Mural() {
  const { token, isAuthenticated, login, logout } = useAuth();
  const { messages, loading, refresh } = useMessages();

  async function handleDelete(id) {
    await deleteMessage(token, id);
    await refresh();
  }

  return (
    <>
      <section className="form-section">
        <div className="wrap">
          {isAuthenticated ? (
            <PublishForm token={token} onPublished={refresh} onLogout={logout} />
          ) : (
            <MaintainerGate onLogin={login} />
          )}
        </div>
      </section>

      <section className="mural">
        <div className="wrap">
          <div className="mural-head">
            <h2>Mural de mensagens</h2>
            <span className="mural-count">
              {messages.length === 0
                ? ''
                : messages.length === 1
                ? '1 mensagem'
                : `${messages.length} mensagens`}
            </span>
          </div>

          {loading ? (
            <div className="loading-row">Abrindo o mural...</div>
          ) : (
            <Carousel
              messages={messages}
              canDelete={isAuthenticated}
              onDelete={handleDelete}
            />
          )}
        </div>
      </section>
    </>
  );
}