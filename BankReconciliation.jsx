import { useState, useEffect, useRef } from "react";

// ── Icon SVG paths from Mimo nav icon set ─────────────────────────────────────
const PATHS = {
  home: "M7.5 17.5016V11.3349C7.5 10.8682 7.5 10.6348 7.59083 10.4566C7.67072 10.2998 7.79821 10.1723 7.95501 10.0924C8.13327 10.0016 8.36662 10.0016 8.83333 10.0016H11.1667C11.6334 10.0016 11.8667 10.0016 12.045 10.0924C12.2018 10.1723 12.3293 10.2998 12.4092 10.4566C12.5 10.6348 12.5 10.8682 12.5 11.3349V17.5016M9.18141 2.30492L3.52949 6.70086C3.15168 6.99471 2.96278 7.14163 2.82669 7.32563C2.70614 7.48862 2.61633 7.67224 2.56169 7.86746C2.5 8.08785 2.5 8.32717 2.5 8.8058V14.8349C2.5 15.7683 2.5 16.235 2.68166 16.5916C2.84144 16.9052 3.09641 17.1601 3.41002 17.3199C3.76654 17.5016 4.23325 17.5016 5.16667 17.5016H14.8333C15.7668 17.5016 16.2335 17.5016 16.59 17.3199C16.9036 17.1601 17.1586 16.9052 17.3183 16.5916C17.5 16.235 17.5 15.7683 17.5 14.8349V8.8058C17.5 8.32717 17.5 8.08785 17.4383 7.86746C17.3837 7.67224 17.2939 7.48862 17.1733 7.32563C17.0372 7.14163 16.8483 6.99471 16.4705 6.70086L10.8186 2.30492C10.5258 2.07721 10.3794 1.96335 10.2178 1.91959C10.0752 1.88097 9.92484 1.88097 9.78221 1.91959C9.62057 1.96335 9.47418 2.07721 9.18141 2.30492Z",
  bookOpen: "M9.99984 17.5L9.91646 17.3749C9.33759 16.5066 9.04816 16.0725 8.66575 15.7582C8.32722 15.4799 7.93714 15.2712 7.51784 15.1438C7.04421 15 6.52243 15 5.47886 15H4.33317C3.39975 15 2.93304 15 2.57652 14.8183C2.26292 14.6586 2.00795 14.4036 1.84816 14.09C1.6665 13.7335 1.6665 13.2668 1.6665 12.3333V5.16667C1.6665 4.23325 1.6665 3.76654 1.84816 3.41002C2.00795 3.09641 2.26292 2.84144 2.57652 2.68166C2.93304 2.5 3.39975 2.5 4.33317 2.5H4.6665C6.53335 2.5 7.46677 2.5 8.17981 2.86331C8.80701 3.18289 9.31695 3.69282 9.63653 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333M9.99984 17.5V7.83333M9.99984 17.5L10.0832 17.3749C10.6621 16.5066 10.9515 16.0725 11.3339 15.7582C11.6725 15.4799 12.0625 15.2712 12.4818 15.1438C12.9555 15 13.4772 15 14.5208 15H15.6665C16.5999 15 17.0666 15 17.4232 14.8183C17.7368 14.6586 17.9917 14.4036 18.1515 14.09C18.3332 13.7335 18.3332 13.2668 18.3332 12.3333V5.16667C18.3332 4.23325 18.3332 3.76654 18.1515 3.41002C17.9917 3.09641 17.7368 2.84144 17.4232 2.68166C17.0666 2.5 16.5999 2.5 15.6665 2.5H15.3332C13.4663 2.5 12.5329 2.5 11.8199 2.86331C11.1927 3.18289 10.6827 3.69282 10.3631 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333",
  inbox: "M2.08317 9.9987H4.90148C5.47248 9.9987 5.99448 10.3213 6.24984 10.832C6.5052 11.3428 7.02719 11.6654 7.5982 11.6654H12.4015C12.9725 11.6654 13.4945 11.3428 13.7498 10.832C14.0052 10.3213 14.5272 9.9987 15.0982 9.9987H17.9165M7.47197 3.33203H12.5277C13.4251 3.33203 13.8738 3.33203 14.2699 3.46867C14.6202 3.5895 14.9393 3.78669 15.204 4.04599C15.5034 4.33919 15.7041 4.74053 16.1054 5.54318L17.9109 9.15412C18.0684 9.4691 18.1471 9.6266 18.2027 9.79165C18.252 9.93824 18.2876 10.0891 18.309 10.2423C18.3332 10.4147 18.3332 10.5908 18.3332 10.943V12.6654C18.3332 14.0655 18.3332 14.7656 18.0607 15.3003C17.821 15.7707 17.4386 16.1532 16.9681 16.3929C16.4334 16.6654 15.7333 16.6654 14.3332 16.6654H5.6665C4.26637 16.6654 3.56631 16.6654 3.03153 16.3929C2.56112 16.1532 2.17867 15.7707 1.93899 15.3003C1.6665 14.7656 1.6665 14.0655 1.6665 12.6654V10.943C1.6665 10.5908 1.6665 10.4147 1.69065 10.2423C1.71209 10.0891 1.7477 9.93824 1.79702 9.79165C1.85255 9.6266 1.9313 9.4691 2.0888 9.15412L3.89426 5.54318C4.29559 4.74052 4.49625 4.3392 4.79562 4.04599C5.06036 3.78669 5.37943 3.5895 5.72974 3.46867C6.12588 3.33203 6.57458 3.33203 7.47197 3.33203Z",
  checkVerifiedBadge: "M7.66809 17.1687C7.94121 17.1326 8.21712 17.2067 8.43469 17.3742L9.43738 18.1437C9.76884 18.3983 10.2299 18.3983 10.5604 18.1437L11.6011 17.3446C11.7955 17.1955 12.0409 17.1298 12.2834 17.1622L13.5852 17.3335C13.999 17.3881 14.3981 17.1576 14.5583 16.7715L15.0591 15.5604C15.1526 15.3336 15.3323 15.1539 15.5591 15.0604L16.7701 14.5595C17.1562 14.4003 17.3867 14.0003 17.3321 13.5864L17.1673 12.3318C17.1312 12.0587 17.2053 11.7827 17.3728 11.5651L18.1422 10.5624C18.3968 10.2309 18.3968 9.76983 18.1422 9.43928L17.3432 8.39857C17.1941 8.20413 17.1284 7.95877 17.1608 7.71618L17.3321 6.41437C17.3867 6.00049 17.1562 5.60142 16.7701 5.44124L15.5591 4.94033C15.3323 4.84682 15.1526 4.66719 15.0591 4.44035L14.5583 3.22927C14.399 2.84317 13.999 2.61262 13.5852 2.66725L12.2834 2.83854C12.0409 2.87187 11.7955 2.80613 11.602 2.65799L10.5614 1.85894C10.2299 1.60431 9.76884 1.60431 9.43831 1.85894L8.39766 2.65799C8.20323 2.80613 7.95788 2.87187 7.71531 2.84039L6.41356 2.6691C5.99971 2.61447 5.60067 2.84502 5.4405 3.23112L4.94054 4.4422C4.8461 4.66812 4.66649 4.84774 4.44058 4.94218L3.22957 5.44217C2.84349 5.60235 2.61295 6.00141 2.66758 6.41529L2.83886 7.71711C2.87034 7.95969 2.8046 8.20506 2.65647 8.39857L1.85746 9.43928C1.60285 9.77075 1.60285 10.2319 1.85746 10.5624L2.65647 11.6031C2.80553 11.7975 2.87126 12.0429 2.83886 12.2855L2.66758 13.5873C2.61295 14.0012 2.84349 14.4003 3.22957 14.5604L4.44058 15.0613C4.66741 15.1549 4.84703 15.3345 4.94054 15.5613L5.44142 16.7724C5.60067 17.1585 6.00063 17.3891 6.41449 17.3344L7.66809 17.1687Z",
  checkVerifiedMark: "M7.49984 10.0013L9.1665 11.668L12.9165 7.91797",
  switchHorizontal: "M16.6668 14.1667H3.3335M3.3335 14.1667L6.66683 10.8333M3.3335 14.1667L6.66683 17.5M3.3335 5.83333H16.6668M16.6668 5.83333L13.3335 2.5M16.6668 5.83333L13.3335 9.16667",
  fileQuestion: "M16.6668 7.91797V5.66797C16.6668 4.26784 16.6668 3.56777 16.3943 3.03299C16.1547 2.56259 15.7722 2.18014 15.3018 1.94045C14.767 1.66797 14.067 1.66797 12.6668 1.66797H7.3335C5.93336 1.66797 5.2333 1.66797 4.69852 1.94045C4.22811 2.18014 3.84566 2.56259 3.60598 3.03299C3.3335 3.56777 3.3335 4.26784 3.3335 5.66797V14.3346C3.3335 15.7348 3.3335 16.4348 3.60598 16.9696C3.84566 17.44 4.22811 17.8225 4.69852 18.0622C5.2333 18.3346 5.93336 18.3346 7.3335 18.3346H11.6668M11.6668 9.16797H6.66683M8.3335 12.5013H6.66683M13.3335 5.83464H6.66683M13.7502 12.5032C13.897 12.0858 14.1868 11.7338 14.5683 11.5096C14.9497 11.2854 15.3982 11.2035 15.8343 11.2783C16.2704 11.3531 16.666 11.5798 16.9509 11.9183C17.2359 12.2568 17.3919 12.6852 17.3912 13.1277C17.3912 14.3768 15.5176 15.0013 15.5176 15.0013M15.5417 17.5013H15.5501",
  settingsGear: "M7.82936 16.1439L8.3164 17.2393C8.46118 17.5653 8.69747 17.8424 8.99659 18.0368C9.29571 18.2312 9.64483 18.3347 10.0016 18.3346C10.3583 18.3347 10.7075 18.2312 11.0066 18.0368C11.3057 17.8424 11.542 17.5653 11.6868 17.2393L12.1738 16.1439C12.3472 15.7552 12.6388 15.4312 13.0071 15.218C13.3778 15.0042 13.8066 14.9131 14.2321 14.9578L15.4238 15.0846C15.7785 15.1222 16.1365 15.056 16.4544 14.8941C16.7722 14.7322 17.0363 14.4816 17.2145 14.1726C17.393 13.8638 17.4781 13.5099 17.4593 13.1537C17.4406 12.7975 17.3189 12.4545 17.109 12.1661L16.4034 11.1967C16.1522 10.8489 16.018 10.4303 16.0201 10.0013C16.02 9.57346 16.1555 9.15659 16.4071 8.81056L17.1127 7.84112C17.3226 7.55276 17.4443 7.20969 17.463 6.85353C17.4818 6.49737 17.3967 6.14342 17.2183 5.83464C17.04 5.52566 16.7759 5.27504 16.4581 5.11316C16.1402 4.95127 15.7822 4.88508 15.4275 4.9226L14.2358 5.04945C13.8103 5.09414 13.3815 5.00307 13.0108 4.78927C12.6418 4.57485 12.3501 4.2491 12.1775 3.85871L11.6868 2.76334C11.542 2.43728 11.3057 2.16023 11.0066 1.9658C10.7075 1.77137 10.3583 1.66791 10.0016 1.66797C9.64483 1.66791 9.29571 1.77137 8.99659 1.9658C8.69747 2.16023 8.46118 2.43728 8.3164 2.76334L7.82936 3.85871C7.6568 4.2491 7.36509 4.57485 6.99603 4.78927C6.62538 5.00307 6.19659 5.09414 5.77103 5.04945L4.57566 4.9226C4.22094 4.88508 3.86294 4.95127 3.54509 5.11316C3.22724 5.27504 2.96317 5.52566 2.78492 5.83464C2.60644 6.14342 2.52141 6.49737 2.54014 6.85353C2.55888 7.20969 2.68058 7.55276 2.89048 7.84112L3.59603 8.81056C3.84765 9.15659 3.98315 9.57346 3.98307 10.0013C3.98315 10.4291 3.84765 10.846 3.59603 11.192L2.89048 12.1615C2.68058 12.4498 2.55888 12.7929 2.54014 13.1491C2.52141 13.5052 2.60644 13.8592 2.78492 14.168C2.96335 14.4768 3.22744 14.7273 3.54525 14.8891C3.86306 15.051 4.22096 15.1173 4.57566 15.08L5.76733 14.9532C6.19289 14.9085 6.62167 14.9995 6.99233 15.2133C7.36277 15.4272 7.65583 15.753 7.82936 16.1439Z",
  settingsCircle: "M10.0001 12.5013C11.3808 12.5013 12.5001 11.382 12.5001 10.0013C12.5001 8.62059 11.3808 7.5013 10.0001 7.5013C8.61939 7.5013 7.5001 8.62059 7.5001 10.0013C7.5001 11.382 8.61939 12.5013 10.0001 12.5013Z",
};

// ── Reusable icon renderer ────────────────────────────────────────────────────
function NavIcon({ name, color }) {
  const sp = { stroke: color, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "checkVerified") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.checkVerifiedBadge} {...sp} />
      <path d={PATHS.checkVerifiedMark} {...sp} />
    </svg>
  );
  if (name === "settings") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.settingsGear} {...sp} />
      <path d={PATHS.settingsCircle} {...sp} />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS[name]} {...sp} />
    </svg>
  );
}

// ── Progress ring (circular indicator) ───────────────────────────────────────
function ProgressRing({ progress = 0, size = 40, strokeWidth = 3 }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const c = size / 2;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circ - (clamped / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#EAF2E2" strokeWidth={strokeWidth} />
      <circle cx={c} cy={c} r={r} fill="none" stroke="#05A105" strokeWidth={strokeWidth}
        strokeDasharray={`${circ} ${circ}`} strokeDashoffset={offset} strokeLinecap="butt" />
    </svg>
  );
}

