// components/RegisterForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-body p-4 p-md-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone Number (Optional)</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
