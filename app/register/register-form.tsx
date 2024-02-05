'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
// ... (import statements)

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setPasswordMismatch(false);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password,
          phone: formData.get('phone')
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      // Optionally, provide feedback to the user, e.g., redirect to login page or display a success message.
      console.log('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">ExpenseTracker</h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Sign up to manage your expenses efficiently
        </p>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-full px-3 py-2 border ${
              passwordMismatch ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none ${
              passwordMismatch
                ? 'focus:border-red-500'
                : 'focus:border-blue-500'
            }`}
          />
          {passwordMismatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Submit
        </button>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}