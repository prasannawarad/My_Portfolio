import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function Resume() {
  const sheetRef = useRef(null);
  const pageRefs = useRef(new Map());
  const [numPages, setNumPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState('width'); // 'width' | 'page'
  const [pageWidth, setPageWidth] = useState(() => {
    if (typeof window === 'undefined') return 320;
    return Math.min(Math.max(window.innerWidth - 32, 240), 900);
  });
  const [loadError, setLoadError] = useState(null);

  const resumePdfUrl = useMemo(() => `${import.meta.env.BASE_URL}resume.pdf`, []);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
    setActivePage(1);
    setLoadError(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setLoadError(err?.message || 'Could not load resume PDF.');
    setNumPages(null);
  }, []);

  const clampScale = useCallback((next) => Math.max(0.8, Math.min(1.7, next)), []);

  const scrollToPage = useCallback((pageNumber) => {
    const el = pageRefs.current.get(pageNumber);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return undefined;

    const updateWidth = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setPageWidth(Math.min(w, 900));
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const stage = sheetRef.current;
    if (!stage) return undefined;
    if (!numPages) return undefined;

    const pageEls = Array.from({ length: numPages }, (_, i) => pageRefs.current.get(i + 1)).filter(Boolean);
    if (pageEls.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target?.getAttribute('data-page');
        if (id) setActivePage(Number(id));
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: [0.1, 0.2, 0.35, 0.5] },
    );

    pageEls.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, [numPages]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!numPages) return;

      if (e.key === 'j' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const next = Math.min(numPages, activePage + 1);
        setActivePage(next);
        scrollToPage(next);
      }

      if (e.key === 'k' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const next = Math.max(1, activePage - 1);
        setActivePage(next);
        scrollToPage(next);
      }

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((s) => clampScale(s + 0.1));
        setFitMode('width');
      }

      if (e.key === '-') {
        e.preventDefault();
        setScale((s) => clampScale(s - 0.1));
        setFitMode('width');
      }

      if (e.key === '0') {
        e.preventDefault();
        setScale(1);
        setFitMode('width');
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePage, clampScale, numPages, scrollToPage]);

  const displayWidth = useMemo(() => {
    if (fitMode === 'page') return Math.min(pageWidth, 900);
    return Math.min(Math.round(pageWidth * scale), 980);
  }, [fitMode, pageWidth, scale]);

  const thumbWidth = 124;

  return (
    <div className="w-full min-w-0 bg-background-dark px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 rounded-2xl border border-surface-accent/80 bg-surface-dark px-4 py-3 shadow-lg shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 max-w-[min(100%,24rem)] truncate rounded border border-surface-accent bg-code-bg px-3 py-1 font-mono text-[10px] text-text-muted sm:max-w-none sm:text-xs">
              resume-viewer://public/resume.pdf
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded border border-surface-accent bg-code-bg px-4 font-mono text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Open
              </a>
              <a
                href={resumePdfUrl}
                download="Prasanna_Warad_Resume.pdf"
                className="inline-flex h-10 items-center justify-center rounded border border-primary bg-primary/10 px-4 font-mono text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-background-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Download
              </a>
            </div>
          </div>
        </header>

        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="terminal-window rounded-2xl border border-surface-accent bg-code-bg shadow-xl shadow-black/30 overflow-hidden">
              <div className="flex items-center justify-between border-b border-surface-accent bg-surface-dark px-4 py-2">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="font-mono text-xs text-text-muted">resume — commands</div>
                <div className="w-10" />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-primary/90">POSITION</p>
                    <p className="mt-1 font-display text-lg font-black tracking-tight text-white">PDF Stage</p>
                  </div>
                  <div className="rounded border border-surface-accent bg-surface-dark px-2 py-1 font-mono text-[10px] text-text-muted">
                    {numPages ? `${activePage}/${numPages}` : '…'}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScale((s) => clampScale(s - 0.1));
                      setFitMode('width');
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded border border-surface-accent bg-surface-dark px-3 font-mono text-xs font-bold text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="Zoom out"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      remove
                    </span>
                    Zoom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setScale((s) => clampScale(s + 0.1));
                      setFitMode('width');
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-3 font-mono text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-background-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="Zoom in"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      add
                    </span>
                    Zoom
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScale(1);
                      setFitMode('width');
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded border border-surface-accent bg-surface-dark px-3 font-mono text-xs font-bold text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      fit_width
                    </span>
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitMode((m) => (m === 'width' ? 'page' : 'width'))}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded border border-surface-accent bg-surface-dark px-3 font-mono text-xs font-bold text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">
                      aspect_ratio
                    </span>
                    {fitMode === 'width' ? 'Fit page' : 'Fit width'}
                  </button>
                </div>

                <div className="mt-4 rounded border border-surface-accent bg-surface-dark p-3">
                  <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-primary/90">SHORTCUTS</p>
                  <div className="mt-2 space-y-1 font-mono text-[11px] text-text-muted">
                    <p>
                      <span className="text-white">j/k</span> or <span className="text-white">PgDn/PgUp</span> — next/prev page
                    </p>
                    <p>
                      <span className="text-white">+</span>/<span className="text-white">-</span> — zoom
                    </p>
                    <p>
                      <span className="text-white">0</span> — reset zoom
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-primary/90">PAGES</p>
                  <div className="mt-2 max-h-[18.5rem] overflow-auto pr-1 terminal-scrollbar">
                    <div className="space-y-2">
                      {numPages
                        ? Array.from({ length: numPages }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = pageNumber === activePage;
                            return (
                              <button
                                key={`thumb-${pageNumber}`}
                                type="button"
                                onClick={() => {
                                  setActivePage(pageNumber);
                                  scrollToPage(pageNumber);
                                }}
                                className={`flex w-full items-center gap-3 rounded border px-2 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                                  isActive
                                    ? 'border-primary/60 bg-primary/10'
                                    : 'border-surface-accent bg-code-bg hover:border-primary/45'
                                }`}
                              >
                                <div className="shrink-0 overflow-hidden rounded border border-surface-accent bg-white shadow-sm">
                                  <Document
                                    file={resumePdfUrl}
                                    loading={null}
                                    error={null}
                                    className="leading-none"
                                  >
                                    <Page
                                      pageNumber={pageNumber}
                                      width={thumbWidth}
                                      renderTextLayer={false}
                                      renderAnnotationLayer={false}
                                      className="[&_.react-pdf__Page__canvas]:block"
                                    />
                                  </Document>
                                </div>
                                <div className="min-w-0">
                                  <p className="font-mono text-[10px] text-text-muted">
                                    page <span className="text-white">{pageNumber}</span>
                                  </p>
                                  <p className="mt-1 font-display text-sm font-black tracking-tight text-white">
                                    {isActive ? 'In view' : 'Jump'}
                                  </p>
                                </div>
                              </button>
                            );
                          })
                        : (
                          <div className="rounded border border-surface-accent bg-code-bg p-3 font-mono text-xs text-text-muted">
                            Loading pages…
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div
              ref={sheetRef}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_56px_-16px_rgba(0,0,0,0.42)] ring-1 ring-black/[0.03] sm:rounded-3xl"
            >
              {loadError ? (
                <p className="p-8 text-center text-sm text-slate-700">{loadError}</p>
              ) : (
                <Document
                  file={resumePdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={<p className="p-12 text-center font-mono text-sm text-slate-500">Loading resume…</p>}
                  className="flex flex-col"
                >
                  {numPages
                    ? Array.from({ length: numPages }, (_, i) => {
                        const pageNumber = i + 1;
                        return (
                          <div
                            key={`page-${pageNumber}`}
                            ref={(node) => {
                              if (node) pageRefs.current.set(pageNumber, node);
                            }}
                            data-page={pageNumber}
                            className="flex flex-col bg-white [&_.react-pdf__Page]:shadow-none [&_.react-pdf__Page__canvas]:block [&_.react-pdf__Page__canvas]:align-top"
                          >
                            {i > 0 ? (
                              <div
                                className="h-px w-full shrink-0 bg-gradient-to-r from-transparent via-slate-200/70 to-transparent"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="flex w-full justify-center">
                              <Page
                                pageNumber={pageNumber}
                                width={displayWidth}
                                renderTextLayer
                                renderAnnotationLayer
                                className="bg-white"
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </Document>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Resume;
