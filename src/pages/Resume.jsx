import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

/** Public folder asset; respects Vite `base` for GitHub Pages etc. */
const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`.replace(/([^:]\/)\/+/g, '$1');

function Resume() {
  const sheetRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(() => {
    if (typeof window === 'undefined') return 320;
    return Math.min(Math.max(window.innerWidth - 32, 240), 900);
  });
  const [loadError, setLoadError] = useState(null);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
    setLoadError(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setLoadError(err?.message || 'Could not load resume PDF.');
    setNumPages(null);
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

  return (
    <div className="w-full min-w-0 bg-background-dark px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-2xl border border-surface-accent/80 bg-surface-dark px-4 py-3 shadow-lg shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 max-w-[min(100%,20rem)] truncate rounded border border-surface-accent bg-code-bg px-3 py-1 font-mono text-[10px] text-text-muted sm:max-w-none sm:text-xs">
              resume-viewer://public/resume.pdf
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded border border-surface-accent bg-code-bg px-4 font-mono text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary"
              >
                Open
              </a>
              <a
                href={resumePdfUrl}
                download="Prasanna_Warad_Resume.pdf"
                className="inline-flex h-10 items-center justify-center rounded border border-primary bg-primary/10 px-4 font-mono text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-background-dark"
              >
                Download
              </a>
            </div>
          </div>
        </header>

        <section className="mx-auto w-full max-w-[900px]">
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
                loading={
                  <p className="p-12 text-center font-mono text-sm text-slate-500">Loading resume…</p>
                }
                className="flex flex-col"
              >
                {numPages
                  ? Array.from({ length: numPages }, (_, i) => (
                      <div
                        key={`page-${i + 1}`}
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
                            pageNumber={i + 1}
                            width={pageWidth}
                            renderTextLayer
                            renderAnnotationLayer
                            className="bg-white"
                          />
                        </div>
                      </div>
                    ))
                  : null}
              </Document>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
