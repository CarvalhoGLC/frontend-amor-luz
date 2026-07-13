import Carousel from './Carousel';

// Componente só de exibição — o login e as chamadas de exclusão vivem no
// App, que também governa a seção de vídeos com a mesma sessão.
export default function Mural({ messages, loading, canDelete, onDelete, onOpen }) {
  return (
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
          <Carousel messages={messages} canDelete={canDelete} onDelete={onDelete} onOpen={onOpen} />
        )}
      </div>
    </section>
  );
}