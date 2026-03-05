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
    title: 'MILDANG PT',
    tags: ['Platform', 'AI', 'Education'],
    year: '2021',
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
  const [stickyTop, setStickyTop] = useState(200);
  const sectionRef = useRef<HTMLElement>(null);
  const headerHeight = 56; // 각 프로젝트 헤더 높이
  const workHeaderHeight = 48; // Work 헤더 높이

  useEffect(() => {
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

    const timer = setTimeout(updateStickyTop, 100);
    window.addEventListener('resize', updateStickyTop);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateStickyTop);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#e8d7c9] relative">
      {/* Work Header */}
      <div
        className="sticky bg-[#e8d7c9] z-30 px-8 py-4 border-b border-black/10"
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

      {/* Project Items - 각 프로젝트가 독립적으로 스크롤됨 */}
      <div className="relative">
        {projects.map((project, index) => {
          // 모든 헤더의 sticky top 위치 동일 (Work 헤더 바로 아래)
          const itemStickyTop = stickyTop + workHeaderHeight;

          return (
            <div key={index} className="relative">
              {/* Project Header - sticky로 고정됨 */}
              <div
                className="sticky bg-[#e8d7c9]"
                style={{ top: `${itemStickyTop}px`, zIndex: 20 + index }}
              >
                {/* 실제 헤더 내용 */}
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
              </div>

              {/* Project Image - 항상 펼쳐져 있음 */}
              <div className="relative w-full h-[70vh] bg-black/10">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/20 to-black/40">
                  <span className="text-white/50 text-2xl font-sans">{project.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom border */}
      <div className="border-t border-black/20 h-20" />
    </section>
  );
}
