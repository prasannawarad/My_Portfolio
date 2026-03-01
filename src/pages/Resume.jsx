import "./Scss/Resume.scss";

function Resume() {
  const resumeUrl = "/resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Prasanna_Warad_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-page">
      <header className="resume-header section-shell">
        <div className="container header-layout">
          <div>
            <h1 className="page-title">Resume</h1>
            <p className="page-subtitle">
              Production-focused software and data engineering experience summary.
            </p>
          </div>
          <button onClick={handleDownload} className="download-btn" type="button">
            Download Resume
          </button>
        </div>
      </header>

      <section className="resume-view section-shell alt-section">
        <div className="container">
          <article className="resume-frame fade-in">
            <header className="frame-header">
              <h2>Resume Viewer</h2>
              <span>PDF • Updated 2026</span>
            </header>
            <div className="frame-body">
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0`}
                title="Prasanna Warad Resume"
                className="resume-pdf"
                loading="lazy"
              />
            </div>
            <p className="frame-note">
              If preview is blocked by your browser, use the download button above.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Resume;
