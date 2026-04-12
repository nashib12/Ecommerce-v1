import React, { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import Lenis from "lenis";
import DataContext from "../../Context/DataContext";

function ProductModal() {
  const { openModal, setOpenModal } = useContext(DataContext);
  const scrollRef = useRef(null);
  const globalLenis = useLenis();

  useEffect(() => {
    if (openModal) {
      globalLenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      globalLenis?.start();
      document.body.style.overflow = "auto";
    }

    return () => {
      globalLenis?.start();
      document.body.style.overflow = "auto";
    };
  }, [openModal, globalLenis]);

  useEffect(() => {
    if (!openModal || !scrollRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.firstChild,
      smoothWheel: true,
      syncTouch: true,
      duration: 1.3,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [openModal]);

  if (!openModal) return null;

  return createPortal(
    <section
      id="product-modal"
      className=" bg-black/40 fixed top-0 left-0 right-0 bottom-0 z-999"
      onClick={() => setOpenModal(false)}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden h-106 w-4xl bg-white">
        <div ref={scrollRef} className="h-full overflow-hidden">
          <div className="px-6 py-6">

          </div>
        </div>
      </div>
    </section>,
    document.getElementById("modalRoot"),
  );
}

export default ProductModal;