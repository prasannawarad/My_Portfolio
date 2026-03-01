import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-background-dark',
  solid: 'bg-primary text-background-dark hover:bg-primary-dark border border-primary',
  outline:
    'border border-surface-accent bg-transparent text-white hover:border-primary hover:text-primary',
};

function Button({
  children,
  to,
  href,
  type,
  onClick,
  className,
  variant,
  ariaLabel,
  icon,
}) {
  const baseClasses =
    'inline-flex h-10 items-center justify-center gap-2 rounded px-6 text-sm font-mono font-bold transition-all';
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'solid', 'outline']),
  ariaLabel: PropTypes.string,
  icon: PropTypes.node,
};

Button.defaultProps = {
  to: undefined,
  href: undefined,
  type: 'button',
  onClick: undefined,
  className: '',
  variant: 'primary',
  ariaLabel: undefined,
  icon: null,
};

export default Button;
