import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <section className="bg-v-black text-v-white py-24 md:py-32 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="section-label text-gray-500 mb-6">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl mb-8">
            Two colors.<br />
            <em>Infinite possibilities.</em>
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Our journey began with a simple yet powerful vision — to redefine the way men & women experience fashion.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-6">Our Philosophy</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8">
              Minimal colors.<br />
              Maximum impact.
            </h2>
            <p className="text-v-gray leading-relaxed mb-6 font-light text-lg">
              At Velsario, we believe that true elegance needs no color. We stripped fashion down to its purest form — black and white — and found that within this constraint lies infinite creative possibility.
            </p>
            <p className="text-v-gray leading-relaxed font-light">
              Every piece in our collection is crafted for the modern professional who understands that presence comes from confidence, not complexity. Our garments are built for those who value precision, quality, and timeless style.
            </p>
          </div>
          <div className="aspect-[4/5] bg-v-light overflow-hidden">
            <img
              src="https://velsario.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-20-at-9.30.33-PM.jpeg"
              alt="Velsario Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-v-light px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-4">What We Stand For</p>
            <h2 className="font-display text-4xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                desc: 'Every fabric is handpicked. Every stitch is intentional. We never compromise on the materials that touch your skin.'
              },
              {
                title: 'Timeless Design',
                desc: 'We don\'t follow trends. We create pieces that outlast them. Our designs are built to be relevant for decades, not seasons.'
              },
              {
                title: 'Conscious Fashion',
                desc: 'We believe in making less, but making it better. Quality over quantity — always.'
              },
            ].map((value, i) => (
              <div key={i} className="bg-v-white p-8 md:p-10">
                <span className="text-4xl font-display text-v-light font-semibold">0{i + 1}</span>
                <h3 className="font-medium text-lg mt-4 mb-4">{value.title}</h3>
                <p className="text-v-gray font-light leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-6">Ready to experience Velsario?</p>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Discover the collection
          </h2>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </section>
    </div>
  )
}
