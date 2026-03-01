from pathlib import Path
import textwrap

OUT = Path('output/pdf/portfolio-app-summary.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = 612, 792  # US Letter in points
MARGIN_X = 46
TOP_Y = 758
BOTTOM_Y = 44


def esc_pdf_text(s: str) -> str:
    return s.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def add_line(cmds, text, x, y, font='F1', size=10.5):
    cmds.append(f"BT /{font} {size} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm ({esc_pdf_text(text)}) Tj ET")


def add_wrapped(cmds, text, x, y, width_chars=95, leading=13, font='F1', size=10.5):
    lines = textwrap.wrap(text, width=width_chars, break_long_words=False, break_on_hyphens=False) or ['']
    for ln in lines:
        add_line(cmds, ln, x, y, font=font, size=size)
        y -= leading
    return y


commands = []
y = TOP_Y

add_line(commands, 'Portfolio App - One-Page Repo Summary', MARGIN_X, y, font='F2', size=16)
y -= 22

add_line(commands, 'What it is', MARGIN_X, y, font='F2', size=12)
y -= 14
y = add_wrapped(
    commands,
    "A single-page application portfolio built with React, React Router, SCSS, and Vite. It presents professional background, projects, resume access, and contact details across five client-side routes.",
    MARGIN_X,
    y,
    width_chars=102,
)
y -= 6

add_line(commands, 'Who it is for', MARGIN_X, y, font='F2', size=12)
y -= 14
y = add_wrapped(
    commands,
    "Primary persona: recruiters, hiring managers, collaborators, and peers evaluating Prasanna Warad for data engineering, analytics, and BI opportunities.",
    MARGIN_X,
    y,
    width_chars=102,
)
y -= 6

add_line(commands, 'What it does', MARGIN_X, y, font='F2', size=12)
y -= 14
feature_bullets = [
    "Provides five routed pages: Home, About, Projects, Resume, and Contact.",
    "Implements persistent navigation with active route highlighting and a mobile hamburger menu.",
    "Displays curated project cards from in-code data arrays with technology tags and outbound links.",
    "Embeds the resume in an iframe and supports direct PDF download from `/resume.pdf`.",
    "Shows direct contact channels (email, LinkedIn, GitHub, location) plus a message form UI.",
    "Supports SPA deployment routing via Netlify redirects and GitHub Pages 404 redirect script.",
]
for bullet in feature_bullets:
    y = add_wrapped(commands, f"- {bullet}", MARGIN_X + 4, y, width_chars=98)

y -= 6
add_line(commands, 'How it works (repo-evidence architecture)', MARGIN_X, y, font='F2', size=12)
y -= 14
arch_lines = [
    "- Entry/runtime: `src/main.jsx` mounts `<App />` in `StrictMode`.",
    "- Composition: `src/App.jsx` wraps `Navbar` + `AppRoutes` in `BrowserRouter`.",
    "- Routing/data flow: URL path -> React Router (`src/routes/AppRoutes.jsx`) -> page component render.",
    "- Content/data source: Mostly static JSX and in-file arrays (for example, projects in `Projects.jsx`) plus local assets (`src/assets`, `public/resume.pdf`).",
    "- Styling layer: SCSS modules per component/page under `src/**/Scss` and `src/App.scss`.",
    "- Services/APIs: Not found in repo.",
    "- Persistent backend/database/auth layer: Not found in repo.",
]
for line in arch_lines:
    y = add_wrapped(commands, line, MARGIN_X + 4, y, width_chars=96)


y -= 6
add_line(commands, 'How to run (minimal)', MARGIN_X, y, font='F2', size=12)
y -= 14
run_lines = [
    "1. Install dependencies: `npm install`",
    "2. Start dev server: `npm run dev`",
    "3. Open the local Vite URL shown in terminal (typically `http://localhost:5173`).",
]
for line in run_lines:
    y = add_wrapped(commands, line, MARGIN_X + 4, y, width_chars=96)

if y < BOTTOM_Y:
    raise SystemExit(f"Content overflowed single page (y={y:.2f}).")

stream_data = ('\n'.join(commands) + '\n').encode('latin-1', errors='replace')

objects = []
objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
objects.append(
    f"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>\nendobj\n".encode('latin-1')
)
objects.append(
    b"4 0 obj\n<< /Length " + str(len(stream_data)).encode('ascii') + b" >>\nstream\n" + stream_data + b"endstream\nendobj\n"
)
objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
objects.append(b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n")

pdf = bytearray(b"%PDF-1.4\n")
offsets = [0]
for obj in objects:
    offsets.append(len(pdf))
    pdf.extend(obj)

xref_start = len(pdf)
pdf.extend(f"xref\n0 {len(offsets)}\n".encode('ascii'))
pdf.extend(b"0000000000 65535 f \n")
for off in offsets[1:]:
    pdf.extend(f"{off:010d} 00000 n \n".encode('ascii'))
pdf.extend(
    f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode('ascii')
)

OUT.write_bytes(pdf)
print(OUT.resolve())
print(f"bytes={len(pdf)}")
