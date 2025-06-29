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
// import { useSearchParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// new imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //  const [searchParams] = useSearchParams();
  //   const [userType, setUserType] = useState<string>("");

  //   useEffect(() => {
  //     const role = searchParams.get("role");

  //     if (role === "influencer") {
  //       setUserType(role);
  //     }
  //   }, [searchParams]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    tel: "",
    email: "",
    region: "",
    password: "",
    purpose: "influencer",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      code: "+233",
    };

    const res = await fetch("http://localhost:3000/register", {
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
      navigate("/idashboard");
    } else {
      alert(data.message || "Registration failed");
    }
  };

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
            {/* <form action={"http://localhost:3000/register"} method="POST"> */}
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col  gap-3">
                <div className="grid gap-1 grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="fName"
                      type="text"
                      placeholder="First Name"
                      value={formData.fName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lName"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col grid gap-1">
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
                      placeholder="Phone Number"
                      value={formData.tel}
                      onChange={handleChange}
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
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="region">Region</Label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
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
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-1">
                  {/* <div className="flex items-center">
                    <Label htmlFor="password">Comfirm Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  /> */}
                  {/* <div className="hidden">
                    <label className="flex items-center mb-4">
                      <Input name="purpose" type="text" value={userType} />
                    </label>
                  </div> */}
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
