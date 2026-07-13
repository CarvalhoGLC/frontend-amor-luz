import VideoCarousel from './VideoCarousel';

export default function VideosSection({ videos, loading, canDelete, onDelete }) {
  return (
    <section className="videos-section">
      <div className="wrap">
        <div className="mural-head">
          <h2>Vídeos</h2>
          <span className="mural-count">
            {videos.length === 0
              ? ''
              : videos.length === 1
              ? '1 vídeo'
              : `${videos.length} vídeos`}
          </span>
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