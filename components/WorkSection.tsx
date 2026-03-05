'use client';

import { useEffect, useRef, useState } from 'react';

interface Project {
  num: string;
  title: string;
  tags: string[];
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    num: '01',
    title: 'MILDANG LMS',
    tags: ['Platform', 'AI', 'Education'],
    year: '2024',
    image: '/projects/mildang-lms.jpg',
  },
  {
    num: '02',
    title: 'AI LEARNING ASSISTANT',
    tags: ['LLM', 'Chatbot', 'Personalization'],
    year: '2024',
    image: '/projects/ai-assistant.jpg',
  },
  {
    num: '03',
    title: 'CONTENT STUDIO',
    tags: ['No-code', 'Interactive', 'Authoring'],
    year: '2023',
    image: '/projects/content-studio.jpg',
  },
  {
    num: '04',
    title: 'ANALYTICS DASHBOARD',
    tags: ['Data', 'Visualization', 'Insights'],
    year: '2023',
    image: '/projects/analytics.jpg',
  },
  {
    num: '05',
    title: 'TUTORING PLATFORM',
    tags: ['Matching', '1:1', 'Video'],
    year: '2022',
    image: '/projects/tutoring.jpg',
  },
];

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [stickyTop, setStickyTop] = useState(200); // 초기값
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // CSS 변수에서 nav + title 높이 가져오기
    const updateStickyTop = () => {
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '100',
        10
      );
      const titleHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--title-height') || '150',
        10
      );
      setStickyTop(navHeight + titleHeight);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      // 섹션이 뷰포트에 들어왔는지 확인
      if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) {
        setActiveIndex(null);
        return;
      }

      // 각 아이템의 위치 확인
      let newActiveIndex: number | null = null;

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        // 아이템이 sticky 위치에 도달했는지 확인
        if (rect.top <= stickyTop + 50) {
          newActiveIndex = index;
        }
      });

      setActiveIndex(newActiveIndex);
    };

    // 초기 측정 (CSS 변수 설정 대기)
    const timer = setTimeout(updateStickyTop, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateStickyTop);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateStickyTop);
    };
  }, [stickyTop]);

  return (
    <section ref={sectionRef} className="bg-[#e8d7c9] relative">
      {/* Work Header */}
      <div
        className="sticky bg-[#e8d7c9] z-20 px-8 py-4 border-b border-black/10"
        style={{ top: `${stickyTop}px` }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-sm font-sans text-black">Work</span>
          <div className="flex items-center gap-4 text-sm font-sans">
            <span className="text-black">Show</span>
            <span className="text-black/50">—</span>
            <span className="text-black/50">Hide</span>
          </div>
        </div>
      </div>

      {/* Project Items */}
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className="sticky bg-[#e8d7c9]"
            style={{ top: `${stickyTop + 48}px` }}
          >
            {/* Project Header */}
            <div className="border-t border-black/20 px-8 py-4 cursor-pointer hover:bg-black/5 transition-colors">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-sans text-black/50 w-6">
                    {project.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-sans font-medium text-black">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-1">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-sans text-black/50">
                        {tag}
                        {i < project.tags.length - 1 && <sup className="text-[#F96706]">*</sup>}
                        {i < project.tags.length - 1 && ' '}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-sans text-black/70">
                    ( {project.year} )
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#F96706]"></span>
                </div>
              </div>
            </div>

            {/* Project Image - 활성화 시 표시 */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                activeIndex === index ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="relative w-full h-[70vh] bg-black/10">
                {/* Placeholder - 실제 이미지로 교체 가능 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 to-black/40">
                  <span className="text-white/50 text-2xl font-sans">{project.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom border */}
      <div className="border-t border-black/20 h-20" />
    </section>
  );
}
