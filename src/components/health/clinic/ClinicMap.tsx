/** Illustrative street map drawn in SVG. Replace with an embedded map or a static image of your own. */
export function ClinicMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Illustrative map showing the clinic on Linden Court, one block from the park" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="360" fill="#e9efe8" />
      <path d="M-10 250C80 230 140 290 240 262S400 210 490 240v140H-10z" fill="#bcd8de" />
      <rect x="40" y="40" width="150" height="110" rx="26" fill="#c9e0c6" />
      <circle cx="90" cy="84" r="9" fill="#a6cba3" />
      <circle cx="132" cy="110" r="12" fill="#a6cba3" />
      <circle cx="160" cy="70" r="7" fill="#a6cba3" />
      <g fill="#fff" stroke="#d6ddd5" strokeWidth="2">
        <path d="M0 170h480v26H0z" />
        <path d="M214-4h28v220h-28z" />
        <path d="M330-4h20v180h-20z" />
        <path d="M60 196h18v150H60z" />
      </g>
      <g fill="#dde4dc">
        <rect x="260" y="40" width="54" height="52" rx="8" />
        <rect x="260" y="100" width="54" height="52" rx="8" />
        <rect x="364" y="40" width="80" height="52" rx="8" />
        <rect x="364" y="100" width="80" height="52" rx="8" />
        <rect x="100" y="206" width="94" height="40" rx="8" />
        <rect x="258" y="206" width="56" height="40" rx="8" />
      </g>
      <path d="M0 183h480" stroke="#c4cdc3" strokeDasharray="10 10" strokeWidth="2" />
      <g transform="translate(228 150)">
        <circle r="26" fill="#f2694b" opacity=".22" className="clinic-float" />
        <path d="M0 14C-16-6-17-22 0-24 17-22 16-6 0 14z" transform="translate(0 -6) scale(1.5)" fill="#0e3535" />
        <path d="M-4-18h8v6h6v8h-6v6h-8v-6h-6v-8h6z" fill="#f2694b" transform="translate(0 -3) scale(.82)" />
      </g>
      <text x="262" y="164" fontSize="13" fontWeight="700" fill="#0e3535" fontFamily="sans-serif">Linden Court</text>
      <text x="56" y="166" fontSize="11" fontWeight="600" fill="#6b8a68" fontFamily="sans-serif">Park</text>
    </svg>
  );
}
