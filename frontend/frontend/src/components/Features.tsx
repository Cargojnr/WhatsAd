import { Target, BarChart3, Link, HandCoins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScrollAnimation from "react-animate-on-scroll";
import { motion } from "framer-motion";
const features = [
  {
    icon: Link,
    title: "Connect with WhatsApp influencers",
    description:
      "Easily find influencers with high WhatsApp status views to promote your business.",
  },
  {
    icon: Target,
    title: "Targeted and Trustworthy Marketing",
    description:
      "Reach potential customers through trusted personal networks for higher engagement.",
  },
  // {
  //   icon: Target,
  //   title: "Easy Campaign Management",
  //   description:
  //     "Easy-to-use tools for creating, tracking, and optimizing your campaigns.",
  // },
  {
    icon: BarChart3,
    title: "Cost-Effective & Fast Results",
    description: "Get more clients quickly without spending on expensive ads.",
  },
  {
    icon: HandCoins,
    title: "Secure Payments",
    description: "Automated, reliable payment processing for influencers.",
  },
];
function Features() {
  return (
    <div className="container mx-auto mt-5 bg-slate-50 py-12 md:py-20 lg:py-24">
      <div className=" text-center">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="max-w-[100%] text-muted-foreground leading-normal sm:text-lg sm:leading-7">
          Our platform provides powerful tools for both brands and influencers
          to create successful campaigns.
        </p>
      </div>
      <div className=" mt-10 mx-auto grid justify-center gap-7 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg hover:scale-105 transition-transform duration-300 mx-4"
          >
            <CardHeader>
              <feature.icon className="h-14 w-14 text-green-600" />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Features;
