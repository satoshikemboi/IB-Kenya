
const DEFAULT_BIO =
  "Kemboi is the lead analyst and editor at FxBrokers.co.ke. With over 4 years of experience trading forex and CFDs across African markets, he specialises in broker due diligence, CMA regulation, and M-Pesa payment infrastructure. Every review on this site is personally verified by him before publication.";

export default function AuthorCard({
  name = "Felix",
  role = "Lead Forex Analyst & Editor",
  date = "June 12, 2025",
  updatedDate,
  bio = DEFAULT_BIO,
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle top-edge glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
      />

      <div className="relative flex flex-col sm:flex-row gap-6 px-3 py-8 sm:p-8 items-start sm:items-center">
        {/* Avatar */}
        <div className="relative shrink-0">
          {/* Gold ring */}
          <div
            className="absolute -inset-0.75 rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, #C9A84C, #f0d080, #C9A84C, #a07830, #C9A84C)",
            }}
          />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#0A1628]">
            <img
              src="/kemboi.png"
              alt={`${name} — ${role}`}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Verified badge */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0A1628]"
            style={{ background: "#C9A84C" }}
            title="Verified Author"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="#07101E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <p
            className="text-[9px] uppercase tracking-[0.2em] font-bold mb-1"
            style={{ color: "#C9A84C" }}
          >
            Written &amp; Reviewed by
          </p>

          {/* Name + Role */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <h3 className="text-white font-bold text-lg leading-none">{name}</h3>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
              style={{
                background: "rgba(201,168,76,0.12)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              {role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-xs leading-tight mb-3">{bio}</p>

          {/* Dates + links row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              {/* Calendar icon */}
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 9h18M8 2v4M16 2v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>Published {date}</span>
            </div>

            {updatedDate && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                {/* Refresh icon */}
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12a8 8 0 018-8 8 8 0 017.4 5M20 12a8 8 0 01-8 8 8 8 0 01-7.4-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 4v4h-4M5 20v-4h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Updated {updatedDate}</span>
              </div>
            )}

            {/* Divider dot */}
            <span className="text-gray-700 text-[11px] hidden sm:inline">·</span>

            {/* FxBrokers.co.ke badge */}
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#C9A84C99" }}>
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 3c0 0-4 4-4 9s4 9 4 9M12 3c0 0 4 4 4 9s-4 9-4 9M3 12h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>FxBrokers.co.ke</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}