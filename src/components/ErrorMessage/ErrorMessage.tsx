import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-message__icon" aria-hidden="true">⚠️</div>
      <h2 className="error-message__title">Error al cargar productos</h2>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button 
          className="error-message__button"
          onClick={onRetry}
          aria-label="Reintentar carga de productos"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

