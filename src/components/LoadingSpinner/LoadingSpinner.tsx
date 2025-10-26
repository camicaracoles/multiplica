import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({ 
  message = 'Cargando productos...', 
  fullPage = false 
}: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner ${fullPage ? 'loading-spinner--full-page' : ''}`}>
      <div className="loading-spinner__spinner" aria-hidden="true">
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
        <div className="loading-spinner__circle"></div>
      </div>
      <p className="loading-spinner__message">{message}</p>
    </div>
  );
}

