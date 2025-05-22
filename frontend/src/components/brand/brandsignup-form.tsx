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
    // if (role === "brand" || role === "influencer") {
    //   setUserType(role);
    // }
    if (role === "brand") {
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
                    name="bName"
                    id="name"
                    type="name"
                    placeholder="your name"
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="tel">
                    Phone-Number <span className="fi fi-gh"></span>
                  </Label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Input
                      name="code"
                      value="+233"
                      disabled
                      className="w-20 px-3 py-2 bg-gray-100 text-gray-700 border-none rounded-lg overflow-hidden"
                    />

                    <Input
                      id="tel"
                      name="tel"
                      type="tel"
                      inputMode="tel"
                      placeholder="53 020 2061"
                      required
                      className="flex-1 border-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="region">Region</Label>
                  <select name="region">
                    <option value="Ashanti">Ashanti</option>
                    <option value=" Central"> Central</option>
                    <option value="Greater Accra">Greater Accra</option>
                  </select>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    name="password"
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

                <div className="hidden">
                  <label className="flex items-center mb-4">
                    <Input name="purpose" type="text" value={userType} />
                  </label>
                </div>
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
