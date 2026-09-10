import React from 'react';

export default function Hero() {
  return (
    <header className="hero-section">
      <div className="wrap">
        <nav className="header-nav">
          <div className="brand-logo">
            <span className="brand-name">Amor & Luz</span>
            <span className="brand-sub">Mural de Mensagens Escritas</span>
          </div>
          <div className="nav-links">
            <a href="#inicio">Início</a>
            <a href="#mural">Mural</a>
            <a href="#videos">Vídeos</a>
            <a href="#sobre">Sobre o espaço</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span>✦</span> ESPIRITUALIDADE & ACOLHIMENTO
            </div>
            <h1 className="hero-title">
              Mensagens de paz, <em>amor e luz</em> para nutrir a alma.
            </h1>
            <p className="hero-desc">
              Um espaço para acolher e compartilhar mensagens de consolo, fé e
              esclarecimento — como o orvalho que chega, sereno, a cada manhã.
            </p>
            <div className="hero-actions">
              <a href="#mural" className="btn-primary">
                Explorar o mural ↘
              </a>
              <button className="btn-secondary">
                Compartilhar luz ↗
              </button>
            </div>
            <blockquote className="hero-quote">
              <p>“Amai-vos e instrui-vos.”</p>
              <cite>O EVANGELHO SEGUNDO O ESPIRITISMO</cite>
            </blockquote>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
              alt="Paisagem serena de montanhas e vale"
              className="arch-image"
            />
            <div className="floating-card">
              <div className="floating-card-tag">
                <span>🍃</span> UM LEMBRETE PARA HOJE
              </div>
              <p className="floating-card-text">
                Você pode recomeçar com delicadeza.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}