import type { ClinicDoctor } from "@/content/health/clinic";

type Look = ClinicDoctor["look"];

/** Flat portrait illustration drawn in SVG, so the template ships without photos of real people. Swap for a photo. */
export function DoctorAvatar({ look, className = "" }: { look: Look; className?: string }) {
  const { skin, hair, hairStyle, coat, glasses } = look;
  const shirt = coat === "#ffffff" ? "#1b6361" : "#f6f4ed";
  return (
    <svg viewBox="0 0 200 240" role="presentation" aria-hidden className={className} preserveAspectRatio="xMidYMax slice">
      {/* shoulders */}
      <path d="M12 240c0-52 38-82 88-84s88 32 88 84z" fill={coat} />
      <path d="M12 240c0-52 38-82 88-84s88 32 88 84z" fill="none" stroke="#0e3535" strokeOpacity=".12" />
      <path d="M80 158l20 44 20-44z" fill={shirt} />
      <path d="M80 158l-18 20 38 34zM120 158l18 20-38 34z" fill={coat} stroke="#0e3535" strokeOpacity=".14" />
      {/* stethoscope */}
      <path d="M68 168c-12 26-4 52 20 54 16 1 24-12 16-26" fill="none" stroke="#0e3535" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="104" cy="194" r="7" fill="#0e3535" />
      <circle cx="104" cy="194" r="3" fill="#f2694b" />
      {/* neck and head */}
      <path d="M85 126h30v34c-8 8-22 8-30 0z" fill={skin} />
      <path d="M85 144c10 8 20 8 30 0v-8c-10 6-20 6-30 0z" fill="#000" opacity=".12" />
      <circle cx="62" cy="98" r="7" fill={skin} />
      <circle cx="138" cy="98" r="7" fill={skin} />
      <ellipse cx="100" cy="94" rx="38" ry="44" fill={skin} />
      {/* hair */}
      {hairStyle !== "bald" && (
        <path d="M61 92c-3-38 18-52 39-52s42 14 39 52c-8-16-22-26-39-26S69 76 61 92z" fill={hair} />
      )}
      {hairStyle === "bun" && <circle cx="100" cy="34" r="15" fill={hair} />}
      {hairStyle === "long" && (
        <>
          <path d="M61 90c-8 34-6 62 8 78l8-60z" fill={hair} />
          <path d="M139 90c8 34 6 62-8 78l-8-60z" fill={hair} />
        </>
      )}
      {hairStyle === "curly" && (
        <>
          {[[66, 66], [80, 52], [100, 46], [120, 52], [134, 66], [60, 86], [140, 86]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="15" fill={hair} />
          ))}
        </>
      )}
      {/* face */}
      <path d="M78 84q8-5 15 0M107 84q8-5 15 0" fill="none" stroke={hairStyle === "bald" ? "#2a2018" : hair} strokeWidth="3" strokeLinecap="round" />
      <circle cx="86" cy="97" r="3.2" fill="#1a1411" />
      <circle cx="114" cy="97" r="3.2" fill="#1a1411" />
      <path d="M100 100v14q-5 3-9 0" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M88 122q12 10 24 0" fill="none" stroke="#7a2e22" strokeWidth="3.2" strokeLinecap="round" />
      {glasses && (
        <g fill="none" stroke="#0e3535" strokeWidth="2.6">
          <circle cx="86" cy="97" r="10.5" />
          <circle cx="114" cy="97" r="10.5" />
          <path d="M96.5 96q3.5-3 7 0M75.5 96l-8-2M124.5 96l8-2" />
        </g>
      )}
    </svg>
  );
}
