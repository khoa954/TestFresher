import { Component, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ErrorInfo } from "react";
class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("ErrorBoundary component caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Home Page</Link>
        </h2>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
