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
    if (role === "influencer") {
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
            <form action={"http://localhost:5000/register"} method="POST">
              <div className="flex flex-col  gap-3">
                <div className="grid gap-1 grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="fName"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lName"
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col grid gap-1">
                  <Label htmlFor="tel">
                    Phone-Number <span className="fi fi-gh"></span>
                  </Label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <span className="px-3 ">+233</span>
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
                    {/* <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={userType === "brand"}
                        onChange={() => setUserType("brand")}
                      />
                      <span className="ml-2">I am a Brand</span>
                    </label> */}

                    <label className="flex items-center mb-4">
                      <input
                        name="purpose"
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
              <div className="items-center gap-1 text-sm">
                <Label htmlFor="terms">
                  <input type="checkbox" name="" id="" /> I agree to the{" "}
                  <a href="/terms" className="underline">
                    terms and conditions
                  </a>
                </Label>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
