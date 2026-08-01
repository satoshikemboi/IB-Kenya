import { Link } from "react-router-dom";
                                    
const Author = {
  name: "Felix",
  title: "Senior Forex Analyst",
  profile: "/Kemboi.png",
  bioUrl: "/felix-kemboi",
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function Avatar({ name, src }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.innerHTML = `<span class="text-[0.65rem] font-semibold text-green-400">${initials}</span>`;
        }}
      />
    </div>
  );
}

/* ── Component ────────────────────────────────────────────────────────────── */
export default function AuthorByline({
  author = Author,
  publishedDate = "July 29, 2026",
  updatedDate = "Jul 30, 2026",
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.78rem] text-zinc-500 mb-2 pt-4 pb-2 border-b border-white/6">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
        <img src="/kemboi.png" />
        </div>
        <div className="leading-tight">
          <div>
            Written by{" "}
            <Link
              to={author.bioUrl}
              className="text-zinc-200 font-medium hover:text-green-400 underline"
            >
              {author.name}
            </Link>
          </div>
          <div className="text-zinc-600 text-[0.7rem]">{author.title}</div>
        </div>
      </div>

      <span className="text-zinc-700 hidden sm:inline">|</span>

      <span className="text-zinc-700 hidden sm:inline">|</span>

      <span>
        Updated <span className="text-zinc-300">{updatedDate}</span>
        <span className="text-zinc-700"> · </span>
      </span>
    </div>
  );
}