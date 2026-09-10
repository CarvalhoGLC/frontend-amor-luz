import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import MaintainerMenu from './components/MaintainerMenu';
import Mural from './components/Mural';
import VideosSection from './components/VideosSection';
import MessageDetail from './components/MessageDetail';
import { useAuth } from './hooks/useAuth';
import { useMessages } from './hooks/useMessages';
import { useVideos } from './hooks/useVideos';
import { deleteMessage, deleteVideo } from './api';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const auth = useAuth();
  const messagesState = useMessages();
  const videosState = useVideos();
  const [selectedMessage, setSelectedMessage] = useState(null);

  async function handleDeleteMessage(id) {
    await deleteMessage(auth.token, id);
    await messagesState.refresh();
  }

  async function handleDeleteVideo(id) {
    await deleteVideo(auth.token, id);
    await videosState.refresh();
  }

  function openMessage(message) {
    setSelectedMessage(message);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeMessage() {
    setSelectedMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (
      selectedMessage &&
      !messagesState.messages.some((m) => m.id === selectedMessage.id)
    ) {
      setSelectedMessage(null);
    }
  }, [messagesState.messages, selectedMessage]);

  return (
    <>
      <MaintainerMenu
        isAuthenticated={auth.isAuthenticated}
        token={auth.token}
        onLogin={auth.login}
        onLogout={auth.logout}
        onMessagePublished={messagesState.refresh}
        onVideoPublished={videosState.refresh}
      />

      {selectedMessage ? (
        <MessageDetail message={selectedMessage} onBack={closeMessage} />
      ) : (
        <>
          <Hero />

          <Mural
            messages={messagesState.messages}
            loading={messagesState.loading}
            canDelete={auth.isAuthenticated}
            onDelete={handleDeleteMessage}
            onOpen={openMessage}
          />

          <VideosSection
            videos={videosState.videos}
            loading={videosState.loading}
            canDelete={auth.isAuthenticated}
            onDelete={handleDeleteVideo}
          />

          {/* Seção Sobre este espaço baseada no Design */}
          <section id="sobre" className="about-section">
            <div className="wrap">
              <div className="about-grid">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop"
                  alt="Floresta e lago sereno"
                  className="arch-image"
                />
                <div>
                  <div className="section-tag">SOBRE ESTE ESPAÇO</div>
                  <h2 className="section-title">
                    Um lugar para respirar antes de seguir.
                  </h2>
                  <p className="hero-desc">
                    Amor & Luz nasceu da vontade de guardar palavras que acolhem.
                    Aqui, cada mensagem é uma pequena janela para a esperança — uma
                    pausa para lembrar que a vida também pode ser lida com ternura.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="site-footer wrap">
            <div className="brand-name" style={{ fontSize: '16px' }}>Amor & Luz</div>
            <div className="footer-quote">Que toda palavra encontre um coração disposto a florescer.</div>
            <div>© 2026 Amor & Luz</div>
          </footer>

          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}