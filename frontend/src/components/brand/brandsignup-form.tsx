import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "brand" || role === "influencer") {
      setUserType(role);
    }
  }, [searchParams]);
  return (
    <div>
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle> Sign up to create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={"http://192.168.56.1:5000/register"} method="POST">
              <div className="flex flex-col gap-6">
                <div className="grid gap-1 ">
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="your name"
                    required
                  />
                </div>
                <div className="grid gap-1  ">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="your name"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="tel">Phone-Number</Label>
                  <p>
                    <span className="fi fi-gh"></span>
                  </p>
                  <Input
                    id="tel"
                    type="tel"
                    placeholder="+233 53 020 2061"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="create a password"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="confirm your password"
                    required
                  />
                </div>
<<<<<<< HEAD
=======

                <div className="flex items-center gap-2 hidden ">
                  <Input id="terms" type="checkbox" required />
                  <Label htmlFor="terms">
                    I agree to the{" "}
                    <a href="/terms" className="underline">
                      terms and conditions
                    </a>
                  </Label>
                </div>
                <div className="hidden">
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={userType === "brand"}
                      onChange={() => setUserType("brand")}
                    />
                    <span className="ml-2">I am a Brand</span>
                  </label>

                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={userType === "influencer"}
                      onChange={() => setUserType("influencer")}
                    />
                    <span className="ml-2">I am an Influencer</span>
                  </label>
                </div>
>>>>>>> a081daee3b5bee87e0da5fa36b17037fd08fbb20
                <div className="flex flex-col gap-1">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign Up with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log In
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
