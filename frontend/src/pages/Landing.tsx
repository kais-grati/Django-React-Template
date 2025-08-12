import FAQ from "../components/UI/FAQ";
import HookBody from "../components/UI/HookBody";
import PricingBoxes from "../components/UI/PricingBoxes";
import ReviewGallery from "../components/UI/ReviewGallery";
import TrustedBy from "../components/UI/TrustedBy";

function Landing() {
  return (
    <>
      <HookBody></HookBody>
      <TrustedBy></TrustedBy>
      <ReviewGallery></ReviewGallery>
      <PricingBoxes></PricingBoxes>
      <FAQ></FAQ>
    </>
  );
}

export default Landing;
