function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/10 bg-black/20 px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-center backdrop-blur-sm sm:px-6">
      <p className="text-sm text-text-muted">
        © {new Date().getFullYear()} Prasanna Kailash Warad
      </p>
      <p className="mt-1 text-xs text-text-muted/80">
        Built with React and tailored for data engineering roles.
      </p>
    </footer>
  );
}

export default Footer;