// ── Sortable column header icon ───────────────────────────────────────────────
function parseGBP(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/[£\s]/g, "").replace(/,(?=\d{3})/g, "").replace(",", ".")) || 0;
}
function formatGBPDiff(diff) {
  if (diff === 0) return "£0.00";
  const abs = Math.abs(diff).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${diff > 0 ? "+" : "-"}£${abs}`;
}

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 2v8M3.5 7.5L6 10l2.5-2.5M3.5 4.5L6 2l2.5 2.5" stroke="#8C8C8B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Play circle icon ──────────────────────────────────────────────────────────
function PlayCircleIcon({ color = "#080908", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 18.335C14.6024 18.335 18.3333 14.604 18.3333 10.0016C18.3333 5.39926 14.6024 1.66831 10 1.66831C5.39763 1.66831 1.66667 5.39926 1.66667 10.0016C1.66667 14.604 5.39763 18.335 10 18.335Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.9165 7.47241C7.9165 7.07467 7.9165 6.87581 7.99962 6.76478C8.07206 6.66803 8.18293 6.6075 8.30349 6.59889C8.44182 6.58901 8.60911 6.69655 8.94368 6.91163L12.8775 9.44052C13.1678 9.62715 13.313 9.72047 13.3631 9.83913C13.4069 9.94281 13.4069 10.0598 13.3631 10.1635C13.313 10.2821 13.1678 10.3755 12.8775 10.5621L8.94368 13.091C8.60911 13.3061 8.44182 13.4136 8.30349 13.4037C8.18293 13.3951 8.07206 13.3346 7.99962 13.2378C7.9165 13.1268 7.9165 12.9279 7.9165 12.5302V7.47241Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Tr. matching mini-badge ───────────────────────────────────────────────────
function TrMatchBadge({ value = "0/0" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "#ECECEC", border: "none",
      borderRadius: 4, padding: "0 8px", height: 25,
      fontSize: 12, fontWeight: 500, color: "#7C7C7C",
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4" stroke="#E9E9EB" strokeWidth="1.5" />
        <path d="M5 1 A4 4 0 0 1 9 5" stroke="#CFCFD1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {value}
    </span>
  );
}

// ── Tr. matching reconciled badge (with SVG progress ring) ───────────────────
function TrMatchingBadge({ matchedCount, totalCount, status }) {
  const isSuggestions = status === "suggestions";
  const isCompleted   = status === "completed";
  const trackColor = isSuggestions ? "#F4A59C" : isCompleted ? "#A0B4EE" : "#ACD394";
  const fillColor  = isSuggestions ? "#C8543A"  : isCompleted ? "#4C71DF"  : "#05A105";
  const textColor  = isSuggestions ? "#C8543A"  : isCompleted ? "#4C71DF"  : "#6BAC5B";
  const bgColor    = isSuggestions ? "#FCEFEC"  : isCompleted ? "#EBF0FB"  : "#F1F8F0";

  const safeTotal   = totalCount > 0 ? totalCount : 1;
  const safeMatched = Math.min(matchedCount, safeTotal);
  const pct         = (safeMatched / safeTotal) * 100;

  const SIZE = 16;
  const RADIUS = 5;
  const SW = 2;
  const CX = SIZE / 2;   // 8
  const CY = SIZE / 2;   // 8
  const circ = 2 * Math.PI * RADIUS;
  const offset = circ * (1 - pct / 100);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: bgColor, borderRadius: 4, padding: "0 8px", height: 25, fontSize: 12, fontWeight: 500, color: textColor }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none" style={{ transform: "rotate(-90deg)", flexShrink: 0, display: "block" }}>
        <circle cx={CX} cy={CY} r={RADIUS} stroke={fillColor} strokeWidth={SW} fill="none"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round" />
      </svg>
      {safeMatched}/{safeTotal}
    </span>
  );
}

// ── Chevron ───────────────────────────────────────────────────────────────────
function Chevron({ up = false, color = "#8C8C8B", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d={up ? "M3 9.5L7 5.5L11 9.5" : "M3 5.5L7 9.5L11 5.5"} stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Account / Credit card table ───────────────────────────────────────────────
function DocIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

function InvoiceIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.22222C0 0.994923 0.994923 0 2.22222 0H14L16.6129 3.3871L20 7.77778V21.7778C20 23.0051 19.0051 24 17.7778 24H2.22222C0.994923 24 0 23.0051 0 21.7778V2.22222Z" fill="#F4F4F2"/>
      <path d="M8.03267 8.15368C10.5633 7.47908 7.93554 18.9444 5.9642 17.3672C3.51971 15.4116 15.1258 12.431 14.0498 15.299C13.1067 17.8125 5.21208 8.90557 8.03267 8.15368Z" stroke="#FF6056" strokeWidth="0.864969"/>
      <path d="M14 6.52778V0L20 7.77778H15.25C14.6607 7.77778 14.3661 7.77778 14.1831 7.59472C14 7.41166 14 7.11703 14 6.52778Z" fill="#D6D6D4"/>
    </svg>
  );
}

function PdfIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 31 37" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 3.42593C0 1.53384 1.54213 0 3.44444 0H21.7L25.75 5.22177L31 11.9907V33.5741C31 35.4662 29.4579 37 27.5556 37H3.44444C1.54213 37 0 35.4662 0 33.5741V3.42593Z" fill="#F4F4F2"/>
      <path d="M13.1059 12.5745C17.2349 11.5345 12.9474 29.2102 9.73104 26.7787C5.74267 23.7638 24.6789 19.1687 22.9233 23.5901C21.3846 27.4652 8.5039 13.7337 13.1059 12.5745Z" stroke="#FF6056" strokeWidth="1.25"/>
      <path d="M21.7 10.0637V0L31 11.9907H23.6375C22.7241 11.9907 22.2674 11.9907 21.9837 11.7085C21.7 11.4263 21.7 10.9721 21.7 10.0637Z" fill="#D6D6D4"/>
    </svg>
  );
}

function CsvIcon({ width = 20, height = 24 }) {
  const scale = width / 23;
  return (
    <svg width={width} height={height} viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

const STATUS_CONFIG = {
  reconciled:  { label: "Reconciled",  color: "#05A105", tooltip: "Account is fully reconciled in Xero" },
  suggestions: { label: "Suggestions", color: "#C8543A", tooltip: "Resolve suggestions to reconcile account" },
  completed:   { label: "Completed",   color: "#4C71DF", tooltip: "Account ready to be reconciled in Xero" },
  reviewing:   { label: "In review",   color: "#D5A750", tooltip: "Reconciliation in progress — suggestions need review" },
};

function ReconciledCard({ date, status = "reconciled", suggestionCount, onPlay, onTipShow, onTipHide }) {
  const { label, color, tooltip } = STATUS_CONFIG[status] || STATUS_CONFIG.reconciled;
  const displayLabel = status === "suggestions" && suggestionCount != null
    ? `${suggestionCount} ${label}`
    : label;
  return (
    <div
      onClick={onPlay}
      onMouseEnter={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        onTipShow && onTipShow(rect.left + rect.width / 2, rect.top, tooltip);
        e.currentTarget.style.borderColor = "#BCBCBC";
        e.currentTarget.style.background = "#FAFAFA";
      }}
      onMouseLeave={e => {
        onTipHide && onTipHide();
        e.currentTarget.style.borderColor = "#DBDBDB";
        e.currentTarget.style.background = "#FFFFFF";
      }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: 184, height: 60, padding: "0 12px",
        background: "#FFFFFF", border: "1px solid #DBDBDB", borderRadius: 8,
        boxSizing: "border-box", flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color, lineHeight: 1 }}>{displayLabel}</span>
        {date && <span style={{ fontSize: 11, color: "#7C7C7C", lineHeight: 1 }}>{date}</span>}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.333" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.917 7.4714C7.917 7.0737 7.917 6.8748 8 6.7638C8.072 6.6671 8.183 6.6065 8.304 6.5979C8.442 6.588 8.609 6.6956 8.944 6.9106L12.878 9.4395C13.168 9.6262 13.313 9.7195 13.363 9.8382C13.407 9.9418 13.407 10.0588 13.363 10.1625C13.313 10.2812 13.168 10.3745 12.878 10.5611L8.944 13.09C8.609 13.3051 8.442 13.4126 8.304 13.4027C8.183 13.3941 8.072 13.3336 8 13.2368C7.917 13.1258 7.917 12.927 7.917 12.5292V7.4714Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FileIcon({ file, width = 20, height = 24 }) {
  if (!file) return <InvoiceIcon width={width} height={height} />;
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  if (type === "application/pdf" || name.endsWith(".pdf")) return <PdfIcon width={width} height={height} />;
  if (type.includes("csv") || name.endsWith(".csv") || name.endsWith(".numbers")) return <CsvIcon width={width} height={height} />;
  return <InvoiceIcon width={width} height={height} />;
}

const STATUSES = ["reconciled", "suggestions", "completed"];
const randomOutcome = () => {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const count = status === "suggestions" ? Math.floor(Math.random() * 20) + 20 : null;
  return { status, count };
};


function AccountTable({ title, rows, footerLabel, onRunReconciliation, onViewResults, reconciledAccounts = new Set(), reconciledData = {}, reconciledDates = {}, reconciledStatuses = {}, reconciledCounts = {}, bankStatements = {}, onUploadStatement, onAutoReconcile, onResetAccount }) {
  const [hovered, setHovered] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [reconcilingViaUpload, setReconcilingViaUpload] = useState(new Set());
  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setIsScrollable(el.scrollWidth > el.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && uploadingFor) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      onUploadStatement?.(uploadingFor, { fileName: file.name, date: dateStr, time: timeStr });
      const accountName = uploadingFor;
      const { status, count } = accountName === "Lloyds Bank - Operations GBP"
        ? { status: "reconciled", count: null }
        : accountName === "Lloyds Bank - Business"
        ? { status: "suggestions", count: 8 }
        : { status: "suggestions", count: reconciledData[accountName]?.suggestions || 3 };
      setReconcilingViaUpload(prev => new Set([...prev, accountName]));
      setTimeout(() => {
        setReconcilingViaUpload(prev => { const next = new Set(prev); next.delete(accountName); return next; });
        onAutoReconcile?.(accountName, status, count);
      }, 3000);
    }
    e.target.value = "";
    setUploadingFor(null);
  };

  const cols = ["Account", "Feed balance", "Statement balance", "GL balance", "Tr. matching", "Bank statement", "Actions"];
  const sortable = new Set(["Account", "Feed balance", "Statement balance", "GL balance"]);
  const colTooltips = {
    "Account": "The bank or financial account being reconciled",
    "Feed balance": "Real-time balance pulled directly from your bank feed",
    "Statement balance": "Closing balance from the uploaded bank statement",
    "GL balance": "Current balance recorded in your general ledger",
    "Tr. matching": "Number of bank statement lines matched",
    "Bank statement": "The bank statement file used for this reconciliation",
    "Actions": "Run reconciliation or review results for this account",
  };
  const [colTooltipVisible, setColTooltipVisible] = useState(null);
  const [colTooltipPos, setColTooltipPos] = useState({ x: 0, y: 0 });
  const [badgeTooltip, setBadgeTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const [cardTip, setCardTip] = useState(null); // { x, y, text }

  // Always center the tooltip on x, but clamp so it never overflows the viewport edges.
  // We estimate ~140px as a comfortable half-width cap for clamping.
  const tipStyle = (x, y) => {
    const margin = 10;
    const halfEst = 140;
    const clamped = Math.max(margin + halfEst, Math.min(x, window.innerWidth - margin - halfEst));
    return { position: "fixed", left: clamped, top: y - 8, transform: "translate(-50%, -100%)" };
  };
  const [dragOverRow, setDragOverRow] = useState(null);
  const [replacePrompt, setReplacePrompt] = useState(null); // { rowName, file, dateStr, timeStr }

  const startReconciliationWithFile = (rowName, file, dateStr, timeStr) => {
    onResetAccount?.(rowName);
    onUploadStatement?.(rowName, { fileName: file.name, date: dateStr, time: timeStr });
    const getOutcome = (name) => {
      if (name === "Lloyds Bank - Operations GBP")  return { status: "reconciled",  count: null };
      if (name === "Lloyds Bank - Business")         return { status: "suggestions", count: 8 };
      if (name === "HSBC - Business Transactions")   return { status: "suggestions", count: 1 };
      return { status: "suggestions", count: reconciledData[name]?.suggestions || 3 };
    };
    const { status, count } = getOutcome(rowName);
    setReconcilingViaUpload(prev => new Set([...prev, rowName]));
    setTimeout(() => {
      setReconcilingViaUpload(prev => { const next = new Set(prev); next.delete(rowName); return next; });
      onAutoReconcile?.(rowName, status, count);
    }, 3000);
  };

  const handleRowDragOver = (e, rowName) => {
    if (reconcilingViaUpload.has(rowName)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverRow(rowName);
  };

  const handleRowDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOverRow(null);
  };

  const handleRowDrop = (e, rowName) => {
    e.preventDefault();
    setDragOverRow(null);
    if (reconcilingViaUpload.has(rowName)) return;
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    if (bankStatements[rowName]) {
      setReplacePrompt({ rowName, file, dateStr, timeStr });
    } else {
      startReconciliationWithFile(rowName, file, dateStr, timeStr);
    }
  };

  return (
    <>
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>

    {/* Replace bank statement confirmation modal */}
    {replacePrompt && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "0", maxWidth: 450, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
          <div style={{ padding: "24px 24px 0" }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#080908", margin: "0 0 16px" }}>Replace bank statement</p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px 20px" }}>
            <p style={{ fontSize: 14, color: "#545453", lineHeight: "22px", margin: 0 }}>
              <strong style={{ color: "#080908" }}>{bankStatements[replacePrompt.rowName]?.fileName}</strong> is already uploaded for <strong style={{ color: "#080908" }}>{replacePrompt.rowName}</strong>. Do you want to replace it with <strong style={{ color: "#080908" }}>{replacePrompt.file.name}</strong> and start a new reconciliation?
            </p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={() => setReplacePrompt(null)}
              style={{ padding: "0 18px", height: 40, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", fontSize: 14, fontWeight: 500, color: "#080908", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
              onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            >Cancel</button>
            <button
              onClick={() => { const { rowName, file, dateStr, timeStr } = replacePrompt; setReplacePrompt(null); startReconciliationWithFile(rowName, file, dateStr, timeStr); }}
              style={{ padding: "0 18px", height: 40, border: "none", borderRadius: 8, background: "#05A105", fontSize: 14, fontWeight: 500, color: "#FFFFFF", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#048504"}
              onMouseLeave={e => e.currentTarget.style.background = "#05A105"}
            >Replace and reconcile</button>
          </div>
        </div>
      </div>
    )}

    {badgeTooltip.visible && (
      <div style={{
        ...tipStyle(badgeTooltip.x, badgeTooltip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {badgeTooltip.text}
      </div>
    )}
    {colTooltipVisible && (
      <div style={{
        ...tipStyle(colTooltipPos.x, colTooltipPos.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {colTooltips[colTooltipVisible]}
      </div>
    )}
    {cardTip && (
      <div style={{
        ...tipStyle(cardTip.x, cardTip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {cardTip.text}
      </div>
    )}
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden" }}>
      {/* Hidden file input for bank statement upload */}
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />

      {/* Title row — inside the border */}
      <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span>
      </div>

      {/* Scrollable table area — unified grid so all rows share column widths */}
      <div ref={scrollRef} style={{ overflowX: "auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto 200px 220px",
        minWidth: "100%",
        width: "max-content",
      }}>

        {/* ── Header cells ── */}
        {cols.map((col, ci) => {
          const isActions = col === "Actions";
          const isLast = ci === cols.length - 1;
          return (
            <div key={`h-${col}`} style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 14, fontWeight: 500, color: "#8C8C8B",
              padding: "10px 16px",
              borderBottom: "1px solid #E9E9EB",
              borderRight: !isLast ? "1px solid #E9E9EB" : "none",
              background: "#FFFFFF",
              whiteSpace: "nowrap",
              ...(isActions ? {
                position: "sticky", right: 0,
                boxShadow: isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 2,
              } : {}),
            }}>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "default" }}
                onMouseEnter={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setColTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                  setColTooltipVisible(col);
                }}
                onMouseLeave={() => setColTooltipVisible(null)}
              >
                {col}
                {sortable.has(col) && <SortIcon />}
              </span>
            </div>
          );
        })}

        {/* ── Data rows ── */}
        {rows.map((row, i) => {
          const isReconciled = reconciledAccounts.has(row.name);
          const rData = reconciledData[row.name] || {};
          const rowStatus = reconciledStatuses[row.name] || "reconciled";
          const suggCount = reconciledCounts[row.name] || 3;
          const isDragOver = dragOverRow === row.name;
          const rowBg = isDragOver ? "#F1F8F0" : hovered === i ? "#FAFAFA" : "#FFFFFF";
          const borderBottom = i < rows.length - 1 ? "1px solid #E9E9EB" : "none";

          const cellProps = {
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
            onDragOver: e => handleRowDragOver(e, row.name),
            onDragLeave: handleRowDragLeave,
            onDrop: e => handleRowDrop(e, row.name),
          };
          const dragShadow = (pos) => {
            if (!isDragOver) return {};
            const parts = [
              "inset 0 2px 0 0 #05A105",
              "inset 0 -2px 0 0 #05A105",
              pos === "first" ? "inset 2px 0 0 0 #05A105" : null,
              pos === "last"  ? "inset -2px 0 0 0 #05A105" : null,
            ].filter(Boolean).join(", ");
            return { boxShadow: parts };
          };
          const cell = (extra = {}, pos = "middle") => ({
            background: rowBg,
            borderBottom,
            transition: "background 0.1s",
            ...dragShadow(pos),
            ...extra,
          });

          return (
            <React.Fragment key={i}>
              {/* Account name */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" }, "first")} {...cellProps}>
                {row.name}
              </div>

              {/* Feed balance */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {row.feedBalance}
              </div>

              {/* Statement balance */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: isReconciled ? "#080908" : "#9D9D9E", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {isReconciled
                  ? (rowStatus === "suggestions" ? (rData.statementBalance || row.feedBalance) : row.feedBalance)
                  : "No bank statement"}
              </div>

              {/* GL balance + difference badge */}
              <div style={cell({ display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                <div style={{ fontSize: 14, color: "#080908", whiteSpace: "nowrap" }}>
                  {isReconciled && rowStatus !== "suggestions" ? row.feedBalance : row.glBalance}
                </div>
                {(() => {
                  let bg = "#ECECEC", color = "#7C7C7C", value = row.glSub;
                  if (isReconciled) {
                    const stmtBalance = rData.statementBalance || row.feedBalance;
                    const diff = rowStatus === "suggestions"
                      ? parseGBP(row.glBalance) - parseGBP(stmtBalance)
                      : 0;
                    value = formatGBPDiff(diff);
                    if (rowStatus === "suggestions") { bg = "#FCEFEC"; color = "#C8543A"; }
                    else if (rowStatus === "completed") { bg = "#EBF0FB"; color = "#4C71DF"; }
                    else { bg = "#F1F8F0"; color = "#6BAC5B"; }
                  }
                  return (
                    <span
                      style={{ display: "inline-block", background: bg, borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color, marginTop: 4, alignSelf: "flex-start", whiteSpace: "nowrap", cursor: "default" }}
                      onMouseEnter={e => { const rect = e.currentTarget.getBoundingClientRect(); setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: "Difference between statement balance and GL balance" }); }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {value}
                    </span>
                  );
                })()}
              </div>

              {/* Tr. matching */}
              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                {isReconciled ? (() => {
                  const total    = parseInt((rData.matched || "100/100").split("/")[1]) || 100;
                  const sc       = reconciledCounts[row.name] || 3;
                  const matchedN = rowStatus === "suggestions" ? Math.max(0, total - sc) : total;
                  return <TrMatchingBadge matchedCount={matchedN} totalCount={total} status={rowStatus} />;
                })() : (
                  <TrMatchBadge value="0/0" />
                )}
              </div>

              {/* Bank statement */}
              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB", overflow: "hidden", minWidth: 0 })} {...cellProps}>
                {isDragOver && !bankStatements[row.name] ? (
                  <span style={{ fontSize: 13, color: "#05A105", fontWeight: 500, whiteSpace: "nowrap" }}>Drop to upload</span>
                ) : bankStatements[row.name] ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0, width: "100%" }}>
                    <DocIcon />
                    <span
                      style={{ fontSize: 13, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0, cursor: "default" }}
                      onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: bankStatements[row.name].fileName });
                      }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {bankStatements[row.name].fileName}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: 500, color: "#7C7C7C", background: "#ECECEC", borderRadius: 4, padding: "0 6px", height: 25, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, cursor: "default" }}
                      onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const stmt = bankStatements[row.name];
                        const time = stmt.time || "";
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: `Bank statement uploaded ${stmt.date}${time ? " at " + time : ""}` });
                      }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {bankStatements[row.name].date}
                    </span>
                  </div>
                ) : (
                  <SecondaryButton
                    style={{ color: "#05A105", justifyContent: "center", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ACD394"; e.currentTarget.style.background = "#F4F9F1"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
                    onClick={() => { setUploadingFor(row.name); fileInputRef.current?.click(); }}
                  >
                    Upload statement
                  </SecondaryButton>
                )}
              </div>

              {/* Action button — sticky right */}
              <div style={cell({
                display: "flex", alignItems: "center", padding: "14px 16px",
                position: "sticky", right: 0,
                boxShadow: isDragOver
                  ? ["inset 0 2px 0 0 #05A105", "inset 0 -2px 0 0 #05A105", "inset -2px 0 0 0 #05A105"].join(", ")
                  : isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 1,
              })} {...cellProps}>
                {reconcilingViaUpload.has(row.name) ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#000000", whiteSpace: "nowrap" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
                      <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" stroke="#05A105" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Reconciling account
                  </span>
                ) : isReconciled ? (
                  <ReconciledCard
                    date={reconciledDates[row.name]}
                    status={reconciledStatuses[row.name] || "reconciled"}
                    suggestionCount={reconciledCounts[row.name]}
                    onPlay={() => onViewResults?.(row.name)}
                    onTipShow={(x, y, text) => setCardTip({ x, y, text })}
                    onTipHide={() => setCardTip(null)}
                  />
                ) : (
                  <SecondaryButton icon={<PlayCircleIcon color="#080908" />} onClick={() => onRunReconciliation?.(row.name)}>
                    Run reconciliation
                  </SecondaryButton>
                )}
              </div>

            </React.Fragment>
          );
        })}

      </div>
      </div> {/* end scrollable area */}

      {/* Footer count */}
      <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>
        {footerLabel}
      </div>
    </div>
    </>
  );
}

// ── Typewriter hook (word by word) ───────────────────────────────────────────
function useTypewriter(text, speed = 80, instant = false) {
  const words = text ? text.split(" ") : [];
  const [displayed, setDisplayed] = useState(instant && text ? words.length : 0);
  useEffect(() => {
    if (instant) {
      setDisplayed(words.length);
      return;
    }
    setDisplayed(0);
    if (!words.length) return;
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(i);
      if (i < words.length) setTimeout(tick, speed + Math.random() * 40);
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [text]);
  const visibleText = words.slice(0, displayed).join(" ");
  return { chars: visibleText, done: !!text && displayed >= words.length };
}

// ── Streaming message renderer ────────────────────────────────────────────────
// Renders plain text with optional bold segments, word by word.
// segments: [{ text, bold }]
function StreamingMessage({ segments, speed = 80, instant = false }) {
  const fullText = segments.map(s => s.text).join("");
  const { chars, done } = useTypewriter(fullText, speed, instant);

  // Map the streamed words back onto the segments to preserve bold spans
  let remaining = chars;
  const rendered = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!remaining) break;
    const slice = remaining.slice(0, seg.text.length);
    remaining = remaining.slice(seg.text.length);
    if (seg.bold) {
      rendered.push(<strong key={i}>{slice}</strong>);
    } else {
      rendered.push(<span key={i}>{slice}</span>);
    }
  }

  return <span>{rendered}</span>;
}

// ── All Documents Sidebar ─────────────────────────────────────────────────────
const ALL_DOCUMENTS = [
  { name: "Lloyds_Business_April_2026.pdf",        type: "pdf", date: "15 Apr, 2026" },
  { name: "Lloyds_Operations_GBP_April_2026.csv",  type: "csv", date: "15 Apr, 2026" },
  { name: "HSBC_Business_April_2026.pdf",           type: "pdf", date: "14 Apr, 2026" },
  { name: "Barclays_Operations_April_2026.csv",     type: "csv", date: "14 Apr, 2026" },
  { name: "AmEx_OP_GBP_April26.pdf",               type: "pdf", date: "12 Apr, 2026" },
  { name: "Mastercard_Business_April26.csv",        type: "csv", date: "12 Apr, 2026" },
];

function DocFileIcon({ type }) {
  if (type === "csv") return <CsvIcon width={20} height={24} />;
  return <PdfIcon width={20} height={24} />;
}

function AllDocumentsSidebar({ onClose, onSelect }) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => onClose(), 320);
  };

  const filtered = ALL_DOCUMENTS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (i) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleAdd = () => {
    const docs = [...selected].map(i => filtered[i]);
    onSelect?.(docs);
    close();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000 }} onClick={close}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }} />
      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 560,
          background: "#FFFFFF",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.10)",
          display: "flex", flexDirection: "column",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 28px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 500, color: "#080908", letterSpacing: "-0.3px" }}>All documents</span>
          <button
            onClick={close}
            style={{ width: 30, height: 30, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}
            onMouseEnter={e => e.currentTarget.querySelector("rect").setAttribute("fill", "#EBEBEB")}
            onMouseLeave={e => e.currentTarget.querySelector("rect").setAttribute("fill", "#F5F5F5")}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
              <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Search + table — unified container */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
          <div style={{ border: "1px solid #E9E9EB", borderRadius: 10, overflow: "hidden" }}>
            {/* Search row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: "1px solid #E9E9EB", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#4F4F4F", background: "transparent", fontFamily: "'Inter', sans-serif" }}
              />
              <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid #DBDBDB", borderRadius: 7, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908", flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.99996 4.16675V15.8334M4.16663 10.0001H15.8333" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add filter
              </button>
            </div>
            {/* Table header */}
            <div style={{ display: "flex", background: "#FBFBFB", borderBottom: "1px solid #E9E9EB", flexShrink: 0 }}>
              <div style={{ width: 44, flexShrink: 0, borderRight: "1px solid #E9E9EB" }} />
              <div style={{ flex: 1, padding: "10px 14px", fontSize: 14, color: "#8C8C8B", fontWeight: 400, borderRight: "1px solid #E9E9EB" }}>Name</div>
              <div style={{ width: 130, padding: "10px 14px", fontSize: 14, color: "#8C8C8B", fontWeight: 400, flexShrink: 0 }}>Date uploaded</div>
            </div>
            {/* Rows */}
            {filtered.map((doc, i) => {
              const isSelected = selected.has(i);
              return (
                <div
                  key={i}
                  onClick={() => toggleRow(i)}
                  style={{ display: "flex", alignItems: "center", borderBottom: i < filtered.length - 1 ? "1px solid #E9E9EB" : "none", cursor: "pointer", background: isSelected ? "#F4F9F1" : "#FFFFFF", transition: "background 0.1s" }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSelected ? "#F4F9F1" : "#FFFFFF"; }}
                >
                  {/* Checkbox cell */}
                  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRight: "1px solid #E9E9EB", alignSelf: "stretch" }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      border: isSelected ? "none" : "1.5px solid #CFCFD1",
                      background: isSelected ? "#05A105" : "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  {/* Name cell */}
                  <div style={{ flex: 1, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderRight: "1px solid #E9E9EB", minWidth: 0 }}>
                    <DocFileIcon type={doc.type} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
                      <div style={{ fontSize: 14, color: "#8C8C8B", marginTop: 1 }}>Bank statement</div>
                    </div>
                  </div>
                  {/* Date cell */}
                  <div style={{ width: 130, padding: "10px 14px", fontSize: 14, color: "#080908", flexShrink: 0 }}>{doc.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "16px 24px", flexShrink: 0, background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
          <button
            onClick={handleAdd}
            disabled={selected.size === 0}
            style={{
              width: "100%", height: 40, border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 500,
              background: selected.size === 0 ? "#E9E9EB" : "#05A105",
              color: selected.size === 0 ? "#BCBCBC" : "#FFFFFF",
              cursor: selected.size === 0 ? "default" : "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { if (selected.size > 0) e.currentTarget.style.background = "#048A04"; }}
            onMouseLeave={e => { if (selected.size > 0) e.currentTarget.style.background = "#05A105"; }}
          >
            {selected.size > 0 ? `Reconcile from ${selected.size} bank statement${selected.size > 1 ? "s" : ""}` : "Add documents"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Upload card ───────────────────────────────────────────────────────────────
function UploadCard({ onFileSelected, onFilesSelected, onOpenAllDocs, title = "Upload bank statement" }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
      onFileSelected?.(file);
    }
  };

  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    if (onFilesSelected) {
      setFileName(files.length === 1 ? files[0].name : files.length + " files");
      onFilesSelected(files);
    } else {
      handleFile(files[0]);
    }
  };

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E9E9EB",
      borderRadius: 16,
      padding: "24px",
      width: "100%",
      maxWidth: 480,
      boxSizing: "border-box",
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
    }}>
      {/* Heading */}
      <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 20 }}>
        {title}
      </p>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        style={{
          border: `1.5px dashed ${dragging ? "#05A105" : "#DBDBDB"}`,
          borderRadius: 12,
          padding: "36px 24px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: dragging ? "#F4F9F1" : "transparent",
          transition: "background 0.15s, border-color 0.15s",
          marginBottom: 16,
        }}
      >
        {/* 3-document fan illustration */}
        <svg width="86" height="56" viewBox="0 0 86 56" fill="none" style={{ marginBottom: 20 }}>
          <defs>
            <filter id="filter0_d_upload" x="15.84" y="-3.31" width="57.44" height="65.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4.96"/>
              <feGaussianBlur stdDeviation="4.13"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <clipPath id="clip0_upload">
              <rect width="86" height="56" fill="white"/>
            </clipPath>
          </defs>
          <g clipPath="url(#clip0_upload)">
            <path d="M53.2218 13.2854C53.7433 11.3393 55.7436 10.1844 57.6897 10.7059L76.3653 15.71L79.0693 22.1909L82.5746 30.5922L76.6263 52.7914C76.1049 54.7375 74.1046 55.8924 72.1585 55.3709L47.4927 48.7617C45.5466 48.2403 44.3917 46.2399 44.9132 44.2939L53.2218 13.2854Z" fill="#DCF0D7"/>
            <path d="M73.5917 26.0618L76.3652 15.7109L82.5746 30.5931L75.0427 28.5749C74.1084 28.3246 73.6412 28.1994 73.4287 27.8314C73.2162 27.4633 73.3414 26.9961 73.5917 26.0618Z" fill="#D0EFC8"/>
            <path d="M32.7772 13.2854C32.2557 11.3393 30.2554 10.1844 28.3093 10.7059L9.63377 15.71L6.92969 22.1909L3.42441 30.5922L9.37268 52.7914C9.89413 54.7375 11.8945 55.8924 13.8405 55.3709L38.5064 48.7617C40.4524 48.2403 41.6073 46.2399 41.0859 44.2939L32.7772 13.2854Z" fill="#D2DEF6"/>
            <path d="M12.4073 26.0618L9.63379 15.7109L3.42442 30.5931L10.9563 28.5749C11.8907 28.3246 12.3578 28.1994 12.5703 27.8314C12.7828 27.4633 12.6576 26.9961 12.4073 26.0618Z" fill="#BCCFF2"/>
            <g filter="url(#filter0_d_upload)">
              <path d="M24.1064 4.54527C24.1064 2.03499 26.1414 0 28.6517 0H52.7417L58.086 6.92787L65.0139 15.9084V44.5437C65.0139 47.0539 62.9789 49.0889 60.4686 49.0889H28.6517C26.1414 49.0889 24.1064 47.0539 24.1064 44.5437V4.54527Z" fill="#F4F4F2"/>
              <path d="M40.5298 16.6758C45.1308 15.296 40.3532 38.7468 36.769 35.521C32.3247 31.521 53.4258 25.4246 51.4695 31.2906C49.7549 36.4317 35.4016 18.2137 40.5298 16.6758Z" stroke="#FF6056" strokeWidth="1.57261"/>
              <path d="M52.7412 13.3517V0L65.0134 15.9085H55.2979C54.0927 15.9085 53.4901 15.9085 53.1156 15.534C52.7412 15.1596 52.7412 14.557 52.7412 13.3517Z" fill="#D6D6D4"/>
            </g>
          </g>
        </svg>

        {/* Primary instruction — two lines matching screenshot */}
        <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", textAlign: "center", margin: "0 0 2px" }}>
          Drag &amp; drop your file here, or
        </p>
        <p style={{ fontSize: 14, textAlign: "center", margin: "0 0 10px" }}>
          <span style={{ color: "#05A105", fontWeight: 600, cursor: "pointer" }} onClick={() => fileInputRef.current?.click()}>
            Choose a file
          </span>{" "}to upload it manually
        </p>

        {/* Subtitle */}
        <p style={{ fontSize: 13, color: "#8C8C8B", margin: "0 0 20px", textAlign: "center" }}>
          Can be any document type
        </p>

        {/* Selected file name */}
        {fileName && (
          <p style={{ fontSize: 12, color: "#545453", marginBottom: 12, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            📄 {fileName}
          </p>
        )}

        {/* Buttons row — inside the drop zone */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, width: "100%" }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              flex: "1 1 180px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "10px 16px",
              background: "#05A105", border: "none", borderRadius: 8,
              cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#048A04"}
            onMouseLeave={e => e.currentTarget.style.background = "#05A105"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Upload document
          </button>
          <button
            onClick={() => onOpenAllDocs?.()}
            style={{
              flex: "1 1 180px", display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "10px 16px",
              background: "#FFFFFF", border: "1px solid #DBDBDB", borderRadius: 8,
              cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#DBDBDB"; }}
          >
            All documents
          </button>
        </div>
      </div>

    </div>
  );
}

// ── Reconciliation progress steps ─────────────────────────────────────────────
const RECONCILIATION_STEPS = [
  { title: "Reading source",                                    subtext: null,                                                    duration: 900  },
  { title: "Parsing bank statement",                            subtext: "Found 380 transactions. Period 1-31 Mar 2026.",         duration: 1500 },
  { title: "Checking transactions against statement balance",   subtext: "Balance matching (£12,439.00)",                        duration: 1300 },
  { title: "Matching GL records",                               subtext: "361 of 380 bank statement lines are matching.",         duration: 1800 },
  { title: "Summarise and suggest actions",                     subtext: null,                                                    duration: 1000 },
];

// ── RecommendationCard ───────────────────────────────────────────────────────
function RecommendationCard({
  title = "Missing entry",
  description = "",
  statusLabel = "Unresolved",
  statusStyle = { background: "#FDF8EE", border: "none", color: "#D5A750" },
  collapsed = false,
  tableRow = {},
  tableColumns = null,
  primaryLabel = "Create spend money",
  secondaryLabel = "Upload document",
  external = false,
  fileAction = null,
  onPrimaryAction,
  onFileAction,
  onSecondaryAction,
  onIgnore,
  onMore,
}) {
  const [expanded, setExpanded] = useState(!collapsed);
  // Sync expanded state when collapsed prop changes (e.g. after publish)
  useEffect(() => { setExpanded(!collapsed); }, [collapsed]);
  const isResolved = collapsed;
  const showBody = expanded;

  const PdfIcon = () => <InvoiceIcon width={14} height={17} />;
  const ExternalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 7.5L17.5 2.5M17.5 2.5H12.5M17.5 2.5L10.8333 9.16667M8.33333 4.16667H6.5C5.09987 4.16667 4.3998 4.16667 3.86502 4.43915C3.39462 4.67883 3.01217 5.06129 2.77248 5.53169C2.5 6.06647 2.5 6.76654 2.5 8.16667V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H11.8333C13.2335 17.5 13.9335 17.5 14.4683 17.2275C14.9387 16.9878 15.3212 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9001 15.8333 13.5V11.6667" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const MoreIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="2.5" r="1.2" fill="#545453"/>
      <circle cx="7" cy="7" r="1.2" fill="#545453"/>
      <circle cx="7" cy="11.5" r="1.2" fill="#545453"/>
    </svg>
  );
  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="none" stroke="#05A105" strokeWidth="1.5"/>
      <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#05A105" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 12, padding: "20px", overflow: "hidden", fontFamily: "'Inter', sans-serif", transition: "all 0.35s ease" }}>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showBody ? 10 : 0, transition: "margin 0.35s ease", cursor: isResolved ? "pointer" : "default" }}
        onClick={isResolved ? () => setExpanded(o => !o) : undefined}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isResolved && <SuccessIcon />}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: statusStyle.background, border: statusStyle.border, color: statusStyle.color, whiteSpace: "nowrap", transition: "all 0.3s ease" }}>
            {statusLabel}
          </span>
          <div style={{ display: "flex", transform: showBody ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s" }}>
            <ChevronUpIcon />
          </div>
        </div>
      </div>
      {showBody && (
        <p style={{ fontSize: 13, color: "#4F4F4F", lineHeight: "20px", margin: "0 0 14px" }}>{description}</p>
      )}
      {showBody && (
      <>
      {tableRow && Object.keys(tableRow).length > 0 && (
      <div style={{ marginBottom: isResolved ? 0 : 14 }}>
        <DataTable
          columns={tableColumns || [
            { key: "state",   label: "State",     width: "1fr" },
            { key: "contact", label: "Contact",   width: "1.4fr" },
            { key: "date",    label: "Date",      width: "1fr" },
            { key: "amount",  label: "Amount",    width: "0.8fr" },
          ]}
          rows={[tableRow]}
        />
      </div>
      )}
      {!isResolved && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PrimaryButton style={{ height: 40, padding: "0 14px", fontSize: 13, borderRadius: 8 }} icon={external ? <ExternalIcon /> : undefined} onClick={onPrimaryAction}>
          {primaryLabel}
        </PrimaryButton>
        {fileAction ? (
          <SecondaryButton style={{ height: 40, padding: "0 12px", fontSize: 13, borderRadius: 8, borderColor: "#EFF1F4" }} icon={null} onClick={onFileAction}>
            <PdfIcon />{fileAction}
          </SecondaryButton>
        ) : (
          <SecondaryButton style={{ height: 40, padding: "0 12px", fontSize: 13, borderRadius: 8, borderColor: "#EFF1F4" }} onClick={onSecondaryAction || onFileAction}>
            {secondaryLabel}
          </SecondaryButton>
        )}
        {onMore && (
          <button style={{ width: 40, height: 40, border: "1px solid #EFF1F4", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
            onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            onClick={onMore}
          ><MoreIcon /></button>
        )}
        <div style={{ flex: 1 }} />
        <button style={{ height: 40, padding: "0 12px", border: "none", borderRadius: 8, background: "#FCEFEC", fontSize: 13, fontWeight: 500, color: "#C8543A", cursor: "pointer", whiteSpace: "nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background = "#F9E5E1"}
          onMouseLeave={e => e.currentTarget.style.background = "#FCEFEC"}
          onClick={onIgnore}
        >Ignore suggestion</button>
      </div>
      )}
      </>
      )}
    </div>
  );
}

// ── Canvas loading spinner ────────────────────────────────────────────────────
function CanvasLoader() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", gap: 14, fontFamily: "'Inter', sans-serif",
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
        <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0 }}>Loading results…</p>
    </div>
  );
}

// ── Chevron up icon (from chevron-down.svg upload) ───────────────────────────
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12.5L10 7.5L5 12.5" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Spend Money Sidebar ───────────────────────────────────────────────────────
function SpendMoneySidebar({ contact = "Yorkshire Tea Estates", amount = "£240.00", date = "24 Feb 2026", onClose, onPublish }) {
  const [spentAs, setSpentAs] = useState("spend");
  const [amountsAre, setAmountsAre] = useState("Tax inclusive");
  const [reference, setReference] = useState("YTE-26-03");
  const [bankStatement, setBankStatement] = useState(contact);
  const [issueDate, setIssueDate] = useState(date);
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [lineItemsOpen, setLineItemsOpen] = useState(true);
  const [publishing, setPublishing] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onPublish?.();
        onClose();
      }, 320);
    }, 2500);
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #E9E9EB", borderRadius: 8,
    fontSize: 14, color: "#080908", background: "#FFFFFF", outline: "none",
    fontFamily: "'Inter', sans-serif", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 14, fontWeight: 500, color: "#000000", marginBottom: 6, display: "block" };
  const sectionHeaderStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 16px", cursor: "pointer", background: "none", border: "none",
    width: "100%",
  };
  const sectionBarStyle = {
    margin: "16px 16px 0", background: "#F5F5F5", borderRadius: 8,
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: "#080908" }}>Review spend money</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Details section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={() => setDetailsOpen(o => !o)}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Details</span>
              <div style={{ transform: detailsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {detailsOpen && (
            <div style={{ padding: "16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Bank statement line */}
              <div>
                <label style={labelStyle}>Bank statement line</label>
                <input style={inputStyle} value={bankStatement} onChange={e => setBankStatement(e.target.value)} />
              </div>
              {/* Issue date */}
              <div>
                <label style={labelStyle}>Issue date</label>
                <div style={{ position: "relative" }}>
                  <input style={{ ...inputStyle, paddingRight: 36 }} value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
              {/* Reference */}
              <div>
                <label style={labelStyle}>Reference</label>
                <input style={inputStyle} value={reference} onChange={e => setReference(e.target.value)} />
              </div>
              {/* Spent as */}
              <div>
                <label style={labelStyle}>Spent as</label>
                <div style={{ display: "flex", gap: 24 }}>
                  {[["spend", "Spend money"], ["receive", "Receive money"]].map(([val, label]) => (
                    <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#080908" }}>
                      <div onClick={() => setSpentAs(val)} style={{
                        width: 18, height: 18, borderRadius: "50%", border: `2px solid ${spentAs === val ? "#05A105" : "#CFCFD1"}`,
                        background: spentAs === val ? "#05A105" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer",
                      }}>
                        {spentAs === val && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              {/* Amounts are */}
              <div>
                <label style={labelStyle}>Amounts are</label>
                <div style={{ position: "relative" }}>
                  <select style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }} value={amountsAre} onChange={e => setAmountsAre(e.target.value)}>
                    <option>Tax inclusive</option>
                    <option>Tax exclusive</option>
                    <option>No tax</option>
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Line items section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={() => setLineItemsOpen(o => !o)}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Line items</span>
              <div style={{ transform: lineItemsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {lineItemsOpen && (
          <div style={{ padding: "16px 28px" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, marginBottom: 8, fontSize: 12, fontWeight: 500, color: "#8C8C8B", borderBottom: "1px solid #ECECEC", paddingBottom: 8 }}>
              <span>Description</span>
              <span style={{ textAlign: "right" }}>Actions</span>
              <span style={{ width: 24 }} />
            </div>
            {/* Line item row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ECECEC" }}>
              <div>
                <div style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{contact} Spend Money</div>
                <div style={{ fontSize: 12, color: "#8C8C8B", marginTop: 2 }}>Cost of Goods Sold</div>
              </div>
              <span style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{amount}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#8C8C8B", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11.5V14H4.5L11.87 6.63L9.37 4.13L2 11.5ZM13.71 4.79a.996.996 0 000-1.41L12.21 1.88a.996.996 0 00-1.41 0l-1.18 1.18 2.5 2.5 1.59-1.77z" fill="#8C8C8B"/></svg>
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#C8543A", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2.667A.667.667 0 015.667 2h4.666A.667.667 0 0111 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333A.667.667 0 004.667 14h6.666a.667.667 0 00.667-.667L12.667 4" stroke="#C8543A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, marginBottom: 16 }}>
              {[["Sub total", "£48.00"], ["Tax", "£192.00"], ["Total", amount]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "flex-end", gap: 32, fontSize: label === "Total" ? 14 : 13, fontWeight: label === "Total" ? 600 : 400, color: "#080908" }}>
                  <span style={{ color: label === "Total" ? "#080908" : "#8C8C8B" }}>{label}</span>
                  <span style={{ minWidth: 70, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
            {/* Add line item */}
            <button style={{
              width: "100%", padding: "10px 16px", border: "1.5px dashed #CFCFD1", borderRadius: 8,
              background: "none", cursor: "pointer", fontSize: 14, color: "#8C8C8B", textAlign: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#05A105"; e.currentTarget.style.color = "#05A105"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.color = "#8C8C8B"; }}
            >
              Add line item
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{
          flex: 1, padding: "10px 16px", border: "1px solid #E9E9EB", borderRadius: 8,
          background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          Cancel
        </button>
        <button
          onClick={!publishing ? handlePublish : undefined}
          style={{
            flex: 2, padding: "10px 16px", border: publishing ? "1px solid #E9E9EB" : "none", borderRadius: 8,
            background: publishing ? "#F5F5F5" : "#05A105", cursor: publishing ? "default" : "pointer",
            fontSize: 14, fontWeight: 500, color: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { if (!publishing) e.currentTarget.style.background = "#048C04"; }}
          onMouseLeave={e => { if (!publishing) e.currentTarget.style.background = "#05A105"; }}
        >
          {publishing ? (
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: "2.5px solid #E9E9EB",
              borderTopColor: "#05A105",
              animation: "spin 0.75s linear infinite",
            }} />
          ) : "Create spend money and publish"}
        </button>
      </div>
    </div>
  );
}

// ── Icons for BatchDraftSidebar ────────────────────────────────────────────────
function BankBuildingIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4.965 8.938v7.944M9.434 8.938v7.944M14.399 8.938v7.944M18.868 8.938v7.944M2.979 18.471v.795c0 .556 0 .834.108 1.047a.993.993 0 00.434.434c.213.108.49.108 1.047.108h14.697c.556 0 .834 0 1.047-.108a.993.993 0 00.434-.434c.108-.213.108-.49.108-1.047v-.795c0-.556 0-.834-.108-1.047a.993.993 0 00-.434-.434c-.213-.108-.49-.108-1.047-.108H4.568c-.556 0-.834 0-1.047.108a.993.993 0 00-.434.434c-.108.213-.108.49-.108 1.047zM11.572 3.056l-7.349 1.633c-.444.099-.666.148-.832.268a.993.993 0 00-.333.414c-.08.188-.08.415-.08.87v1.109c0 .556 0 .834.109 1.046.095.187.247.339.434.434.212.109.49.109 1.046.109h14.698c.556 0 .834 0 1.046-.109a.993.993 0 00.434-.434c.108-.212.108-.49.108-1.046V6.24c0-.454 0-.682-.08-.87a.993.993 0 00-.333-.413c-.166-.12-.388-.17-.832-.268l-7.348-1.633a1.987 1.987 0 00-.259-.03 1.006 1.006 0 00-.173 0c-.066.006-.13.02-.259.03z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PencilIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M16.364 1.818l3.636 3.637M1.818 20l1.16-4.255c.076-.277.114-.416.172-.546a1.82 1.82 0 01.19-.326c.083-.114.185-.216.389-.42l9.394-9.394c.18-.18.27-.27.374-.303a.364.364 0 01.28 0c.104.034.194.124.374.304l2.607 2.608c.18.18.27.27.304.373a.364.364 0 010 .281c-.034.104-.124.194-.304.374L7.364 18.09c-.203.204-.305.305-.42.389a1.82 1.82 0 01-.325.19c-.13.057-.269.095-.546.171L1.818 20z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InvoiceFileIcon({ width = 24, height = 30 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 31 38" fill="none">
      <path d="M0 3.434A3.434 3.434 0 013.434 0H21.637l4.038 5.235 5.235 6.786v21.637a3.434 3.434 0 01-3.434 3.434H3.434A3.434 3.434 0 010 33.658V3.434z" fill="#F4F4F2"/>
      <path d="M12.297 12.601c3.477-1.043-.133 16.677-2.841 14.24-3.358-3.023 12.586-7.63 11.107-3.197-1.295 3.885-12.141-9.88-8.266-11.043z" stroke="#FF6056" strokeWidth="1.188"/>
      <path d="M21.637 10.089V0l9.273 12.021h-7.341c-.911 0-1.366 0-1.649-.283-.283-.283-.283-.738-.283-1.649z" fill="#D6D6D4"/>
    </svg>
  );
}

function FileQuestionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M16.6666 7.916V5.666c0-1.4-.0001-2.1-.2725-2.635a2.5 2.5 0 00-1.0925-1.0925C14.7668 1.666 14.0667 1.666 12.6666 1.666H7.333c-1.4 0-2.1 0-2.635.2725a2.5 2.5 0 00-1.0925 1.0925C3.333 3.566 3.333 4.266 3.333 5.666v8.667c0 1.4 0 2.1.273 2.635a2.5 2.5 0 001.092 1.092c.535.273 1.235.273 2.635.273h4.333M11.667 9.166H6.667M8.333 12.499H6.667M13.333 5.833H6.667M13.75 12.501a2.083 2.083 0 013.641.625c0 1.249-1.874 1.874-1.874 1.874M15.542 17.499h.008" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BankStatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 7.499v6.667M7.917 7.499v6.667M12.083 7.499v6.667M15.833 7.499v6.667M2.5 15.499v.667c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.411.091-.878v-.667c0-.467 0-.7-.091-.878a.833.833 0 00-.364-.364c-.178-.091-.412-.091-.878-.091H3.833c-.467 0-.7 0-.878.091a.833.833 0 00-.364.364c-.091.178-.091.411-.091.878zM9.711 2.563L3.544 3.934c-.373.083-.559.124-.698.224a.833.833 0 00-.279.347C2.5 4.663 2.5 4.854 2.5 5.235v.931c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.412.091-.878v-.931c0-.382 0-.573-.068-.73a.833.833 0 00-.279-.347c-.139-.1-.326-.142-.698-.225l-6.167-1.37a1.167 1.167 0 00-.216-.041.833.833 0 00-.146 0c-.054.005-.108.017-.216.041z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UsersCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M13.333 15l1.667 1.667 3.333-3.334M10 12.5H6.667c-1.554 0-2.33 0-2.943.254a3.333 3.333 0 00-1.804 1.804C1.667 15.17 1.667 15.947 1.667 17.5M12.917 2.742a3.333 3.333 0 010 6.183M11.25 5.833a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 11v1.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V11M8 2v8M5 7l3 3 3-3" stroke="#7C7C7C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Batch Draft Sidebar ───────────────────────────────────────────────────────
function BatchDraftSidebar({ contact = "Yorkshire Tea Estates", amount = "£240.00", date = "23 March 2026", fileName = "yte-invoice172.pdf", onClose, onConfirm }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Document");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => { onConfirm?.(); onClose(); }, 320);
    }, 2000);
  };

  const cardStyle = { border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" };
  const tabs = ["Document", "Notes", "Audit trail"];

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#080908" }}>{contact}</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── Bank account card ── */}
        <div style={cardStyle}>
          {/* Bank row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BankBuildingIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyds Bank - Business</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>1048 9418-2251</div>
              </div>
            </div>
            <button style={{ padding: "7px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
              onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
              onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            >Copy upload link</button>
          </div>
          {/* Amount + Date */}
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #F0F0F0" }}>
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Amount</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>-{amount}</div>
            </div>
            <div style={{ width: 1, background: "#F0F0F0", height: 28, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Date</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{date}</div>
            </div>
          </div>
        </div>

        {/* ── Batch info card ── */}
        <div style={cardStyle}>
          {/* Batch header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PencilIcon size={16} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyd Bank - Operations GBP</div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>Drafted batch</div>
            </div>
          </div>
          {/* Stats */}
          <div style={{ margin: "0 18px", border: "1px solid #E9E9EB", borderRadius: 8 }}>
            <div style={{ display: "flex", padding: "10px 0", alignItems: "center" }}>
              {[
                { icon: <FileQuestionIcon />, label: "8 requests" },
                { icon: <BankStatIcon />, label: "2 accounts" },
                { icon: <UsersCheckIcon />, label: "2 assignees" },
              ].map(({ icon, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div style={{ width: 1, background: "#E9E9EB", height: 14, flexShrink: 0 }} />}
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#1F2024", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    {icon} {label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Separator below stats */}
          <div style={{ margin: "12px 18px 0", borderTop: "1px solid #F0F0F0" }} />
          {/* Assignees */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "16px 18px" }}>
            {[["S", "Sara Thompson"], ["O", "Oliver Davies"]].map(([initial, name], i) => (
              <React.Fragment key={name}>
                {i > 0 && <div style={{ width: 1, background: "#E9E9EB", alignSelf: "stretch", margin: "0 16px" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#6389CF" }}>{initial}</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#080908" }}>{name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Archive request ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 2 }}>Archive request</div>
            <div style={{ fontSize: 14, color: "#7C7C7C" }}>If no document needed, archive this request</div>
          </div>
          <button style={{ padding: "7px 14px", border: "none", borderRadius: 8, background: "#FCEFEC", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#C8543A", whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9DDD8"}
            onMouseLeave={e => e.currentTarget.style.background = "#FCEFEC"}
          >Archive request</button>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", borderBottom: "1px solid #ECECEC", marginTop: 4 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => onTabChange(tab)} style={{
              padding: "10px 0", marginRight: 24, fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#080908" : "#7C7C7C", background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #05A105" : "2px solid transparent",
              cursor: "pointer", transition: "all 0.15s",
            }}>{tab}</button>
          ))}
        </div>

        {/* ── Document tab ── */}
        {activeTab === "Document" && (
          <div style={cardStyle}>
            {/* Invoice header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid #F0F0F0" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Invoice</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 2 }}><span style={{ fontWeight: 500 }}>Direct Expenses</span> 325</div>
              </div>
              <button style={{ padding: "6px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
              >Review</button>
            </div>
            {/* Invoice detail */}
            <div style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#080908" }}>
                <span style={{ fontWeight: 500 }}>{contact}</span> 31 Jan 2026
              </div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 4 }}>
                <span style={{ fontWeight: 500, color: "#080908" }}>-{amount}</span> 20% tax, £48.00
              </div>
            </div>
            {/* Attached PDF */}
            <div style={{ margin: "0 14px 14px", border: "1px solid #E9E9EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", height: 70 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <InvoiceFileIcon width={32} height={38} />
                <span style={{ fontSize: 14, color: "#080908" }}>{fileName}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ padding: "3px 8px", borderRadius: 6, background: "#FDF8EE", fontSize: 13, fontWeight: 500, color: "#D5A750" }}>Review</span>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <DownloadIcon />
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#7C7C7C" strokeWidth="1.25" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Notes" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No notes yet.</div>
        )}
        {activeTab === "Audit trail" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No audit events yet.</div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 28px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ padding: "10px 24px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >Close</button>
        <button onClick={!confirming ? handleConfirm : undefined}
          style={{ flex: 1, padding: "10px 16px", border: confirming ? "1px solid #E9E9EB" : "none", borderRadius: 8, background: confirming ? "#F5F5F5" : "#05A105", cursor: confirming ? "default" : "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}
          onMouseEnter={e => { if (!confirming) e.currentTarget.style.background = "#04880E"; }}
          onMouseLeave={e => { if (!confirming) e.currentTarget.style.background = "#05A105"; }}
        >
          {confirming ? (
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid #E9E9EB", borderTopColor: "#05A105", animation: "spin 0.75s linear infinite" }} />
          ) : "Publish to Xero"}
        </button>
      </div>
    </div>
  );
}

// ── Results sidebar: Progress box ────────────────────────────────────────────
function SuggestionsBox({ isCleanReconcile, allJustResolved = false, accountStatus, resolvedCount, totalSuggestions, matchedTotal, navCategories, resolvedCards }) {
  const color = accountStatus === "completed" ? "#4C71DF" : "#05A105";
  const bg    = accountStatus === "completed" ? "#EEF2FF" : "#EAF2E2";
  const label = accountStatus === "completed" ? "Completed" : "Reconciled";
  const msg   = accountStatus === "completed" ? "Ready to reconcile in Xero" : "Fully reconciled in Xero";
  const pct   = totalSuggestions > 0 ? Math.min(100, Math.round((resolvedCount / totalSuggestions) * 100)) : 0;
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Suggestions</span>
      </div>
      {/* Progress / clean state */}
      <div style={{ borderTop: "1px solid #F0F0F0", padding: "16px" }}>
        {allJustResolved ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Status row */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#4C71DF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#4C71DF" }}>Ready to reconcile in Xero</span>
            </div>
            {/* Description */}
            <span style={{ fontSize: 12, color: "#8C8C8B", lineHeight: "18px" }}>All suggestions resolved. Go to Xero to finalise and post the reconciliation.</span>
            {/* Progress */}
            <div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: "#080908" }}>{resolvedCount}</span>
                <span style={{ fontSize: 14, color: "#8C8C8B" }}>{"\u2009"}/ {totalSuggestions} resolved</span>
              </div>
              <div style={{ height: 4, background: "#E9E9EB", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "#4C71DF", borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>
          </div>
        ) : isCleanReconcile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", paddingTop: 4, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 12L13 5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color }}>{label}</span>
            <span style={{ fontSize: 14, color: "#8C8C8B", lineHeight: "20px" }}>{msg}</span>
            {matchedTotal && <span style={{ fontSize: 14, fontWeight: 500, color: "#4F4F4F", marginTop: 2 }}>{matchedTotal} transactions matched</span>}
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#080908" }}>{resolvedCount}</span>
              <span style={{ fontSize: 14, color: "#8C8C8B" }}>{"\u2009"}/ {totalSuggestions} resolved</span>
            </div>
            <div style={{ height: 4, background: "#E9E9EB", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#05A105", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </>
        )}
      </div>
      {/* Nav list */}
      {!isCleanReconcile && (
        <div style={{ borderTop: "1px solid #F0F0F0", padding: "8px 6px 10px", maxHeight: 420, overflowY: "auto" }}>
          {navCategories.length === 0 ? (
            <div style={{ padding: "10px 10px", fontSize: 14, color: "#8C8C8B", textAlign: "center" }}>No suggestions</div>
          ) : (
            navCategories.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: ci < navCategories.length - 1 ? 6 : 0 }}>
                <div style={{ padding: "4px 10px 4px", fontSize: 14, fontWeight: 400, color: "#ADADAD" }}>{cat.label}</div>
                {cat.items.map((item, ii) => {
                  const isResolved = resolvedCards.has(cat.baseIdx + ii);
                  return (
                    <button
                      key={ii}
                      onClick={() => scrollTo(`result-${cat.key}-${ii}`)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F7F7F7"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      {isResolved ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="7.25" stroke="#05A105" strokeWidth="1.25"/>
                          <path d="M4.5 8.5L7 11L11.5 5.5" stroke="#05A105" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="8" cy="8" r="7.25" stroke="#D1D1D1" strokeWidth="1"/>
                        </svg>
                      )}
                      <span style={{ fontSize: 14, color: isResolved ? "#ADADAD" : "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.contact}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── Results panel ─────────────────────────────────────────────────────────────
function ResultsPanel({ accountName, onOpenSpendMoney, onOpenBatchDraft, resolvedCards = new Set(), onResolveCard, onShowToast, isCleanReconcile = false, allJustResolved = false, onAccountsOverview = null, matchedTotal = null, accountStatus = null, boxesOpen = true }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const containerRef = useRef(null);

  const isHSBC = accountName === "HSBC - Business Transactions";
  // When the user resolved all suggestions themselves, keep the full view — only the box header changes
  const effectiveClean = isCleanReconcile && !allJustResolved;

  const resultRows = effectiveClean ? [
    { description: "Missing entries",    issues: 0 },
    { description: "Anomalies",          issues: 0 },
    { description: "Duplicates",         issues: 0 },
    { description: "Date differences",   issues: 0 },
    { description: "Omitted",            issues: 0 },
    { description: "General",            issues: 0 },
  ] : isHSBC ? [
    { description: "Missing entries", issues: 1 },
  ] : accountName === "Barclays - Operations" ? [
    { description: "Missing entries",    issues: 2 },
    { description: "Anomalies",          issues: 1 },
    { description: "Omitted",            issues: 1 },
    { description: "General",            issues: 1 },
  ] : accountName === "American Express OP GBP" ? [
    { description: "Missing entries",    issues: 1 },
    { description: "Date differences",   issues: 2 },
    { description: "Duplicates",         issues: 1 },
  ] : accountName === "Mastercard Business" ? [
    { description: "Missing entries",    issues: 1 },
    { description: "Anomalies",          issues: 1 },
    { description: "Duplicates",         issues: 1 },
  ] : [
    { description: "Missing entries",    issues: 3 },
    { description: "Anomalies",          issues: 1 },
    { description: "Duplicates",         issues: 1 },
    { description: "Date differences",   issues: 1 },
    { description: "Omitted",            issues: 1 },
    { description: "General",            issues: 1 },
  ];

    // Per-account suggestion cards — idx must align with navCats baseIdx in boxes section
  const ACCOUNT_CARDS = {
    "HSBC - Business Transactions": [
      { idx: 0, cat: "missing", contact: "Anchor & Webb Consulting", state: "Open", date: "21 Mar 2026", amount: "£875.00", email: "20 Mar, 10:30", description: "A bank statement line for Anchor & Webb Consulting (£875.00) dated 21 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
    ],
    "Barclays - Operations": [
      { idx: 0, cat: "missing",   contact: "Hillcrest Imports",    state: "Open",   date: "18 Mar 2026", amount: "£620.00",   email: "17 Mar, 09:15", description: "A bank statement line for Hillcrest Imports (£620.00) dated 18 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "missing",   contact: "NorthStar Media",      state: "Review", date: "11 Mar 2026", amount: "£1,450.00", email: "10 Mar, 14:30", description: "A bank statement line for NorthStar Media (£1,450.00) dated 11 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Review and publish", external: false, fileAction: "NorthStar-invoice.pdf" },
      { idx: 2, cat: "anomaly",   contact: "Parkway Solutions",    state: "Open",   date: "15 Mar 2026", amount: "£7,200.00", email: "14 Mar, 11:00", description: "A transaction of £7,200.00 from Parkway Solutions is significantly above the account average. This unusual amount may require manual review.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 3, cat: "omitted",   contact: "Central Freight Co",   state: "Open",   date: "5 Mar 2026",  amount: "£3,800.00", email: "5 Mar, 08:00",  description: "A bank statement line for Central Freight Co (£3,800.00) on 5 Mar 2026 has no corresponding GL entry in Xero. This transaction may have been omitted.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 4, cat: "general",   contact: "Unclassified",         state: "Open",   date: "20 Mar 2026", amount: "£140.00",   email: "19 Mar, 16:45", description: "A transaction of £140.00 on 20 Mar 2026 could not be automatically classified. Manual review is required to assign the correct account code in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
    "American Express OP GBP": [
      { idx: 0, cat: "missing",   contact: "Vantage Digital",      state: "Open",   date: "19 Mar 2026", amount: "£890.00",   email: "18 Mar, 10:00", description: "A bank statement line for Vantage Digital (£890.00) dated 19 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "date",      contact: "Apex Consulting",       state: "Open",   date: "13 Mar 2026", amount: "£2,100.00", email: "12 Mar, 09:30", description: "A bank statement entry for Apex Consulting dated 13 Mar 2026 is matched to a GL entry dated 18 Mar 2026 — a 5-day discrepancy.", primaryLabel: "Acknowledge", external: false, fileAction: null },
      { idx: 2, cat: "date",      contact: "BlueSky Events",        state: "Open",   date: "7 Mar 2026",  amount: "£560.00",   email: "6 Mar, 15:20",  description: "A bank statement entry for BlueSky Events dated 7 Mar 2026 is matched to a GL entry dated 10 Mar 2026 — a 3-day discrepancy.", primaryLabel: "Acknowledge", external: false, fileAction: null },
      { idx: 3, cat: "duplicate", contact: "Vantage Digital",       state: "Open",   date: "19 Mar 2026", amount: "£890.00",   email: "18 Mar, 10:00", description: "Two identical transactions of £890.00 from Vantage Digital were recorded on 19 Mar 2026. One entry may be a duplicate in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
    "Mastercard Business": [
      { idx: 0, cat: "missing",   contact: "Harrison & Webb",       state: "Open",   date: "16 Mar 2026", amount: "£730.00",   email: "15 Mar, 11:00", description: "A bank statement line for Harrison & Webb (£730.00) dated 16 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "anomaly",   contact: "Clearpoint Services",   state: "Open",   date: "9 Mar 2026",  amount: "£5,500.00", email: "8 Mar, 14:15",  description: "A transaction of £5,500.00 from Clearpoint Services is significantly above the account average. This unusual amount may require manual review.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 2, cat: "duplicate", contact: "Harrison & Webb",       state: "Open",   date: "16 Mar 2026", amount: "£730.00",   email: "15 Mar, 11:00", description: "Two identical transactions of £730.00 from Harrison & Webb were recorded on 16 Mar 2026. One entry may be a duplicate in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
  };

  const CAT_LABELS = { missing: "Missing entry", anomaly: "Anomaly", duplicate: "Duplicate", date: "Date difference", omitted: "Omitted", general: "General" };

  // Default (Lloyds Bank - Business) card lists
  const missingEntries = [
    { state: "Open",   contact: "Yorkshire Tea Estates",     date: "17 Mar 2026", amount: "£240.00",   email: "12 Mar, 09:00", description: "A bank statement line for Yorkshire Tea Estates (£240.00) dated 17 Mar 2026 was found with no matching GL entry in Xero.",     primaryLabel: "Create spend money", external: false, fileAction: null },
    { state: "Review", contact: "Clifton & Harrow Supplies", date: "14 Mar 2026", amount: "£1,180.00", email: "13 Mar, 10:15", description: "A bank statement line for Clifton & Harrow Supplies (£1,180.00) dated 14 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Review and publish", external: false, fileAction: "CliftonHarrow-invoice.pdf" },
    { state: "Ready",  contact: "Meridian Office Solutions", date: "9 Mar 2026",  amount: "£530.00",   email: "8 Mar, 16:40",  description: "A bank statement line for Meridian Office Solutions (£530.00) dated 9 Mar 2026 was found with no matching GL entry in Xero.",  primaryLabel: "Reconcile in Xero", external: true,  fileAction: "Meridian-invoice.pdf" },
  ];
  const anomalies = [
    { state: "Open", contact: "Bakery & Food Supplies", date: "12 Mar 2026", amount: "£4,850.00", email: "10 Mar, 11:30", description: "A transaction of £4,850.00 from Bakery & Food Supplies is significantly above the account average of £240.00. This unusual amount may require manual review.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];
  const duplicates = [
    { state: "Open", contact: "Yorkshire Tea Estates", date: "17 Mar 2026", amount: "£240.00", email: "15 Mar, 08:45", description: "Two identical transactions of £240.00 from Yorkshire Tea Estates were recorded on 17 Mar 2026. One entry may be a duplicate in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];
  const dateDifferences = [
    { state: "Open", contact: "Direct Expenses", date: "14 Mar 2026", amount: "£320.00", email: "13 Mar, 14:00", description: "A bank statement entry dated 14 Mar 2026 is matched to a GL entry dated 17 Mar 2026 — a 3-day discrepancy. Please confirm if this date difference is intentional.", primaryLabel: "Acknowledge", external: false, fileAction: null },
  ];
  const omitted = [
    { state: "Open", contact: "Internal Transfer", date: "28 Feb 2026", amount: "£12,000.00", email: "28 Feb, 09:00", description: "A bank statement line for an internal transfer of £12,000.00 on 28 Feb 2026 has no corresponding GL entry in Xero. This transaction may have been omitted.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];
  const general = [
    { state: "Open", contact: "Unclassified", date: "22 Mar 2026", amount: "£85.00", email: "21 Mar, 17:20", description: "A transaction of £85.00 on 22 Mar 2026 could not be automatically classified. Manual review is required to assign the correct account code in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];


  const bannerConfig = null; // banner removed

  // Data for the sidebar boxes
  const navCategories = effectiveClean ? [] : [
    { key: "missing",   label: "Missing entries",   items: missingEntries,  baseIdx: 0 },
    { key: "anomaly",   label: "Anomalies",          items: isHSBC ? [] : anomalies,       baseIdx: 3 },
    { key: "duplicate", label: "Duplicates",         items: isHSBC ? [] : duplicates,      baseIdx: 4 },
    { key: "date",      label: "Date differences",   items: isHSBC ? [] : dateDifferences, baseIdx: 5 },
    { key: "omitted",   label: "Omitted",            items: isHSBC ? [] : omitted,         baseIdx: 6 },
    { key: "general",   label: "General",            items: isHSBC ? [] : general,         baseIdx: 7 },
  ].filter(c => c.items.length > 0);

  const categoryCounts = navCategories.map(c => ({ label: c.label, count: c.items.length }));
  const totalSuggestions = categoryCounts.reduce((s, c) => s + c.count, 0);

  return (
    <div ref={containerRef} style={{ fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>

      {/* Status banner — sticky */}
      {bannerConfig && (
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: bannerBg,
          padding: "10px 48px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: bannerConfig.color, flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: bannerConfig.color }}>{bannerConfig.label}</span>
          <span style={{ fontSize: 13, color: "#4F4F4F" }}>·</span>
          <span style={{ fontSize: 13, color: "#4F4F4F" }}>{accountName}</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: "#7C7C7C" }}>{bannerConfig.tooltip}</span>
        </div>
      )}

      <div style={{ padding: `48px ${boxesOpen ? 338 : 48}px 48px 48px`, transition: "padding-right 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Results</h2>

      {/* Matched box — shown at top for clean accounts */}
      {effectiveClean && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "40px 24px", textAlign: "center", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#EAF2E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4.5 11.5L8.5 15.5L17.5 7" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", margin: 0 }}>All {matchedTotal ?? 420} transactions matched</p>
          <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0, maxWidth: 520, lineHeight: "22px" }}>Every bank statement line has been matched and verified against GL records in Xero. No suggestions found.</p>
          {onAccountsOverview && (
            <PrimaryButton onClick={onAccountsOverview} style={{ marginTop: 8 }}>Accounts overview</PrimaryButton>
          )}
        </div>
      )}

      {/* Results table (uses DataTable from Tables.jsx) */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "description", label: "Description", width: "1fr" },
            { key: "issues", label: "Suggestions found", width: "160px" },
          ]}
          rows={resultRows}
        />
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4F4F4F", lineHeight: "22px", borderTop: "1px solid #EFF1F4", paddingTop: 14 }}>
            {effectiveClean
              ? "The reconciliation completed successfully with no issues found. All 420 bank statement lines were matched to GL records in Xero. The account balance is confirmed with zero discrepancy."
              : "The reconciliation found 8 items requiring attention across 6 categories. The most significant issues are 3 missing entries totalling £720.00. Balance is confirmed matching at £12,439.00 with 361 of 380 bank statement lines matched to GL records."
            }
          </div>
        )}
      </div>

      {/* Suggestions heading — hidden for clean accounts */}
      {!effectiveClean && <h3 style={{ fontSize: 16, fontWeight: 500, color: "#080908", margin: "0 0 16px" }}>Suggestions</h3>}
      {!effectiveClean && !ACCOUNT_CARDS[accountName] && <p style={{ fontSize: 14, color: "#000000", margin: "0 0 16px" }}>{missingEntries.length} Missing {missingEntries.length === 1 ? "entry" : "entries"}</p>}

      {/* Per-account cards for Barclays, AmEx, Mastercard */}
      {!effectiveClean && ACCOUNT_CARDS[accountName] && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ACCOUNT_CARDS[accountName].map((entry) => {
            const isResolved = resolvedCards.has(entry.idx);
            const isIgnored  = false;
            return (
              <div key={entry.idx} id={`result-${entry.cat}-${entry.idx}`} style={{ scrollMarginTop: 64 }}>
                <RecommendationCard
                  title={`${CAT_LABELS[entry.cat] || entry.cat}: ${entry.contact}`}
                  description={entry.description}
                  statusLabel={isResolved ? "Resolved" : "Unresolved"}
                  statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
                  collapsed={isResolved}
                  tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
                  primaryLabel={entry.primaryLabel}
                  external={entry.external}
                  fileAction={entry.fileAction}
                  onPrimaryAction={
                    entry.primaryLabel === "Create spend money" ? () => onOpenSpendMoney?.(entry, entry.idx) :
                    entry.primaryLabel === "Review and publish"  ? () => onOpenBatchDraft?.(entry, entry.idx) :
                    entry.primaryLabel === "Reconcile in Xero"   ? () => { onResolveCard?.(entry.idx); onShowToast?.("Reconciled in Xero successfully"); } :
                    () => { onResolveCard?.(entry.idx); onShowToast?.("Action completed successfully"); }
                  }
                  onMore={undefined}
                  onIgnore={() => { onResolveCard?.(entry.idx); onShowToast?.("Suggestion ignored"); }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Missing entry cards */}
      {!effectiveClean && !ACCOUNT_CARDS[accountName] && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {missingEntries.map((entry, i) => {
          const isResolved = resolvedCards.has(i);
          return (
            <div key={i} id={`result-missing-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`Missing entry: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved
                ? { background: "#EAF2E2", border: "none", color: "#05A105" }
                : { background: "#FDF8EE", border: "none", color: "#D5A750" }
              }
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={
                entry.primaryLabel === "Create spend money" ? () => onOpenSpendMoney?.(entry, i) :
                entry.primaryLabel === "Review and publish"  ? () => onOpenBatchDraft?.(entry, i) :
                entry.primaryLabel === "Reconcile in Xero"   ? () => { onResolveCard?.(i); onShowToast?.("Reconciled in Xero successfully"); } :
                undefined
              }
            />
            </div>
          );
        })}
      </div>}

      {!effectiveClean && !isHSBC && !ACCOUNT_CARDS[accountName] && (<>
      {/* Anomalies */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Anomaly</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {anomalies.map((entry, i) => {
          const cardIdx = 3 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <div key={i} id={`result-anomaly-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`Anomaly: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
            </div>
          );
        })}
      </div>

      {/* Duplicates */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Duplicate</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {duplicates.map((entry, i) => {
          const cardIdx = 4 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <div key={i} id={`result-duplicate-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`Duplicate: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
            </div>
          );
        })}
      </div>

      {/* Date differences */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Date difference</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dateDifferences.map((entry, i) => {
          const cardIdx = 5 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <div key={i} id={`result-date-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`Date difference: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Date difference acknowledged"); }}
            />
            </div>
          );
        })}
      </div>

      {/* Omitted */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Omitted</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {omitted.map((entry, i) => {
          const cardIdx = 6 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <div key={i} id={`result-omitted-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`Omitted: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
            </div>
          );
        })}
      </div>

      {/* General */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 General</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {general.map((entry, i) => {
          const cardIdx = 7 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <div key={i} id={`result-general-${i}`} style={{ scrollMarginTop: 64 }}>
            <RecommendationCard
              title={`General: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
            </div>
          );
        })}
      </div>
      </>)}
      <div style={{ paddingBottom: 32 }} />

      </div> {/* end maxWidth wrapper */}
      </div> {/* end padding */}
    </div>
  );
}

