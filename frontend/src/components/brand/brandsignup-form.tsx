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
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
            <form>
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
