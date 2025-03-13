import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adeyemi Emmanuel",
    title: "Marketing director",
    image: "/img/person01.jpeg",
    description:
      "The ROI we've seen from WhatsApp Status campaigns has been incredible. It's a game-changer for reaching our target audience.",
  },
  {
    name: "Raymond Kwame",
    title: "WhatsApp Influencer",
    image: "/img/person02.jpeg",
    description:
      "I've been able to turn my WhatsApp Status into a real business. The platform makes it easy to find and work with great brands.",
  },
  {
    name: "Pascaline",
    title: "Brand Owner",
    image: "/img/person03.png",
    description:
      "The platform's analytics and payment system make it so easy to manage campaigns. We've seen a 3x return on our investment.",
  },
];

export default function Testimonials() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center  bg-slate-50  py-12 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Testimonials
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          See how brands and influencers are achieving their goals with WhatsAd.
        </p>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3  mt-5 md:max-w-[64rem] md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="hover:shadow-lg hover:scale-105 transition-transform duration-300 mx-4 sm:mx-0"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
                <div className="relative mt-6">
                  <Quote className="absolute -left-1 -top-1 h-4 w-4 text-muted-foreground/50" />
                  <p className="pl-6 text-muted-foreground">
                    "{testimonial.description}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
