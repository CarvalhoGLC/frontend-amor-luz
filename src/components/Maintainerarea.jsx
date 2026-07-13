import MaintainerGate from './Maintainergate';
import PublishForm from './Publishform';
import VideoForm from './Videoform';

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