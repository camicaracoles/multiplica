import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
}

export default function ErrorMessage({
  message = 'Ha ocurrido un error inesperado',
  title = 'Error al cargar',
  onRetry,
  variant = 'error'
}: ErrorMessageProps) {
  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`error-message error-message--${variant}`} role="alert">
      <div className="error-message__icon" aria-hidden="true">
        {icons[variant]}
      </div>
      <h2 className="error-message__title">{title}</h2>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button
          className="error-message__button"
          onClick={onRetry}
          aria-label="Reintentar"
        >
          <span className="error-message__button-icon">🔄</span>
          Reintentar
        </button>
      )}
    </div>
  );
}

