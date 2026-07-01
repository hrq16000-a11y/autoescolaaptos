import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log estruturado para debugging via DevTools
    console.error("[ErrorBoundary] Uncaught error:", error, info?.componentStack);
    // Envia para dataLayer/GTM para rastreamento em produção
    if (typeof window !== "undefined") {
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: "app_error",
        error_message: error?.message,
        error_stack: error?.stack?.slice(0, 500),
        path: window.location.pathname,
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main
        role="alert"
        className="min-h-screen flex items-center justify-center bg-background px-4"
      >
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Algo deu errado
            </h1>
            <p className="text-muted-foreground">
              Encontramos um problema inesperado ao carregar esta página. Nossa
              equipe já foi avisada. Você pode tentar novamente ou voltar para a
              página inicial.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-3 min-h-11 font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Tentar novamente
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-5 py-3 min-h-11 font-semibold hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              Voltar à Home
            </button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <details className="text-left mt-4 text-xs text-muted-foreground bg-muted/50 rounded p-3">
              <summary className="cursor-pointer font-medium">
                Detalhes técnicos (dev only)
              </summary>
              <pre className="mt-2 whitespace-pre-wrap break-words">
                {this.state.error.message}
                {"\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
