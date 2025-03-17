import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const steps = [
  {
    title: "Create Your Profile",
    description:
      "Set up your brand or influencer profile with key information about your audience and goals.",
  },
  {
    title: "Create or Apply to Campaigns",
    description:
      "Brands create targeted campaigns while influencers apply to relevant opportunities that match their audience.",
  },
  {
    title: "Collaborate and Create",
    description:
      "Work together to create engaging WhatsApp Status content that resonates with your audience.",
  },
  {
    title: "Track and Optimize",
    description:
      "Monitor performance metrics and optimize your campaigns for better results and ROI.",
  },
];

function How_It_Works() {
  return (
    // <section
    //   className="container space-y-8 py-12 md:py-20 lg:py-24"
    //   id="how-it-works"
    // >
    <div className="container mx-auto flex flex-col items-center justify-center text-center py-12 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          How It Works
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Get started in just a few simple steps
        </p>
      </div>
      <div className="mx-auto max-w-3xl mt-12">
        <div className="grid gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          {/* <Link to="signup">
            {" "}
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started Now
            </Button>
          </Link> */}
          <Dialog>
            <DialogTrigger>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started Now
              </Button>
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
      </div>
    </div>
    // </section>
  );
}
export default How_It_Works;
