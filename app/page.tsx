import HeroSection, { HeroTitle } from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Background + Fixed Navigation */}
      <HeroSection />

      {/* Spacer + Sticky Title (높이 자동 계산, 스크롤 연동 opacity) */}
      <HeroTitle />

      {/* Content Sections - 밝은 배경, 타이틀(z-30) 아래로 스크롤 */}
      <div className="bg-[#e8d7c9] relative z-20">
        {/* Work Section with Sticky Stack Effect */}
        <WorkSection />

        {/* Products & Services Section */}
        <section className="py-32 px-8 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-sans font-semibold text-black mb-20">
              PRODUCTS & SERVICES
            </h2>

            <div className="grid md:grid-cols-[280px_1fr] gap-16">
              {/* Left: Description */}
              <div>
                <p className="text-sm font-sans text-black/70 leading-relaxed">
                  It&apos;s not just about building.
                  <br />
                  Products shape our standards,
                  <br />
                  keeping us focused on
                  <br />
                  innovative education and
                  <br />
                  pushing us to do our very best
                  <br />
                  on every single project.
                </p>
              </div>

              {/* Right: Products Table */}
              <div>
                <div className="border-t border-black/20">
                  {[
                    { name: 'GLOBAL LMS', count: '50K+', desc: 'users' },
                    { name: 'AI TUTOR', count: '12', desc: 'schools' },
                    { name: 'LEARNING ANALYTICS', count: '3M+', desc: 'data points' },
                    { name: 'CONTENT STUDIO', count: '500+', desc: 'courses' },
                    { name: 'MATCHING PLATFORM', count: '8K+', desc: 'connections' },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-4 border-b border-black/20 hover:bg-black/5 transition-colors cursor-pointer group"
                    >
                      <span className="text-xl md:text-2xl font-sans font-medium text-black group-hover:translate-x-2 transition-transform">
                        {product.name}
                      </span>
                      <span className="text-xl md:text-2xl font-sans text-[#F96706]">
                        {product.count}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm font-sans text-black/70">
                  We are <span className="text-[#F96706]">EdTech Innovators of the Year</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & Clients Section */}
        <section className="py-32 px-8 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-sans font-semibold text-black mb-20">
              PARTNERS & CLIENTS
            </h2>

            <div className="grid md:grid-cols-[280px_1fr] gap-16">
              {/* Left: Description */}
              <div>
                <p className="text-sm font-sans text-black/70 leading-relaxed">
                  Our solutions have been
                  <br />
                  adopted by leading institutions:
                  <br />
                  universities, K-12 schools,
                  <br />
                  corporate training centers,
                  <br />
                  government agencies, and
                  <br />
                  international organizations.
                </p>
              </div>

              {/* Right: Partner Logos Grid */}
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/20 pt-8">
                  {[
                    'Seoul National University',
                    'KAIST',
                    'Samsung',
                    'LG',
                    'Hyundai',
                    'Ministry of Education',
                    'UNESCO',
                    'World Bank',
                    'SK Telecom',
                    'Naver',
                    'Kakao',
                  ].map((partner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center h-20 text-sm md:text-base font-sans font-medium text-black/80 hover:text-black transition-colors"
                    >
                      {partner}
                    </div>
                  ))}
                  <div className="flex items-center justify-center h-20 text-sm md:text-base font-sans text-[#F96706]">
                    And <span className="underline ml-1 cursor-pointer">more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section id="contact" className="py-32 px-8 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-sans font-semibold text-black mb-20">
              JOIN US
            </h2>

            <div className="grid md:grid-cols-[280px_1fr] gap-16">
              {/* Left: Description */}
              <div>
                <p className="text-sm font-sans text-black/70 leading-relaxed">
                  We&apos;re looking for people who
                  <br />
                  think about humans first,
                  <br />
                  understand code and design,
                  <br />
                  and never stop learning.
                  <br />
                  <br />
                  Join our growing ecosystem.
                </p>
              </div>

              {/* Right: Positions */}
              <div className="border-t border-black/20">
                {[
                  { title: 'Frontend Developer', tags: 'React · TypeScript · Next.js' },
                  { title: 'Backend Developer', tags: 'Python · FastAPI · PostgreSQL' },
                  { title: 'AI/ML Engineer', tags: 'LLM · RAG · PyTorch' },
                  { title: 'Product Designer', tags: 'UI/UX · Figma · Prototyping' },
                  { title: 'Full-stack Engineer', tags: 'All of the above' },
                ].map((position, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-black/20 hover:bg-black/5 transition-colors cursor-pointer group"
                  >
                    <span className="text-xl md:text-2xl font-sans font-medium text-black group-hover:translate-x-2 transition-transform">
                      {position.title}
                    </span>
                    <span className="text-sm font-sans text-black/50 hidden md:block">
                      {position.tags}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <a
                href="mailto:hello@ihateflyingbugs.com"
                className="inline-flex items-center text-lg font-sans text-[#F96706] hover:underline"
              >
                hello@ihateflyingbugs.com
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm font-sans">
              {/* Copyright */}
              <div>
                <p className="text-black/50">© IHATEFLYINGBUGS</p>
                <p className="text-black/50">2012 — 2026</p>
              </div>

              {/* Contact */}
              <div>
                <p className="text-black/70 mb-2">LET&apos;S TALK</p>
                <a href="mailto:hello@ihateflyingbugs.com" className="text-black hover:underline">
                  hello@ihateflyingbugs.com
                </a>
              </div>

              {/* Follow */}
              <div>
                <p className="text-black/70 mb-2">FOLLOW</p>
                <div className="flex gap-4">
                  <a href="#" className="text-black hover:underline">
                    GitHub
                  </a>
                  <a href="#" className="text-black hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Legal */}
              <div className="text-right">
                <a href="#" className="text-black/70 hover:text-black block">
                  PRIVACY
                </a>
                <a href="#" className="text-black/70 hover:text-black block">
                  COOKIES
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
