import React from "react";

const UserLogin = () => (
  <div id="login-page" className="page">
    <h1 className="page-title">Login to CleanCity</h1>
    <div className="card">
      <h2>User Authentication</h2>
      <p>Sign in to access your account and manage waste pickup requests.</p>
    </div>

    <div id="login-error" className="alert alert-danger" style={{ display: "none" }}></div>
    <div id="login-success" className="alert alert-success" style={{ display: "none" }}></div>

    <div className="card form-container">
      <form id="login-form">
        <div className="form-group">
          <label htmlFor="login-email">Email Address *</label>
          <input type="email" id="login-email" name="email" className="form-control" required />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password *</label>
          <input type="password" id="login-password" name="password" className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>

    <div className="card">
      <h3>Demo Accounts</h3>
      <p>Use these accounts for testing:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <div>
          <h4>Regular User</h4>
          <p><strong>Email:</strong> user@cleancity.com</p>
          <p><strong>Password:</strong> password123</p>
        </div>
        <div>
          <h4>Admin User</h4>
          <p><strong>Email:</strong> admin@cleancity.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>

    <div className="card">
      <p>
        Don't have an account? <a href="#" className="text-primary" data-page="register">Register here</a>
      </p>
    </div>
  </div>
);

export default UserLogin;
