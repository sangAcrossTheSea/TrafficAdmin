import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">
            <img
              src="/logo-nobg.png"
              className="w-12 inline-block mr-2 pb-2 mask mask-circle"
              alt="hlgt-logo"
            />
            Học luật giao thông
          </h1>
          <p className="text-xl mb-4 text-center">
            Website admin học luật giao thông
          </p>

          {/* Importing pointers component */}
          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
