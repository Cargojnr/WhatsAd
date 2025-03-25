import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function CTA() {
  return (
    <section className="container py-8 md:py-12 lg:py-24 mx-auto text-center">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Ready to Grow Your Reach?
        </h2>
        <p className="max-w-[100%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 ">
          Join thousands of successful brands and influencers who are leveraging
          our platform to expand their reach and achieve their goals.
        </p>
        <div className="flex flex-col gap-3 min-[400px]:flex-row text-center justify-center items-center mt-5">
          <Link to="/bsignup?role=brand">
            {" "}
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Start as a Brand
            </Button>
          </Link>
          <Link to="/isignup?role=influencer">
            {" "}
            <Button size="lg" variant="outline">
              Start as an Influencer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default CTA;
