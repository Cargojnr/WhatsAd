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
              <div className="flex flex-col  gap-3">
                <div className="grid gap-1 grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="tel">
                    Phone-Number <span className="fi fi-gh"></span>
                  </Label>

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
                    placeholder="********"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Comfirm Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
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
                </div>
                <div className="flex flex-col gap-1">
                  <Button type="submit" className="w-full">
                    Sign Up
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