// ── Reconciliation flow ───────────────────────────────────────────────────────
function ReconciliationFlow({ accountName, onClose, showResults = false, allResolved = false, isCleanReconcile = false, onUploadStatement, reconciledDate = null, reconciledMatchedStr = null, accountStatus = null }) {
  const accounts = [
    "Lloyds Bank - Business", "Lloyds Bank - Operations GBP",
    "HSBC - Business Transactions", "Barclays - Operations",
    "American Express OP GBP", "Mastercard Business",
  ];
  const isPicker = accountName === "__picker__";
  const [selectedAccount, setSelectedAccount] = useState(isPicker ? null : accountName);
  const [accountSelected, setAccountSelected] = useState(!isPicker); // true when account already known or user picks one
  const effectiveIsCleanReconcile = isCleanReconcile || (isPicker && selectedAccount === "Lloyds Bank - Operations GBP");
  const effectiveAccountName = selectedAccount || accountName;
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [inputValue, setInputValue]           = useState("");
  const [isAtBottom, setIsAtBottom]           = useState(true);
  const [uploadedFiles, setUploadedFiles]     = useState(showResults ? [{ name: "bank-statement.pdf", type: "application/pdf" }] : null);
  const [previewUrl, setPreviewUrl]           = useState(null);
  const [prepDone, setPrepDone]               = useState(showResults);
  const [startClicked, setStartClicked]       = useState(showResults);
  const [stepStatuses, setStepStatuses]       = useState(showResults ? RECONCILIATION_STEPS.map(() => "done") : []);
  const [stepSubtexts, setStepSubtexts]       = useState(showResults ? RECONCILIATION_STEPS.map(s => s.subtext || "") : []);
  const [reconciliationCollapsed, setReconciliationCollapsed] = useState(showResults);
  const [userMessages, setUserMessages]       = useState([]);
  const [reuploadPhase, setReuploadPhase]     = useState(false);
  const [resultsVisible, setResultsVisible]   = useState(showResults);
  const [canvasReady, setCanvasReady]         = useState(showResults);
  const [boxesOpen, setBoxesOpen]             = useState(false);
  const [chatWidth, setChatWidth]             = useState(400);
  const [isDragging, setIsDragging]           = useState(false);
  const [allDocsOpen, setAllDocsOpen]             = useState(false);
  const [spendMoneySidebar, setSpendMoneySidebar] = useState(null);
  const chatScrollRef = useRef(null);
  const chatEndRef    = useRef(null);
  const [batchDraftSidebar, setBatchDraftSidebar] = useState(null);
  const ACCOUNT_TOTAL_SUGGESTIONS = {
    "Lloyds Bank - Business": 8,
    "HSBC - Business Transactions": 1,
    "Barclays - Operations": 5,
    "American Express OP GBP": 4,
    "Mastercard Business": 3,
  };
  const totalSuggestions = ACCOUNT_TOTAL_SUGGESTIONS[accountName] ?? 8;
  const allResolvedSet = allResolved ? new Set(Array.from({ length: totalSuggestions }, (_, i) => i)) : new Set();
  const [resolvedCards, setResolvedCards] = useState(allResolvedSet);
  const [toast, setToast] = useState(null);

  // Drag handler for resizable chat panel
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = chatWidth;

    const onMouseMove = (e) => {
      const newWidth = Math.max(280, Math.min(700, startWidth + (e.clientX - startX)));
      setChatWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const reconciliationComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");

  useEffect(() => {
    if (reconciliationComplete) setResultsVisible(true);
  }, [reconciliationComplete]);

  // Escape key — closes any open overlay first, then goes back to account overview
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (allDocsOpen)        { setAllDocsOpen(false); return; }
      if (spendMoneySidebar)  { setSpendMoneySidebar(null); return; }
      if (batchDraftSidebar)  { setBatchDraftSidebar(null); return; }
      onClose(canvasReady, resolvedCards.size >= totalSuggestions, effectiveAccountName);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [allDocsOpen, spendMoneySidebar, batchDraftSidebar, canvasReady, resolvedCards, totalSuggestions, effectiveAccountName]);

  // Delay canvas content until panel has slid in
  useEffect(() => {
    if (!resultsVisible) return;
    if (showResults) { setCanvasReady(true); return; }
    setCanvasReady(false);
    const t = setTimeout(() => setCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  useEffect(() => {
    if (stepStatuses.length > 0 && stepStatuses.every(s => s === "done")) {
      const t = setTimeout(() => setReconciliationCollapsed(true), 600);
      return () => clearTimeout(t);
    }
  }, [stepStatuses]);

  const handleRestart = () => {
    setUploadedFiles(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setUserMessages([]);
    setReuploadPhase(false);
    setResultsVisible(false);
    setCanvasReady(false);
    setInputValue("");
  };

  const handleSend = () => {
    const msg = inputValue.trim();
    if (!msg) return;
    setUserMessages(prev => [...prev, msg]);
    setInputValue("");
    setUploadedFile(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setReuploadPhase(true);
  };

  useEffect(() => {
    if (!startClicked || showResults) return;
    setStepStatuses(RECONCILIATION_STEPS.map((_, i) => i === 0 ? "active" : "pending"));
    setStepSubtexts(RECONCILIATION_STEPS.map(() => false));
    let cumulative = 0;
    const timers = [];
    RECONCILIATION_STEPS.forEach((step, i) => {
      cumulative += step.duration;
      // Show subtext 400ms before the step completes
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      // Mark step done
      timers.push(setTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < RECONCILIATION_STEPS.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [startClicked]);

  // After file is selected, wait 2.2s then start AI response
  useEffect(() => {
    if (!uploadedFiles || showResults) return;
    const t = setTimeout(() => setPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [uploadedFiles]);

  const handleFileSelected = (fileOrDocs) => {
    const files = Array.isArray(fileOrDocs) ? fileOrDocs : [fileOrDocs];
    setUploadedFiles(files);
    if (files.length === 1 && files[0].type?.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    onUploadStatement?.(selectedAccount, { fileName: files[0].name, date: dateStr });
  };

  // Two-line message — line 2 starts after line 1 finishes, user bubble after line 2
  const line1Segments = [
    { text: "Great, let's reconcile a ", bold: false },
    { text: "bank account.",             bold: true  },
  ];
  const line1Full = line1Segments.map(s => s.text).join("");
  const { done: line1Done } = useTypewriter(line1Full, 18, showResults);

  const line2Text = "Tell me what bank account you want to reconcile";
  // line2 only types in picker flow; in row flow we skip it
  const { done: line2Done } = useTypewriter(isPicker && line1Done ? line2Text : "", 18, showResults);

  // Line 3 AI message — in picker flow: starts after user picks account; in row flow: starts after line1 finishes
  const line3Segments = [
    { text: "I couldn't find any bank statement for ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: ". Could you upload the bank statement for me.", bold: false },
  ];
  const line3Full = line3Segments.map(s => s.text).join("");
  const line3Trigger = isPicker ? accountSelected : (line1Done && accountSelected);
  const { done: line3Done } = useTypewriter(line3Trigger ? line3Full : "", 18, showResults);

  // Line 4 — after file prep completes
  const fileCount = uploadedFiles ? uploadedFiles.length : 1;
  const line4Segments = fileCount > 1 ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: " with account number ",                  bold: false },
    { text: "1234 567 8910",                          bold: true  },
    { text: `. I've received `,                       bold: false },
    { text: `${fileCount} bank statements`,           bold: true  },
    { text: " and will reconcile across all of them.", bold: false },
  ] : [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: " with account number ",                  bold: false },
    { text: "1234 567 8910",                          bold: true  },
    { text: ".",                                      bold: false },
  ];
  const line4Full = line4Segments.map(s => s.text).join("");
  const { done: line4Done } = useTypewriter(prepDone ? line4Full : "", 18, showResults);

  // Line 5 — after line 4
  const line5Text = "Tell me whenever you're ready to start.";
  const { done: line5Done } = useTypewriter(line4Done ? line5Text : "", 18, showResults);

  // Auto-scroll chat to bottom whenever new content appears
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [line1Done, line2Done, line3Done, line4Done, line5Done, prepDone, startClicked, stepStatuses, userMessages, accountSelected]);

  // Track whether the chat is scrolled to the bottom
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FBFBFB" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.9)} 40%{opacity:1;transform:scale(1)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes textShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#080908", flexShrink: 0, letterSpacing: "-1px" }}>Bank reconciliation</span>

        {/* Account dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          >
            <span style={{ color: selectedAccount ? "#080908" : "#9D9D9E" }}>
              {selectedAccount || "Select account"}
            </span>
            <Chevron color="#080908" />
          </button>
          {dropdownOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 240, overflow: "hidden" }}>
              {accounts.map(acc => (
                <button key={acc} onClick={() => { setSelectedAccount(acc); setDropdownOpen(false); }}
                  style={{ width: "100%", display: "block", textAlign: "left", padding: "10px 14px", fontSize: 14, color: acc === selectedAccount ? "#080908" : "#4F4F4F", fontWeight: acc === selectedAccount ? 500 : 400, background: acc === selectedAccount ? "#F5F5F5" : "transparent", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "transparent"; }}
                >{acc}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />
        {resultsVisible && canvasReady && !effectiveIsCleanReconcile && (() => {
          const isHSBCCanvas = effectiveAccountName === "HSBC - Business Transactions";
          const totalSugg = ACCOUNT_TOTAL_SUGGESTIONS[effectiveAccountName] ?? 8;
          const resolved = resolvedCards.size;
          const pct = totalSugg > 0 ? Math.min(100, Math.round((resolved / totalSugg) * 100)) : 0;
          const allDone = resolved >= totalSugg;
          return (
            <button
              onClick={() => setBoxesOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: 0,
                marginRight: 8, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid #E9E9EB",
                borderRadius: 8,
                background: "#FFFFFF",
                height: 48,
                minWidth: 48,
                padding: boxesOpen ? 0 : "0 12px 0 0",
                overflow: "hidden",
                justifyContent: "center",
                flexShrink: 0,
                transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#F7F7F7"}
              onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            >
              {/* Expandable text + progress — slides in/out */}
              <div style={{
                maxWidth: boxesOpen ? 0 : 180,
                opacity: boxesOpen ? 0 : 1,
                overflow: "hidden",
                transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, padding 0.35s cubic-bezier(0.16,1,0.3,1)",
                display: "flex", flexDirection: "column", gap: 4,
                paddingLeft: boxesOpen ? 0 : 12, paddingRight: boxesOpen ? 0 : 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 14, color: "#545453", whiteSpace: "nowrap" }}>Left to review</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#080908", whiteSpace: "nowrap" }}>{resolved}/{totalSugg}</span>
                </div>
                <div style={{ height: 2, background: "#E9E9EB", borderRadius: 1, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: allDone ? "#4C71DF" : "#05A105", borderRadius: 1, transition: "width 0.4s ease, background 0.3s ease" }} />
                </div>
              </div>
              {/* Icon — always in the same spot */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M15 21L15 3M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21Z" stroke="#1F2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          );
        })()}
        <button onClick={() => onClose(canvasReady, resolvedCards.size >= totalSuggestions, effectiveAccountName)}
          style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area — position:relative so the canvas overlay can anchor to it */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

      {/* Left: chat panel — in flex flow so canvas naturally opens beside it */}
      <div style={{
        display: "flex", flexDirection: "column",
        width: resultsVisible ? chatWidth : "100%",
        flexShrink: 0,
        transition: isDragging ? "none" : "width 0.72s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        willChange: "width",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Floating scroll-to-bottom button */}
        {resultsVisible && (
          <button
            onClick={() => {
              const el = chatScrollRef.current;
              if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            }}
            style={{
              position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)",
              zIndex: 10,
              width: 32, height: 32, borderRadius: "50%",
              background: "#FFFFFF", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
              opacity: isAtBottom ? 0 : 1,
              pointerEvents: isAtBottom ? "none" : "auto",
              transition: "opacity 0.35s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
            onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

      {/* Chat area */}
      <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "40px 24px 40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

          <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", width: resultsVisible ? "90%" : "70%" }}>
            <p><StreamingMessage segments={line1Segments} speed={18} instant={showResults} /></p>
            {isPicker && line1Done && (
              <p style={{ marginTop: 6 }}>
                <StreamingMessage key="line2" segments={[{ text: line2Text, bold: false }]} speed={18} instant={showResults} />
              </p>
            )}
          </div>

          {/* Account picker — appears after AI finishes line 2, before user selects (picker flow only) */}
          {isPicker && line2Done && !accountSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                width: "100%",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12 }}>Select bank account</p>
                {accounts.map(acc => (
                  <button
                    key={acc}
                    onClick={() => { setSelectedAccount(acc); setAccountSelected(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {acc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble — appears after account is selected and line1 is done */}
          {accountSelected && line1Done && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {selectedAccount}
              </div>
            </div>
          )}

          {/* AI line 3 — couldn't find statement */}
          {line3Trigger && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
              <p><StreamingMessage key="line3" segments={line3Segments} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* Upload card — appears once line 3 finishes, hides after file chosen or re-upload phase */}
          {line3Done && !uploadedFiles && !reuploadPhase && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} onOpenAllDocs={() => setAllDocsOpen(true)} />
            </div>
          )}

          {/* User bubble — file preview after upload */}
          {uploadedFiles && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "flex-end", maxWidth: "100%" }}>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} style={{
                    width: 180,
                    background: "#FFFFFF",
                    border: "1px solid #E9E9EB",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}>
                    {previewUrl && idx === 0 ? (
                      <img src={previewUrl} alt="preview" style={{ width: "100%", display: "block" }} />
                    ) : (
                      /* Mock document body */
                      <div style={{ padding: "14px 12px 12px", background: "#FFFFFF", borderBottom: "1px solid #F0F0F0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                          {[55, 30].map((w, i) => <div key={i} style={{ height: 5, borderRadius: 3, background: "#E8E8E8", width: `${w}%` }} />)}
                        </div>
                        {[100, 75, 90, 60, 85, 70, 95, 55, 80].map((w, i) => (
                          <div key={i} style={{ height: 4, borderRadius: 2, background: i % 3 === 2 ? "#F0F0F0" : "#EBEBEB", width: `${w}%`, marginBottom: 5 }} />
                        ))}
                        <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                          {[80, 60, 90, 70, 75, 55].map((w, i) => (
                            <div key={i} style={{ height: 4, borderRadius: 2, background: "#EBEBEB", width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Footer with icon + filename */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                      <FileIcon file={file} width={18} height={22} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{file.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preparing status */}
          {uploadedFiles && !prepDone && (
            <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
              Preparing the file and getting ready for reconciliation
            </p>
          )}

          {/* AI line 4 — has everything needed */}
          {prepDone && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
              <p><StreamingMessage key="line4" segments={line4Segments} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* AI line 5 — ready to start */}
          {line4Done && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 6, width: "70%" }}>
              <p><StreamingMessage key="line5" segments={[{ text: line5Text, bold: false }]} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* Ready to start card — hidden once Start reconciliation is clicked */}
          {line5Done && !startClicked && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "24px 24px 16px",
                width: "100%",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 16 }}>Ready to start?</p>
                {[
                  { label: "Start reconciliation", primary: true },
                  { label: "Upload another bank statement", primary: false },
                ].map(({ label, primary }) => (
                  <button
                    key={label}
                    onClick={() => { if (label === "Start reconciliation") setStartClicked(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "16px 18px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 15, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User sent messages + re-upload flow */}
          {userMessages.map((msg, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                  {msg}
                </div>
              </div>
              {i === userMessages.length - 1 && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p>Sure! Please upload the new bank statement.</p>
                </div>
              )}
            </div>
          ))}

          {/* Re-upload card */}
          {reuploadPhase && !uploadedFiles && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={file => { handleFileSelected(file); setReuploadPhase(false); }} onOpenAllDocs={() => setAllDocsOpen(true)} />
            </div>
          )}

          {/* User bubble — appears when "Start reconciliation" is clicked */}
          {startClicked && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation progress */}
          {startClicked && stepStatuses.length > 0 && (
            <div style={{ marginTop: 24 }}>
              {/* Header */}
              <div
                onClick={() => setReconciliationCollapsed(c => !c)}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: reconciliationCollapsed ? 0 : 20, cursor: "pointer" }}
              >
                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: reconciliationCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                    {stepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                  </span>
                </div>
              </div>

              {/* Steps */}
              {!reconciliationCollapsed && RECONCILIATION_STEPS.map((step, i) => {
                const status = stepStatuses[i] || "pending";
                const isLast = i === RECONCILIATION_STEPS.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    {/* Circle + connector line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                        background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.4s ease",
                      }}>
                        {status === "done" && (
                          <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {status === "active" && (
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "1.5px solid #ACD394",
                            borderTopColor: "#05A105",
                            animation: "spin 0.7s linear infinite",
                          }} />
                        )}
                      </div>
                      {!isLast && (
                        <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                      <div style={{
                        fontSize: 14, lineHeight: "24px",
                        fontWeight: status === "done" ? 500 : 400,
                        color: status === "pending" ? "#BCBCBC" : "#080908",
                        transition: "all 0.3s ease",
                      }}>
                        {step.title}
                      </div>
                      {(stepSubtexts[i] || status === "done") && step.subtext && (
                        <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                          {step.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div ref={chatEndRef} style={{ height: 32, flexShrink: 0 }} />
        </div>
      </div>

      {/* Preparing next step — shown while AI is streaming a response */}
      {(() => {
        const isStreaming = !line1Done
          || (isPicker && line1Done && !line2Done)
          || (!line3Done && (isPicker ? (line2Done && accountSelected) : line1Done))
          || (prepDone && !line4Done)
          || (line4Done && !line5Done)
          || (startClicked && !resultsVisible);
        return isStreaming ? (
          <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{
                borderRadius: 16, padding: "14px 14px 12px", background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                    <span style={{
                      background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, #9D9D9E 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "textShimmer 2s linear infinite",
                      display: "inline-block",
                    }}>
                      Preparing next step...
                    </span>
                  </div>
                  <button
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#080908", flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" />
                    </svg>
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (isPicker && line2Done && !accountSelected) || (line5Done && !startClicked) ? null : (
          /* Standalone textarea — visible when AI is not streaming and no action card is showing */
          <div style={{ padding: resultsVisible ? "60px 24px 20px" : "0 24px 20px", flexShrink: 0, background: resultsVisible ? "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 60px)" : undefined, marginTop: resultsVisible ? -60 : 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              {/* Restart reconciliation button — shown when results are visible (sidebar mode) */}
              {resultsVisible && (
                <button
                  onClick={handleRestart}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                    height: 40, padding: "0 16px", marginBottom: 10,
                    border: "1px solid #E9E9EB", borderRadius: 8,
                    background: "#FFFFFF", cursor: "pointer",
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                    fontSize: 14, fontWeight: 500, color: "#080908",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E9E9EB"; }}
                >
                  <PlayCircleIcon color="#080908" size={20} />
                  Restart reconciliation
                </button>
              )}
              <div style={{
                borderRadius: 16, padding: "14px 14px 12px", background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                <textarea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Ask for changes or information..."
                  rows={3}
                  style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: "#080908", lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
                />
                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                  {/* Attachment */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{ flex: 1 }} />
                  {/* Microphone */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
                      <path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                      <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                  </button>
                  {/* Send */}
                  <button onClick={handleSend} style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid #E9E9EB", borderRadius: 10, background: inputValue.trim() ? "#05A105" : "#FAFAFA", cursor: inputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={inputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      </div> {/* end left chat panel */}

      {/* Canvas — slides in from right, pushes chat into sidebar */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: chatWidth,
        right: 0,
        background: "#FFFFFF",
        borderLeft: "1px solid #E9E9EB",
        overflow: "hidden",
        zIndex: 2,
        transform: resultsVisible ? "translateX(0)" : "translateX(100%)",
        transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        position: "absolute",
      }}>
        {resultsVisible && (canvasReady ? (
          <div style={{ animation: "resultsFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
            {false ? null : (
              <ResultsPanel
                accountName={effectiveAccountName}
                isCleanReconcile={effectiveIsCleanReconcile || (!allResolved && resolvedCards.size >= totalSuggestions)}
                allJustResolved={!allResolved && resolvedCards.size >= totalSuggestions}
                onAccountsOverview={() => onClose(true, false, effectiveAccountName)}
                matchedTotal={reconciledMatchedStr ? parseInt(reconciledMatchedStr.split("/")[1]) || null : null}
                onOpenSpendMoney={(entry, cardIndex) => setSpendMoneySidebar({ ...entry, cardIndex })}
                onOpenBatchDraft={(entry, cardIndex) => setBatchDraftSidebar({ ...entry, cardIndex })}
                resolvedCards={resolvedCards}
                onResolveCard={(idx) => setResolvedCards(prev => new Set([...prev, idx]))}
                onShowToast={(msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); }}
                accountStatus={accountStatus}
                boxesOpen={boxesOpen}
              />
            )}
          </div>
        ) : <CanvasLoader />)}

        {/* Floating sidebar boxes — position:fixed is contained by canvas willChange:transform */}
        {resultsVisible && canvasReady && (() => {
          const isHSBCCanvas = effectiveAccountName === "HSBC - Business Transactions";
          // isPreClean: account was already reconciled before opening — no suggestions exist at all
          const isPreClean = effectiveIsCleanReconcile;
          // allJustResolved: user resolved every suggestion during this session, OR account was already completed on open
          const allJustResolved = (
            (!allResolved && resolvedCards.size >= totalSuggestions) ||
            (allResolved && accountStatus === "completed")
          );
          const isClean = isPreClean || allJustResolved; // used by ResultsPanel for chat behaviour

          // Build nav cats — always the full list so resolved items remain visible
          const navCats = isPreClean ? []
            : isHSBCCanvas ? [
              { key: "missing", label: "Missing entries", baseIdx: 0, items: [{ contact: "Anchor & Webb Consulting" }] },
            ]
            : effectiveAccountName === "Barclays - Operations" ? [
              { key: "missing", label: "Missing entries", baseIdx: 0, items: [{ contact: "Hillcrest Imports" }, { contact: "NorthStar Media" }] },
              { key: "anomaly", label: "Anomalies",       baseIdx: 2, items: [{ contact: "Parkway Solutions" }] },
              { key: "omitted", label: "Omitted",         baseIdx: 3, items: [{ contact: "Central Freight Co" }] },
              { key: "general", label: "General",         baseIdx: 4, items: [{ contact: "Unclassified" }] },
            ]
            : effectiveAccountName === "American Express OP GBP" ? [
              { key: "missing",   label: "Missing entries",   baseIdx: 0, items: [{ contact: "Vantage Digital" }] },
              { key: "date",      label: "Date differences",  baseIdx: 1, items: [{ contact: "Apex Consulting" }, { contact: "BlueSky Events" }] },
              { key: "duplicate", label: "Duplicates",        baseIdx: 3, items: [{ contact: "Vantage Digital" }] },
            ]
            : effectiveAccountName === "Mastercard Business" ? [
              { key: "missing",   label: "Missing entries", baseIdx: 0, items: [{ contact: "Harrison & Webb" }] },
              { key: "anomaly",   label: "Anomalies",       baseIdx: 1, items: [{ contact: "Clearpoint Services" }] },
              { key: "duplicate", label: "Duplicates",      baseIdx: 2, items: [{ contact: "Harrison & Webb" }] },
            ]
            : [
              { key: "missing",   label: "Missing entries",   baseIdx: 0, items: [{ contact: "Yorkshire Tea Estates" }, { contact: "Clifton & Harrow Supplies" }, { contact: "Meridian Office Solutions" }] },
              { key: "anomaly",   label: "Anomalies",         baseIdx: 3, items: [{ contact: "Bakery & Food Supplies" }] },
              { key: "duplicate", label: "Duplicates",        baseIdx: 4, items: [{ contact: "Yorkshire Tea Estates" }] },
              { key: "date",      label: "Date differences",  baseIdx: 5, items: [{ contact: "Direct Expenses" }] },
              { key: "omitted",   label: "Omitted",           baseIdx: 6, items: [{ contact: "Internal Transfer" }] },
              { key: "general",   label: "General",           baseIdx: 7, items: [{ contact: "Unclassified" }] },
            ];
          const totalSugg = navCats.reduce((s, c) => s + c.items.length, 0);
          const cats = navCats.map(c => ({ label: c.label, count: c.items.length }));
          const matchedTotalNum = reconciledMatchedStr ? parseInt(reconciledMatchedStr.split("/")[1]) || null : null;

          // Hide boxes only for pre-reconciled accounts (no suggestions to show)
          if (isPreClean) return null;
          return (
            <div style={{ position: "absolute", top: 94, right: 20, width: 290, zIndex: 20, fontFamily: "'Inter', sans-serif", transform: boxesOpen ? "translateX(0)" : "translateX(calc(100% + 24px))", transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: boxesOpen ? "auto" : "none" }}>
              <SuggestionsBox
                isCleanReconcile={false}
                allJustResolved={allJustResolved}
                accountStatus={accountStatus}
                resolvedCount={resolvedCards.size}
                totalSuggestions={totalSugg}
                matchedTotal={matchedTotalNum}
                navCategories={navCats}
                resolvedCards={resolvedCards}
              />
            </div>
          );
        })()}
      </div>

      {/* Drag handle — thin absolute strip between chat and canvas */}
      {resultsVisible && (
        <div
          onMouseDown={handleDragStart}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: chatWidth,
            width: 6,
            cursor: "col-resize",
            zIndex: 10,
            background: isDragging ? "#E9E9EB" : "transparent",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = "#F0F0F0"; }}
          onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
        />
      )}

      </div> {/* end content area */}

      {/* All documents sidebar — top level so it covers the topbar */}
      {allDocsOpen && (
        <AllDocumentsSidebar
          onClose={() => setAllDocsOpen(false)}
          onSelect={docs => { handleFileSelected(docs.map(d => ({ name: d.name }))); setAllDocsOpen(false); }}
        />
      )}

      {/* Spend money sidebar — rendered here (top level) so it's above topbar and chat panel */}
      {spendMoneySidebar && (
        <>
          <div onClick={() => setSpendMoneySidebar(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <SpendMoneySidebar
            contact={spendMoneySidebar.contact}
            amount={spendMoneySidebar.amount}
            date={spendMoneySidebar.date}
            onClose={() => setSpendMoneySidebar(null)}
            onPublish={() => {
              if (spendMoneySidebar.cardIndex != null) {
                setResolvedCards(prev => new Set([...prev, spendMoneySidebar.cardIndex]));
              }
              setToast("Spend money created and published successfully");
              setTimeout(() => setToast(null), 4000);
            }}
          />
        </>
      )}

      {/* Batch draft sidebar */}
      {batchDraftSidebar && (
        <>
          <div onClick={() => setBatchDraftSidebar(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <BatchDraftSidebar
            contact={batchDraftSidebar.contact}
            amount={batchDraftSidebar.amount}
            date={batchDraftSidebar.date}
            fileName={batchDraftSidebar.fileAction}
            onClose={() => setBatchDraftSidebar(null)}
            onConfirm={() => {
              if (batchDraftSidebar.cardIndex != null) {
                setResolvedCards(prev => new Set([...prev, batchDraftSidebar.cardIndex]));
              }
              setToast("Document confirmed and published successfully");
              setTimeout(() => setToast(null), 4000);
            }}
          />
        </>
      )}

      {/* Success toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: "#05A105", color: "#FFFFFF", padding: "12px 20px",
          borderRadius: 10, fontSize: 14, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          zIndex: 300, animation: "toastIn 0.35s ease",
          fontFamily: "'Inter', sans-serif",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="rgba(255,255,255,0.25)"/>
            <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}

// ── TopBar component (from TopBar.jsx) ────────────────────────────────────────
function TopBar({
  contextLabel = "Month-end close",
  period = "April 2026",
  syncStatus = "Last synced 32 minutes ago",
  syncLabel = "Sync with Xero",
  onPeriodClick,
  onSyncClick,
}) {
  return (
    <div style={{ height: 60, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B" }}>{contextLabel}</span>
        <button onClick={onPeriodClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", border: "1px solid #E9E9EB", borderRadius: 6, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#CFCFD1"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E9E9EB"}>
          {period} <Chevron up={false} color="#080908" size={13} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B" }}>{syncStatus}</span>
        <button onClick={onSyncClick} style={{ padding: "0 12px", height: 36, border: "1px solid #E9E9EB", borderRadius: 6, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}>
          {syncLabel}
        </button>
      </div>
    </div>
  );
}

// ── Button components (from Buttons.jsx) ──────────────────────────────────────
function PrimaryButton({ children, icon, onClick, disabled = false, style = {} }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: disabled ? "#F5F5F5" : "#05A105", color: disabled ? "#9D9D9E" : "#FFFFFF", border: "none", borderRadius: 8, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, transition: "background 0.15s ease", ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "#008D00"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "#05A105"; }}>
      {children}{icon}
    </button>
  );
}

function SecondaryButton({ children, icon, onClick, disabled = false, style = {}, onMouseEnter, onMouseLeave }) {
  const defaultEnter = e => { if (!disabled) { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; } };
  const defaultLeave = e => { if (!disabled) { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; } };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", background: disabled ? "#F5F5F5" : "#FFFFFF", color: disabled ? "#9D9D9E" : "#080908", border: `1px solid ${disabled ? "#F5F5F5" : "#E9E9EB"}`, borderRadius: 6, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.15s ease", ...style }}
      onMouseEnter={onMouseEnter || defaultEnter}
      onMouseLeave={onMouseLeave || defaultLeave}>
      {children}{icon}
    </button>
  );
}

// ── Widgets components (from Widgets.jsx) ─────────────────────────────────────
function StatsWidget({ label, value, progress = 0 }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <ProgressRing progress={progress} size={40} strokeWidth={3} />
      <div>
        <div style={{ fontSize: 14, color: "#8C8C8B", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#080908" }}>{value}</div>
      </div>
    </div>
  );
}

function StatsRow({ items = [], columns }) {
  const cols = columns || items.length || 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {items.map((item, i) => <StatsWidget key={i} label={item.label} value={item.value} progress={item.progress} />)}
    </div>
  );
}

// ── DataTable component (from Tables.jsx) ─────────────────────────────────────
function DataTable({ title, columns = [], rows = [], footerLabel, onRowClick }) {
  const [hovered, setHovered] = useState(null);
  const gridTemplate = columns.map(c => c.width || "1fr").join(" ");
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {title && <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}><span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span></div>}
      <div style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: "1px solid #E9E9EB", background: "#FFFFFF" }}>
        {columns.map((col, ci) => (
          <div key={col.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500, color: "#8C8C8B", padding: "10px 16px", borderRight: ci < columns.length - 1 ? "1px solid #E9E9EB" : "none", justifyContent: col.align === "right" ? "flex-end" : "flex-start" }}>
            {col.label}{col.sortable && <SortIcon />}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} onClick={() => onRowClick?.(row, ri)} onMouseEnter={() => setHovered(ri)} onMouseLeave={() => setHovered(null)}
          style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: ri < rows.length - 1 ? "1px solid #E9E9EB" : "none", background: hovered === ri ? "#FAFAFA" : "#FFFFFF", transition: "background 0.1s", cursor: onRowClick ? "pointer" : "default" }}>
          {columns.map((col, ci) => (
            <div key={col.key} style={{ display: "flex", alignItems: "center", justifyContent: col.align === "right" ? "flex-end" : "flex-start", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: ci < columns.length - 1 ? "1px solid #E9E9EB" : "none" }}>
              {col.render ? col.render(row[col.key], row, ri) : row[col.key]}
            </div>
          ))}
        </div>
      ))}
      {footerLabel && <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>{footerLabel}</div>}
    </div>
  );
}


// ── MainMenu component (inlined from MainMenu.jsx) ───────────────────────────
// ── Icon SVG paths ────────────────────────────────────────────────────────────
const _MM_PATHS = {
  home: "M7.5 17.5016V11.3349C7.5 10.8682 7.5 10.6348 7.59083 10.4566C7.67072 10.2998 7.79821 10.1723 7.95501 10.0924C8.13327 10.0016 8.36662 10.0016 8.83333 10.0016H11.1667C11.6334 10.0016 11.8667 10.0016 12.045 10.0924C12.2018 10.1723 12.3293 10.2998 12.4092 10.4566C12.5 10.6348 12.5 10.8682 12.5 11.3349V17.5016M9.18141 2.30492L3.52949 6.70086C3.15168 6.99471 2.96278 7.14163 2.82669 7.32563C2.70614 7.48862 2.61633 7.67224 2.56169 7.86746C2.5 8.08785 2.5 8.32717 2.5 8.8058V14.8349C2.5 15.7683 2.5 16.235 2.68166 16.5916C2.84144 16.9052 3.09641 17.1601 3.41002 17.3199C3.76654 17.5016 4.23325 17.5016 5.16667 17.5016H14.8333C15.7668 17.5016 16.2335 17.5016 16.59 17.3199C16.9036 17.1601 17.1586 16.9052 17.3183 16.5916C17.5 16.235 17.5 15.7683 17.5 14.8349V8.8058C17.5 8.32717 17.5 8.08785 17.4383 7.86746C17.3837 7.67224 17.2939 7.48862 17.1733 7.32563C17.0372 7.14163 16.8483 6.99471 16.4705 6.70086L10.8186 2.30492C10.5258 2.07721 10.3794 1.96335 10.2178 1.91959C10.0752 1.88097 9.92484 1.88097 9.78221 1.91959C9.62057 1.96335 9.47418 2.07721 9.18141 2.30492Z",
  bookOpen: "M9.99984 17.5L9.91646 17.3749C9.33759 16.5066 9.04816 16.0725 8.66575 15.7582C8.32722 15.4799 7.93714 15.2712 7.51784 15.1438C7.04421 15 6.52243 15 5.47886 15H4.33317C3.39975 15 2.93304 15 2.57652 14.8183C2.26292 14.6586 2.00795 14.4036 1.84816 14.09C1.6665 13.7335 1.6665 13.2668 1.6665 12.3333V5.16667C1.6665 4.23325 1.6665 3.76654 1.84816 3.41002C2.00795 3.09641 2.26292 2.84144 2.57652 2.68166C2.93304 2.5 3.39975 2.5 4.33317 2.5H4.6665C6.53335 2.5 7.46677 2.5 8.17981 2.86331C8.80701 3.18289 9.31695 3.69282 9.63653 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333M9.99984 17.5V7.83333M9.99984 17.5L10.0832 17.3749C10.6621 16.5066 10.9515 16.0725 11.3339 15.7582C11.6725 15.4799 12.0625 15.2712 12.4818 15.1438C12.9555 15 13.4772 15 14.5208 15H15.6665C16.5999 15 17.0666 15 17.4232 14.8183C17.7368 14.6586 17.9917 14.4036 18.1515 14.09C18.3332 13.7335 18.3332 13.2668 18.3332 12.3333V5.16667C18.3332 4.23325 18.3332 3.76654 18.1515 3.41002C17.9917 3.09641 17.7368 2.84144 17.4232 2.68166C17.0666 2.5 16.5999 2.5 15.6665 2.5H15.3332C13.4663 2.5 12.5329 2.5 11.8199 2.86331C11.1927 3.18289 10.6827 3.69282 10.3631 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333",
  inbox: "M2.08317 9.9987H4.90148C5.47248 9.9987 5.99448 10.3213 6.24984 10.832C6.5052 11.3428 7.02719 11.6654 7.5982 11.6654H12.4015C12.9725 11.6654 13.4945 11.3428 13.7498 10.832C14.0052 10.3213 14.5272 9.9987 15.0982 9.9987H17.9165M7.47197 3.33203H12.5277C13.4251 3.33203 13.8738 3.33203 14.2699 3.46867C14.6202 3.5895 14.9393 3.78669 15.204 4.04599C15.5034 4.33919 15.7041 4.74053 16.1054 5.54318L17.9109 9.15412C18.0684 9.4691 18.1471 9.6266 18.2027 9.79165C18.252 9.93824 18.2876 10.0891 18.309 10.2423C18.3332 10.4147 18.3332 10.5908 18.3332 10.943V12.6654C18.3332 14.0655 18.3332 14.7656 18.0607 15.3003C17.821 15.7707 17.4386 16.1532 16.9681 16.3929C16.4334 16.6654 15.7333 16.6654 14.3332 16.6654H5.6665C4.26637 16.6654 3.56631 16.6654 3.03153 16.3929C2.56112 16.1532 2.17867 15.7707 1.93899 15.3003C1.6665 14.7656 1.6665 14.0655 1.6665 12.6654V10.943C1.6665 10.5908 1.6665 10.4147 1.69065 10.2423C1.71209 10.0891 1.7477 9.93824 1.79702 9.79165C1.85255 9.6266 1.9313 9.4691 2.0888 9.15412L3.89426 5.54318C4.29559 4.74052 4.49625 4.3392 4.79562 4.04599C5.06036 3.78669 5.37943 3.5895 5.72974 3.46867C6.12588 3.33203 6.57458 3.33203 7.47197 3.33203Z",
  checkVerifiedBadge: "M7.66809 17.1687C7.94121 17.1326 8.21712 17.2067 8.43469 17.3742L9.43738 18.1437C9.76884 18.3983 10.2299 18.3983 10.5604 18.1437L11.6011 17.3446C11.7955 17.1955 12.0409 17.1298 12.2834 17.1622L13.5852 17.3335C13.999 17.3881 14.3981 17.1576 14.5583 16.7715L15.0591 15.5604C15.1526 15.3336 15.3323 15.1539 15.5591 15.0604L16.7701 14.5595C17.1562 14.4003 17.3867 14.0003 17.3321 13.5864L17.1673 12.3318C17.1312 12.0587 17.2053 11.7827 17.3728 11.5651L18.1422 10.5624C18.3968 10.2309 18.3968 9.76983 18.1422 9.43928L17.3432 8.39857C17.1941 8.20413 17.1284 7.95877 17.1608 7.71618L17.3321 6.41437C17.3867 6.00049 17.1562 5.60142 16.7701 5.44124L15.5591 4.94033C15.3323 4.84682 15.1526 4.66719 15.0591 4.44035L14.5583 3.22927C14.399 2.84317 13.999 2.61262 13.5852 2.66725L12.2834 2.83854C12.0409 2.87187 11.7955 2.80613 11.602 2.65799L10.5614 1.85894C10.2299 1.60431 9.76884 1.60431 9.43831 1.85894L8.39766 2.65799C8.20323 2.80613 7.95788 2.87187 7.71531 2.84039L6.41356 2.6691C5.99971 2.61447 5.60067 2.84502 5.4405 3.23112L4.94054 4.4422C4.8461 4.66812 4.66649 4.84774 4.44058 4.94218L3.22957 5.44217C2.84349 5.60235 2.61295 6.00141 2.66758 6.41529L2.83886 7.71711C2.87034 7.95969 2.8046 8.20506 2.65647 8.39857L1.85746 9.43928C1.60285 9.77075 1.60285 10.2319 1.85746 10.5624L2.65647 11.6031C2.80553 11.7975 2.87126 12.0429 2.83886 12.2855L2.66758 13.5873C2.61295 14.0012 2.84349 14.4003 3.22957 14.5604L4.44058 15.0613C4.66741 15.1549 4.84703 15.3345 4.94054 15.5613L5.44142 16.7724C5.60067 17.1585 6.00063 17.3891 6.41449 17.3344L7.66809 17.1687Z",
  checkVerifiedMark: "M7.49984 10.0013L9.1665 11.668L12.9165 7.91797",
  switchHorizontal: "M16.6668 14.1667H3.3335M3.3335 14.1667L6.66683 10.8333M3.3335 14.1667L6.66683 17.5M3.3335 5.83333H16.6668M16.6668 5.83333L13.3335 2.5M16.6668 5.83333L13.3335 9.16667",
  fileQuestion: "M16.6668 7.91797V5.66797C16.6668 4.26784 16.6668 3.56777 16.3943 3.03299C16.1547 2.56259 15.7722 2.18014 15.3018 1.94045C14.767 1.66797 14.067 1.66797 12.6668 1.66797H7.3335C5.93336 1.66797 5.2333 1.66797 4.69852 1.94045C4.22811 2.18014 3.84566 2.56259 3.60598 3.03299C3.3335 3.56777 3.3335 4.26784 3.3335 5.66797V14.3346C3.3335 15.7348 3.3335 16.4348 3.60598 16.9696C3.84566 17.44 4.22811 17.8225 4.69852 18.0622C5.2333 18.3346 5.93336 18.3346 7.3335 18.3346H11.6668M11.6668 9.16797H6.66683M8.3335 12.5013H6.66683M13.3335 5.83464H6.66683M13.7502 12.5032C13.897 12.0858 14.1868 11.7338 14.5683 11.5096C14.9497 11.2854 15.3982 11.2035 15.8343 11.2783C16.2704 11.3531 16.666 11.5798 16.9509 11.9183C17.2359 12.2568 17.3919 12.6852 17.3912 13.1277C17.3912 14.3768 15.5176 15.0013 15.5176 15.0013M15.5417 17.5013H15.5501",
  settingsGear: "M7.82936 16.1439L8.3164 17.2393C8.46118 17.5653 8.69747 17.8424 8.99659 18.0368C9.29571 18.2312 9.64483 18.3347 10.0016 18.3346C10.3583 18.3347 10.7075 18.2312 11.0066 18.0368C11.3057 17.8424 11.542 17.5653 11.6868 17.2393L12.1738 16.1439C12.3472 15.7552 12.6388 15.4312 13.0071 15.218C13.3778 15.0042 13.8066 14.9131 14.2321 14.9578L15.4238 15.0846C15.7785 15.1222 16.1365 15.056 16.4544 14.8941C16.7722 14.7322 17.0363 14.4816 17.2145 14.1726C17.393 13.8638 17.4781 13.5099 17.4593 13.1537C17.4406 12.7975 17.3189 12.4545 17.109 12.1661L16.4034 11.1967C16.1522 10.8489 16.018 10.4303 16.0201 10.0013C16.02 9.57346 16.1555 9.15659 16.4071 8.81056L17.1127 7.84112C17.3226 7.55276 17.4443 7.20969 17.463 6.85353C17.4818 6.49737 17.3967 6.14342 17.2183 5.83464C17.04 5.52566 16.7759 5.27504 16.4581 5.11316C16.1402 4.95127 15.7822 4.88508 15.4275 4.9226L14.2358 5.04945C13.8103 5.09414 13.3815 5.00307 13.0108 4.78927C12.6418 4.57485 12.3501 4.2491 12.1775 3.85871L11.6868 2.76334C11.542 2.43728 11.3057 2.16023 11.0066 1.9658C10.7075 1.77137 10.3583 1.66791 10.0016 1.66797C9.64483 1.66791 9.29571 1.77137 8.99659 1.9658C8.69747 2.16023 8.46118 2.43728 8.3164 2.76334L7.82936 3.85871C7.6568 4.2491 7.36509 4.57485 6.99603 4.78927C6.62538 5.00307 6.19659 5.09414 5.77103 5.04945L4.57566 4.9226C4.22094 4.88508 3.86294 4.95127 3.54509 5.11316C3.22724 5.27504 2.96317 5.52566 2.78492 5.83464C2.60644 6.14342 2.52141 6.49737 2.54014 6.85353C2.55888 7.20969 2.68058 7.55276 2.89048 7.84112L3.59603 8.81056C3.84765 9.15659 3.98315 9.57346 3.98307 10.0013C3.98315 10.4291 3.84765 10.846 3.59603 11.192L2.89048 12.1615C2.68058 12.4498 2.55888 12.7929 2.54014 13.1491C2.52141 13.5052 2.60644 13.8592 2.78492 14.168C2.96335 14.4768 3.22744 14.7273 3.54525 14.8891C3.86306 15.051 4.22096 15.1173 4.57566 15.08L5.76733 14.9532C6.19289 14.9085 6.62167 14.9995 6.99233 15.2133C7.36277 15.4272 7.65583 15.753 7.82936 16.1439Z",
  settingsCircle: "M10.0001 12.5013C11.3808 12.5013 12.5001 11.382 12.5001 10.0013C12.5001 8.62059 11.3808 7.5013 10.0001 7.5013C8.61939 7.5013 7.5001 8.62059 7.5001 10.0013C7.5001 11.382 8.61939 12.5013 10.0001 12.5013Z",
};

function _MM_NavIcon({ name, color }) {
  const sp = { stroke: color, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "checkVerified") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={_MM_PATHS.checkVerifiedBadge} {...sp} />
      <path d={_MM_PATHS.checkVerifiedMark} {...sp} />
    </svg>
  );
  if (name === "settings") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={_MM_PATHS.settingsGear} {...sp} />
      <path d={_MM_PATHS.settingsCircle} {...sp} />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS[name]} {...sp} />
    </svg>
  );
}

function _MM_Chevron({ up = false, color = "#545453", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d={up ? "M3 9.5L7 5.5L11 9.5" : "M3 5.5L7 9.5L11 5.5"} stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── MainMenu component ────────────────────────────────────────────────────────
// Props:
//   activeNav      — string: currently active nav label
//   onNavChange    — fn(label): called when a nav item is clicked
//   companyName    — string: e.g. "Seabrook Foods Ltd."
//   userName       — string: e.g. "Laura Bennett"
//   userRole       — string: e.g. "Clifton & Harrow"
//   navItems       — array of { label, icon } for the Associate section
function MainMenu({
  activeNav,
  onNavChange,
  companyName = "Seabrook Foods Ltd.",
  userName = "Laura Bennett",
  userRole = "Clifton & Harrow",
  navItems = [
    { label: "Home",                icon: "home" },
    { label: "Collect documents",   icon: "fileQuestion" },
    { label: "Inbox",               icon: "inbox" },
    { label: "Bank reconciliation", icon: "checkVerified" },
    { label: "Adjustments",         icon: "switchHorizontal" },
    { label: "Review",              icon: "bookOpen" },
  ],
}) {
  const [associateOpen, setAssociateOpen] = useState(true);
  const [paymentsOpen, setPaymentsOpen]   = useState(false);

  return (
    <aside style={{
      width: 264, flexShrink: 0, display: "flex", flexDirection: "column",
      background: "#FFFFFF", borderRight: "1px solid #E9E9EB", height: "100vh",
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Mimo logo — 96px header */}
      <div style={{ height: 96, display: "flex", alignItems: "center", padding: "0 32px", flexShrink: 0 }}>
        <svg width="130" height="28" viewBox="0 0 98 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#mimoClip)">
            <path d="M21.2948 0.316406H16.2686V19.8237H21.2948V0.316406Z" fill="#1F2024"/>
            <path d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z" fill="#1F2024"/>
            <path d="M5.56185 10.7422H0.535645V19.8197H5.56185V10.7422Z" fill="#1F2024"/>
            <path d="M32.0013 19.8173V0.316406H36.4094L41.4536 12.2309C41.7614 12.9701 42.0807 13.7995 42.4143 14.7189H42.4684C42.7929 13.7995 43.1084 12.9701 43.4162 12.2309L48.4449 0.316406H52.826V19.816H49.4314V5.84742H49.3773C49.215 6.2711 49.0373 6.73857 48.8429 7.24724C48.6497 7.7572 48.4437 8.2736 48.2273 8.79515L43.5488 19.816H41.29L36.5974 8.78099C36.381 8.25815 36.1763 7.74045 35.9818 7.22534C35.7886 6.71151 35.6109 6.24277 35.4474 5.81909H35.3933V19.8147H32L32.0013 19.8173Z" fill="#1F2024"/>
            <path d="M54.7979 3.35338V0H58.3135V3.35338H54.7979ZM54.8519 19.8151V5.38678H58.2594V19.8163H54.8519V19.8151Z" fill="#1F2024"/>
            <path d="M60.729 19.8153V5.38573H64.1365V7.31998H64.1777C64.4018 6.85123 64.7198 6.44815 65.1306 6.10946C65.5414 5.77207 66.0231 5.51193 66.5781 5.33293C67.1318 5.15264 67.7384 5.0625 68.3964 5.0625C69.4151 5.0625 70.2702 5.26726 70.9591 5.67677C71.6481 6.08757 72.1696 6.67995 72.5212 7.45519H72.5611C72.9938 6.67995 73.5888 6.08628 74.3473 5.67677C75.1045 5.26726 76.0008 5.0625 77.0387 5.0625C78.0767 5.0625 78.9227 5.26726 79.6619 5.67677C80.4011 6.08757 80.9677 6.69283 81.3592 7.49511C81.7507 8.2974 81.9477 9.27611 81.9477 10.43V19.814H78.5532V10.9296C78.5532 10.0282 78.3188 9.3199 77.85 8.80607C77.3813 8.29225 76.7271 8.03598 75.8887 8.03598C75.2938 8.03598 74.7838 8.16862 74.3614 8.43519C73.9378 8.70048 73.6107 9.07522 73.3801 9.55814C73.1509 10.0411 73.0363 10.6051 73.0363 11.2554V19.8153H69.6559V10.9039C69.6559 10.0114 69.4241 9.30831 68.9592 8.79448C68.4943 8.28066 67.8478 8.02439 67.0185 8.02439C66.4403 8.02439 65.9342 8.1609 65.4964 8.43648C65.0598 8.71207 64.7237 9.09196 64.4893 9.57874C64.2537 10.0655 64.1378 10.6244 64.1378 11.2554V19.8153H60.7303H60.729Z" fill="#1F2024"/>
            <path d="M90.6726 20.1284C89.2843 20.1284 88.0403 19.8193 86.9393 19.2012C85.8395 18.5844 84.9806 17.7048 84.3624 16.5651C83.7443 15.4254 83.4365 14.1106 83.4365 12.6232C83.4365 11.1358 83.7404 9.8223 84.3483 8.68133C84.9574 7.54036 85.8138 6.65566 86.9174 6.02464C88.021 5.39363 89.2766 5.07812 90.6829 5.07812C92.0891 5.07812 93.3408 5.39106 94.4355 6.0182C95.5301 6.64535 96.3826 7.52619 96.9917 8.66202C97.5995 9.79784 97.9034 11.1191 97.9034 12.6245C97.9034 14.1299 97.5918 15.437 96.9711 16.5728C96.3491 17.7087 95.4901 18.5856 94.3942 19.2025C93.2996 19.8206 92.0569 20.1297 90.6687 20.1297L90.6726 20.1284ZM90.6726 17.3159C91.4014 17.3159 92.0556 17.1317 92.6338 16.7621C93.2108 16.3926 93.6615 15.8556 93.986 15.1524C94.3105 14.4493 94.4728 13.6058 94.4728 12.6232C94.4728 11.6406 94.3118 10.7959 93.9925 10.0876C93.6731 9.37931 93.2236 8.83844 92.648 8.46499C92.0698 8.09024 91.4117 7.90223 90.6738 7.90223C89.9359 7.90223 89.265 8.09024 88.6932 8.46499C88.1202 8.83844 87.672 9.37931 87.3475 10.0876C87.023 10.7959 86.8607 11.6406 86.8607 12.6232C86.8607 13.6058 87.0256 14.4467 87.354 15.1447C87.6823 15.844 88.1343 16.3797 88.7061 16.7544C89.2792 17.1279 89.9347 17.3159 90.6751 17.3159H90.6726Z" fill="#1F2024"/>
          </g>
          <defs>
            <clipPath id="mimoClip">
              <rect width="98" height="20.2181" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Company selector — white bordered card */}
      <div style={{ padding: "0 12px", margin: "12px 0 0", flexShrink: 0, height: 42, display: "flex", alignItems: "center" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%",
          height: 42, padding: "0 16px", background: "#FFFFFF",
          border: "1px solid #E9E9EB", borderRadius: 8, cursor: "pointer",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12.5L5.5 8L10 3.5" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{companyName}</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 8px 0", overflowY: "auto" }}>

        {/* Divider above Associate */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Associate */}
        <button
          onClick={() => setAssociateOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 6px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Associate</span>
          <_MM_Chevron up={associateOpen} />
        </button>

        {associateOpen && navItems.map(item => {
          const active = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavChange?.(item.label)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 12px", marginBottom: 1,
                marginLeft: 8, marginRight: 8, width: "calc(100% - 16px)",
                borderRadius: 6, border: "none", cursor: "pointer",
                background: active ? "#F5F5F5" : "transparent",
                textAlign: "left", boxShadow: "none",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <_MM_NavIcon name={item.icon} color={active ? "#080908" : "#4F4F4F"} />
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "#080908" : "#4F4F4F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Payments */}
        <button
          onClick={() => setPaymentsOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 4px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Payments</span>
          <_MM_Chevron up={paymentsOpen} />
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Settings */}
        <button
          style={{
            width: "calc(100% - 16px)", display: "flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 12px", marginBottom: 1,
            marginLeft: 8, marginRight: 8,
            borderRadius: 6, border: "none", cursor: "pointer",
            background: "transparent", textAlign: "left", boxShadow: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <_MM_NavIcon name="settings" color="#4F4F4F" />
          <span style={{ fontSize: 14, fontWeight: 400, color: "#4F4F4F" }}>Settings</span>
        </button>

      </nav>

      {/* Divider above user */}
      <div style={{ height: 1, background: "#E9E9EB", margin: "0 12px", flexShrink: 0 }} />

      {/* User profile */}
      <div
        style={{ padding: "16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer", borderRadius: 8, margin: "8px", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#4C71DF" }}>{userName.charAt(0)}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
          <div style={{ fontSize: 14, color: "#8C8C8B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userRole}</div>
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.2" fill="#545453"/>
            <circle cx="8" cy="8" r="1.2" fill="#545453"/>
            <circle cx="8" cy="13" r="1.2" fill="#545453"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}


// ── Balance Sheet: Status styles ───────────────────────────────────────────
const STATUS_STYLES = {
  "Not started":  { bg: "#FAFAFA",  border: "#F5F5F5",  color: "#545453" },
  "In progress":  { bg: "#FDF8EE",  border: "#F8E9CB",  color: "#D5A750" },
  "Review":       { bg: "#FDF8EE",  border: "#F8E9CB",  color: "#D5A750" },
  "In review":    { bg: "#FDF8EE",  border: "#F8E9CB",  color: "#D5A750" },
  "Completed":    { bg: "#F1F8F0",  border: "#D5EBCF",  color: "#6BAC5B" },
  "Reconciled":   { bg: "#F1F8F0",  border: "#D5EBCF",  color: "#6BAC5B" },
};

// ── Balance Sheet: DataTableV2 ──────────────────────────────────────────────
function DataTableV2({
  title,
  columns = [],
  rows = [],
  footerLabel,
  showExpandColumn = false,
  showCommentColumn = false,
  renderExpanded,
  onRowClick,
  expandedByDefault,
  rowComments = {},
}) {
  const [hovered, setHovered] = useState(null);
  const [expandedRows, setExpandedRows] = useState(() => {
    if (expandedByDefault) return new Set(expandedByDefault);
    return new Set();
  });

  const toggleExpand = (ri) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(ri)) next.delete(ri); else next.add(ri);
      return next;
    });
  };

  // Build grid template
  const parts = [];
  if (showExpandColumn) parts.push("40px");
  parts.push(...columns.map(c => c.width || "1fr"));
  if (showCommentColumn) parts.push("40px");
  const gridTemplate = parts.join(" ");
  const totalCols = parts.length;

  // Minimum width to prevent column squashing on small screens
  const minTableWidth = 900;

  // Chevron icon — down when collapsed, up when expanded
  const ChevronIcon = ({ expanded }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
      transition: "transform 0.15s ease",
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
    }}>
      <path d="M4 6L8 10L12 6" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Comment icon — shows green with dot when hasComments is true
  const CommentIcon = ({ hasComments }) => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z" stroke={hasComments ? "#6BAC5B" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {hasComments && (
        <span style={{
          position: "absolute", top: -1, right: -1,
          width: 6, height: 6, borderRadius: "50%",
          background: "#6BAC5B",
        }} />
      )}
    </span>
  );

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Section title */}
      {title && (
        <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span>
        </div>
      )}

      {/* Scrollable inner wrapper */}
      <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: minTableWidth }}>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: "1px solid #E9E9EB", background: "#FFFFFF" }}>
        {showExpandColumn && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", borderRight: "1px solid #E9E9EB" }} />
        )}
        {columns.map((col, ci) => (
          <div key={col.key} style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 14, fontWeight: 500, color: "#8C8C8B",
            padding: "10px 16px",
            borderRight: (ci < columns.length - 1 || showCommentColumn) ? "1px solid #E9E9EB" : "none",
            justifyContent: col.align === "right" ? "flex-end" : "flex-start",
          }}>
            {col.label}{col.sortable && <SortIcon />}
          </div>
        ))}
        {showCommentColumn && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0" }} />
        )}
      </div>

      {/* Data rows */}
      {rows.map((row, ri) => {
        const isExpanded = expandedRows.has(ri);
        return (
          <React.Fragment key={ri}>
            {/* Row */}
            <div
              onClick={() => {
                if (renderExpanded) toggleExpand(ri);
                onRowClick?.(row, ri);
              }}
              onMouseEnter={() => setHovered(ri)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                borderBottom: (isExpanded || ri < rows.length - 1) ? "1px solid #E9E9EB" : "none",
                background: hovered === ri ? "#FAFAFA" : "#FFFFFF",
                transition: "background 0.1s",
                cursor: renderExpanded ? "pointer" : onRowClick ? "pointer" : "default",
              }}
            >
              {/* Expand chevron cell */}
              {showExpandColumn && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: "1px solid #E9E9EB",
                }}>
                  {renderExpanded && <ChevronIcon expanded={isExpanded} />}
                </div>
              )}

              {/* Data cells */}
              {columns.map((col, ci) => (
                <div key={col.key} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                  fontSize: 14, color: "#080908",
                  padding: "14px 16px",
                  borderRight: (ci < columns.length - 1 || showCommentColumn) ? "1px solid #E9E9EB" : "none",
                }}>
                  {col.render ? col.render(row[col.key], row, ri) : row[col.key]}
                </div>
              ))}

              {/* Comment icon cell */}
              {showCommentColumn && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CommentIcon hasComments={row.code && rowComments[row.code] && rowComments[row.code].length > 0} />
                </div>
              )}
            </div>

            {/* Expanded content */}
            {isExpanded && renderExpanded && (
              <div style={{
                background: "#FAFAFA",
                borderBottom: ri < rows.length - 1 ? "1px solid #E9E9EB" : "none",
                padding: 16,
              }}>
                {renderExpanded(row, ri)}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Footer */}
      {footerLabel && (
        <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>
          {footerLabel}
        </div>
      )}

      </div>{/* end minWidth wrapper */}
      </div>{/* end scrollable wrapper */}
    </div>
  );
}

// ── Balance Sheet: StatusBadge ───────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES["Not started"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 4,
      fontSize: 12, fontWeight: 600, lineHeight: "17px",
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

// ── Balance Sheet: ExpandedRowContent ────────────────────────────────────────
function ExpandedRowContent({ row, comments = [], onAddComment }) {
  const [composing, setComposing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const hasContext = row.reconciled && row.contextText;
  const showSource = row.reconciled;
  const dividerStyle = { height: 1, background: "#E9E9EB", margin: 0 };
  const headers = ["Balance per Xero", "Balance per source", "Variance", "Suggestions", "Status"];
  const colTemplate = "1fr 1fr 1fr 1fr 140px";

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(row.code, commentText.trim());
    setCommentText("");
    setComposing(false);
  };

  const handleCancel = () => {
    setCommentText("");
    setComposing(false);
  };

  // Secondary button style (matches the "Add comment" trigger button)
  const secondaryBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 8,
    border: "1px solid #E9E9EB", background: "#FFFFFF", cursor: "pointer",
    fontSize: 14, fontWeight: 500, color: "#080908",
  };

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 8, border: "1px solid #E9E9EB",
      padding: 24, display: "flex", flexDirection: "column", gap: 0,
    }}>
      {/* 1. Context text – only when reconciliation has been executed */}
      {hasContext && (
        <>
          <p style={{ fontSize: 14, lineHeight: "22px", color: "#080908", margin: 0 }}>
            {row.contextText}
          </p>
          <div style={{ ...dividerStyle, marginTop: 24, marginBottom: 24 }} />
        </>
      )}

      {/* 2. Reconciliation summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Reconciliation</span>

        {/* Mini table – DS Data Table pattern */}
        <div style={{ border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden" }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: colTemplate,
          }}>
            {headers.map((h, i) => (
              <span key={h} style={{
                padding: "10px 16px",
                fontSize: 14, fontWeight: 500, color: "#8C8C8B",
                borderBottom: "1px solid #E9E9EB",
                borderRight: i < headers.length - 1 ? "1px solid #E9E9EB" : "none",
                textAlign: h === "Balance per Xero" ? "left" : h === "Status" ? "left" : "right",
              }}>{h}</span>
            ))}
          </div>
          {/* Row */}
          <div style={{
            display: "grid", gridTemplateColumns: colTemplate,
          }}>
            {/* Balance per Xero */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: "#080908", borderRight: "1px solid #E9E9EB" }}>{row.xeroBalance || "—"}</span>
            {/* Balance per source */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: showSource ? "#080908" : "#9D9D9E", textAlign: "right", borderRight: "1px solid #E9E9EB" }}>{showSource ? (row.sourceBalance || "—") : "—"}</span>
            {/* Variance */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: showSource ? "#080908" : "#9D9D9E", textAlign: "right", borderRight: "1px solid #E9E9EB" }}>{showSource ? (row.variance || "—") : "—"}</span>
            {/* Suggestions */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: "#8C8C8B", textAlign: "right", borderRight: "1px solid #E9E9EB" }}>{row.suggestions != null ? row.suggestions : "—"}</span>
            {/* Status */}
            <span style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
              <StatusBadge status={row.status || "Not started"} />
            </span>
          </div>
        </div>
      </div>

      {/* Divider before comments section */}
      <div style={{ ...dividerStyle, marginTop: 24, marginBottom: 24 }} />

      {/* 3. Comments section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Existing comments */}
        {comments.map((c, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Avatar */}
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: "#E9E9EB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, color: "#545453", flexShrink: 0,
              }}>
                {c.user.split(" ").map(n => n[0]).join("")}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#080908" }}>{c.user}</span>
              <span style={{ fontSize: 13, color: "#8C8C8B" }}>{c.timestamp}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: "22px", color: "#080908", margin: 0, paddingLeft: 32 }}>{c.text}</p>
            {ci < comments.length - 1 && <div style={{ ...dividerStyle, marginTop: 12 }} />}
          </div>
        ))}

        {/* Composing state: textarea + buttons */}
        {composing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <textarea
              autoFocus
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a comment…"
              style={{
                width: "100%", minHeight: 80, padding: "10px 12px",
                borderRadius: 8, border: "1px solid #E9E9EB",
                fontSize: 14, fontFamily: "'Inter', sans-serif", lineHeight: "22px",
                color: "#080908", resize: "vertical", outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => { e.target.style.borderColor = "#CFCFD1"; }}
              onBlur={e => { e.target.style.borderColor = "#E9E9EB"; }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              {/* Primary button – Add comment (DS main button) */}
              <button
                onClick={handleSubmit}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 8,
                  border: "1px solid #05A105", background: "#05A105", cursor: "pointer",
                  fontSize: 14, fontWeight: 500, color: "#FFFFFF",
                  opacity: commentText.trim() ? 1 : 0.4,
                }}
                onMouseEnter={e => { if (commentText.trim()) { e.currentTarget.style.background = "#008D00"; e.currentTarget.style.borderColor = "#008D00"; } }}
                onMouseLeave={e => { e.currentTarget.style.background = "#05A105"; e.currentTarget.style.borderColor = "#05A105"; }}
              >
                Add comment
              </button>
              {/* Secondary button – Cancel */}
              <button
                onClick={handleCancel}
                style={{ ...secondaryBtnStyle }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* Add comment trigger button */
          <button
            onClick={() => setComposing(true)}
            style={{
              ...secondaryBtnStyle,
              alignSelf: "flex-start",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add comment
          </button>
        )}
      </div>
    </div>
  );
}

// ── Balance Sheet: ReconciliationCell ────────────────────────────────────────
function ReconciliationCell({ code, account, bsReconciledData, onViewResults, onRunReconciliation }) {
  const data = bsReconciledData && bsReconciledData[code];
  if (data) {
    return (
      <ReconciledCard
        date={data.date}
        status={data.status || "reconciled"}
        suggestionCount={data.suggestionCount}
        onPlay={() => onRunReconciliation?.({ code, account })}
      />
    );
  }
  return (
    <button
      onClick={e => { e.stopPropagation(); onRunReconciliation?.({ code, account }); }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 12px", border: "1px solid #E9E9EB", borderRadius: 6,
        background: "#FFFFFF", cursor: "pointer",
        fontSize: 14, fontWeight: 500, color: "#080908", whiteSpace: "nowrap",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
    >
      Run reconciliation
      <PlayCircleIcon color="#080908" />
    </button>
  );
}

// ── Balance Sheet: BS_COLUMNS ──────────────────────────────────────────────
const BS_COLUMNS = [
  { key: "account", label: "Account", width: "2fr", sortable: true, render: (v, row) => (
    <span style={{ fontSize: 14, color: "#080908" }}>{row.code} &ndash; {v}</span>
  )},
  { key: "closingBalance", label: "Closing balance", width: "1fr", align: "right", sortable: true, render: (v, row) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>{v}</span>
      {row.trend && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          background: row.trend.dir === "up" ? "#F1F8F0" : "#FCEFEC",
          borderRadius: 4, padding: "2px 6px", marginTop: 4,
          fontSize: 11, fontWeight: 500,
          color: row.trend.dir === "up" ? "#6BAC5B" : "#C8543A",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {row.trend.dir === "up"
              ? <path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M5 2V8M5 8L2.5 5.5M5 8L7.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
          {row.trend.months >= 12 ? "12m+" : row.trend.months + "m"}
        </span>
      )}
    </div>
  )},
  { key: "vsLastMonth", label: "vs Last month", width: "1fr", align: "right", sortable: true, render: (v, row) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <span style={{ fontSize: 14, color: "#080908" }}>{v}</span>
      {row.pct && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 2,
          background: row.pct.startsWith("-") ? "#FCEFEC" : "#F1F8F0",
          borderRadius: 4, padding: "2px 6px", marginTop: 4,
          fontSize: 11, fontWeight: 500,
          color: row.pct.startsWith("-") ? "#C8543A" : "#6BAC5B",
        }}>
          {row.pct}
        </span>
      )}
    </div>
  )},
  { key: "reconciliation", label: "Reconciliation", width: "220px" },
];

// ── Balance Sheet: BS_SECTIONS data ────────────────────────────────────────
const BS_SECTIONS = [
  {
    heading: "Assets",
    tables: [
      {
        title: "Non-current assets",
        rows: [
          { code: "0010", account: "Freehold property",                closingBalance: "£450,000.00", vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£450,000.00", sourceBalance: "£450,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0011", account: "Leasehold improvements",           closingBalance: "£32,500.00",  vsLastMonth: "-£1,625.00",   pct: "-4.8%", trend: { dir: "down", months: 12 }, xeroBalance: "£32,500.00",  sourceBalance: "£32,500.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0020", account: "Plant and machinery",              closingBalance: "£87,200.00",  vsLastMonth: "-£2,180.00",   pct: "-2.4%", trend: { dir: "down", months: 8 },  xeroBalance: "£87,200.00",  sourceBalance: "£85,020.00",  variance: "£2,180.00",  suggestions: null, status: "Not started" },
          { code: "0030", account: "Fixtures and fittings",            closingBalance: "£14,800.00",  vsLastMonth: "-£740.00",     pct: "-4.8%", trend: { dir: "down", months: 12 }, xeroBalance: "£14,800.00",  sourceBalance: "£14,800.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0031", account: "Office equipment",                 closingBalance: "£9,350.00",   vsLastMonth: "-£467.50",     pct: "-4.8%", trend: { dir: "down", months: 6 },  xeroBalance: "£9,350.00",   sourceBalance: "£9,350.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0032", account: "Computer equipment",               closingBalance: "£18,600.00",  vsLastMonth: "+£3,200.00",   pct: "+20.8%", trend: { dir: "up", months: 2 },   xeroBalance: "£18,600.00",  sourceBalance: "£18,600.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0040", account: "Motor vehicles",                   closingBalance: "£24,000.00",  vsLastMonth: "-£1,000.00",   pct: "-4.0%", trend: { dir: "down", months: 12 }, xeroBalance: "£24,000.00",  sourceBalance: "£23,200.00",  variance: "£800.00",    suggestions: null, status: "Not started" },
          { code: "0050", account: "Goodwill",                         closingBalance: "£120,000.00", vsLastMonth: "-£2,000.00",   pct: "-1.6%", trend: { dir: "down", months: 5 },  xeroBalance: "£120,000.00", sourceBalance: "£120,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0051", account: "Trademarks and licences",          closingBalance: "£7,500.00",   vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£7,500.00",   sourceBalance: "£7,500.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0060", account: "Long-term investments",            closingBalance: "£50,000.00",  vsLastMonth: "+£1,250.00",   pct: "+2.6%", trend: { dir: "up", months: 9 },    xeroBalance: "£50,000.00",  sourceBalance: "£50,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "10 accounts",
      },
      {
        title: "Current assets",
        rows: [
          { code: "1100", account: "Trade debtors",                    closingBalance: "£184,320.00", vsLastMonth: "+£12,500.00",  pct: "+7.3%", trend: { dir: "up", months: 4 },    xeroBalance: "£184,320.00", sourceBalance: "£181,070.00", variance: "£3,250.00",  suggestions: null, status: "Not started" },
          { code: "1101", account: "Other debtors",                    closingBalance: "£6,750.00",   vsLastMonth: "-£1,200.00",   pct: "-15.1%", trend: { dir: "down", months: 2 },  xeroBalance: "£6,750.00",   sourceBalance: "£6,750.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1103", account: "Prepayments",                      closingBalance: "£23,400.00",  vsLastMonth: "+£8,400.00",   pct: "+56.0%", trend: { dir: "up", months: 1 },    xeroBalance: "£23,400.00",  sourceBalance: "£23,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1104", account: "Accrued income",                   closingBalance: "£11,250.00",  vsLastMonth: "+£3,750.00",   pct: "+50.0%", trend: { dir: "up", months: 3 },    xeroBalance: "£11,250.00",  sourceBalance: "£11,250.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1200", account: "Stock",                            closingBalance: "£41,800.00",  vsLastMonth: "+£2,300.00",   pct: "+5.8%", trend: { dir: "up", months: 6 },     xeroBalance: "£41,800.00",  sourceBalance: "£41,800.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1201", account: "VAT receivable",                   closingBalance: "£14,680.00",  vsLastMonth: "+£6,230.00",   pct: "+73.7%", trend: { dir: "up", months: 1 },    xeroBalance: "£14,680.00",  sourceBalance: "£14,680.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1210", account: "Lloyds Bank - Operations GBP",     closingBalance: "£127,000.00", vsLastMonth: "+£18,400.00",  pct: "+16.9%", trend: { dir: "up", months: 3 },    xeroBalance: "£127,000.00", sourceBalance: "£125,460.00", variance: "£1,540.00",  suggestions: null, status: "Not started" },
          { code: "1211", account: "Lloyds Bank - Business",           closingBalance: "£155,000.00", vsLastMonth: "-£3,200.00",   pct: "-2.0%", trend: { dir: "down", months: 1 },   xeroBalance: "£155,000.00", sourceBalance: "£155,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1212", account: "HSBC - Business Transactions",     closingBalance: "£93,000.00",  vsLastMonth: "+£7,650.00",   pct: "+9.0%", trend: { dir: "up", months: 5 },     xeroBalance: "£93,000.00",  sourceBalance: "£92,180.00",  variance: "£820.00",    suggestions: null, status: "Not started" },
          { code: "1213", account: "Barclays - Operations",            closingBalance: "£374,000.00", vsLastMonth: "+£41,000.00",  pct: "+12.3%", trend: { dir: "up", months: 7 },    xeroBalance: "£374,000.00", sourceBalance: "£374,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1230", account: "Petty cash",                       closingBalance: "£350.00",     vsLastMonth: "-£50.00",      pct: "-12.5%", trend: { dir: "down", months: 3 },  xeroBalance: "£350.00",     sourceBalance: "£350.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "11 accounts",
      },
    ],
  },
  {
    heading: "Liabilities",
    tables: [
      {
        title: "Current liabilities",
        rows: [
          { code: "2100", account: "Trade creditors",                  closingBalance: "£98,450.00",  vsLastMonth: "+£5,200.00",   pct: "+5.6%", trend: { dir: "up", months: 3 },    xeroBalance: "£98,450.00",  sourceBalance: "£97,200.00",  variance: "£1,250.00",  suggestions: null, status: "Not started" },
          { code: "2101", account: "Other creditors",                  closingBalance: "£4,300.00",   vsLastMonth: "-£800.00",     pct: "-15.7%", trend: { dir: "down", months: 2 },  xeroBalance: "£4,300.00",   sourceBalance: "£4,300.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2109", account: "Accruals",                         closingBalance: "£31,200.00",  vsLastMonth: "+£6,400.00",   pct: "+25.8%", trend: { dir: "up", months: 4 },    xeroBalance: "£31,200.00",  sourceBalance: "£31,200.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2110", account: "Deferred income",                  closingBalance: "£18,000.00",  vsLastMonth: "+£4,500.00",   pct: "+33.3%", trend: { dir: "up", months: 2 },    xeroBalance: "£18,000.00",  sourceBalance: "£18,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2210", account: "PAYE and NI",                      closingBalance: "£22,180.00",  vsLastMonth: "+£1,340.00",   pct: "+6.4%", trend: { dir: "up", months: 12 },    xeroBalance: "£22,180.00",  sourceBalance: "£22,180.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2201", account: "VAT payable",                      closingBalance: "£36,900.00",  vsLastMonth: "+£8,750.00",   pct: "+31.1%", trend: { dir: "up", months: 1 },    xeroBalance: "£36,900.00",  sourceBalance: "£36,900.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2150", account: "Corporation tax",                  closingBalance: "£42,500.00",  vsLastMonth: "+£14,150.00",  pct: "+49.9%", trend: { dir: "up", months: 10 },   xeroBalance: "£42,500.00",  sourceBalance: "£42,500.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2230", account: "Pension contributions",            closingBalance: "£8,640.00",   vsLastMonth: "+£720.00",     pct: "+9.1%", trend: { dir: "up", months: 12 },    xeroBalance: "£8,640.00",   sourceBalance: "£8,640.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1250", account: "American Express OP GBP",          closingBalance: "£12,400.00",  vsLastMonth: "+£3,100.00",   pct: "+33.3%", trend: { dir: "up", months: 2 },    xeroBalance: "£12,400.00",  sourceBalance: "£12,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1251", account: "Mastercard Business",              closingBalance: "£7,850.00",   vsLastMonth: "-£2,600.00",   pct: "-24.9%", trend: { dir: "down", months: 1 },  xeroBalance: "£7,850.00",   sourceBalance: "£7,850.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2300", account: "Directors\u2019 loan \u2014 J Smith",   closingBalance: "£15,000.00",  vsLastMonth: "£0.00",   pct: null, trend: null,                          xeroBalance: "£15,000.00",  sourceBalance: "£15,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "11 accounts",
      },
      {
        title: "Non-current liabilities",
        rows: [
          { code: "2400", account: "Bank loan \u2014 Lloyds (5yr)",         closingBalance: "£180,000.00", vsLastMonth: "-£3,000.00",  pct: "-1.6%", trend: { dir: "down", months: 12 }, xeroBalance: "£180,000.00", sourceBalance: "£177,000.00", variance: "£3,000.00", suggestions: null, status: "Not started" },
          { code: "2410", account: "Finance lease obligations",        closingBalance: "£22,400.00",  vsLastMonth: "-£1,400.00",   pct: "-5.9%", trend: { dir: "down", months: 8 },  xeroBalance: "£22,400.00",  sourceBalance: "£22,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2420", account: "Deferred tax provision",           closingBalance: "£9,800.00",   vsLastMonth: "+£650.00",     pct: "+7.1%", trend: { dir: "up", months: 3 },    xeroBalance: "£9,800.00",   sourceBalance: "£9,800.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "3 accounts",
      },
    ],
  },
  {
    heading: "Equity",
    tables: [
      {
        title: "Shareholders\u2019 equity",
        rows: [
          { code: "3000", account: "Ordinary share capital",           closingBalance: "£100.00",     vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£100.00",        sourceBalance: "£100.00",        variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3001", account: "Share premium",                    closingBalance: "£49,900.00",  vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£49,900.00",     sourceBalance: "£49,900.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3100", account: "Retained earnings",                closingBalance: "£1,273,730.00", vsLastMonth: "+£48,275.00", pct: "+3.9%", trend: { dir: "up", months: 12 }, xeroBalance: "£1,273,730.00",  sourceBalance: "£1,273,730.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3101", account: "Dividends paid",                   closingBalance: "-£25,000.00", vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "-£25,000.00",    sourceBalance: "-£25,000.00",    variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3200", account: "Revaluation reserve",              closingBalance: "£85,000.00",  vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£85,000.00",     sourceBalance: "£85,000.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "5 accounts",
      },
    ],
  },
];

// Flat list of all BS accounts for the account selector dropdown
const BS_ALL_ACCOUNTS = BS_SECTIONS.flatMap(section =>
  section.tables.flatMap(table => table.rows.map(row => ({ code: row.code, account: row.account })))
);

// ── Balance Sheet: PAYROLL_RECONCILIATION_STEPS ─────────────────────────────
const PAYROLL_RECONCILIATION_STEPS = [
  { title: "Reading source",              subtext: null,                                                      duration: 800  },
  { title: "Syncing Xero",                subtext: null,                                                      duration: 1000 },
  { title: "Mapping source to accounts",  subtext: "Mapped to 2210 – PAYE and NI, 2230 – Pension contributions.", duration: 1200 },
  { title: "Comparing balances",          subtext: "Xero: £30,820.00. Payroll report: £30,720.00.",           duration: 1000 },
  { title: "Looking for variances",       subtext: "1 variance found (£100.00).",                             duration: 1500 },
  { title: "Identifying root causes",     subtext: "Pension contribution timing difference identified.",       duration: 1200 },
  { title: "Suggesting actions",          subtext: null,                                                      duration: 800  },
];


// ── Balance Sheet: Account-specific reconciliation data ──────────────────────
const ACCOUNT_REC_DATA = {
  // ── 0020 – Plant and machinery ──
  "0020": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 47 assets to Xero records.",                      duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £87,200.00. Fixed asset register: £85,020.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£2,180.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "Depreciation charge discrepancy on forklift (FA-031).",    duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0020 – Plant and machinery", xeroBalance: "£87,200.00", sourceBalance: "£85,020.00", variance: "£2,180.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0020 (Plant and machinery). Xero balance is £87,200.00 vs register total of £85,020.00, resulting in a variance of £2,180.00." },
      { title: "Depreciation discrepancy", text: "A £2,180.00 difference relates to forklift FA-031. The fixed asset register shows accumulated depreciation of £14,520.00 while Xero shows £12,340.00, suggesting the March depreciation charge was not posted." },
      { title: "Asset count", text: "All 47 assets on the register are present in Xero. No disposals or additions are unaccounted for." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Depreciation – forklift FA-031", date: "31 Mar 2026", amount: "£2,180.00", description: "The fixed asset register shows accumulated depreciation of £14,520.00 for forklift FA-031, but Xero account 0020 only reflects £12,340.00. The March depreciation charge of £2,180.00 appears to be missing.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted successfully", tableData: { description: "March depreciation – forklift FA-031", account: "0020 – Plant and machinery", amount: "£2,180.00", date: "31 Mar 2026" } },
      { id: 1, type: "Missing entry", state: "Open", contact: "Disposal – office printer FA-012", date: "28 Feb 2026", amount: "£0.00", description: "Asset FA-012 (office printer) was marked as disposed on 28 Feb 2026 in the register but no disposal entry exists in Xero. The net book value at disposal was £0.00, so no P&L impact, but the cost and accumulated depreciation should be cleared.", primaryLabel: "Create disposal entry", external: false, fileAction: null, toastMessage: "Disposal entry created", tableData: { description: "Disposal of office printer FA-012", account: "0020 – Plant and machinery", amount: "£0.00", date: "28 Feb 2026" } },
    ],
    reconciledResult: { sourceBalance: "£85,020.00", variance: "£2,180.00" },
  },
  // ── 1100 – Trade debtors ──
  "1100": {
    steps: [
      { title: "Reading source",              subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                       duration: 1000 },
      { title: "Matching invoices to ledger",  subtext: "Matched 284 of 291 invoices.",                            duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £184,320.00. Aged debtors report: £181,070.00.",     duration: 1000 },
      { title: "Looking for variances",       subtext: "2 variances found (£3,250.00 total).",                     duration: 1500 },
      { title: "Identifying root causes",     subtext: "Unmatched credit note and duplicate posting identified.",   duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "1100 – Trade debtors", xeroBalance: "£184,320.00", sourceBalance: "£181,070.00", variance: "£3,250.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded aged debtors report against Xero account 1100 (Trade debtors). 284 of 291 invoices matched. Total variance is £3,250.00." },
      { title: "Credit note not applied", text: "A credit note (CN-0482) for £1,750.00 issued to Greenfield Ltd on 22 Mar 2026 is recorded in Xero but does not appear on the aged debtors report. This may indicate a reporting timing difference." },
      { title: "Duplicate posting", text: "Invoice INV-3847 for £1,500.00 (Harrison & Co) appears twice in Xero, inflating the Xero balance. The aged debtors report shows it only once." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Credit note CN-0482 – Greenfield Ltd", date: "22 Mar 2026", amount: "£1,750.00", description: "Credit note CN-0482 for £1,750.00 issued to Greenfield Ltd is recorded in Xero but does not appear on the aged debtors report. Verify whether the credit note was applied to the correct customer account and reporting period.", primaryLabel: "Investigate credit note", external: false, fileAction: null, toastMessage: "Credit note investigation logged", tableData: null },
      { id: 1, type: "Duplicate", state: "Open", contact: "Invoice INV-3847 – Harrison & Co", date: "18 Mar 2026", amount: "£1,500.00", description: "Invoice INV-3847 for £1,500.00 to Harrison & Co appears twice in Xero account 1100 but only once on the aged debtors report. The duplicate entry should be reversed to correct the Xero balance.", primaryLabel: "Reverse duplicate", external: false, fileAction: null, toastMessage: "Duplicate entry reversed", tableData: { description: "Reverse duplicate invoice INV-3847", account: "1100 – Trade debtors", amount: "£1,500.00", date: "18 Mar 2026" } },
      { id: 2, type: "Review", state: "Review", contact: "Overdue invoice INV-3612 – Baxter Group", date: "07 Feb 2026", amount: "£4,200.00", description: "Invoice INV-3612 for £4,200.00 to Baxter Group has been outstanding for 68 days. Consider whether a bad debt provision should be made or whether the debt should be written off.", primaryLabel: "Create provision", external: false, fileAction: null, toastMessage: "Bad debt provision created", tableData: { description: "Bad debt provision – Baxter Group", account: "1100 – Trade debtors", amount: "£4,200.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£181,070.00", variance: "£3,250.00" },
  },
  // ── 1103 – Prepayments ──
  "1103": {
    steps: [
      { title: "Reading source",                  subtext: null,                                                 duration: 800  },
      { title: "Syncing Xero",                    subtext: null,                                                 duration: 1000 },
      { title: "Matching prepayment schedule",     subtext: "Matched 12 prepayment items.",                      duration: 1200 },
      { title: "Comparing balances",              subtext: "Xero: £23,400.00. Prepayments schedule: £23,400.00.", duration: 1000 },
      { title: "Looking for variances",           subtext: "No variances found.",                                duration: 1500 },
      { title: "Reviewing amortisation",          subtext: "2 items flagged for review.",                         duration: 1200 },
      { title: "Suggesting actions",              subtext: null,                                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1103 – Prepayments", xeroBalance: "£23,400.00", sourceBalance: "£23,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded prepayments schedule against Xero account 1103 (Prepayments). All 12 items matched with no balance discrepancy." },
      { title: "Expired prepayment", text: "Annual software licence (PP-007, £3,600.00) expired on 28 Feb 2026 but the full amount remains on the balance sheet. The March amortisation journal of £300.00 has not been posted." },
      { title: "Insurance renewal", text: "The buildings insurance prepayment (PP-002) is amortising correctly. The next renewal is due 1 May 2026 — the schedule confirms this is already accounted for." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Software licence amortisation – PP-007", date: "31 Mar 2026", amount: "£300.00", description: "The annual software licence (PP-007, total £3,600.00) has not had its March amortisation posted. A journal of £300.00 should be posted to release the monthly portion from prepayments to the software expense account.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted successfully", tableData: { description: "Monthly amortisation – software licence PP-007", account: "1103 – Prepayments", amount: "£300.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Insurance renewal approaching – PP-002", date: "01 May 2026", amount: "£12,000.00", description: "The buildings insurance policy (PP-002) renews on 1 May 2026. The current annual premium is £12,000.00. Confirm whether the renewal quote has been received and whether the new premium amount will differ.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Renewal noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£23,400.00", variance: "£0.00" },
  },
  // ── 1200 – Stock ──
  "1200": {
    steps: [
      { title: "Reading source",               subtext: null,                                                      duration: 800  },
      { title: "Syncing Xero",                 subtext: null,                                                      duration: 1000 },
      { title: "Analysing stock valuation",    subtext: "Matched 156 stock lines to Xero inventory.",              duration: 1200 },
      { title: "Comparing balances",           subtext: "Xero: £41,800.00. Stock count valuation: £41,800.00.",    duration: 1000 },
      { title: "Looking for variances",        subtext: "No variances found.",                                     duration: 1500 },
      { title: "Reviewing stock ageing",       subtext: "Slow-moving stock identified.",                            duration: 1200 },
      { title: "Suggesting actions",           subtext: "No issues found.",                                        duration: 800  },
    ],
    overviewRows: [
      { account: "1200 – Stock", xeroBalance: "£41,800.00", sourceBalance: "£41,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded stock count valuation against Xero account 1200 (Stock). All 156 stock lines matched with no balance discrepancy." },
      { title: "Valuation method", text: "All items are valued on a weighted average cost basis, consistent with the prior period. No change in valuation method detected." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Slow-moving stock – SKU-0482", date: "31 Mar 2026", amount: "£6,200.00", description: "SKU-0482 (aluminium housings, 340 units) has not moved in over 180 days. The current carrying value is £6,200.00. Consider whether a write-down provision is needed under IAS 2 net realisable value requirements.", primaryLabel: "Create provision", external: false, fileAction: null, toastMessage: "Provision created", tableData: { description: "Slow-moving stock provision – SKU-0482", account: "1200 – Stock", amount: "£6,200.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Obsolete stock – SKU-0119", date: "31 Mar 2026", amount: "£1,400.00", description: "SKU-0119 (legacy connector cables, 85 units) was discontinued by the supplier in January 2026. Current carrying value is £1,400.00. Confirm whether these items can be sold at a discount or should be written off.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Obsolete stock noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£41,800.00", variance: "£0.00" },
  },
  // ── 2100 – Trade creditors ──
  "2100": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Matching supplier invoices",     subtext: "Matched 198 of 203 invoices.",                            duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £98,450.00. Aged creditors report: £97,200.00.",     duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£1,250.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "Supplier invoice recorded in Xero but not on report.",     duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "2100 – Trade creditors", xeroBalance: "£98,450.00", sourceBalance: "£97,200.00", variance: "£1,250.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded aged creditors report against Xero account 2100 (Trade creditors). 198 of 203 invoices matched. Variance of £1,250.00." },
      { title: "Unmatched invoice", text: "Invoice SI-7821 from DataLink Systems (£1,250.00, dated 29 Mar 2026) is in Xero but not on the aged creditors report. This is likely due to the report being generated before the invoice was entered." },
      { title: "Disputed invoice", text: "Invoice SI-7340 from Apex Supplies (£780.00) has been in dispute since February 2026. The balance appears in both Xero and the creditors report but a credit note is expected." },
    ],
    suggestions: [
      { id: 0, type: "Timing", state: "Open", contact: "Invoice SI-7821 – DataLink Systems", date: "29 Mar 2026", amount: "£1,250.00", description: "Invoice SI-7821 from DataLink Systems for £1,250.00 is recorded in Xero but does not appear on the aged creditors report. This is likely a timing difference — confirm the report cut-off date aligns with the Xero posting date.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Timing difference acknowledged", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Disputed invoice SI-7340 – Apex Supplies", date: "12 Feb 2026", amount: "£780.00", description: "Invoice SI-7340 from Apex Supplies for £780.00 has been in dispute since February. Contact the supplier to confirm whether a credit note will be issued or whether the invoice should be paid.", primaryLabel: "Contact supplier", external: false, fileAction: null, toastMessage: "Supplier contact logged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£97,200.00", variance: "£1,250.00" },
  },
  // ── 2109 – Accruals ──
  "2109": {
    steps: [
      { title: "Reading source",              subtext: null,                                                  duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                  duration: 1000 },
      { title: "Matching accruals schedule",   subtext: "Matched 8 accrual items.",                           duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £31,200.00. Accruals schedule: £31,200.00.",    duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                                 duration: 1500 },
      { title: "Reviewing accrual ageing",    subtext: "1 item flagged for review.",                          duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                  duration: 800  },
    ],
    overviewRows: [
      { account: "2109 – Accruals", xeroBalance: "£31,200.00", sourceBalance: "£31,200.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded accruals schedule against Xero account 2109 (Accruals). All 8 items matched with no balance discrepancy." },
      { title: "Stale accrual", text: "An electricity accrual for £2,400.00 was posted in December 2025. The actual invoice has since been received (£2,380.00) but has not been matched against the accrual, resulting in both entries remaining on the ledger." },
      { title: "Rent accrual", text: "The quarterly office rent accrual (£7,500.00) was posted correctly for Q1 2026. The corresponding invoice is due for payment on 1 Apr 2026." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Stale accrual – Electricity Q4", date: "31 Dec 2025", amount: "£2,400.00", description: "An electricity accrual for £2,400.00 was posted in December 2025. The actual invoice for £2,380.00 has been received and posted to trade creditors, but the accrual has not been reversed. A journal is needed to clear the accrual and recognise the £20.00 difference.", primaryLabel: "Post reversal journal", external: false, fileAction: null, toastMessage: "Reversal journal posted", tableData: { description: "Reverse electricity accrual Q4", account: "2109 – Accruals", amount: "£2,400.00", date: "31 Dec 2025" } },
    ],
    reconciledResult: { sourceBalance: "£31,200.00", variance: "£0.00" },
  },
  // ── 2201 – VAT payable ──
  "2201": {
    steps: [
      { title: "Reading source",             subtext: null,                                                 duration: 800  },
      { title: "Syncing Xero",               subtext: null,                                                 duration: 1000 },
      { title: "Matching VAT return figures", subtext: "Compared Box 1–9 to Xero VAT account.",             duration: 1200 },
      { title: "Comparing balances",         subtext: "Xero: £36,900.00. VAT return: £36,900.00.",          duration: 1000 },
      { title: "Looking for variances",      subtext: "No variances found.",                                duration: 1500 },
      { title: "Reviewing VAT period",       subtext: "Q4 return submitted. Filing deadline met.",          duration: 1200 },
      { title: "Suggesting actions",         subtext: "No issues found.",                                   duration: 800  },
    ],
    overviewRows: [
      { account: "2201 – VAT payable", xeroBalance: "£36,900.00", sourceBalance: "£36,900.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded VAT return against Xero account 2201 (VAT payable). All nine boxes on the return agree with the Xero VAT report. No variance." },
      { title: "Payment due", text: "The Q4 VAT liability of £36,900.00 is due for payment to HMRC by 7 May 2026. The return has been filed on time." },
      { title: "Input VAT", text: "One claim for input VAT on client entertainment expenses (£890.00) was included in Box 4. Under HMRC rules, business entertainment is generally not recoverable — this should be reviewed." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Input VAT on entertainment – Box 4", date: "31 Mar 2026", amount: "£890.00", description: "An input VAT claim of £890.00 on client entertainment expenses was included in Box 4 of the VAT return. Under HMRC rules, VAT on business entertainment is generally not recoverable. Review whether this claim should be reversed to avoid a potential assessment.", primaryLabel: "Reverse VAT claim", external: false, fileAction: null, toastMessage: "VAT reversal journal posted", tableData: { description: "Reverse input VAT on entertainment", account: "2201 – VAT payable", amount: "£890.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "HMRC payment due – Q4 2025/26", date: "07 May 2026", amount: "£36,900.00", description: "The Q4 VAT liability of £36,900.00 is due for payment to HMRC by 7 May 2026. Confirm the payment has been scheduled and the correct amount is being remitted, taking into account any adjustments from the entertainment claim above.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Payment schedule confirmed", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£36,900.00", variance: "£0.00" },
  },
  // ── 2150 – Corporation tax ──
  "2150": {
    steps: [
      { title: "Reading source",                subtext: null,                                                         duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                         duration: 1000 },
      { title: "Matching tax computation",       subtext: "Compared CT600 computation to Xero tax account.",           duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £42,500.00. Tax computation: £42,500.00.",             duration: 1000 },
      { title: "Looking for variances",         subtext: "No variances found.",                                        duration: 1500 },
      { title: "Reviewing payment schedule",    subtext: "Instalment payments on track.",                               duration: 1200 },
      { title: "Suggesting actions",            subtext: "No issues found.",                                               duration: 800  },
    ],
    overviewRows: [
      { account: "2150 – Corporation tax", xeroBalance: "£42,500.00", sourceBalance: "£42,500.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded CT600 tax computation against Xero account 2150 (Corporation tax). The provision of £42,500.00 matches the computation exactly." },
      { title: "Payment schedule", text: "Corporation tax for the year ending 31 Mar 2026 is due by 1 Jan 2027. No quarterly instalment payments are required as the company does not meet the large company threshold." },
      { title: "Prior year", text: "The prior year corporation tax liability of £28,350.00 was settled on 15 Dec 2025. No outstanding balance remains from previous periods." },
    ],
    suggestions: [],
    reconciledResult: { sourceBalance: "£42,500.00", variance: "£0.00" },
  },

  // ── 1210 – Lloyds Bank - Operations GBP ──
  "1210": {
    steps: [
      { title: "Reading source",              subtext: null,                                                         duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                         duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched 361 of 380 bank transactions.",                     duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £127,000.00. Bank feed: £125,460.00.",               duration: 1000 },
      { title: "Looking for variances",       subtext: "1 variance found (£1,540.00).",                                 duration: 1500 },
      { title: "Identifying root causes",     subtext: "Unreconciled bank charge and timing difference identified.", duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                         duration: 800  },
    ],
    overviewRows: [
      { account: "1210 – Lloyds Bank - Operations GBP", xeroBalance: "£127,000.00", sourceBalance: "£125,460.00", variance: "£1,540.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1210 (Lloyds Bank - Operations GBP). 361 of 380 transactions matched. Total variance is £1,540.00." },
      { title: "Bank charge not posted", text: "A Lloyds bank service charge of £840.00 (29 Mar 2026) appears on the bank feed but has not been posted to Xero. This is the largest contributor to the variance." },
      { title: "Timing difference", text: "A BACS payment of £700.00 to Hartfield Consulting (31 Mar 2026) cleared the bank on the last day of the period but is dated 1 Apr in Xero, creating a £700.00 timing difference." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Lloyds bank service charge", date: "29 Mar 2026", amount: "£840.00", description: "A Lloyds bank service charge of £840.00 (ref: CHARGE-03/26) appears on the bank feed but has not been posted to Xero. Create a bank charges journal entry to record this expense.", primaryLabel: "Create journal entry", external: false, fileAction: null, toastMessage: "Journal entry created", tableData: { description: "Bank service charge – CHARGE-03/26", account: "1210 – Lloyds Bank - Operations GBP", amount: "£840.00", date: "29 Mar 2026" } },
      { id: 1, type: "Timing", state: "Open", contact: "BACS payment – Hartfield Consulting", date: "31 Mar 2026", amount: "£700.00", description: "A BACS payment of £700.00 cleared the bank on 31 Mar 2026 but is dated 1 Apr in Xero. Confirm the correct posting date to ensure the period-end balance is accurate.", primaryLabel: "Adjust posting date", external: false, fileAction: null, toastMessage: "Posting date updated", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£125,460.00", variance: "£1,540.00" },
  },
  // ── 1211 – Lloyds Bank - Business ──
  "1211": {
    steps: [
      { title: "Reading source",              subtext: null,                                               duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                               duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched all 241 bank transactions.",               duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £155,000.00. Bank feed: £155,000.00.",       duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                              duration: 1500 },
      { title: "Reviewing transactions",      subtext: "All transactions verified.",                       duration: 1200 },
      { title: "Suggesting actions",          subtext: "No issues found.",                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1211 – Lloyds Bank - Business", xeroBalance: "£155,000.00", sourceBalance: "£155,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1211 (Lloyds Bank - Business). All 241 transactions matched with no balance discrepancy." },
      { title: "Large unclassified receipt", text: "A receipt of £18,500.00 (14 Mar 2026, ref: BACS-REF-8821) is posted to a holding account in Xero. The source of this payment is not yet identified and should be allocated to the correct income or liability account." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Unclassified receipt – BACS-REF-8821", date: "14 Mar 2026", amount: "£18,500.00", description: "A BACS receipt of £18,500.00 (ref: BACS-REF-8821) on 14 Mar 2026 is currently posted to a holding account (9999). The source of this payment needs to be identified and allocated to the correct income or liability account before period close.", primaryLabel: "Investigate receipt", external: false, fileAction: null, toastMessage: "Investigation logged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£155,000.00", variance: "£0.00" },
  },
  // ── 1212 – HSBC - Business Transactions ──
  "1212": {
    steps: [
      { title: "Reading source",              subtext: null,                                                     duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                     duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched 189 of 195 bank transactions.",                 duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £93,000.00. Bank feed: £92,180.00.",             duration: 1000 },
      { title: "Looking for variances",       subtext: "1 variance found (£820.00).",                               duration: 1500 },
      { title: "Identifying root causes",     subtext: "Direct debit not matched in Xero.",                     duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                     duration: 800  },
    ],
    overviewRows: [
      { account: "1212 – HSBC - Business Transactions", xeroBalance: "£93,000.00", sourceBalance: "£92,180.00", variance: "£820.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1212 (HSBC - Business Transactions). 189 of 195 transactions matched. Variance of £820.00." },
      { title: "Unmatched direct debit", text: "A direct debit of £820.00 (28 Mar 2026, payee: HMRC CUMBERNAULD) appears on the HSBC feed but has no corresponding entry in Xero. This is likely a PAYE or NI payment that needs to be recorded." },
      { title: "Minor timing items", text: "Five transactions totalling £4,200.00 are within a 2-day timing window and are expected to clear in the following period. No action needed." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Direct debit – HMRC CUMBERNAULD", date: "28 Mar 2026", amount: "£820.00", description: "A direct debit of £820.00 to HMRC CUMBERNAULD on 28 Mar 2026 appears on the HSBC bank feed but is not recorded in Xero. This is likely a PAYE or NI payment — post the corresponding journal entry to account 2210.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "PAYE/NI payment – HMRC CUMBERNAULD", account: "2210 – PAYE and NI", amount: "£820.00", date: "28 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "5 timing difference items", date: "31 Mar 2026", amount: "£4,200.00", description: "Five transactions totalling £4,200.00 are within a 2-day clearing window at period end. These are expected to reconcile automatically in April. Confirm no manual adjustment is needed.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Timing items acknowledged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£92,180.00", variance: "£820.00" },
  },
  // ── 1213 – Barclays - Operations ──
  "1213": {
    steps: [
      { title: "Reading source",              subtext: null,                                               duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                               duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched all 409 bank transactions.",               duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £374,000.00. Bank feed: £374,000.00.",       duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                              duration: 1500 },
      { title: "Reviewing transactions",      subtext: "All transactions verified.",                       duration: 1200 },
      { title: "Suggesting actions",          subtext: "No issues found.",                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1213 – Barclays - Operations", xeroBalance: "£374,000.00", sourceBalance: "£374,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1213 (Barclays - Operations). All 409 transactions matched with no balance discrepancy." },
      { title: "Recurring payment review", text: "Two standing order payments totalling £4,800.00 per month are posting to a generic expenses account. Consider reviewing whether these should be allocated to more specific cost codes for accurate reporting." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Standing order misallocation – 7770", date: "31 Mar 2026", amount: "£4,800.00", description: "Two standing order payments totalling £4,800.00/month are posting to account 7770 (General expenses). £3,200.00 relates to office cleaning (should be 7810 – Cleaning) and £1,600.00 to IT support (should be 7804 – IT maintenance). Reallocating improves cost reporting accuracy.", primaryLabel: "Post reallocation journal", external: false, fileAction: null, toastMessage: "Reallocation journal posted", tableData: { description: "Reallocate standing orders from 7770", account: "1213 – Barclays - Operations", amount: "£4,800.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£374,000.00", variance: "£0.00" },
  },
  // ── 0040 – Motor vehicles ──
  "0040": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing vehicle register", subtext: "Matched 6 vehicles to Xero records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £24,000.00. Vehicle register: £23,200.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "1 variance found (£800.00).", duration: 1500 },
      { title: "Identifying root causes", subtext: "Mileage allowance not posted for company van.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0040 – Motor vehicles", xeroBalance: "£24,000.00", sourceBalance: "£23,200.00", variance: "£800.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded vehicle register against Xero account 0040 (Motor vehicles). 5 of 6 vehicles matched. Variance of £800.00." },
      { title: "Depreciation gap", text: "The company van (MV-003) shows accumulated depreciation of £8,800.00 on the register vs £8,000.00 in Xero. The February depreciation charge of £800.00 appears to be missing." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Depreciation – company van MV-003", date: "28 Feb 2026", amount: "£800.00", description: "The vehicle register shows accumulated depreciation of £8,800.00 for company van MV-003, but Xero only reflects £8,000.00. The February depreciation charge of £800.00 has not been posted.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "February depreciation – van MV-003", account: "0040 – Motor vehicles", amount: "£800.00", date: "28 Feb 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Insurance renewal – MV-005", date: "15 Apr 2026", amount: "£2,400.00", description: "The commercial vehicle insurance for MV-005 renews on 15 Apr 2026. Current annual premium is £2,400.00. Confirm renewal terms have been agreed.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Renewal noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£23,200.00", variance: "£800.00" },
  },
  // ── 2110 – Deferred income ──
  "2110": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching deferred income schedule", subtext: "Matched 5 deferred revenue items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £18,000.00. Schedule: £18,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing revenue recognition", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2110 – Deferred income", xeroBalance: "£18,000.00", sourceBalance: "£18,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded deferred income schedule against Xero account 2110 (Deferred income). All 5 items matched with no balance discrepancy." },
      { title: "Revenue recognition", text: "A £6,000.00 annual support contract (DI-003, client: Meridian Consulting) started 1 Jan 2026. Three months of revenue (£1,500.00) should have been recognised by 31 Mar but only two months (£1,000.00) have been released." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Revenue recognition – DI-003 Meridian", date: "31 Mar 2026", amount: "£500.00", description: "The March revenue release of £500.00 for annual support contract DI-003 (Meridian Consulting) has not been posted. A journal is needed to release one month's revenue from deferred income to the income account.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March revenue release – DI-003", account: "2110 – Deferred income", amount: "£500.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£18,000.00", variance: "£0.00" },
  },
  // ── 2400 – Bank loan ──
  "2400": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching loan schedule", subtext: "Compared amortisation schedule to Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £180,000.00. Loan statement: £177,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "1 variance found (£3,000.00).", duration: 1500 },
      { title: "Identifying root causes", subtext: "March repayment not posted to Xero.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2400 – Bank loan – Lloyds (5yr)", xeroBalance: "£180,000.00", sourceBalance: "£177,000.00", variance: "£3,000.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded loan statement against Xero account 2400 (Bank loan – Lloyds 5yr). Variance of £3,000.00 identified." },
      { title: "Missing repayment", text: "The March loan repayment of £3,000.00 (direct debit 28 Mar 2026) appears on the loan statement but has not been posted to Xero. The bank account (1210) shows the debit but the corresponding credit to the loan account is missing." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March loan repayment – Lloyds", date: "28 Mar 2026", amount: "£3,000.00", description: "The March loan repayment of £3,000.00 (direct debit 28 Mar) has been debited from the bank account but the corresponding reduction in the loan liability has not been posted. A journal entry is needed to credit account 2400.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March loan repayment – Lloyds", account: "2400 – Bank loan", amount: "£3,000.00", date: "28 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Interest rate review due", date: "01 Jun 2026", amount: "£180,000.00", description: "The Lloyds facility agreement includes an interest rate review on 1 Jun 2026. The current rate is 5.25%. Confirm whether the bank has communicated any rate changes and whether the interest accrual needs updating.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Rate review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£177,000.00", variance: "£3,000.00" },
  },
  // ── 3100 – Retained earnings ──
  "3100": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Comparing retained earnings", subtext: "Cross-referenced P&L and prior year accounts.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £1,273,730.00. Computation: £1,273,730.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing movements", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3100 – Retained earnings", xeroBalance: "£1,273,730.00", sourceBalance: "£1,273,730.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the retained earnings computation against Xero account 3100. Opening balance, current year profit, and dividends all agree. No variance." },
      { title: "Prior year adjustment", text: "A prior year adjustment of £4,200.00 was posted in January 2026 to correct a 2024/25 accrual. This has been correctly reflected in both the computation and Xero." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Dividend authorisation – Q1 2026", date: "31 Mar 2026", amount: "£25,000.00", description: "A dividend of £25,000.00 was declared and paid during Q1 2026. Confirm that a board resolution was properly documented and that the company had sufficient distributable reserves at the time of payment.", primaryLabel: "Confirm authorisation", external: false, fileAction: null, toastMessage: "Authorisation confirmed", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£1,273,730.00", variance: "£0.00" },
  },
  // ── 0010 – Freehold property ──
  "0010": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Reviewed freehold property records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £450,000.00. Source: £450,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing asset valuations", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0010 – Freehold property", xeroBalance: "£450,000.00", sourceBalance: "£450,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the fixed asset register against Xero account 0010 (Freehold property). Balances agree with no variance." },
      { title: "Revaluation due", text: "The freehold property was last revalued in March 2023. Under FRS 102, a revaluation policy requires sufficiently regular updates to ensure the carrying amount does not differ materially from fair value. A fresh valuation should be considered." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Property revaluation – freehold", date: "31 Mar 2026", amount: "£450,000.00", description: "The freehold property at Xero account 0010 was last revalued in March 2023 — over 3 years ago. Under the company's revaluation policy, a fresh valuation should be obtained to ensure the carrying amount reflects fair value. Consider instructing a RICS-qualified surveyor.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Revaluation review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£450,000.00", variance: "£0.00" },
  },
  // ── 0011 – Leasehold improvements ──
  "0011": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Reviewed leasehold improvement records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £32,500.00. Source: £32,500.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing amortisation and lease terms", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0011 – Leasehold improvements", xeroBalance: "£32,500.00", sourceBalance: "£32,500.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the fixed asset register against Xero account 0011 (Leasehold improvements). Balances agree with no variance." },
      { title: "Missing amortisation", text: "The March amortisation charge of £1,625.00 has not been posted. Leasehold improvements are amortised on a straight-line basis over the lease term, and the monthly charge should have been journaled by month-end." },
      { title: "Lease expiry", text: "The underlying lease expires in July 2026 — approximately 3 months from now. The remaining unamortised balance and any restoration obligations should be reviewed ahead of the lease end date." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March amortisation – leasehold improvements", date: "31 Mar 2026", amount: "£1,625.00", description: "The March amortisation charge of £1,625.00 for leasehold improvements has not been posted to Xero. This is a recurring monthly entry amortising the balance over the lease term. A journal entry is needed to debit amortisation expense and credit account 0011.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March amortisation – leasehold improvements", account: "0011 – Leasehold improvements", amount: "£1,625.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Lease expiry – July 2026", date: "31 Jul 2026", amount: "£32,500.00", description: "The lease under which these improvements were made expires in July 2026. Review the remaining unamortised balance, any dilapidation provisions, and whether the lease will be renewed or surrendered.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Lease expiry review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£32,500.00", variance: "£0.00" },
  },
  // ── 0030 – Fixtures and fittings ──
  "0030": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Reviewed fixtures and fittings records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £14,800.00. Source: £14,800.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing depreciation schedule", subtext: "1 item flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0030 – Fixtures and fittings", xeroBalance: "£14,800.00", sourceBalance: "£14,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the fixed asset register against Xero account 0030 (Fixtures and fittings). Balances agree with no variance." },
      { title: "Missing depreciation", text: "The March depreciation charge of £740.00 has not been posted. Fixtures and fittings are depreciated on a straight-line basis over their useful economic life and the monthly charge should have been journaled by month-end." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March depreciation – fixtures and fittings", date: "31 Mar 2026", amount: "£740.00", description: "The March depreciation charge of £740.00 for fixtures and fittings has not been posted to Xero. A journal entry is needed to debit depreciation expense and credit accumulated depreciation on account 0030.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March depreciation – fixtures and fittings", account: "0030 – Fixtures and fittings", amount: "£740.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£14,800.00", variance: "£0.00" },
  },
  // ── 0031 – Office equipment ──
  "0031": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Reviewed office equipment records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £9,350.00. Source: £9,350.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing depreciation and asset register", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0031 – Office equipment", xeroBalance: "£9,350.00", sourceBalance: "£9,350.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the fixed asset register against Xero account 0031 (Office equipment). Balances agree with no variance." },
      { title: "Missing depreciation", text: "The March depreciation charge of £467.50 has not been posted. Office equipment is depreciated on a straight-line basis and the monthly charge should have been journaled by month-end." },
      { title: "Fully depreciated items", text: "The fixed asset register includes items with a net book value of £0.00 that are still listed. These may need to be formally disposed of or written off to keep the register accurate." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March depreciation – office equipment", date: "31 Mar 2026", amount: "£467.50", description: "The March depreciation charge of £467.50 for office equipment has not been posted to Xero. A journal entry is needed to debit depreciation expense and credit accumulated depreciation on account 0031.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March depreciation – office equipment", account: "0031 – Office equipment", amount: "£467.50", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Fully depreciated items on register", date: "31 Mar 2026", amount: "£9,350.00", description: "The fixed asset register for account 0031 contains items that are fully depreciated with a net book value of £0.00. These assets should be reviewed and formally disposed of if no longer in use, to ensure the register reflects the current asset base.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Register review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£9,350.00", variance: "£0.00" },
  },
  // ── 0032 – Computer equipment ──
  "0032": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Reviewed computer equipment records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £18,600.00. Source: £18,600.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing asset assignments and capitalisation", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0032 – Computer equipment", xeroBalance: "£18,600.00", sourceBalance: "£18,600.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the fixed asset register against Xero account 0032 (Computer equipment). Balances agree with no variance." },
      { title: "Leavers' equipment", text: "Three laptops with a combined net book value of £4,200.00 are assigned to former employees who left the business in 2025. These assets should be recovered, reassigned, or formally disposed of." },
      { title: "Capitalisation threshold", text: "A purchase of £380.00 has been capitalised to account 0032. This is below the company's capitalisation threshold of £500. The item should be expensed to the profit and loss account." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Laptops assigned to former employees", date: "31 Mar 2026", amount: "£4,200.00", description: "Three laptops with a combined net book value of £4,200.00 remain assigned to former employees on the fixed asset register. These assets should be recovered, reassigned, or formally disposed of and written off.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Asset disposal review noted", tableData: null },
      { id: 1, type: "Missing entry", state: "Open", contact: "Capitalised item below threshold – £380.00", date: "31 Mar 2026", amount: "£380.00", description: "A purchase of £380.00 has been capitalised to account 0032 (Computer equipment). This is below the company's capitalisation threshold of £500.00 and should be expensed. A journal entry is needed to debit revenue expenditure and credit account 0032.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Reclassify sub-threshold capitalisation", account: "0032 – Computer equipment", amount: "£380.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£18,600.00", variance: "£0.00" },
  },
  // ── 0050 – Goodwill ──
  "0050": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing intangible asset register", subtext: "Reviewed goodwill and impairment records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £120,000.00. Source: £120,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing impairment and documentation", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0050 – Goodwill", xeroBalance: "£120,000.00", sourceBalance: "£120,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the intangible asset register against Xero account 0050 (Goodwill). Balances agree with no variance." },
      { title: "Impairment adjustment", text: "The annual impairment review indicates a potential adjustment of £2,000.00. This relates to revised cash flow projections for the acquired business unit and should be reflected in the accounts." },
      { title: "Documentation", text: "The assumptions underlying the impairment test — including discount rates, growth projections, and terminal value — should be formally documented and approved by management to support the carrying amount." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Annual impairment review – goodwill", date: "31 Mar 2026", amount: "£2,000.00", description: "The annual impairment review for goodwill indicates a write-down of £2,000.00 is required based on updated cash flow projections. A journal entry is needed to debit impairment expense and credit account 0050.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Goodwill impairment adjustment", account: "0050 – Goodwill", amount: "£2,000.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Impairment test documentation", date: "31 Mar 2026", amount: "£120,000.00", description: "The assumptions used in the goodwill impairment test — including discount rate, revenue growth rate, and terminal value — should be formally documented and approved by the board. This supports the carrying amount under FRS 102 Section 27.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Documentation review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£120,000.00", variance: "£0.00" },
  },
  // ── 1101 – Other debtors ──
  "1101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching debtor balances", subtext: "Reviewed other debtor items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £6,750.00. Source: £6,750.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing aged items", subtext: "2 items flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1101 – Other debtors", xeroBalance: "£6,750.00", sourceBalance: "£6,750.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the other debtors schedule against Xero account 1101 (Other debtors). Balances agree with no variance." },
      { title: "Aged staff loan", text: "A staff loan of £2,500.00 has been outstanding for over 90 days with no repayment activity. The terms of the loan and recoverability should be reviewed." },
      { title: "Deposit on closed account", text: "A deposit of £1,200.00 is held on a supplier account that has since been closed. The deposit may be irrecoverable and should be followed up or written off." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Staff loan – outstanding > 90 days", date: "31 Mar 2026", amount: "£2,500.00", description: "A staff loan of £2,500.00 on account 1101 has been outstanding for over 90 days with no repayment activity. Review the loan agreement, confirm whether a repayment schedule is in place, and assess recoverability.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Staff loan review noted", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Deposit on closed supplier account", date: "31 Mar 2026", amount: "£1,200.00", description: "A deposit of £1,200.00 remains on a supplier account that has been closed. Contact the supplier to request a refund. If the deposit is irrecoverable, a write-off should be considered.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Deposit review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£6,750.00", variance: "£0.00" },
  },
  // ── 1104 – Accrued income ──
  "1104": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching accruals schedule", subtext: "Reviewed accrued income items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £11,250.00. Source: £11,250.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing accrued items", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1104 – Accrued income", xeroBalance: "£11,250.00", sourceBalance: "£11,250.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the accrued income schedule against Xero account 1104 (Accrued income). Balances agree with no variance." },
      { title: "Unaccrued consulting income", text: "March consulting income of £3,750.00 has been earned but not yet accrued. The work was completed and the invoice is expected to be raised in April." },
      { title: "Pending rebate confirmation", text: "A Q4 supplier rebate of £1,800.00 has been included in the accrued income schedule but confirmation from the supplier has not yet been received." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March consulting income accrual", date: "31 Mar 2026", amount: "£3,750.00", description: "Consulting income of £3,750.00 was earned in March but has not yet been accrued in Xero. A journal entry is needed to debit account 1104 (Accrued income) and credit consulting revenue.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March consulting income accrual", account: "1104 – Accrued income", amount: "£3,750.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Q4 rebate – supplier confirmation pending", date: "31 Mar 2026", amount: "£1,800.00", description: "A Q4 supplier rebate of £1,800.00 is included in accrued income but formal confirmation from the supplier has not been received. Follow up with the supplier to obtain written confirmation before the balance can be relied upon.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Rebate review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£11,250.00", variance: "£0.00" },
  },
  // ── 1201 – VAT receivable ──
  "1201": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching VAT return data", subtext: "Cross-referenced VAT return and Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £14,680.00. Source: £14,680.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing VAT reclaim status", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1201 – VAT receivable", xeroBalance: "£14,680.00", sourceBalance: "£14,680.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the VAT return data against Xero account 1201 (VAT receivable). Balances agree with no variance." },
      { title: "HMRC repayment tracking", text: "The VAT reclaim of £14,680.00 was submitted to HMRC but the repayment has not yet been received. Ensure the reclaim is being tracked and followed up if payment is delayed beyond the standard processing period." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "VAT reclaim – HMRC repayment tracking", date: "31 Mar 2026", amount: "£14,680.00", description: "The VAT reclaim of £14,680.00 has been submitted to HMRC but repayment has not yet been received. Confirm the submission was acknowledged, track the expected repayment date, and follow up if payment is delayed beyond 30 days.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "VAT reclaim tracking noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£14,680.00", variance: "£0.00" },
  },
  // ── 2101 – Other creditors ──
  "2101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching creditor balances", subtext: "Reviewed other creditor items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £4,300.00. Source: £4,300.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing aged balances", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2101 – Other creditors", xeroBalance: "£4,300.00", sourceBalance: "£4,300.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the other creditors schedule against Xero account 2101 (Other creditors). Balances agree with no variance." },
      { title: "Aged credit balance", text: "A credit balance of £1,100.00 relates to a cancelled supplier invoice. The credit has been sitting on the account for over 6 months and may need to be written back to the profit and loss account." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Aged credit balance – cancelled invoice", date: "31 Mar 2026", amount: "£1,100.00", description: "A credit balance of £1,100.00 on account 2101 relates to a cancelled supplier invoice and has been outstanding for over 6 months. Contact the supplier to confirm whether a refund is due, or write the balance back to the profit and loss account.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Credit balance review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£4,300.00", variance: "£0.00" },
  },
  // ── 1250 – American Express OP GBP ──
  "1250": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching transactions", subtext: "Compared card statement to Xero entries.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £12,400.00. Source: £12,400.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing unposted charges and receipts", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1250 – American Express OP GBP", xeroBalance: "£12,400.00", sourceBalance: "£12,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the Amex card statement against Xero account 1250 (American Express OP GBP). Balances agree with no variance." },
      { title: "Unposted statement charge", text: "The March statement charge of £240.00 has not been posted to Xero. This is a recurring monthly fee that should be expensed." },
      { title: "Unreceipted transactions", text: "Four transactions totalling £1,850.00 do not have receipts attached. These need expense allocation and supporting documentation before they can be fully reconciled." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March Amex statement charge", date: "31 Mar 2026", amount: "£240.00", description: "The March statement charge of £240.00 from American Express has not been posted to Xero. A journal entry is needed to debit card charges expense and credit account 1250.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March Amex statement charge", account: "1250 – American Express OP GBP", amount: "£240.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Unreceipted Amex transactions", date: "31 Mar 2026", amount: "£1,850.00", description: "Four transactions on the American Express card totalling £1,850.00 do not have receipts or expense allocations. Cardholders should be contacted to provide supporting documentation and confirm the expense categories.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Receipt chase noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£12,400.00", variance: "£0.00" },
  },
  // ── 1251 – Mastercard Business ──
  "1251": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching transactions", subtext: "Compared card statement to Xero entries.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £7,850.00. Source: £7,850.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing card transactions", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1251 – Mastercard Business", xeroBalance: "£7,850.00", sourceBalance: "£7,850.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the Mastercard statement against Xero account 1251 (Mastercard Business). Balances agree with no variance." },
      { title: "Personal expense on corporate card", text: "A transaction of £620.00 appears to be a personal expense charged to the corporate card. The cardholder should reimburse the company and the transaction should be reclassified." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Personal expense – corporate Mastercard", date: "31 Mar 2026", amount: "£620.00", description: "A transaction of £620.00 on the corporate Mastercard appears to be a personal expense. The cardholder should be contacted to arrange reimbursement. Once received, the transaction should be reclassified from card expenses to a staff debtor account.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Reimbursement chase noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£7,850.00", variance: "£0.00" },
  },
  // ── 2410 – Finance lease obligations ──
  "2410": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching lease schedule", subtext: "Compared lease amortisation schedule to Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £22,400.00. Source: £22,400.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing lease payments and terms", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2410 – Finance lease obligations", xeroBalance: "£22,400.00", sourceBalance: "£22,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the lease amortisation schedule against Xero account 2410 (Finance lease obligations). Balances agree with no variance." },
      { title: "Payment split required", text: "A lease payment of £1,400.00 was posted in full to the lease liability account. Under FRS 102, lease payments must be split between the principal repayment (reducing the liability) and the interest element (charged to the profit and loss account)." },
      { title: "Lease modification", text: "A modification is pending on the office copier lease. The revised terms have not yet been reflected in the lease schedule or Xero. Once agreed, the carrying amount and future payments will need to be recalculated." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Lease payment split – principal and interest", date: "31 Mar 2026", amount: "£1,400.00", description: "The March lease payment of £1,400.00 has been posted entirely to the lease liability. Under FRS 102, this must be split: the principal element should reduce the liability and the interest element should be charged to the profit and loss account. A journal entry is needed to reclassify the interest portion.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Lease payment split – interest reclassification", account: "2410 – Finance lease obligations", amount: "£1,400.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Lease modification – office copier", date: "31 Mar 2026", amount: "£22,400.00", description: "A lease modification is pending on the office copier. Once the revised terms are agreed, the lease liability and right-of-use asset will need to be recalculated in accordance with FRS 102. Monitor progress and update the schedule when terms are finalised.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Lease modification review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£22,400.00", variance: "£0.00" },
  },
  // ── 2420 – Deferred tax provision ──
  "2420": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing deferred tax computation", subtext: "Reviewed timing differences and tax rates.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £9,800.00. Source: £9,800.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing timing differences", subtext: "1 item flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2420 – Deferred tax provision", xeroBalance: "£9,800.00", sourceBalance: "£9,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the deferred tax computation against Xero account 2420 (Deferred tax provision). Balances agree with no variance." },
      { title: "Timing difference adjustment", text: "Accelerated capital allowances have created a timing difference requiring a deferred tax adjustment of £650.00. This reflects the difference between the accounting depreciation and the tax depreciation claimed in the current period." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Deferred tax adjustment – accelerated depreciation", date: "31 Mar 2026", amount: "£650.00", description: "A deferred tax adjustment of £650.00 is required to reflect timing differences arising from accelerated capital allowances. A journal entry is needed to debit the deferred tax charge and credit account 2420 (Deferred tax provision).", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Deferred tax adjustment – timing differences", account: "2420 – Deferred tax provision", amount: "£650.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£9,800.00", variance: "£0.00" },
  },
  // ── 3001 – Share premium ──
  "3001": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing share capital records", subtext: "Cross-referenced Companies House and Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £49,900.00. Source: £49,900.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing share premium movements", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3001 – Share premium", xeroBalance: "£49,900.00", sourceBalance: "£49,900.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the share premium records against Xero account 3001 (Share premium). Balances agree with no variance." },
      { title: "No movement in 3 years", text: "The share premium account has not changed since 2023. Confirm that no share issuances at a premium have occurred that are unrecorded. Cross-reference against the Companies House confirmation statement and any board minutes relating to share allotments." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Share premium – no movement in 3 years", date: "31 Mar 2026", amount: "£49,900.00", description: "The share premium account has remained unchanged for 3 years. Confirm that no share issuances at a premium have occurred that remain unrecorded. Cross-reference the Companies House confirmation statement and any recent board minutes regarding share allotments.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Share premium review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£49,900.00", variance: "£0.00" },
  },
  // ── 3101 – Dividends paid ──
  "3101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing dividend records", subtext: "Cross-referenced board minutes and bank payments.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: -£25,000.00. Source: -£25,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing dividend authorisation", subtext: "2 items flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3101 – Dividends paid", xeroBalance: "-£25,000.00", sourceBalance: "-£25,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the dividend records against Xero account 3101 (Dividends paid). Balances agree with no variance." },
      { title: "Board minutes", text: "A dividend of £25,000.00 was paid during the period. Confirm that the declaration is supported by a board resolution or written shareholder resolution, as required under the Companies Act 2006." },
      { title: "Distributable reserves", text: "Before a dividend is paid, the company must have sufficient distributable reserves. Confirm that the reserves position at the date of payment supported the distribution." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Board minutes – dividend declaration", date: "31 Mar 2026", amount: "£25,000.00", description: "A dividend of £25,000.00 was paid during Q1 2026. Confirm that the dividend declaration is supported by a proper board resolution or written shareholder resolution, as required under the Companies Act 2006.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Board minutes review noted", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Distributable reserves at payment date", date: "31 Mar 2026", amount: "£25,000.00", description: "Ensure the company had sufficient distributable reserves at the date the dividend was paid. Under the Companies Act 2006, a dividend may only be paid out of profits available for distribution. Review the reserves position as at the payment date.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Reserves review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "-£25,000.00", variance: "£0.00" },
  },
  // ── 3200 – Revaluation reserve ──
  "3200": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing revaluation records", subtext: "Cross-referenced property valuations and reserve movements.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £85,000.00. Source: £85,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing reserve appropriateness", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3200 – Revaluation reserve", xeroBalance: "£85,000.00", sourceBalance: "£85,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the revaluation reserve records against Xero account 3200 (Revaluation reserve). Balances agree with no variance." },
      { title: "Last revaluation", text: "The revaluation reserve of £85,000.00 relates to a property revaluation carried out in March 2023. Given that over 3 years have elapsed, the reserve should be reviewed to ensure it remains appropriate and that the underlying property value supports the carrying amount." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Revaluation reserve – appropriateness review", date: "31 Mar 2026", amount: "£85,000.00", description: "The revaluation reserve of £85,000.00 was established following a property revaluation in March 2023. Over 3 years have passed and the reserve should be reviewed to confirm the underlying property value still supports the carrying amount. If a new valuation indicates a reduction, the reserve may need to be adjusted.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Revaluation reserve review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£85,000.00", variance: "£0.00" },
  },
};

// Helper: get reconciliation data for an account, with generic fallback
function getAccountRecData(code, account) {
  if (ACCOUNT_REC_DATA[code]) return ACCOUNT_REC_DATA[code];

  // Find the row in BS_SECTIONS to get balances
  let rowData = null;
  for (const section of BS_SECTIONS) {
    for (const table of section.tables) {
      const found = table.rows.find(r => r.code === code);
      if (found) { rowData = found; break; }
    }
    if (rowData) break;
  }
  const xero = rowData ? rowData.xeroBalance : "—";
  const source = rowData ? rowData.sourceBalance : "—";
  const variance = rowData ? rowData.variance : "£0.00";
  const hasVariance = variance !== "£0.00";

  return {
    steps: [
      { title: "Reading source",          subtext: null,                                                           duration: 800  },
      { title: "Syncing Xero",            subtext: null,                                                           duration: 1000 },
      { title: "Analysing document",      subtext: "Matched source entries to Xero records.",                      duration: 1200 },
      { title: "Comparing balances",      subtext: "Xero: " + xero + ". Source document: " + source + ".",        duration: 1000 },
      { title: "Looking for variances",   subtext: hasVariance ? "Variance found (" + variance + ")." : "No variances found.", duration: 1500 },
      { title: "Reviewing entries",       subtext: hasVariance ? "Investigating variance." : "All entries verified.", duration: 1200 },
      { title: "Suggesting actions",      subtext: null,                                                           duration: 800  },
    ],
    overviewRows: [
      { account: code + " – " + account, xeroBalance: xero, sourceBalance: source, variance: variance },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded document against Xero account " + code + " (" + account + "). Xero balance is " + xero + " vs source document of " + source + (hasVariance ? ", resulting in a variance of " + variance + "." : ". No variance was found.") },
      { title: "Entries review", text: hasVariance ? "A variance of " + variance + " was identified between the source document and Xero. Review the individual transactions to determine whether this relates to a timing difference, posting error, or missing entry." : "All entries in the source document matched the corresponding Xero transactions. No discrepancies were identified." },
    ],
    suggestions: hasVariance ? [
      { id: 0, type: "Variance", state: "Open", contact: code + " – " + account, date: "31 Mar 2026", amount: variance, description: "A variance of " + variance + " was found between the Xero balance (" + xero + ") and the source document (" + source + ") for account " + code + " (" + account + "). Investigate the difference and post a correcting journal if necessary.", primaryLabel: "Investigate", external: false, fileAction: null, toastMessage: "Investigation logged", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Period-end confirmation – " + code, date: "31 Mar 2026", amount: xero, description: "Confirm that all transactions posted to account " + code + " (" + account + ") during the period have been reviewed and that the variance of " + variance + " has been fully explained before closing.", primaryLabel: "Confirm & close", external: false, fileAction: null, toastMessage: "Period-end confirmed", tableData: null },
    ] : [],
    reconciledResult: { sourceBalance: source, variance: variance },
  };
}

// ── Balance Sheet: PayrollResultsPanel ───────────────────────────────────────
function PayrollResultsPanel({ resolvedCards = new Set(), ignoredCards = new Set(), onResolveCard, onIgnoreCard, onShowToast }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const overviewRows = [
    { account: "2210 – PAYE and NI",         xeroBalance: "£22,180.00", sourceBalance: "£22,180.00", variance: "£0.00" },
    { account: "2230 – Pension contributions", xeroBalance: "£8,640.00",  sourceBalance: "£8,540.00",  variance: "£100.00" },
  ];

  const suggestions = [
    {
      id: 0,
      type: "Variance",
      state: "Open", contact: "Pension contributions", date: "31 Mar 2026", amount: "£100.00", email: "—",
      description: "A variance of £100.00 was found between the Xero balance (£8,640.00) and the payroll report (£8,540.00) for Pension contributions (2230). This may be due to a timing difference on the March employer contribution.",
      primaryLabel: "Create journal entry", external: false, fileAction: null,
      toastMessage: "Journal entry created successfully",
    },
    {
      id: 1,
      type: "Timing difference",
      state: "Review", contact: "PAYE and NI", date: "31 Mar 2026", amount: "£1,340.00", email: "—",
      description: "The PAYE and NI liability (2210) increased by £1,340.00 this month. The payroll report shows a corresponding HMRC payment due 22 Apr 2026. Please confirm this timing difference is expected.",
      primaryLabel: "Acknowledge", external: false, fileAction: null,
      toastMessage: "Timing difference acknowledged",
    },
    {
      id: 2,
      type: "Missing entry",
      state: "Open", contact: "Employer NI – new starter", date: "15 Mar 2026", amount: "£186.00", email: "—",
      description: "The payroll report includes an employer NI contribution of £186.00 for a new starter (employee #25) from 15 Mar 2026. No corresponding entry was found in Xero under account 2210.",
      primaryLabel: "Create journal entry", external: false, fileAction: null,
      toastMessage: "Journal entry created successfully",
    },
  ];

  const getCardStatus = (id) => {
    if (resolvedCards.has(id)) return "resolved";
    if (ignoredCards.has(id)) return "ignored";
    return "open";
  };

  return (
    <div style={{ padding: "48px", fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Overview</h2>

      {/* Account balances table */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "account",       label: "Account",            width: "1.6fr" },
            { key: "xeroBalance",   label: "Balance per Xero",   width: "1fr", align: "right" },
            { key: "sourceBalance", label: "Balance per source",  width: "1fr", align: "right" },
            { key: "variance",      label: "Variance",           width: "0.8fr", align: "right", render: (v) => (
              <span style={{ color: v === "£0.00" ? "#080908" : "#C8543A", fontWeight: v === "£0.00" ? 400 : 500 }}>{v}</span>
            )},
            { key: "action", label: "Action", width: "100px", align: "right", render: () => (
              <SecondaryButton style={{ padding: "4px 12px", fontSize: 13, whiteSpace: "nowrap" }}>Review</SecondaryButton>
            )},
          ]}
          rows={overviewRows}
        />
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 8, marginBottom: 28 }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4F4F4F", lineHeight: "22px", borderTop: "1px solid #EFF1F4", paddingTop: 14 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#080908", marginBottom: 2 }}>Overview</div>
              <div>The payroll reconciliation compared the uploaded payroll report against Xero accounts 2210 (PAYE and NI) and 2230 (Pension contributions). Combined Xero balance is £30,820.00 vs payroll report total of £30,720.00, resulting in a net variance of £100.00.</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#080908", marginBottom: 2 }}>Pension contribution variance</div>
              <div>A £100.00 difference was identified in account 2230 (Pension contributions). The Xero balance exceeds the payroll report figure, likely due to a timing difference on the March employer contribution posting.</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#080908", marginBottom: 2 }}>PAYE and NI timing</div>
              <div>Account 2210 shows an increase of £1,340.00 this period. The payroll report confirms a corresponding HMRC payment is due 22 Apr 2026, indicating a normal timing difference rather than an error.</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#080908", marginBottom: 2 }}>Missing journal entry</div>
              <div>An employer NI contribution of £186.00 for a new starter (employee #25, 15 Mar 2026) appears in the payroll report but has no matching entry in Xero under account 2210.</div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Suggestions</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {suggestions.map((entry) => {
          const status = getCardStatus(entry.id);
          const isResolved = status === "resolved";
          const isIgnored = status === "ignored";
          const isClosed = isResolved || isIgnored;
          return (
            <RecommendationCard
              key={entry.id}
              title={`${entry.type}: ${entry.contact}`}
              description={entry.description}
              statusLabel={isIgnored ? "Ignored" : isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isIgnored
                ? { background: "#F5F5F5", border: "none", color: "#8C8C8B" }
                : isResolved
                  ? { background: "#EAF2E2", border: "none", color: "#05A105" }
                  : { background: "#FDF8EE", border: "none", color: "#D5A750" }
              }
              collapsed={isClosed}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              secondaryLabel="I have resolved this"
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(entry.id); onShowToast?.(entry.toastMessage); }}
              onSecondaryAction={() => { onResolveCard?.(entry.id); onShowToast?.("Marked as resolved"); }}
              onIgnore={() => { onIgnoreCard?.(entry.id); onShowToast?.("Suggestion ignored"); }}
            />
          );
        })}
      </div>

      <div style={{ paddingBottom: 32 }} />
      </div>
    </div>
  );
}

// ── Balance Sheet: AccountResultsPanel (generic, data-driven) ────────────────
function AccountResultsPanel({ config, resolvedCards = new Set(), ignoredCards = new Set(), onResolveCard, onIgnoreCard, onShowToast }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const { overviewRows, analysis, suggestions } = config;

  const getCardStatus = (id) => {
    if (resolvedCards.has(id)) return "resolved";
    if (ignoredCards.has(id)) return "ignored";
    return "open";
  };

  return (
    <div style={{ padding: "48px", fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Overview</h2>

      {/* Account balances table */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "account",       label: "Account",            width: "1.6fr" },
            { key: "xeroBalance",   label: "Balance per Xero",   width: "1fr", align: "right" },
            { key: "sourceBalance", label: "Balance per source",  width: "1fr", align: "right" },
            { key: "variance",      label: "Variance",           width: "0.8fr", align: "right", render: (v) => (
              <span style={{ color: v === "£0.00" ? "#080908" : "#C8543A", fontWeight: v === "£0.00" ? 400 : 500 }}>{v}</span>
            )},
            { key: "action", label: "Action", width: "100px", align: "right", render: () => (
              <SecondaryButton style={{ padding: "4px 12px", fontSize: 13, whiteSpace: "nowrap" }}>Review</SecondaryButton>
            )},
          ]}
          rows={overviewRows}
        />
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 8, marginBottom: 28 }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4F4F4F", lineHeight: "22px", borderTop: "1px solid #EFF1F4", paddingTop: 14 }}>
            {analysis.map((section, i) => (
              <div key={i} style={{ marginBottom: i < analysis.length - 1 ? 14 : 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#080908", marginBottom: 2 }}>{section.title}</div>
                <div>{section.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Suggestions</h2>

      {suggestions.length === 0 ? (
        <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#05A105" strokeWidth="2"/>
              <path d="M13 20L18 25L27 15" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#080908", margin: "0 0 6px" }}>No suggestions or variance found</h3>
          <p style={{ fontSize: 14, color: "#545453", margin: 0, lineHeight: "22px" }}>Mark this account as reconciled, or restart reconciliation to re-check.</p>
        </div>
      ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {suggestions.map((entry) => {
          const status = getCardStatus(entry.id);
          const isResolved = status === "resolved";
          const isIgnored = status === "ignored";
          const isClosed = isResolved || isIgnored;
          return (
            <RecommendationCard
              key={entry.id}
              title={entry.type + ": " + entry.contact}
              description={entry.description}
              statusLabel={isIgnored ? "Ignored" : isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isIgnored
                ? { background: "#F5F5F5", border: "none", color: "#8C8C8B" }
                : isResolved
                  ? { background: "#EAF2E2", border: "none", color: "#05A105" }
                  : { background: "#FDF8EE", border: "none", color: "#D5A750" }
              }
              collapsed={isClosed}
              tableRow={entry.tableData || null}
              tableColumns={entry.tableData ? [
                { key: "description", label: "Description", width: "1.6fr" },
                { key: "account",     label: "Account",     width: "1.2fr" },
                { key: "amount",      label: "Amount",      width: "0.8fr" },
                { key: "date",        label: "Date",        width: "0.8fr" },
              ] : null}
              primaryLabel={entry.primaryLabel}
              secondaryLabel="I have resolved this"
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(entry.id); onShowToast?.(entry.toastMessage); }}
              onSecondaryAction={() => { onResolveCard?.(entry.id); onShowToast?.("Marked as resolved"); }}
              onIgnore={() => { onIgnoreCard?.(entry.id); onShowToast?.("Suggestion ignored"); }}
            />
          );
        })}
      </div>
      )}

      <div style={{ paddingBottom: 32 }} />
      </div>
    </div>
  );
}

// ── Balance Sheet: BSReconciliationFlow ──────────────────────────────────────
function BSReconciliationFlow({ onClose, onMarkReconciled, onSwitchAccount, directAccount, savedState, bsReconciledData }) {
  const isDirectFlow = !!directAccount;
  const isResume = !!savedState;
  const [selectedType, setSelectedType] = useState(null);
  const [typeSelected, setTypeSelected] = useState(false);
  const [accountChoiceSelected, setAccountChoiceSelected] = useState(null);
  const [pickedBSAccount, setPickedBSAccount] = useState(null);
  const [pickedAccountAction, setPickedAccountAction] = useState(null); // "View reconciliation results" | "Restart reconciliation" | null
  const [accountSearch, setAccountSearch] = useState("");
  const [bsDropdownOpen, setBsDropdownOpen] = useState(false);
  const [bsDropdownSearch, setBsDropdownSearch] = useState("");
  // Effective direct account: either from prop (table click) or from chat picker
  const effectiveDirectAccount = directAccount || pickedBSAccount;
  const accountRecData = effectiveDirectAccount ? getAccountRecData(effectiveDirectAccount.code, effectiveDirectAccount.account) : null;
  const activeSteps = effectiveDirectAccount ? accountRecData.steps : PAYROLL_RECONCILIATION_STEPS;
  const reconciliationTypes = [
    "Payroll", "Choose account from balance sheet",
  ];
  const [uploadedFiles, setUploadedFiles] = useState(isResume ? [{ name: "Uploaded document.pdf", type: "application/pdf", label: "Reconciliation document" }] : []);
  const uploadedFile = uploadedFiles.length > 0 ? uploadedFiles[0] : null; // compat alias
  const [prepDone, setPrepDone] = useState(!!isResume);
  const [readyChoice, setReadyChoice] = useState(isResume ? "Start reconciliation" : null);
  // "Add another document" loop state
  const [addMoreRound, setAddMoreRound] = useState(0); // increments each "Add another document"
  const [addMorePrepDone, setAddMorePrepDone] = useState(false);
  const [startAfterMore, setStartAfterMore] = useState(false); // true when user clicks Start after adding files
  const [addMoreWaitingUpload, setAddMoreWaitingUpload] = useState(false); // true after user clicks "Add another document", reset when file uploaded

  // Restart reconciliation flow state
  const [restartMode, setRestartMode] = useState(null); // null | "choosing" | "same_file" | "new_file"
  const [restartChoice, setRestartChoice] = useState(null); // "Reconcile against the same file" | "Reconcile against another file"
  const [restartUploadedFiles, setRestartUploadedFiles] = useState([]);
  const [restartPrepDone, setRestartPrepDone] = useState(false);
  const [restartReadyChoice, setRestartReadyChoice] = useState(null);
  const [restartStepStatuses, setRestartStepStatuses] = useState([]);
  const [restartStepSubtexts, setRestartStepSubtexts] = useState([]);
  const [restartCanvasReady, setRestartCanvasReady] = useState(false);
  const [restartResultsVisible, setRestartResultsVisible] = useState(false);
  const [restartAddMoreRound, setRestartAddMoreRound] = useState(0);
  const [restartAddMorePrepDone, setRestartAddMorePrepDone] = useState(false);
  const [restartStartAfterMore, setRestartStartAfterMore] = useState(false);

  // File label helpers — context-based placeholder names
  const FILE_LABELS = ["Reconciliation document", "Supporting document", "Additional document"];
  const getFileLabel = (index) => index < FILE_LABELS.length ? FILE_LABELS[index] : "Document " + (index + 1);

  // Handler for adding files (single or multi-drop)
  const handleFilesAdded = (files) => {
    const labelled = files.map((f, i) => ({ ...f, label: getFileLabel(uploadedFiles.length + i) }));
    setUploadedFiles(prev => [...prev, ...labelled]);
  };
  const handleFirstFile = (file) => {
    setUploadedFiles([{ ...file, label: getFileLabel(0) }]);
  };
  const handleAddMoreFiles = (files) => {
    const labelled = files.map((f, i) => ({ ...f, label: getFileLabel(uploadedFiles.length + i) }));
    setUploadedFiles(prev => [...prev, ...labelled]);
  };
  const [stepStatuses, setStepStatuses] = useState(isResume ? activeSteps.map(() => "done") : []);
  const [stepSubtexts, setStepSubtexts] = useState(isResume ? activeSteps.map(() => true) : []);
  const [resultsVisible, setResultsVisible] = useState(!!isResume);
  const [canvasReady, setCanvasReady] = useState(!!isResume);
  const [chatWidth, setChatWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [resolvedCards, setResolvedCards] = useState(isResume && savedState.resolvedCards ? new Set(savedState.resolvedCards) : new Set());
  const [ignoredCards, setIgnoredCards] = useState(isResume && savedState.ignoredCards ? new Set(savedState.ignoredCards) : new Set());
  const [toast, setToast] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerComment, setDrawerComment] = useState("");
  const chatScrollRef = useRef(null);
  const chatEndRef = useRef(null);

  // Payroll accounts from balance sheet
  const payrollAccounts = [
    { code: "2210", name: "PAYE and NI" },
    { code: "2230", name: "Pension contributions" },
  ];

  // All balance sheet accounts for the picker
  const allBSAccounts = [];
  for (const section of BS_SECTIONS) {
    for (const table of section.tables) {
      for (const row of table.rows) {
        allBSAccounts.push({ code: row.code, account: row.account });
      }
    }
  }

  // Line 1 – opening AI message
  const line1Segments = [
    { text: "Great, let\u2019s reconcile the ", bold: false },
    { text: "balance sheet.",                    bold: true  },
  ];
  const line1Full = line1Segments.map(s => s.text).join("");
  const { done: line1Done } = useTypewriter(line1Full, 18, isResume);

  // Line 2 – prompt to pick type
  const line2Text = "Tell me what you\u2019d like to reconcile";
  const { done: line2Done } = useTypewriter(line1Done ? line2Text : "", 18, isResume);

  // Line 3 – after type selected: accounts intro message (Payroll)
  const line3Segments = selectedType === "Payroll" ? [
    { text: "I will look at the following accounts to reconcile ", bold: false },
    { text: "Payroll",                                             bold: true  },
    { text: ":",                                                   bold: false },
  ] : [];
  const line3Full = line3Segments.map(s => s.text).join("");
  const { done: line3Done } = useTypewriter(typeSelected ? line3Full : "", 18, isResume);

  // Line 3b – after "Choose account from balance sheet" selected
  const line3bText = "Which account would you like to reconcile?";
  const { done: line3bDone } = useTypewriter(typeSelected && selectedType === "Choose account from balance sheet" ? line3bText : "", 18, isResume);

  // Line 4 – confirmation after "Continue with suggested accounts"
  const line4Segments = accountChoiceSelected === "Continue with suggested accounts" ? [
    { text: "Great, I will reconcile ",  bold: false },
    { text: "Payroll",                   bold: true  },
    { text: " with accounts ",           bold: false },
    { text: "2210 \u2013 PAYE and NI",   bold: true  },
    { text: " and ",                     bold: false },
    { text: "2230 \u2013 Pension contributions", bold: true },
    { text: ".",                         bold: false },
  ] : [];
  const line4Full = line4Segments.map(s => s.text).join("");
  const { done: line4Done } = useTypewriter(accountChoiceSelected === "Continue with suggested accounts" ? line4Full : "", 18, isResume);

  // Line 5 – "Please upload a payroll report"
  const line5Text = "Please upload a payroll report.";
  const { done: line5Done } = useTypewriter(line4Done ? line5Text : "", 18, isResume);

  // Line 6 – after file uploaded + prep done: ready message
  const line6Segments = prepDone ? (isDirectFlow ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: `${directAccount.code} \u2013 ${directAccount.account}`, bold: true },
    { text: " against the document you provided. Tell me when you\u2019re ready to start.", bold: false },
  ] : pickedBSAccount ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: `${pickedBSAccount.code} \u2013 ${pickedBSAccount.account}`, bold: true },
    { text: " against the document you provided. Tell me when you\u2019re ready to start.", bold: false },
  ] : [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: "Payroll",                                bold: true  },
    { text: " against the payroll report you provided. Tell me when you\u2019re ready to start.", bold: false },
  ]) : [];
  const line6Full = line6Segments.map(s => s.text).join("");
  const { done: line6Done } = useTypewriter(prepDone ? line6Full : "", 18, isResume);

  // Line 7 – after canvasReady: ready for review message
  const line7Text = "Reconciliation is ready for your review. If something doesn\u2019t look right or is unclear simply ask me for any changes or information.";
  const { done: line7Done } = useTypewriter(canvasReady ? line7Text : "", 18, isResume);

  // \u2500\u2500 Direct account flow lines \u2500\u2500
  const directLine1Segments = isDirectFlow ? [
    { text: "Let\u2019s reconcile ", bold: false },
    { text: `${directAccount.code} \u2013 ${directAccount.account}`, bold: true },
    { text: ".",                     bold: false },
  ] : [];
  const directLine1Full = directLine1Segments.map(s => s.text).join("");
  const { done: directLine1Done } = useTypewriter(isDirectFlow ? directLine1Full : "", 18, isResume);

  const directLine2Text = "Please upload a document to reconcile this account.";
  const { done: directLine2Done } = useTypewriter(isDirectFlow && directLine1Done ? directLine2Text : "", 18, isResume);

  const handleFileSelected = (file) => {
    handleFirstFile(file);
  };

  // After first file is selected, wait 2.2s then mark prep done
  useEffect(() => {
    if (!uploadedFile) return;
    const t = setTimeout(() => setPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [uploadedFile]);

  // After "Add another document" round: prep timer for added files
  useEffect(() => {
    if (addMoreRound === 0) return;
    setAddMorePrepDone(false);
    const t = setTimeout(() => setAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [addMoreRound]);

  // Determine effective start trigger: direct start or after adding more files
  const effectiveStart = (readyChoice === "Start reconciliation") || startAfterMore;

  // Run reconciliation steps after "Start reconciliation"
  useEffect(() => {
    if (!effectiveStart) return;
    if (isResume) return; // Skip animation on resume \u2014 steps already done
    if (pickedAccountAction === "View reconciliation results") return; // Skip for view results
    setStepStatuses(activeSteps.map((_, i) => i === 0 ? "active" : "pending"));
    setStepSubtexts(activeSteps.map(() => false));
    let cumulative = 0;
    const timers = [];
    activeSteps.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < activeSteps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [readyChoice, startAfterMore]);

  const reconciliationComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");

  useEffect(() => {
    if (reconciliationComplete) setResultsVisible(true);
  }, [reconciliationComplete]);

  // Delay canvas content until panel has slid in (skip delay on resume)
  useEffect(() => {
    if (!resultsVisible) return;
    if (isResume) { setCanvasReady(true); return; }
    setCanvasReady(false);
    const t = setTimeout(() => setCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  // ─── Restart reconciliation effects ───

  // Restart: prep timer for uploaded file (new_file path)
  useEffect(() => {
    if (restartMode !== "new_file" || restartUploadedFiles.length === 0) return;
    setRestartPrepDone(false);
    const t = setTimeout(() => setRestartPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [restartUploadedFiles.length]);

  // Restart: add more round prep
  useEffect(() => {
    if (restartAddMoreRound === 0) return;
    setRestartAddMorePrepDone(false);
    const t = setTimeout(() => setRestartAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [restartAddMoreRound]);

  // Restart: run reconciliation steps animation
  useEffect(() => {
    const shouldRun = restartMode === "same_file" || (restartMode === "new_file" && (restartReadyChoice === "Start reconciliation" || restartStartAfterMore));
    if (!shouldRun) return;
    // Reset canvas states for fresh results
    setResultsVisible(false);
    setCanvasReady(false);
    setResolvedCards(new Set());
    setIgnoredCards(new Set());
    setRestartStepStatuses(activeSteps.map((_, i) => i === 0 ? "active" : "pending"));
    setRestartStepSubtexts(activeSteps.map(() => false));
    let cumulative = 0;
    const timers = [];
    activeSteps.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setRestartStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setRestartStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < activeSteps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [restartMode, restartReadyChoice, restartStartAfterMore]);

  // Restart: when all steps done, show results
  const restartReconciliationComplete = restartStepStatuses.length > 0 && restartStepStatuses.every(s => s === "done");
  useEffect(() => {
    if (!restartReconciliationComplete) return;
    const t = setTimeout(() => {
      setCanvasReady(true);
      setResultsVisible(true);
      setRestartResultsVisible(true);
    }, 600);
    return () => clearTimeout(t);
  }, [restartReconciliationComplete]);

  // Drag handler for resizable chat panel
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = chatWidth;
    const onMouseMove = (e) => {
      const newWidth = Math.max(280, Math.min(700, startWidth + (e.clientX - startX)));
      setChatWidth(newWidth);
    };
    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Auto-scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [line1Done, line2Done, typeSelected, line3Done, line3bDone, accountChoiceSelected, line4Done, line5Done, uploadedFile, prepDone, line6Done, readyChoice, stepStatuses, line7Done, directLine1Done, directLine2Done, pickedBSAccount, pickedAccountAction, uploadedFiles.length, addMoreRound, addMorePrepDone, startAfterMore, restartMode, restartChoice, restartUploadedFiles.length, restartPrepDone, restartReadyChoice, restartStepStatuses, restartAddMoreRound, restartAddMorePrepDone, restartStartAfterMore]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FBFBFB" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes drawerSlideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#080908", flexShrink: 0, letterSpacing: "-1px" }}>Balance sheet reconciliation</span>

        {/* Account selector dropdown — appears once an account is active */}
        {effectiveDirectAccount && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setBsDropdownOpen(o => !o); setBsDropdownSearch(""); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
            >
              <span style={{ color: "#080908" }}>
                {effectiveDirectAccount.code} &ndash; {effectiveDirectAccount.account}
              </span>
              <Chevron color="#080908" />
            </button>
            {bsDropdownOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 300, maxHeight: 360, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ padding: "8px 8px 4px", flexShrink: 0 }}>
                  <input
                    value={bsDropdownSearch}
                    onChange={e => setBsDropdownSearch(e.target.value)}
                    placeholder="Search accounts..."
                    autoFocus
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #E9E9EB", borderRadius: 6, fontSize: 13, color: "#080908", outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div style={{ overflowY: "auto", maxHeight: 300 }}>
                  {BS_ALL_ACCOUNTS.filter(a => {
                    if (!bsDropdownSearch) return true;
                    const q = bsDropdownSearch.toLowerCase();
                    return a.code.toLowerCase().includes(q) || a.account.toLowerCase().includes(q);
                  }).map(acc => {
                    const isCurrent = acc.code === effectiveDirectAccount.code;
                    return (
                      <button key={acc.code} onClick={() => {
                        setBsDropdownOpen(false);
                        if (!isCurrent) onSwitchAccount?.(acc);
                      }}
                        style={{ width: "100%", display: "block", textAlign: "left", padding: "10px 14px", fontSize: 14, color: isCurrent ? "#080908" : "#4F4F4F", fontWeight: isCurrent ? 500 : 400, background: isCurrent ? "#F5F5F5" : "transparent", border: "none", cursor: "pointer" }}
                        onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = "#FAFAFA"; }}
                        onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = isCurrent ? "#F5F5F5" : "transparent"; }}
                      >{acc.code} &ndash; {acc.account}</button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ flex: 1 }} />
        {resultsVisible && (() => {
          const isAlreadyReconciled = savedState && savedState.status === "reconciled";
          if (isAlreadyReconciled) {
            return (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                height: 36, padding: "0 14px", borderRadius: 8,
                background: "#EAF2E2", fontSize: 14, fontWeight: 500, color: "#05A105",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reconciled
              </div>
            );
          }
          const totalSuggestions = effectiveDirectAccount && accountRecData ? accountRecData.suggestions.length : 3;
          const remaining = totalSuggestions - resolvedCards.size - ignoredCards.size;
          const allHandled = remaining <= 0;
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: "#545453", whiteSpace: "nowrap" }}>
                Left to review: <strong style={{ color: "#080908" }}>{Math.max(0, remaining)} suggestion{remaining !== 1 ? "s" : ""}</strong>
              </span>
              <button
                onClick={() => { allHandled ? onMarkReconciled?.(null, effectiveDirectAccount) : setDrawerOpen(true); }}
                style={{
                  height: 36, padding: "0 16px",
                  borderRadius: 8, border: "none",
                  background: "#05A105", color: "#FFFFFF",
                  fontSize: 14, fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#048A04"}
                onMouseLeave={e => e.currentTarget.style.background = "#05A105"}
              >
                Mark as reconciled
              </button>
            </div>
          );
        })()}
        {/* Close button */}
        <button onClick={() => {
          const isAlreadyReconciled = savedState && savedState.status === "reconciled";
          if (resultsVisible && !isAlreadyReconciled) {
            onClose?.({ resolvedCards: Array.from(resolvedCards), ignoredCards: Array.from(ignoredCards) }, effectiveDirectAccount);
          } else {
            onClose?.(null, effectiveDirectAccount);
          }
        }} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: 8, border: "1px solid #E9E9EB",
          background: "#FFFFFF", cursor: "pointer",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area \u2014 position:relative so the canvas overlay can anchor to it */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

      {/* Left: chat panel */}
      <div style={{
        display: "flex", flexDirection: "column",
        width: resultsVisible ? chatWidth : "100%",
        flexShrink: 0,
        transition: isDragging ? "none" : "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        willChange: "width",
      }}>

      {/* Chat area */}
      <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: resultsVisible ? "100%" : 680, width: "100%", margin: "0 auto", padding: resultsVisible ? "32px 24px 40px" : "40px 24px 40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

          {/* \u2500\u2500 Direct account flow \u2500\u2500 */}
          {isDirectFlow && (
            <>
              <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                <p><StreamingMessage segments={directLine1Segments} speed={18} instant={isResume} /></p>
                {directLine1Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key="directLine2" segments={[{ text: directLine2Text, bold: false }]} speed={18} instant={isResume} />
                  </p>
                )}
              </div>

              {/* Upload card \u2014 appears after direct line 2 finishes */}
              {directLine2Done && !uploadedFile && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={handleFileSelected} title="Upload file" />
                </div>
              )}

              {/* User bubble \u2014 file preview after upload */}
              {uploadedFile && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={uploadedFile} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{directAccount.account} report</span>
                      </div>
                      <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={uploadedFile} width={13} height={16} />
                      <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Preparing status */}
              {uploadedFile && !prepDone && (
                <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for reconciliation
                </p>
              )}

              {/* AI ready message \u2014 after prep done */}
              {prepDone && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="line6-direct" instant={isResume} segments={line6Segments.length > 0 ? line6Segments : [
                    { text: "I have everything I need to reconcile ", bold: false },
                    { text: `${directAccount.code} \u2013 ${directAccount.account}`, bold: true },
                    { text: " against the document you provided. Tell me when you\u2019re ready to start.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* Choice: start \u2014 appears after ready message finishes */}
              {prepDone && line6Done && !readyChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: "#FFFFFF",
                    border: "1px solid #E9E9EB",
                    borderRadius: 16,
                    padding: "20px 20px 12px",
                    maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setReadyChoice(opt)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: "#F7F7F7", border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: "#080908",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                        onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User reply bubble for ready choice */}
              {readyChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                    {readyChoice}
                  </div>
                </div>
              )}

              {/* Add another document flow (direct) */}
              {readyChoice === "Add another document" && (
                <>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-direct-" + addMoreRound} segments={[{ text: "Upload another document and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  {addMoreRound === 0 && !addMoreWaitingUpload && (
                    <div style={{ marginTop: 16 }}>
                      <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" />
                    </div>
                  )}
                  {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                    <div key={"add-preview-direct-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 320 }}>
                        <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <FileIcon file={file} width={20} height={24} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{file.label}</span>
                          </div>
                          <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                          {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                            <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                          <FileIcon file={file} width={13} height={16} />
                          <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                    <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                      Preparing the document and getting ready for reconciliation
                    </p>
                  )}
                  {addMorePrepDone && (() => {
                    const labels = uploadedFiles.map(f => f.label);
                    const docSegments = [];
                    labels.forEach((lbl, i) => {
                      if (i > 0) {
                        if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                        else docSegments.push({ text: ", ", bold: false });
                      }
                      docSegments.push({ text: lbl, bold: true });
                    });
                    return (
                      <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"add-doc-direct-ready-" + addMoreRound} segments={[
                          { text: "I have everything I need to reconcile ", bold: false },
                          { text: `${directAccount.code} \u2013 ${directAccount.account}`, bold: true },
                          { text: " against ", bold: false },
                          ...docSegments,
                          { text: ". Tell me when you\u2019re ready to start.", bold: false },
                        ]} speed={18} /></p>
                      </div>
                    );
                  })()}
                  {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{
                        background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                        padding: "20px 20px 12px", maxWidth: 480,
                        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      }}>
                        {["Start reconciliation", "Add another document"].map(opt => (
                          <button key={opt} onClick={() => {
                            if (opt === "Start reconciliation") { setStartAfterMore(true); }
                            else { setAddMoreWaitingUpload(true); }
                          }} style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "12px 16px", marginBottom: 8,
                            background: "#F7F7F7", border: "none",
                            borderRadius: 10, cursor: "pointer",
                            fontSize: 14, fontWeight: 400, color: "#080908",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                          onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* User chose "Add another document" — new upload round */}
                  {addMoreWaitingUpload && (
                    <>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                          Add another document
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"add-doc-direct-waiting-" + addMoreRound} segments={[{ text: "Upload another document and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" />
                      </div>
                    </>
                  )}
                </>
              )}
              {readyChoice === "Add another document" && startAfterMore && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* Reconciliation progress steps */}
              {effectiveStart && stepStatuses.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                      </div>
                      <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                        {stepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                      </span>
                    </div>
                  </div>

                  {activeSteps.map((step, i) => {
                    const status = stepStatuses[i] || "pending";
                    const isLast = i === activeSteps.length - 1;
                    return (
                      <div key={i} style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                            border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                            background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.4s ease",
                          }}>
                            {status === "done" && (
                              <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                                <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                            {status === "active" && (
                              <div style={{
                                width: 16, height: 16, borderRadius: "50%",
                                border: "1.5px solid #ACD394",
                                borderTopColor: "#05A105",
                                animation: "spin 0.7s linear infinite",
                              }} />
                            )}
                          </div>
                          {!isLast && (
                            <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                          )}
                        </div>
                        <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                          <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? "#BCBCBC" : "#080908", transition: "all 0.3s ease" }}>
                            {step.title}
                          </div>
                          {(stepSubtexts[i] || status === "done") && step.subtext && (
                            <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                              {step.subtext}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {canvasReady && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="line7-direct" segments={[{ text: line7Text, bold: false }]} speed={18} instant={isResume} /></p>
                </div>
              )}
            </>
          )}

          {/* \u2500\u2500 Normal flow (type picker \u2192 accounts \u2192 upload) \u2500\u2500 */}
          {!isDirectFlow && (
          <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px" }}>
            <p><StreamingMessage segments={line1Segments} speed={18} instant={isResume} /></p>
            {line1Done && (
              <p style={{ marginTop: 6 }}>
                <StreamingMessage key="line2" segments={[{ text: line2Text, bold: false }]} speed={18} instant={isResume} />
              </p>
            )}
          </div>
          )}

          {/* Type picker \u2014 appears after AI finishes line 2, before user selects */}
          {!isDirectFlow && line2Done && !typeSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12 }}>What would you like to reconcile?</p>
                {reconciliationTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setTypeSelected(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble \u2014 after type is selected */}
          {!isDirectFlow && typeSelected && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {selectedType}
              </div>
            </div>
          )}

          {/* ── "Choose account from balance sheet" flow ── */}
          {!isDirectFlow && typeSelected && selectedType === "Choose account from balance sheet" && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line3b" segments={[{ text: line3bText, bold: false }]} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* BS Account picker card */}
          {!isDirectFlow && typeSelected && selectedType === "Choose account from balance sheet" && line3bDone && !pickedBSAccount && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                height: 400,
                display: "flex",
                flexDirection: "column",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12, flexShrink: 0 }}>Select an account</p>
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={accountSearch}
                  onChange={e => setAccountSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", marginBottom: 10,
                    border: "1px solid #E9E9EB", borderRadius: 8,
                    fontSize: 14, color: "#080908", outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#CFCFD1"}
                  onBlur={e => e.currentTarget.style.borderColor = "#E9E9EB"}
                />
                <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                  {allBSAccounts.filter(acc => !accountSearch || acc.code.toLowerCase().includes(accountSearch.toLowerCase()) || acc.account.toLowerCase().includes(accountSearch.toLowerCase())).map(acc => (
                    <button
                      key={acc.code}
                      onClick={() => setPickedBSAccount(acc)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "10px 16px", marginBottom: 6,
                        background: "#F7F7F7", border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: "#080908",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                    >
                      <span style={{ fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"\u2013"}</span>
                      <span>{acc.account}</span>
                    </button>
                  ))}
                  {allBSAccounts.filter(acc => !accountSearch || acc.code.toLowerCase().includes(accountSearch.toLowerCase()) || acc.account.toLowerCase().includes(accountSearch.toLowerCase())).length === 0 && (
                    <p style={{ fontSize: 14, color: "#8C8C8B", padding: "20px 16px", textAlign: "center" }}>No accounts found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* User reply bubble for picked BS account */}
          {!isDirectFlow && pickedBSAccount && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {pickedBSAccount.code} {"\u2013"} {pickedBSAccount.account}
              </div>
            </div>
          )}

          {/* After picking BS account: check if previously reconciled */}
          {!isDirectFlow && pickedBSAccount && (() => {
            const pickedRecData = bsReconciledData && bsReconciledData[pickedBSAccount.code];
            const isPreviouslyReconciled = pickedRecData && (pickedRecData.status === "reconciled" || pickedRecData.status === "reviewing");

            // If previously reconciled and no action chosen yet, show choice
            if (isPreviouslyReconciled && !pickedAccountAction) {
              const statusLabel = pickedRecData.status === "reconciled" ? "reconciled" : "in review";
              return (
                <>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-status-" + pickedBSAccount.code} segments={[
                      { text: pickedBSAccount.code + " \u2013 " + pickedBSAccount.account, bold: true },
                      { text: " has already been " + statusLabel + ". Would you like to view the results or start fresh?", bold: false },
                    ]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div style={{
                      background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                      padding: "20px 20px 12px", maxWidth: 480,
                      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                    }}>
                      {["View reconciliation results", "Restart reconciliation"].map(opt => (
                        <button key={opt} onClick={() => {
                          setPickedAccountAction(opt);
                          if (opt === "View reconciliation results") {
                            // Jump to results immediately
                            const data = getAccountRecData(pickedBSAccount.code, pickedBSAccount.account);
                            setStepStatuses(data.steps.map(() => "done"));
                            setStepSubtexts(data.steps.map(() => true));
                            setUploadedFile({ name: "Uploaded document.pdf", type: "application/pdf" });
                            setPrepDone(true);
                            setReadyChoice("Start reconciliation");
                            setResultsVisible(true);
                            setCanvasReady(true);
                            // Restore resolved/ignored cards from saved data
                            if (pickedRecData.resolvedCards) setResolvedCards(new Set(pickedRecData.resolvedCards));
                            if (pickedRecData.ignoredCards) setIgnoredCards(new Set(pickedRecData.ignoredCards));
                          }
                        }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: "#F7F7F7", border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: "#080908",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                        onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                </>
              );
            }

            // If "View reconciliation results" chosen, show the view results message
            if (pickedAccountAction === "View reconciliation results") {
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                      View reconciliation results
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-viewresults-" + pickedBSAccount.code} segments={[
                      { text: "Here are the reconciliation results for ", bold: false },
                      { text: pickedBSAccount.code + " \u2013 " + pickedBSAccount.account, bold: true },
                      { text: ". If something doesn\u2019t look right or is unclear simply ask me for any changes or information.", bold: false },
                    ]} speed={18} instant={true} /></p>
                  </div>
                </>
              );
            }

            // If "Restart reconciliation" chosen, show the normal flow
            if (pickedAccountAction === "Restart reconciliation") {
              const bsDirectLine1Segments = [
                { text: "Let\u2019s reconcile ", bold: false },
                { text: pickedBSAccount.code + " \u2013 " + pickedBSAccount.account, bold: true },
                { text: ".", bold: false },
              ];
              const bsDirectLine2Text = "Please upload a document to reconcile this account.";
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                      Restart reconciliation
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-line1-" + pickedBSAccount.code} segments={bsDirectLine1Segments} speed={18} /></p>
                    <p style={{ marginTop: 6 }}>
                      <StreamingMessage key={"bs-pick-line2-" + pickedBSAccount.code} segments={[{ text: bsDirectLine2Text, bold: false }]} speed={18} />
                    </p>
                  </div>
                </>
              );
            }

            // Not previously reconciled – show normal upload flow
            const bsDirectLine1Segments = [
              { text: "Let\u2019s reconcile ", bold: false },
              { text: pickedBSAccount.code + " \u2013 " + pickedBSAccount.account, bold: true },
              { text: ".", bold: false },
            ];
            const bsDirectLine2Text = "Please upload a document to reconcile this account.";
            return (
              <>
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"bs-pick-line1-" + pickedBSAccount.code} segments={bsDirectLine1Segments} speed={18} /></p>
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key={"bs-pick-line2-" + pickedBSAccount.code} segments={[{ text: bsDirectLine2Text, bold: false }]} speed={18} />
                  </p>
                </div>
              </>
            );
          })()}

          {/* Upload card for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && !uploadedFile && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} title="Upload file" />
            </div>
          )}

          {/* File preview for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 320 }}>
                <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <FileIcon file={uploadedFile} width={20} height={24} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{pickedBSAccount.account} report</span>
                  </div>
                  <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                  {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                  <FileIcon file={uploadedFile} width={13} height={16} />
                  <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Preparing status for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && uploadedFile && !prepDone && (
            <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
              Preparing the document and getting ready for reconciliation
            </p>
          )}

          {/* Ready message for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && prepDone && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"bs-pick-ready-" + pickedBSAccount.code} segments={[
                { text: "I have everything I need to reconcile ", bold: false },
                { text: pickedBSAccount.code + " \u2013 " + pickedBSAccount.account, bold: true },
                { text: " against the document you provided. Tell me when you\u2019re ready to start.", bold: false },
              ]} speed={18} /></p>
            </div>
          )}

          {/* Start choice for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && prepDone && line6Done && !readyChoice && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                {["Start reconciliation", "Add another document"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReadyChoice(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply for start choice (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && readyChoice && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                {readyChoice}
              </div>
            </div>
          )}

          {/* Add another document flow (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && readyChoice === "Add another document" && (
            <>
              <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key={"add-doc-bs-" + pickedBSAccount.code + "-" + addMoreRound} segments={[{ text: "Upload another document and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
              </div>
              {addMoreRound === 0 && !addMoreWaitingUpload && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" />
                </div>
              )}
              {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                <div key={"add-preview-bs-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={file} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{file.label}</span>
                      </div>
                      <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={file} width={13} height={16} />
                      <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                    </div>
                  </div>
                </div>
              ))}
              {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for reconciliation
                </p>
              )}
              {addMorePrepDone && (() => {
                const labels = uploadedFiles.map(f => f.label);
                const docSegments = [];
                labels.forEach((lbl, i) => {
                  if (i > 0) {
                    if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                    else docSegments.push({ text: ", ", bold: false });
                  }
                  docSegments.push({ text: lbl, bold: true });
                });
                return (
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-bs-ready-" + pickedBSAccount.code + "-" + addMoreRound} segments={[
                      { text: "I have everything I need to reconcile ", bold: false },
                      { text: `${pickedBSAccount.code} \u2013 ${pickedBSAccount.account}`, bold: true },
                      { text: " against ", bold: false },
                      ...docSegments,
                      { text: ". Tell me when you\u2019re ready to start.", bold: false },
                    ]} speed={18} /></p>
                  </div>
                );
              })()}
              {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button key={opt} onClick={() => {
                        if (opt === "Start reconciliation") { setStartAfterMore(true); }
                        else { setAddMoreWaitingUpload(true); }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: "#F7F7F7", border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: "#080908",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {/* User chose "Add another document" — new upload round */}
              {addMoreWaitingUpload && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                      Add another document
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-bs-waiting-" + addMoreRound} segments={[{ text: "Upload another document and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" />
                  </div>
                </>
              )}
            </>
          )}
          {!isDirectFlow && pickedBSAccount && readyChoice === "Add another document" && startAfterMore && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation steps for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && effectiveStart && stepStatuses.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                    {stepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                  </span>
                </div>
              </div>

              {activeSteps.map((step, i) => {
                const status = stepStatuses[i] || "pending";
                const isLast = i === activeSteps.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                        background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.4s ease",
                      }}>
                        {status === "done" && (
                          <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {status === "active" && (
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "1.5px solid #ACD394",
                            borderTopColor: "#05A105",
                            animation: "spin 0.7s linear infinite",
                          }} />
                        )}
                      </div>
                      {!isLast && (
                        <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                      <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? "#BCBCBC" : "#080908", transition: "all 0.3s ease" }}>
                        {step.title}
                      </div>
                      {(stepSubtexts[i] || status === "done") && step.subtext && (
                        <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                          {step.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ready for review message (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && canvasReady && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"bs-pick-review-" + pickedBSAccount.code} segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
            </div>
          )}

          {/* AI message: accounts intro + bullet list (Payroll flow) */}
          {!isDirectFlow && typeSelected && selectedType === "Payroll" && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line3" segments={line3Segments} speed={18} instant={isResume} /></p>

              {/* Account bullet list \u2014 appears after line3 finishes */}
              {line3Done && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                  {payrollAccounts.map(acc => (
                    <li key={acc.code} style={{ fontSize: 14, color: "#080908", lineHeight: "24px" }}>
                      <span style={{ color: "#080908", fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"\u2013"}</span>
                      <span>{acc.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Choice: how to continue \u2014 appears after account list */}
          {!isDirectFlow && typeSelected && selectedType === "Payroll" && line3Done && !accountChoiceSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12 }}>How would you like to continue?</p>
                {["Continue with suggested accounts", "Pick accounts to reconcile"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAccountChoiceSelected(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble for account choice */}
          {!isDirectFlow && accountChoiceSelected && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {accountChoiceSelected}
              </div>
            </div>
          )}

          {/* AI confirmation message \u2014 after "Continue with suggested accounts" */}
          {!isDirectFlow && accountChoiceSelected === "Continue with suggested accounts" && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line4" segments={line4Segments} speed={18} instant={isResume} /></p>
              {line4Done && (
                <p style={{ marginTop: 6 }}>
                  <StreamingMessage key="line5" segments={[{ text: line5Text, bold: false }]} speed={18} instant={isResume} />
                </p>
              )}
            </div>
          )}

          {/* Upload card \u2014 appears after "Please upload a payroll report" finishes */}
          {!isDirectFlow && !pickedBSAccount && line5Done && !uploadedFile && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} title="Upload payroll report" />
            </div>
          )}

          {/* User bubble \u2014 file preview after upload */}
          {!isDirectFlow && !pickedBSAccount && uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 320 }}>
                <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <FileIcon file={uploadedFile} width={20} height={24} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>Payroll report</span>
                  </div>
                  <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                  {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                  <FileIcon file={uploadedFile} width={13} height={16} />
                  <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Preparing status \u2014 shows while waiting for prep */}
          {!isDirectFlow && !pickedBSAccount && uploadedFile && !prepDone && (
            <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
              Preparing the payroll report and getting ready for reconciliation
            </p>
          )}

          {/* AI ready message \u2014 after prep done */}
          {!isDirectFlow && !pickedBSAccount && prepDone && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line6" segments={line6Segments} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* Choice: start or add another \u2014 appears after ready message finishes */}
          {!isDirectFlow && !pickedBSAccount && line6Done && !readyChoice && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                {["Start reconciliation", "Add another payroll report"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReadyChoice(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble for ready choice */}
          {!isDirectFlow && !pickedBSAccount && readyChoice && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {readyChoice}
              </div>
            </div>
          )}

          {/* Add another payroll report flow */}
          {!isDirectFlow && !pickedBSAccount && readyChoice === "Add another payroll report" && (
            <>
              <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key={"add-doc-payroll-" + addMoreRound} segments={[{ text: "Upload another payroll report and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
              </div>
              {addMoreRound === 0 && !addMoreWaitingUpload && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload payroll report" />
                </div>
              )}
              {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                <div key={"add-preview-payroll-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={file} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{file.label}</span>
                      </div>
                      <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={file} width={13} height={16} />
                      <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                    </div>
                  </div>
                </div>
              ))}
              {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                  Preparing the payroll report and getting ready for reconciliation
                </p>
              )}
              {addMorePrepDone && (() => {
                const labels = uploadedFiles.map(f => f.label);
                const docSegments = [];
                labels.forEach((lbl, i) => {
                  if (i > 0) {
                    if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                    else docSegments.push({ text: ", ", bold: false });
                  }
                  docSegments.push({ text: lbl, bold: true });
                });
                return (
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-payroll-ready-" + addMoreRound} segments={[
                      { text: "I have everything I need to reconcile ", bold: false },
                      { text: "Payroll", bold: true },
                      { text: " against ", bold: false },
                      ...docSegments,
                      { text: ". Tell me when you\u2019re ready to start.", bold: false },
                    ]} speed={18} /></p>
                  </div>
                );
              })()}
              {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another payroll report"].map(opt => (
                      <button key={opt} onClick={() => {
                        if (opt === "Start reconciliation") { setStartAfterMore(true); }
                        else { setAddMoreWaitingUpload(true); }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: "#F7F7F7", border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: "#080908",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {/* User chose "Add another payroll report" — new upload round */}
              {addMoreWaitingUpload && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                      Add another payroll report
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-payroll-waiting-" + addMoreRound} segments={[{ text: "Upload another payroll report and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload payroll report" />
                  </div>
                </>
              )}
            </>
          )}
          {!isDirectFlow && !pickedBSAccount && readyChoice === "Add another payroll report" && startAfterMore && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation progress steps \u2014 after "Start reconciliation" */}
          {!isDirectFlow && !pickedBSAccount && effectiveStart && stepStatuses.length > 0 && (
            <div style={{ marginTop: 24 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                    {stepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                  </span>
                </div>
              </div>

              {/* Steps */}
              {PAYROLL_RECONCILIATION_STEPS.map((step, i) => {
                const status = stepStatuses[i] || "pending";
                const isLast = i === PAYROLL_RECONCILIATION_STEPS.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    {/* Circle + connector line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                        background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.4s ease",
                      }}>
                        {status === "done" && (
                          <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {status === "active" && (
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "1.5px solid #ACD394",
                            borderTopColor: "#05A105",
                            animation: "spin 0.7s linear infinite",
                          }} />
                        )}
                      </div>
                      {!isLast && (
                        <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                      <div style={{
                        fontSize: 14, lineHeight: "24px",
                        fontWeight: status === "done" ? 500 : 400,
                        color: status === "pending" ? "#BCBCBC" : "#080908",
                        transition: "all 0.3s ease",
                      }}>
                        {step.title}
                      </div>
                      {(stepSubtexts[i] || status === "done") && step.subtext && (
                        <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                          {step.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isDirectFlow && !pickedBSAccount && canvasReady && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line7" segments={[{ text: line7Text, bold: false }]} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* ─── Restart reconciliation flow ─── */}
          {restartMode && (
            <>
              {/* User bubble: Restart reconciliation */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                  Restart reconciliation
                </div>
              </div>

              {/* AI message: how would you like to restart? */}
              <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="restart-ask" segments={[{ text: "How would you like to restart the reconciliation?", bold: false }]} speed={18} /></p>
              </div>

              {/* Choice card: same file vs new file */}
              {restartMode === "choosing" && !restartChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Reconcile against the same file", "Reconcile against another file"].map(opt => (
                      <button key={opt} onClick={() => {
                        setRestartChoice(opt);
                        if (opt === "Reconcile against the same file") {
                          setRestartMode("same_file");
                        } else {
                          setRestartMode("new_file");
                        }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: "#F7F7F7", border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: "#080908",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                      onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* User bubble for restart choice */}
              {restartChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                    {restartChoice}
                  </div>
                </div>
              )}

              {/* ─── SAME FILE path: progress steps immediately ─── */}
              {restartMode === "same_file" && restartStepStatuses.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                      </div>
                      <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                        {restartStepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                      </span>
                    </div>
                  </div>
                  {activeSteps.map((step, i) => {
                    const status = restartStepStatuses[i] || "pending";
                    const isLast = i === activeSteps.length - 1;
                    return (
                      <div key={"restart-step-" + i} style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                            border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                            background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.4s ease",
                          }}>
                            {status === "done" && (
                              <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                                <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                            {status === "active" && (
                              <div style={{
                                width: 16, height: 16, borderRadius: "50%",
                                border: "1.5px solid #ACD394",
                                borderTopColor: "#05A105",
                                animation: "spin 0.7s linear infinite",
                              }} />
                            )}
                          </div>
                          {!isLast && (
                            <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                          )}
                        </div>
                        <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                          <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? "#BCBCBC" : "#080908", transition: "all 0.3s ease" }}>
                            {step.title}
                          </div>
                          {(restartStepSubtexts[i] || status === "done") && step.subtext && (
                            <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                              {step.subtext}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {restartMode === "same_file" && canvasReady && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="restart-line7-same" segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
                </div>
              )}

              {/* ─── NEW FILE path: upload flow ─── */}
              {restartMode === "new_file" && (
                <>
                  {/* AI message: upload a document */}
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key="restart-upload-msg" segments={[
                      { text: "Upload a document and I\u2019ll reconcile ", bold: false },
                      { text: `${effectiveDirectAccount.code} \u2013 ${effectiveDirectAccount.account}`, bold: true },
                      { text: " against it.", bold: false },
                    ]} speed={18} /></p>
                  </div>

                  {/* Upload card */}
                  {restartUploadedFiles.length === 0 && (
                    <div style={{ marginTop: 16 }}>
                      <UploadCard onFileSelected={(file) => { setRestartUploadedFiles([{ ...file, label: "Reconciliation document" }]); }} title="Upload file" />
                    </div>
                  )}

                  {/* File preview (user bubble) */}
                  {restartUploadedFiles.length > 0 && restartUploadedFiles.map((file, idx) => (
                    <div key={"restart-file-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 320 }}>
                        <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <FileIcon file={file} width={20} height={24} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>{file.label}</span>
                          </div>
                          <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                          {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                            <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                          <FileIcon file={file} width={13} height={16} />
                          <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Prep status */}
                  {restartUploadedFiles.length > 0 && !restartPrepDone && (
                    <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                      Preparing the document and getting ready for reconciliation
                    </p>
                  )}

                  {/* AI ready message */}
                  {restartPrepDone && !restartReadyChoice && !restartStartAfterMore && (() => {
                    const labels = restartUploadedFiles.map(f => f.label);
                    const docSegments = [];
                    labels.forEach((lbl, i) => {
                      if (i > 0) {
                        if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                        else docSegments.push({ text: ", ", bold: false });
                      }
                      docSegments.push({ text: lbl, bold: true });
                    });
                    return (
                      <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"restart-ready-" + restartAddMoreRound} segments={[
                          { text: "I have everything I need to reconcile ", bold: false },
                          { text: `${effectiveDirectAccount.code} \u2013 ${effectiveDirectAccount.account}`, bold: true },
                          { text: " against ", bold: false },
                          ...docSegments,
                          { text: ". Tell me when you\u2019re ready to start.", bold: false },
                        ]} speed={18} /></p>
                      </div>
                    );
                  })()}

                  {/* Choice: start or add another */}
                  {restartPrepDone && !restartReadyChoice && !restartStartAfterMore && restartAddMoreRound === 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{
                        background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                        padding: "20px 20px 12px", maxWidth: 480,
                        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      }}>
                        {["Start reconciliation", "Add another document"].map(opt => (
                          <button key={opt} onClick={() => {
                            if (opt === "Start reconciliation") { setRestartReadyChoice("Start reconciliation"); }
                            else {
                              setRestartAddMorePrepDone(false);
                              setRestartAddMoreRound(prev => prev + 1);
                            }
                          }} style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "12px 16px", marginBottom: 8,
                            background: "#F7F7F7", border: "none",
                            borderRadius: 10, cursor: "pointer",
                            fontSize: 14, fontWeight: 400, color: "#080908",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                          onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User bubble for start choice */}
                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                        Start reconciliation
                      </div>
                    </div>
                  )}

                  {/* Add another document sub-flow */}
                  {restartAddMoreRound > 0 && !restartReadyChoice && !restartStartAfterMore && (
                    <>
                      {/* AI message */}
                      <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"restart-add-doc-" + restartAddMoreRound} segments={[{ text: "Upload another document and I\u2019ll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                      </div>
                      {/* Upload card for additional file */}
                      {!restartAddMorePrepDone && (
                        <div style={{ marginTop: 16 }}>
                          <UploadCard onFileSelected={(file) => {
                            const label = restartUploadedFiles.length < 3 ? ["Reconciliation document", "Supporting document", "Additional document"][restartUploadedFiles.length] : "Document " + (restartUploadedFiles.length + 1);
                            setRestartUploadedFiles(prev => [...prev, { ...file, label }]);
                          }} title="Upload file" />
                        </div>
                      )}
                      {/* Prep status for add-more */}
                      {restartUploadedFiles.length > 1 && !restartAddMorePrepDone && (
                        <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
                          Preparing the document and getting ready for reconciliation
                        </p>
                      )}
                      {/* Ready message after add-more prep */}
                      {restartAddMorePrepDone && (() => {
                        const labels = restartUploadedFiles.map(f => f.label);
                        const docSegments = [];
                        labels.forEach((lbl, i) => {
                          if (i > 0) {
                            if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                            else docSegments.push({ text: ", ", bold: false });
                          }
                          docSegments.push({ text: lbl, bold: true });
                        });
                        return (
                          <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                            <p><StreamingMessage key={"restart-add-ready-" + restartAddMoreRound} segments={[
                              { text: "I have everything I need to reconcile ", bold: false },
                              { text: `${effectiveDirectAccount.code} \u2013 ${effectiveDirectAccount.account}`, bold: true },
                              { text: " against ", bold: false },
                              ...docSegments,
                              { text: ". Tell me when you\u2019re ready to start.", bold: false },
                            ]} speed={18} /></p>
                          </div>
                        );
                      })()}
                      {/* Choice after add-more */}
                      {restartAddMorePrepDone && (
                        <div style={{ marginTop: 16 }}>
                          <div style={{
                            background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 16,
                            padding: "20px 20px 12px", maxWidth: 480,
                            boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                          }}>
                            {["Start reconciliation", "Add another document"].map(opt => (
                              <button key={opt} onClick={() => {
                                if (opt === "Start reconciliation") { setRestartStartAfterMore(true); }
                                else { setRestartAddMorePrepDone(false); setRestartAddMoreRound(prev => prev + 1); }
                              }} style={{
                                display: "block", width: "100%", textAlign: "left",
                                padding: "12px 16px", marginBottom: 8,
                                background: "#F7F7F7", border: "none",
                                borderRadius: 10, cursor: "pointer",
                                fontSize: 14, fontWeight: 400, color: "#080908",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                              onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                              >{opt}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Progress steps for new file restart */}
                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && restartStepStatuses.length > 0 && (
                    <div style={{ marginTop: 24 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                          </div>
                          <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                            {restartStepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                          </span>
                        </div>
                      </div>
                      {activeSteps.map((step, i) => {
                        const status = restartStepStatuses[i] || "pending";
                        const isLast = i === activeSteps.length - 1;
                        return (
                          <div key={"restart-newfile-step-" + i} style={{ display: "flex", gap: 16 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                                border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                                background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.4s ease",
                              }}>
                                {status === "done" && (
                                  <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                                    <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                                {status === "active" && (
                                  <div style={{
                                    width: 16, height: 16, borderRadius: "50%",
                                    border: "1.5px solid #ACD394",
                                    borderTopColor: "#05A105",
                                    animation: "spin 0.7s linear infinite",
                                  }} />
                                )}
                              </div>
                              {!isLast && (
                                <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                              )}
                            </div>
                            <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                              <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? "#BCBCBC" : "#080908", transition: "all 0.3s ease" }}>
                                {step.title}
                              </div>
                              {(restartStepSubtexts[i] || status === "done") && step.subtext && (
                                <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                                  {step.subtext}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && canvasReady && (
                    <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                      <p><StreamingMessage key="restart-line7-newfile" segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div ref={chatEndRef} style={{ height: 32, flexShrink: 0 }} />
        </div>
      </div>

      {/* Chat input area \u2014 appears after canvas is ready */}
      {canvasReady && (
        <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: resultsVisible ? "100%" : 680, margin: "0 auto" }}>
            {/* Restart reconciliation button */}
            {(!restartMode || restartResultsVisible) && (
              <button
                onClick={() => {
                  if (restartMode) {
                    // Reset all restart state for a fresh restart
                    setRestartChoice(null);
                    setRestartUploadedFiles([]);
                    setRestartPrepDone(false);
                    setRestartReadyChoice(null);
                    setRestartStepStatuses([]);
                    setRestartStepSubtexts([]);
                    setRestartCanvasReady(false);
                    setRestartResultsVisible(false);
                    setRestartAddMoreRound(0);
                    setRestartAddMorePrepDone(false);
                    setRestartStartAfterMore(false);
                  }
                  setRestartMode("choosing");
                }}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  height: 40, padding: "0 16px", marginBottom: 10,
                  border: "1px solid #E9E9EB", borderRadius: 8,
                  background: "#FFFFFF", cursor: "pointer",
                  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  fontSize: 14, fontWeight: 500, color: "#080908",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E9E9EB"; }}
              >
                <PlayCircleIcon color="#080908" size={20} />
                Restart reconciliation
              </button>
            )}
            <div style={{
              borderRadius: 16, padding: "14px 14px 12px", background: "#FFFFFF",
              boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
            }}>
              <textarea
                placeholder="Ask for changes or information..."
                rows={3}
                style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: "#080908", lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
              />
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                {/* Attachment */}
                <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ flex: 1 }} />
                {/* Microphone */}
                <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </button>
                {/* Send */}
                <button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid #E9E9EB", borderRadius: 10, background: "#FAFAFA", cursor: "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </div> {/* end left chat panel */}

      {/* Canvas \u2014 absolutely positioned overlay, slides in from right */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: chatWidth + 6,
        right: 0,
        background: "#FFFFFF",
        borderLeft: "1px solid #E9E9EB",
        overflowY: "auto",
        zIndex: 2,
        transform: resultsVisible ? "translateX(0)" : "translateX(100vw)",
        transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}>
        {resultsVisible && (canvasReady ? (
          <div style={{ animation: "resultsFadeIn 0.5s ease both", height: "100%" }}>
            {effectiveDirectAccount && accountRecData ? (
              <AccountResultsPanel
                config={accountRecData}
                resolvedCards={resolvedCards}
                ignoredCards={ignoredCards}
                onResolveCard={(idx) => setResolvedCards(prev => new Set([...prev, idx]))}
                onIgnoreCard={(idx) => setIgnoredCards(prev => new Set([...prev, idx]))}
                onShowToast={(msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); }}
              />
            ) : (
              <PayrollResultsPanel
                resolvedCards={resolvedCards}
                ignoredCards={ignoredCards}
                onResolveCard={(idx) => setResolvedCards(prev => new Set([...prev, idx]))}
                onIgnoreCard={(idx) => setIgnoredCards(prev => new Set([...prev, idx]))}
                onShowToast={(msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); }}
              />
            )}
          </div>
        ) : <CanvasLoader />)}
      </div>

      {/* Drag handle \u2014 thin absolute strip between chat and canvas */}
      {resultsVisible && (
        <div
          onMouseDown={handleDragStart}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: chatWidth,
            width: 6,
            cursor: "col-resize",
            zIndex: 10,
            background: isDragging ? "#E9E9EB" : "transparent",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = "#F0F0F0"; }}
          onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
        />
      )}

      </div> {/* end content area */}

      {/* Drawer overlay \u2014 review suggestions before reconciling */}
      {drawerOpen && (() => {
        const totalSuggestions = effectiveDirectAccount && accountRecData ? accountRecData.suggestions.length : 3;
        const unreviewed = totalSuggestions - resolvedCards.size - ignoredCards.size;
        const variance = accountRecData && accountRecData.reconciledResult ? accountRecData.reconciledResult.variance : "\u00a30.00";
        const hasVariance = variance && variance !== "\u00a30.00";
        return (
          <>
            {/* Scrim */}
            <div onClick={() => setDrawerOpen(false)} style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200,
            }} />
            {/* Drawer panel */}
            <div style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
              background: "#FFFFFF",
              borderLeft: "1px solid #E9E9EB",
              boxShadow: "-4px 0 16px rgba(0,0,0,0.06)",
              zIndex: 201, display: "flex", flexDirection: "column",
              animation: "drawerSlideIn 0.25s ease both",
            }}>
              {/* Drawer header */}
              <div style={{
                height: 48, padding: "0 16px", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid #F5F5F5",
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#080908", margin: 0 }}>Review suggestions before reconciling</h3>
                <button onClick={() => setDrawerOpen(false)} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 28, height: 28, borderRadius: 6, border: "none",
                  background: "transparent", cursor: "pointer",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Drawer body */}
              <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
                <p style={{ fontSize: 14, color: "#545453", lineHeight: "22px", margin: "0 0 24px" }}>
                  This account has <strong style={{ color: "#080908" }}>{unreviewed} unreviewed {unreviewed === 1 ? "suggestion" : "suggestions"}</strong>
                  {hasVariance && <> and a balance discrepancy of <strong style={{ color: "#080908" }}>{variance}</strong></>}
                  . You can go back and review them, or mark the account as reconciled with a comment explaining why.
                </p>

                <label style={{ display: "block", fontSize: 12, color: "#8C8C8B", marginBottom: 4 }}>Comment</label>
                <textarea
                  value={drawerComment}
                  onChange={e => setDrawerComment(e.target.value)}
                  placeholder="Explain why this account is being reconciled with unreviewed suggestions\u2026"
                  style={{
                    width: "100%", minHeight: 120, padding: "8px 10px",
                    border: "1px solid #E9E9EB", borderRadius: 6,
                    fontSize: 14, fontFamily: "'Inter', sans-serif", color: "#080908",
                    lineHeight: "22px", resize: "vertical", outline: "none",
                    boxSizing: "border-box", background: "#FFFFFF",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#CFCFD1"}
                  onBlur={e => e.currentTarget.style.borderColor = "#E9E9EB"}
                />
              </div>

              {/* Drawer footer — equal-width buttons */}
              <div style={{
                padding: "16px 24px", borderTop: "1px solid #E9E9EB",
                display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
              }}>
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    flex: 1, height: 40, borderRadius: 6,
                    border: "1px solid #E9E9EB", background: "#FFFFFF",
                    fontSize: 14, fontWeight: 500, color: "#080908",
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
                >
                  Back to reconciliation
                </button>
                <button
                  onClick={() => { onMarkReconciled?.(drawerComment, effectiveDirectAccount); setDrawerOpen(false); }}
                  style={{
                    flex: 1, height: 40, borderRadius: 6,
                    border: "none", background: "#FCEFEC", color: "#C8543A",
                    fontSize: 14, fontWeight: 500,
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F9E5E1"}
                  onMouseLeave={e => e.currentTarget.style.background = "#FCEFEC"}
                >
                  Mark as reconciled
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: "#080908", color: "#FFFFFF", padding: "10px 20px",
          borderRadius: 10, fontSize: 14, fontWeight: 500, zIndex: 300,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          animation: "toastIn 0.3s ease both",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}


// ── Balance Sheet Review page ─────────────────────────────────────────────
function BalanceSheetReviewPage({ rowComments, onAddComment, onRunBSReconciliation, onRunAccountReconciliation, bsReconciledData, activeTab, onTabChange, savedScrollTop, onSaveScroll }) {
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareValue, setCompareValue] = useState("Last month");
  const compareOptions = ["Last month", "Last quarter", "Last year", "Same month last year"];
  const tabs = ["Profit and Loss", "Balance sheet"];
  const scrollRef = useRef(null);

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollRef.current && savedScrollTop) {
      scrollRef.current.scrollTop = savedScrollTop;
    }
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar />
      <div style={{ padding: "32px 48px 0", flexShrink: 0, background: "#FFFFFF" }}>
        <h1 style={{ fontSize: 32, fontWeight: 500, color: "#080908", lineHeight: "40px", letterSpacing: "-1px" }}>Review</h1>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 24, borderBottom: "1px solid #E9E9EB" }}>
          {tabs.map(tab => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                style={{
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "#080908" : "#8C8C8B",
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2px solid #080908" : "2px solid transparent",
                  cursor: "pointer",
                  marginBottom: -1,
                  transition: "color 0.15s, border-color 0.15s",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      <div ref={scrollRef} onScroll={e => onSaveScroll?.(e.currentTarget.scrollTop)} style={{ flex: 1, overflowY: "auto", padding: "32px 48px 48px", display: "flex", flexDirection: "column", gap: 24 }}>
        {activeTab === "Profit and Loss" ? (
          <div style={{
            background: "#FAFAFA", border: "1px solid #E9E9EB", borderRadius: 12,
            padding: "64px 48px", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", gap: 12,
          }}>
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.4 }}>
              <path d={_MM_PATHS.bookOpen} stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#545453" }}>Profit and Loss review</span>
            <span style={{ fontSize: 14, color: "#8C8C8B" }}>Revenue, expenses, and net income breakdown will appear here.</span>
          </div>
        ) : (
          BS_SECTIONS.map((section, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {si === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 500, color: "#080908", letterSpacing: "-0.5px", margin: 0 }}>{section.heading}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Compare selector */}
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setCompareOpen(prev => !prev)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "9px 12px", borderRadius: 6,
                          border: "1px solid #E9E9EB", background: "#FFFFFF", cursor: "pointer",
                          fontSize: 14, fontWeight: 500, color: "#080908", whiteSpace: "nowrap",
                          height: 38, boxSizing: "border-box",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
                      >
                        Compare to {compareValue}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.15s", transform: compareOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <path d="M4 6L8 10L12 6" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {compareOpen && (
                        <div style={{
                          position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 10,
                          background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)", padding: "4px 0", minWidth: 200,
                        }}>
                          {compareOptions.map(opt => (
                            <div
                              key={opt}
                              onClick={() => { setCompareValue(opt); setCompareOpen(false); }}
                              style={{
                                padding: "8px 14px", fontSize: 14, color: opt === compareValue ? "#080908" : "#545453",
                                fontWeight: opt === compareValue ? 500 : 400,
                                cursor: "pointer", background: "transparent",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Export button */}
                    <SecondaryButton style={{ height: 38, boxSizing: "border-box", padding: "9px 12px" }}>Export balance sheet</SecondaryButton>
                    {/* Run reconciliation */}
                    <PrimaryButton icon={<PlayCircleIcon color="white" />} style={{ height: 38, boxSizing: "border-box", padding: "9px 16px" }} onClick={onRunBSReconciliation}>
                      Run reconciliation
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                <h2 style={{ fontSize: 22, fontWeight: 500, color: "#080908", letterSpacing: "-0.5px", marginTop: 16 }}>{section.heading}</h2>
              )}
              {section.tables.map((table, ti) => (
                <DataTableV2
                  key={ti}
                  title={table.title}
                  columns={BS_COLUMNS.map(col => col.key === "reconciliation" ? { ...col, render: (v, row) => React.createElement(ReconciliationCell, { code: row.code, account: row.account, bsReconciledData: bsReconciledData, onRunReconciliation: onRunAccountReconciliation }) } : col)}
                  rows={table.rows.map(row => {
                    const rd = bsReconciledData && bsReconciledData[row.code];
                    if (!rd) return row;
                    return { ...row, reconciled: true, sourceBalance: rd.sourceBalance, variance: rd.variance, suggestions: rd.suggestions, status: (STATUS_CONFIG[rd.status] && STATUS_CONFIG[rd.status].label) || "Reconciled" };
                  })}
                  footerLabel={table.footer}
                  showExpandColumn={true}
                  showCommentColumn={true}
                  rowComments={rowComments}
                  renderExpanded={(row) => (
                    <ExpandedRowContent row={row} comments={rowComments[row.code] || []} onAddComment={onAddComment} />
                  )}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function BankReconciliation() {
  const [activeNav, setActiveNav] = useState("Bank reconciliation");
  const [reconciling, setReconciling] = useState(null); // account name or null
  const [showResultsMode, setShowResultsMode] = useState(false); // true when opening from suggestions button
  const [allResolvedOnOpen, setAllResolvedOnOpen] = useState(false); // true when opening from a fully reconciled account
  const [isCleanReconcileOnOpen, setIsCleanReconcileOnOpen] = useState(false); // true when account has "reconciled" status (no suggestions)
  const [reconciledAccounts, setReconciledAccounts] = useState(new Set()); // tracks completed reconciliations
  const [reconciledDates, setReconciledDates] = useState({}); // { [accountName]: "13 Apr" }
  const [reconciledStatuses, setReconciledStatuses] = useState({}); // { [accountName]: "reconciled"|"suggestions"|"completed" }
  const [reconciledCounts, setReconciledCounts] = useState({}); // { [accountName]: number | null }
  const [bankStatements, setBankStatements] = useState({}); // { [accountName]: { fileName, date } }
  const [rowComments, setRowComments] = useState({}); // { [accountCode]: [{user, timestamp, text}] }
  const [bsReconciling, setBsReconciling] = useState(null); // null | true | { code, account } — when object, direct account flow
  const [bsReconciledData, setBsReconciledData] = useState({}); // { [code]: { date, status, suggestionCount, ... } }
  const [bsActiveTab, setBsActiveTab] = useState("Profit and Loss"); // persisted tab across BS reconciliation opens/closes
  const [bsScrollTop, setBsScrollTop] = useState(0); // persisted scroll position
  const [bsReconciledAlert, setBsReconciledAlert] = useState(null); // { code, account } for success toast after marking reconciled

  const handleUploadStatement = (accountName, fileInfo) => {
    setBankStatements(prev => ({ ...prev, [accountName]: fileInfo }));
  };

  const handleAddComment = (accountCode, text) => {
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const hours = now.getHours().toString().padStart(2, "0");
    const mins = now.getMinutes().toString().padStart(2, "0");
    const timestamp = `${day} ${monthNames[now.getMonth()]} at ${hours}:${mins}`;
    setRowComments(prev => ({
      ...prev,
      [accountCode]: [...(prev[accountCode] || []), { user: "Daniel Victorin", timestamp, text }],
    }));
  };

  const handleRunBSReconciliation = () => setBsReconciling(true);
  const handleRunAccountReconciliation = (acct) => setBsReconciling(acct); // { code, account }

  // Reset to Profit and Loss tab whenever the user navigates to Review
  useEffect(() => {
    if (activeNav === "Review") setBsActiveTab("Profit and Loss");
  }, [activeNav]);

  const handleCloseBS = (partialState, accountFromChild) => {
    const currentReconciling = (typeof bsReconciling !== "object" && accountFromChild) ? accountFromChild : bsReconciling;
    if (partialState && typeof currentReconciling === "object" && currentReconciling) {
      const data = getAccountRecData(currentReconciling.code, currentReconciling.account);
      const result = data.reconciledResult || {};
      const remaining = data.suggestions.length - (partialState.resolvedCards || []).length - (partialState.ignoredCards || []).length;
      setBsReconciledData(prev => ({
        ...prev,
        [currentReconciling.code]: {
          code: currentReconciling.code,
          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
          status: "reviewing",
          suggestionCount: remaining,
          sourceBalance: result.sourceBalance || "—",
          variance: result.variance || "£0.00",
          resolvedCards: partialState.resolvedCards || [],
          ignoredCards: partialState.ignoredCards || [],
        },
      }));
    } else if (partialState && currentReconciling === true) {
      const remaining = 3 - (partialState.resolvedCards || []).length - (partialState.ignoredCards || []).length;
      setBsReconciledData(prev => {
        const next = { ...prev };
        ["2210", "2230"].forEach(code => {
          if (!next[code] || next[code].status !== "reconciled") {
            next[code] = {
              code,
              date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
              status: "reviewing",
              suggestionCount: remaining,
              sourceBalance: code === "2210" ? "£22,180.00" : "£8,540.00",
              variance: code === "2210" ? "£0.00" : "£100.00",
              resolvedCards: partialState.resolvedCards || [],
              ignoredCards: partialState.ignoredCards || [],
            };
          }
        });
        return next;
      });
    }
    setBsActiveTab("Balance sheet");
    setBsReconciling(null);
  };

  const handleMarkBSReconciled = (comment, accountFromChild) => {
    const currentReconciling = (typeof bsReconciling !== "object" && accountFromChild) ? accountFromChild : bsReconciling;
    setBsReconciledData(prev => {
      const next = { ...prev };
      if (typeof currentReconciling === "object" && currentReconciling) {
        const data = getAccountRecData(currentReconciling.code, currentReconciling.account);
        const result = data.reconciledResult || {};
        next[currentReconciling.code] = {
          code: currentReconciling.code,
          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
          status: "reconciled",
          suggestionCount: data.suggestions.length,
          sourceBalance: result.sourceBalance || "—",
          variance: result.variance || "£0.00",
          resolvedCards: data.suggestions.map((_, i) => i),
          ignoredCards: [],
        };
      } else {
        [
          { code: "2210", date: "13 Apr", status: "reconciled", suggestionCount: 0, sourceBalance: "£22,180.00", variance: "£0.00", resolvedCards: [0, 1, 2], ignoredCards: [] },
          { code: "2230", date: "13 Apr", status: "reconciled", suggestionCount: 1, sourceBalance: "£8,540.00",  variance: "£100.00", resolvedCards: [0, 1, 2], ignoredCards: [] },
        ].forEach(acc => { next[acc.code] = acc; });
      }
      return next;
    });
    if (comment && typeof currentReconciling === "object" && currentReconciling) {
      const now = new Date();
      const day = now.getDate();
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const hours = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      const timestamp = `${day} ${monthNames[now.getMonth()]} at ${hours}:${mins}`;
      setRowComments(prev => ({
        ...prev,
        [currentReconciling.code]: [...(prev[currentReconciling.code] || []), { user: "Daniel Victorin", timestamp, text: comment }],
      }));
    }
    // Show success alert with account info
    const alertAccount = (typeof currentReconciling === "object" && currentReconciling) ? currentReconciling : accountFromChild;
    if (alertAccount) {
      setBsReconciledAlert({ code: alertAccount.code, account: alertAccount.account });
      setTimeout(() => setBsReconciledAlert(null), 4000);
    }
    setBsReconciling(null);
  };

  // Post-reconciliation data per account (statement balance, difference, matching)
  const reconciledData = {
    "Lloyds Bank - Operations GBP":   { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "361/380", suggestions: 3 },
    "Lloyds Bank - Business":          { statementBalance: "£152,500.00", difference: "£2,500.00",  matched: "241/244", suggestions: 2 },
    "HSBC - Business Transactions":   { statementBalance: "£95,500.00",  difference: "£2,500.00",  matched: "189/195", suggestions: 2 },
    "Barclays - Operations":          { statementBalance: "£374,000.00", difference: "£6,000.00",  matched: "409/420", suggestions: 5 },
    "American Express OP GBP":        { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "98/105",  suggestions: 4 },
    "Mastercard Business":            { statementBalance: "£152,500.00", difference: "£2,500.00",  matched: "53/56",   suggestions: 3 },
  };

  const bankAccounts = [
    { name: "Lloyds Bank - Business",          feedBalance: "£155,000.00", glBalance: "£155,000.00", glSub: "£0,00" },
    { name: "Lloyds Bank - Operations GBP",   feedBalance: "£127,000.00", glBalance: "£100,000.00", glSub: "£0,00" },
    { name: "HSBC - Business Transactions",   feedBalance: "£93,000.00",  glBalance: "£93,000.00",  glSub: "£0,00" },
    { name: "Barclays - Operations",          feedBalance: "£374,000.00", glBalance: "£380,000.00", glSub: "£0,00" },
    { name: "American Express OP GBP",        feedBalance: "£127,000.00", glBalance: "£100,000.00", glSub: "£0,00" },
    { name: "Mastercard Business",            feedBalance: "£155,000.00", glBalance: "£155,000.00", glSub: "£0,00" },
  ];

  const getDateLabel = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  const ACCOUNT_OUTCOMES = {
    "Lloyds Bank - Business":       { status: "suggestions", count: 8 },
    "HSBC - Business Transactions": { status: "suggestions", count: 1 },
    "Barclays - Operations":        { status: "suggestions", count: 5 },
    "American Express OP GBP":      { status: "suggestions", count: 4 },
    "Mastercard Business":          { status: "suggestions", count: 3 },
  };

  const handleCloseReconciliation = (accountName, completed = false, allSuggestionsResolved = false) => {
    if (completed) {
      setReconciledAccounts(prev => new Set([...prev, accountName]));
      setReconciledDates(prev => ({ ...prev, [accountName]: getDateLabel() }));
      // When closing from view-results mode for an already-"reconciled" account,
      // preserve its status — don't downgrade it to "suggestions".
      const currentStatus = reconciledStatuses[accountName];
      if (!(showResultsMode && currentStatus === "reconciled")) {
        const outcome = ACCOUNT_OUTCOMES[accountName];
        const accountsWithCompletedState = new Set(["Lloyds Bank - Business", "HSBC - Business Transactions"]);
        const resolvedStatus = (accountsWithCompletedState.has(accountName) && allSuggestionsResolved)
          ? "completed"
          : accountName === "Lloyds Bank - Operations GBP"
          ? "reconciled"
          : "suggestions";
        const resolvedCount = (resolvedStatus === "completed" || resolvedStatus === "reconciled") ? null : (outcome?.count ?? reconciledData[accountName]?.suggestions ?? 3);
        setReconciledStatuses(prev => ({ ...prev, [accountName]: resolvedStatus }));
        setReconciledCounts(prev => ({ ...prev, [accountName]: resolvedCount }));
      }
    }
    setReconciling(null);
    setShowResultsMode(false);
  };

  const handleRunReconciliation = (accountName) => {
    setReconciling(accountName);
    setShowResultsMode(false);
    setAllResolvedOnOpen(false);
    setIsCleanReconcileOnOpen(accountName === "Lloyds Bank - Operations GBP");
  };

  const handleAutoReconcile = (accountName, status = "reconciled", count = null) => {
    setReconciledAccounts(prev => new Set([...prev, accountName]));
    setReconciledDates(prev => ({ ...prev, [accountName]: getDateLabel() }));
    setReconciledStatuses(prev => ({ ...prev, [accountName]: status }));
    setReconciledCounts(prev => ({ ...prev, [accountName]: count }));
  };

  const handleResetAccount = (accountName) => {
    setReconciledAccounts(prev => { const next = new Set(prev); next.delete(accountName); return next; });
    setReconciledStatuses(prev => { const next = { ...prev }; delete next[accountName]; return next; });
    setReconciledCounts(prev => { const next = { ...prev }; delete next[accountName]; return next; });
    setReconciledDates(prev => { const next = { ...prev }; delete next[accountName]; return next; });
  };

  const handleViewResults = (accountName) => {
    setReconciling(accountName);
    setShowResultsMode(true);
    const status = reconciledStatuses[accountName] || "reconciled";
    setAllResolvedOnOpen(status !== "suggestions");
    setIsCleanReconcileOnOpen(status === "reconciled");
  };

  if (reconciling) {
    return <ReconciliationFlow accountName={reconciling} onClose={(completed, allSuggestionsResolved, actualAccount) => handleCloseReconciliation(actualAccount || reconciling, completed, allSuggestionsResolved)} showResults={showResultsMode} allResolved={allResolvedOnOpen} isCleanReconcile={isCleanReconcileOnOpen} onUploadStatement={handleUploadStatement} reconciledDate={reconciledDates[reconciling] || null} reconciledMatchedStr={reconciledData[reconciling]?.matched || null} accountStatus={reconciledStatuses[reconciling] || null} />;
  }

  if (bsReconciling) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#FBFBFB" }}>
        <BSReconciliationFlow
          key={typeof bsReconciling === "object" ? bsReconciling.code : "general"}
          onClose={handleCloseBS}
          onMarkReconciled={handleMarkBSReconciled}
          onSwitchAccount={(acc) => setBsReconciling(acc)}
          directAccount={typeof bsReconciling === "object" ? bsReconciling : null}
          savedState={typeof bsReconciling === "object" && bsReconciling && bsReconciledData[bsReconciling.code] && (bsReconciledData[bsReconciling.code].status === "reviewing" || bsReconciledData[bsReconciling.code].status === "reconciled") ? bsReconciledData[bsReconciling.code] : null}
          bsReconciledData={bsReconciledData}
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; src: url('data:font/woff2;base64,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') format('woff2'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; src: url('data:font/woff2;base64,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') format('woff2'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 600; src: url('data:font/woff2;base64,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') format('woff2'); }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        button, input, select, textarea { font-family: inherit; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FFFFFF", overflow: "hidden" }}>

        {/* ── LEFT MAIN MENU (from MainMenu.jsx) ─────────────────────────── */}
        <MainMenu activeNav={activeNav} onNavChange={setActiveNav} />

        {/* ── RIGHT: CONTENT AREA ───────────────────────────────────────── */}
        {activeNav === "Review" ? (
          <BalanceSheetReviewPage rowComments={rowComments} onAddComment={handleAddComment} onRunBSReconciliation={handleRunBSReconciliation} onRunAccountReconciliation={handleRunAccountReconciliation} bsReconciledData={bsReconciledData} activeTab={bsActiveTab} onTabChange={setBsActiveTab} savedScrollTop={bsScrollTop} onSaveScroll={setBsScrollTop} />
        ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top context bar (from TopBar.jsx) */}
          <TopBar />

          {/* Page header (uses PrimaryButton from Buttons.jsx) */}
          <div style={{ padding: "32px 48px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#FFFFFF" }}>
            <h1 style={{ fontSize: 32, fontWeight: 500, color: "#080908", lineHeight: "40px", letterSpacing: "-1px" }}>Bank reconciliation</h1>
            <PrimaryButton icon={<PlayCircleIcon color="white" />} onClick={() => { setReconciling("__picker__"); setShowResultsMode(false); }}>
              Run reconciliation
            </PrimaryButton>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: "auto", padding: 48, paddingTop: 0, display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Stats summary cards (from Widgets.jsx) */}
            <StatsRow items={(() => {
              const totalAccounts = bankAccounts.length;
              const reconciledCount = reconciledAccounts.size;
              const { matchedGL, totalMatches } = [...reconciledAccounts].reduce((acc, name) => {
                const d = reconciledData[name] || {};
                const status = reconciledStatuses[name] || "reconciled";
                const count = reconciledCounts[name] || 3;
                const total = parseInt((d.matched || "100/100").split("/")[1]) || 100;
                const matched = status === "suggestions"
                  ? Math.max(0, total - count)
                  : total;
                return { matchedGL: acc.matchedGL + matched, totalMatches: acc.totalMatches + total };
              }, { matchedGL: 0, totalMatches: 0 });
              const fullyReconciled = [...reconciledAccounts].filter(name => (reconciledStatuses[name] || "reconciled") === "reconciled").length;
              return [
                { label: "Bank statements received", value: `${reconciledCount} of ${totalAccounts} statements`, progress: Math.round((reconciledCount / totalAccounts) * 100) },
                { label: "Matched GL record",         value: `${matchedGL} of ${totalMatches} matches`,           progress: totalMatches > 0 ? Math.round((matchedGL / totalMatches) * 100) : 0 },
                { label: "Accounts reconciled",       value: `${fullyReconciled} of ${totalAccounts} accounts`,   progress: Math.round((fullyReconciled / totalAccounts) * 100) },
              ];
            })()} />

            {/* Bank accounts table */}
            <AccountTable title="Accounts" rows={bankAccounts} footerLabel={`${bankAccounts.length} accounts`} onRunReconciliation={handleRunReconciliation} onViewResults={handleViewResults} reconciledAccounts={reconciledAccounts} reconciledData={reconciledData} reconciledDates={reconciledDates} reconciledStatuses={reconciledStatuses} reconciledCounts={reconciledCounts} bankStatements={bankStatements} onUploadStatement={handleUploadStatement} onAutoReconcile={handleAutoReconcile} onResetAccount={handleResetAccount} />

          </div>
        </div>
        )}
      </div>

      {/* BS reconciled success toast */}
      {bsReconciledAlert && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: "#05A105", color: "#FFFFFF", padding: "12px 20px",
          borderRadius: 10, fontSize: 14, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          zIndex: 300, animation: "toastIn 0.35s ease",
          fontFamily: "'Inter', sans-serif",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="rgba(255,255,255,0.25)"/>
            <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {bsReconciledAlert.code} – {bsReconciledAlert.account} reconciled
        </div>
      )}
    </>
  );
}
