/** Simple promotional banner shown above the product catalog. */
export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">Gaming Week Deals</p>
        <h1 className="hero__title">Level up with powerful gaming desktops</h1>
        <p className="hero__text">
          Hand-picked prebuilt PCs from top brands. Free delivery on every order.
        </p>
      </div>
    </section>
  );
}
