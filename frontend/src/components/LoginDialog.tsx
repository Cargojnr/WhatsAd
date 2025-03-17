import { LoginForm } from "@/components/login-form";
import Header from "./Header";
import Footer from "./Footer";
export default function LoginPage() {
  return (
    <div className="">
      <Header />
      <div className=" md:h-dvh container relative  flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 mx-auto mb-4 md:mb-0 ">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          {/* <div className="absolute inset-0 bg-green-600" /> */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/img11.png')" }}
          />
          <div className="bg-[rgba(4,9,30,0.7)] absolute inset-0 "></div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <a href="/">WhatsAd</a>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="relative z-10 space-y-2">
              <p className="text-lg">
                &ldquo;This platform has completely transformed how we reach our
                audience. The ROI from WhatsApp Status campaigns is
                incredible.&rdquo;
              </p>
              <footer className="text-sm">
                Makafui Irene, Marketing Director
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
