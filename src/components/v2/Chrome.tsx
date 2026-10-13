import Smooth from "./Smooth";
import Loader from "./Loader";
import Header from "./Header";

/** Everything the v2 pages share around their content: scroll engine, loader, route wipe cover, header. */
export default function Chrome() {
  return (
    <>
      {/* Smooth first: the loader stops and restarts its scroll engine. */}
      <Smooth />
      <Loader />
      <div className="v2-trans" aria-hidden="true">
        <div className="v2-trans-clip">
          <div className="v2-trans-rings">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <noscript>
        <style>{".v2-loader{display:none}"}</style>
      </noscript>
      <Header />
    </>
  );
}
