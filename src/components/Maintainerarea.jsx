import MaintainerGate from './MaintainerGate';
import PublishForm from './PublishForm';
import VideoForm from './VideoForm';

export default function MaintainerArea({
  isAuthenticated,
  token,
  onLogin,
  onLogout,
  onMessagePublished,
  onVideoPublished,
}) {
  return (
    <section className="form-section">
      <div className="wrap">
        {isAuthenticated ? (
          <div className="maintainer-stack">
            <PublishForm token={token} onPublished={onMessagePublished} onLogout={onLogout} />
            <VideoForm token={token} onPublished={onVideoPublished} />
          </div>
        ) : (
          <MaintainerGate onLogin={onLogin} />
        )}
      </div>
    </section>
  );
}