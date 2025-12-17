import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="bg-green-700">
      <div className="fixed inset-0 z-50 w-full flex items-center justify-center bg-background">
        <DotLottieReact src="https://lottie.host/7a381a53-c4da-45a6-b811-e8cc6d4581eb/MwNZaIegde.lottie" loop autoplay />
      </div>
    </div>
  );
};

export default Loader;
