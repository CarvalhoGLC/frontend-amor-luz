import VideoCarousel from './VideoCarousel';

export default function VideosSection({ videos, loading, canDelete, onDelete }) {
  return (
    <section id="videos" className="videos-section">
      <div className="wrap">
        <div className="section-header">
          <div className="section-tag">▷ ESCUTAS PARA A JORNADA</div>
          <h2 className="section-title">Vídeos para caminhar com calma</h2>
          <p className="section-subtitle">
            Conteúdos escolhidos pelo mantenedor para acompanhar o seu momento.
          </p>
        </div>

        {loading ? (
          <div className="loading-row">Carregando vídeos...</div>
        ) : (
          <VideoCarousel videos={videos} canDelete={canDelete} onDelete={onDelete} />
        )}
      </div>
    </section>
  );
}