import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error('Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h5>Uh oh! Something went wrong :(</h5>
          <p>Either you have performed an invalid action or The server is giving us a hard time</p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
