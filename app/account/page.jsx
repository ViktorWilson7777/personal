"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, LogOut, ArrowLeft, ShieldCheck, Heart } from "lucide-react";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div
      data-testid="account-page"
      className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products</span>
        </Link>

        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 stroke-[2.2]" />
            <span className="font-brand text-4xl sm:text-5xl font-normal tracking-wide">Windy</span>
          </Link>
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Manage your profile and authenticated session
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="border border-white/60 dark:border-gray-800/80 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Account Profile</CardTitle>
                <CardDescription className="text-xs">Authenticated with Supabase Auth</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Logged-in Email</div>
              <div
                data-testid="account-email"
                className="text-base font-semibold text-gray-900 dark:text-white break-all"
              >
                {user.email}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 px-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Session active &amp; protected route verified</span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link href="/favorites" className="w-full">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>View My Favorites</span>
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
            <Link href="/" className="w-full">
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
