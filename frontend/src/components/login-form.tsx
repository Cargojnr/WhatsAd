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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

// new import

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: "+233",
      phone: formData.phone,
      password: formData.password,
    };
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.purpose === "brand") {
        navigate("/bdashboard");
      } else if (data.user.purpose === "influencer") {
        navigate("/idashboard");
      }
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form action={"http://localhost:3000/login"} method="POST"> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                    value={formData.phone}
                    onChange={handleChange}
                    id="tel"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="53 020 2061"
                    required
                    className="flex-1 border-none focus:ring-0"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Insert your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              {/* <a href="/isignup" className="underline underline-offset-4">
                Sign up
              </a> */}
              <Dialog>
                <DialogTrigger>
                  <p className="underline underline-offset-4">Sign Up</p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Sign up</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col gap-3 min-[400px]:flex-row text-center justify-center items-center mt-5">
                        <Link to="/bsignup">
                          {" "}
                          <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            I am a Brand
                          </Button>
                        </Link>
                        <Link to="/isignup">
                          {" "}
                          <Button size="lg" variant="outline">
                            I am an Influencer
                          </Button>
                        </Link>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
