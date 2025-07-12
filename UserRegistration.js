//<!-- Register Page -->
            <div id="register-page" class="page" style="display: none;">
                <h1 class="page-title">Register for CleanCity</h1>
                
                <div class="card">
                    <h2>Create Account</h2>
                    <p>Join CleanCity to schedule waste pickup services and manage your requests.</p>
                </div>

                <div id="register-error" class="alert alert-danger" style="display: none;"></div>
                <div id="register-success" class="alert alert-success" style="display: none;"></div>

                <div class="card form-container">
                    <form id="register-form">
                        <div class="form-group">
                            <label for="register-name">Full Name *</label>
                            <input type="text" id="register-name" name="name" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="register-email">Email Address *</label>
                            <input type="email" id="register-email" name="email" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="register-password">Password *</label>
                            <input type="password" id="register-password" name="password" class="form-control" required />
                            <small class="text-muted">Password must be at least 3 characters long</small>
                        </div>

                        <div class="form-group">
                            <label for="register-confirm-password">Confirm Password *</label>
                            <input type="password" id="register-confirm-password" name="confirmPassword" class="form-control" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Create Account</button>
                    </form>
                </div>

                <div class="card">
                    <h3>Security Notice</h3>
                    <p>This is a demo application for educational purposes. In a real application, passwords would be:</p>
                    <ul>
                        <li>Hashed using secure algorithms (bcrypt, Argon2)</li>
                        <li>Validated with stronger requirements</li>
                        <li>Protected against common attacks</li>
                        <li>Stored securely in a database</li>
                    </ul>
                </div>

                <div class="card">
                    <p>
                        Already have an account? <a href="#" class="text-primary" data-page="login">Login here</a>
                    </p>
                </div>
            </div>