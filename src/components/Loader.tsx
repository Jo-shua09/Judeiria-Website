import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream">
      <DotLottieReact src="https://lottie.host/7a381a53-c4da-45a6-b811-e8cc6d4581eb/MwNZaIegde.lottie" loop autoplay />
    </div>
  );
};

export default Loader;
