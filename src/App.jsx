import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import MaintainerArea from './components/MaintainerArea';
import Mural from './components/Mural';
import VideosSection from './components/VideosSection';
import MessageDetail from './components/MessageDetail';
import { useAuth } from './hooks/useAuth';
import { useMessages } from './hooks/useMessages';
import { useVideos } from './hooks/useVideos';
import { deleteMessage, deleteVideo } from './api';

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
    window.scrollTo(0, 0);
  }

  function closeMessage() {
    setSelectedMessage(null);
    window.scrollTo(0, 0);
  }

  // Se a mensagem aberta for excluída pelo mantenedor em outra aba/sessão,
  // evita deixar a tela de detalhe apontando para algo que já não existe.
  useEffect(() => {
    if (
      selectedMessage &&
      !messagesState.messages.some((m) => m.id === selectedMessage.id)
    ) {
      setSelectedMessage(null);
    }
  }, [messagesState.messages, selectedMessage]);

  if (selectedMessage) {
    return <MessageDetail message={selectedMessage} onBack={closeMessage} />;
  }

  return (
    <>
      <Hero />

      <MaintainerArea
        isAuthenticated={auth.isAuthenticated}
        token={auth.token}
        onLogin={auth.login}
        onLogout={auth.logout}
        onMessagePublished={messagesState.refresh}
        onVideoPublished={videosState.refresh}
      />

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

      <footer>
        Orvalho — um mural de mensagens espíritas. A leitura é livre para
        todas as pessoas; a publicação é reservada ao mantenedor do site.
      </footer>
    </>
  );
}