import { useState } from 'react';
import Candle from './Candle';

const FEATURED_QUOTES = [
  {
    text: '“Fora da caridade não há salvação.”',
    attr: 'Allan Kardec — O Evangelho Segundo o Espiritismo',
  },
  {
    text: '“Amai-vos e instrui-vos.”',
    attr: 'O Evangelho Segundo o Espiritismo',
  },
  {
    text: '“O tempo é o senhor absoluto, o lapidador supremo das arestas mais duras.”',
    attr: 'Espírito Emmanuel, por Chico Xavier',
  },
];

export default function Hero() {
  // Sorteia uma única vez por carregamento da página.
  const [quote] = useState(
    () => FEATURED_QUOTES[Math.floor(Math.random() * FEATURED_QUOTES.length)]
  );

  return (
    <section className="hero">
      <div className="wrap">
        <Candle />
        <div className="eyebrow">Mural de mensagens espíritas</div>
        <h1 className="site-title">Amor & Luz</h1>
        <p className="site-tagline">
          Um espaço para acolher e partilhar mensagens de consolo, fé e
          esclarecimento — como o orvalho que chega, sereno, a cada manhã.
        </p>

        <blockquote className="featured">
          <span>{quote.text}</span>
          <span className="fq-attr">{quote.attr}</span>
        </blockquote>
      </div>
    </section>
  );
}