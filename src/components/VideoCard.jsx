import { useState } from 'react';

function getEmbedSrc(video) {
  if (video.type === 'playlist' && video.playlist_id) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${video.playlist_id}`;
  }
  return `https://www.youtube-nocookie.com/embed/${video.video_id}`;
}

export default function VideoCard({ video, canDelete, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const isPlaylist = video.type === 'playlist';

  async function handleDelete() {
    const confirmed = window.confirm(
      `Remover ${isPlaylist ? 'a playlist' : 'o vídeo'} "${video.title}" da seção? Essa ação não pode ser desfeita.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await onDelete(video.id);
    } catch (err) {
      window.alert(err.message || 'Não foi possível remover.');
      setDeleting(false);
    }
  }

  return (
    <article className="video-card">
      {canDelete && (
        <button
          type="button"
          className="msg-delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Excluir ${isPlaylist ? 'playlist' : 'vídeo'} "${video.title}"`}
          title={isPlaylist ? 'Remover playlist' : 'Remover vídeo'}
        >
          {deleting ? (
            '...'
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7h10z" />
            </svg>
          )}
        </button>
      )}

      <div className="video-embed">
        <iframe
          src={getEmbedSrc(video)}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="video-body">
        <div className="video-title-row">
          <h3 className="video-title">{video.title}</h3>
          {isPlaylist && <span className="video-badge">Playlist</span>}
        </div>
        {video.description && <p className="video-description">{video.description}</p>}
      </div>
    </article>
  );
}