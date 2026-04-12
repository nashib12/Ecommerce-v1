import React from "react";

function AboutUs() {
  return (
    <section
      id="about-us"
      className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12"
    >
      <h2 className="text-3xl md:text-5xl tracking-wide font-semibold mb-3">
        About Us
      </h2>
      <div className="w-full h-0.5 bg-black rounded-full mb-6" />
      {/*paragraph 1*/}
      <span className="text-lg text-gray-500">
        We believe we can all make a difference.
      </span>
      <h3 className="text-2xl font-semibold my-3">Megastore – The label</h3>
      <p className="tracking-wide leading-7 mb-6 text-justify">
        Made in Nepal and Designed for both men & women – Megastore is about YOU, the
        person who knows that quality is always in style. We believe that
        fashion should make you feel good, comfortable and different. Our brand
        represents you and your identity with uniqueness and style. Just like
        every company has their own Megastore, we want our brand to be your Megastore –
        that defines individualism and only you with your own style. “Style is
        something each of us already has, all we need to do is find it.
      </p>

      {/*paragraph 2*/}
      <span className="text-lg text-gray-500">
        What we promise, what you deserve.
      </span>
      <h3 className="text-2xl font-semibold my-3">Our Philosophy</h3>
      <p className="tracking-wide leading-7 mb-6 text-justify">
        Our philosophy is simple. To design and deliver beautiful, high-quality
        apparel “Made in Nepal” with sustainable and ethical manufacturing
        practices directly to you at an affordable price point. We are here to
        take clothing industry to different level while creating product and
        quality awareness among our consumers.
      </p>

      {/*paragraph 3*/}
      <span className="text-lg text-gray-500">
        From start to finish, sustainable, ethical and quality throughout.
      </span>
      <h3 className="text-2xl font-semibold my-3">Fabrics & Accessories</h3>
      <p className="tracking-wide leading-7 mb-6 text-justify">
        It all begins with the fabric and accessories. We are dedicated to
        exclusively using fabrics that are eco-friendly, sustainable and of
        highest quality for our entire products. All our fabric suppliers are
        Oeko-Tex certified and our fabrics are AZO free tested to avoid toxic
        chemicals that leads to health risks. The fabrics that we use has good
        hand feel, no colour shading/bleeding, no shrinkage and most importantly
        free from chemical substances unlike other clothes that we find in local
        market.
      </p>

      {/*paragraph 4*/}
      <span className="text-lg text-gray-500">
        Creating jobs. changing lives.
      </span>
      <h3 className="text-2xl font-semibold my-3">
        Behind our label – Our Factory
      </h3>
      <p className="tracking-wide leading-7 mb-6 text-justify">
        We are an ethical garment manufacturer and exporter of quality garments
        to private labels in Europe for more than 21 years. Established in 1997,
        we have travelled around the globe in search of good location for
        garment production. From Malta, Cyprus, Nepal, Vietnam, Dubai and, then
        again back to Nepal. After several years of wandering, we are finally
        back home with abundant knowledge, lesson and experience to empower
        transform people’s lives. Our factory is spacious and equipped with
        latest machineries. Moreover, we have experienced team of Nepalese who
        were with us abroad for several years. They make sure that our each and
        every product come out with perfect workmanship and meet high quality
        standard. Our focus is on grooming the garment industry, empowering
        women, creating jobs and changing lives.
      </p>
    </section>
  );
}

export default AboutUs;
