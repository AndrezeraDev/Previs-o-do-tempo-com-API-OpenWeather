/**
 * Caixa de vidro fosco usada em todas as seções da tela.
 * O "className" permite ajustar espaçamentos em cada uso.
 */
export default function Card({ children, className = '', style }) {
  return (
    <section
      className={`rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-black/5 backdrop-blur-md ${className}`}
      style={style}
    >
      {children}
    </section>
  )
}
