'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Compass, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
   const [isSignup, setIsSignup] = useState(false); //updated new 

  //const handleLogin = (e: React.FormEvent) => {//
  //  e.preventDefault();
   // setIsLoading(true);

    const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const url = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Something went wrong");
    }

    // ✅ If signup → ask to login
    if (isSignup) {
      toast({
        title: "Signup Successful",
        description: "Now login with your credentials",
      });
      setIsSignup(false);
      setIsLoading(false);
      return;
    }

    // ✅ Login success
    localStorage.setItem("token", data.token);

    toast({
      title: "Login Successful",
      description: "Redirecting to dashboard...",
    });

    router.push("/admin/dashboard");

  } catch (err: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: err.message,
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleAuth}>
          <CardHeader className="text-center">
             <div className="flex justify-center items-center gap-2 mb-2">
                <Compass className="h-10 w-10 text-accent" />
                <h1 className="font-headline text-3xl font-bold text-primary">Course Compass</h1>
             </div>
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
  {isLoading
    ? isSignup
      ? "Signing Up..."
      : "Signing In..."
    : isSignup
    ? "Sign Up"
    : "Sign In"}
</Button>
<p className="text-sm text-center w-full mt-2">
  {isSignup ? (
    <>
      Already have an account?{" "}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => setIsSignup(false)}
      >
        Login
      </span>
    </>
  ) : (
    <>
      First time?{" "}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => setIsSignup(true)}
      >
        Sign Up
      </span>
    </>
  )}
</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
