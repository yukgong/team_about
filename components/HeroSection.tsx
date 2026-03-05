'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import FlyingBugsAnimation from './FlyingBugsAnimation';
import Clock from './Clock';

// 스크롤 진행률 (0~1) 계산 훅
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // 스크롤이 화면 높이에 도달하면 progress = 1
      const newProgress = Math.min(scrollY / viewportHeight, 1);
      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기값 설정
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export default function HeroSection() {
  const progress = useScrollProgress();
  const navRef = useRef<HTMLElement>(null);
  const [animationScale, setAnimationScale] = useState(0.9);
  const [topPosition, setTopPosition] = useState('-3em');
  // 0.8 이후에 불투명해짐
  const bgOpacity = progress > 0.85 ? 1 : 0;

  // Nav 높이를 전역으로 공유 + 애니메이션 스케일 반응형
  useEffect(() => {
    const handleResize = () => {
      // Nav 높이 업데이트
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
      }
      // 화면 너비 1000px 기준 스케일 변경
      setAnimationScale(window.innerWidth > 1000 ? 0.9 : 1.3);
      setTopPosition(window.innerWidth > 1000 ? '-5em' : '-1em');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Background Stage - Fixed behind everything */}
      <div className="fixed inset-0 z-0 bg-[#361a07]">
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              width: '100vw',
              height: '100vh',
            }}
          >
            <FlyingBugsAnimation
              imageUrl="/animation.gif"
              style={{ width: '100%', height: '100%', display: 'flex', scale: animationScale, justifyContent: 'center', alignItems: 'center', top: topPosition }}
            />
          </div>
        </div>
      </div>

      {/* Top Navigation - Fixed at top, highest z-index */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
        style={{ backgroundColor: `rgba(232, 215, 201, ${bgOpacity})` }}
      >
        <div className="flex justify-between items-start">
          <div className="max-w-[200px]">
            <p
              className="text-sm font-sans leading-snug transition-colors duration-100"
              style={{ color: progress > 0.85? '#000' : '#fff' }}
            >
              R&D Driven EdTech
              <br />
              based in Seoul,
              <br />
              Korea.
            </p>
          </div>

          <div
            className="hidden md:flex items-center gap-12 text-sm font-sans transition-colors duration-100"
            style={{ color: progress > 0.85? '#000' : '#fff' }}
          >
            <span>Everywhere in Education</span>
            <span className="opacity-70">(not just LMS)</span>
          </div>

          <div
            className="flex items-center gap-8 text-sm font-sans transition-colors duration-100"
            style={{ color: progress > 0.85? '#000' : '#fff' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full transition-colors duration-100"
                style={{ backgroundColor: progress > 0.85 ? '#000' : '#fff' }}
              ></span>
              <Clock />
            </div>
            <a href="#contact" className="hover:opacity-70 transition-opacity">
              Contact
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

// Hero Title with Spacer - 스페이서와 타이틀을 함께 관리
// Nav 높이는 CSS 변수 --nav-height 사용 (HeroSection에서 설정)
export function HeroTitle() {
  const titleRef = useRef<HTMLElement>(null);
  const [titleHeight, setTitleHeight] = useState(150);
  const [navHeight, setNavHeight] = useState(100); // 초기 추정값
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measureHeights = () => {
      // 타이틀 높이 측정 및 CSS 변수 설정
      if (titleRef.current) {
        const height = titleRef.current.offsetHeight;
        setTitleHeight(height);
        document.documentElement.style.setProperty('--title-height', `${height}px`);
      }
      // Nav 높이 CSS 변수에서 가져오기
      const navHeightValue = getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')
        .trim();
      if (navHeightValue) {
        setNavHeight(parseInt(navHeightValue, 10));
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const newProgress = Math.min(scrollY / viewportHeight, 1);
      setProgress(newProgress);
    };

    // 초기 측정 (약간의 딜레이로 nav 높이 설정 대기)
    const timer = setTimeout(measureHeights, 50);
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureHeights);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureHeights);
    };
  }, []);

  // 스페이서 높이 = 화면 높이 - 타이틀 높이 (nav는 fixed이므로 제외)
  const spacerHeight = `calc(100vh - ${titleHeight}px)`;
  // 0.8 이후에 불투명해짐
  const bgOpacity = progress > 0.85 ? 1 : 0;

  return (
    <>
      {/* Spacer - 배경 애니메이션이 보이는 영역 */}
      <div
        className="relative z-10"
        style={{ height: spacerHeight }}
      />

      {/* Sticky Title */}
      <section
        ref={titleRef}
        className="sticky z-30"
        style={{
          top: `${navHeight}px`,
          backgroundColor: `rgba(232, 215, 201, ${bgOpacity})`,
        }}
      >
        <div className="px-4 md:px-8 py-4">
          <div className="mx-auto">
            <Image
              src="/logo_text.svg"
              alt="IHATEFLYINGBUGS"
              width={1305}
              height={193}
              className="w-full h-auto max-w-full transition-all duration-100"
              style={{ filter: progress > 0.85 ? 'none' : 'invert(1)' }}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
