"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products</span>
        </Link>

        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity">
            <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 stroke-[2.2]" />
            <span className="font-brand text-4xl sm:text-5xl font-normal tracking-wide">Windy</span>
          </Link>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="border border-white/60 dark:border-gray-800/80 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl shadow-xl rounded-2xl">
          <CardContent className="pt-6">
            {success && (
              <div
                data-testid="form-success"
                className="mb-5 p-3 rounded-md bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-300 text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>Login successful (demo)</span>
              </div>
            )}

            <form data-testid="login-form" onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  data-testid="login-email"
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    if (errors.email) {
                      const trimmed = val.trim();
                      if (trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }
                  }}
                  placeholder="name@example.com"
                  className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.email && (
                  <p
                    data-testid="error-email"
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  data-testid="login-password"
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    if (errors.password && val) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.password;
                        return next;
                      });
                    }
                  }}
                  placeholder="••••••••"
                  className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.password && (
                  <p
                    data-testid="error-password"
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-testid="login-submit"
                className="w-full mt-2"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-100 dark:border-gray-800 p-4 text-xs text-gray-500">
            FER202 Lab 2 Form Validation
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
