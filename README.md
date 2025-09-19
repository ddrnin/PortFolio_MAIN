PortFolio_MAIN/
|– assets/					# 빌드된 정적 파일들
|   |– css/					# 컴파일된 CSS 파일들
|   |   |– plugin/			# 플러그인 CSS
|   |   |   |– swiper-bundle.min.css
|   |   |   └─tui-date-picker.min.css
|   |   |– style.css			# 메인 스타일시트 (모든 SCSS 통합)
|   |   |– style.css.map		# CSS 소스맵
|   |   └─style.min.css		# 압축된 CSS
|   |– fonts/				# 웹폰트 파일들
|   |   |– GmarketSans/		# 지마켓산스 폰트
|   |   |   |– GmarketSansBold.woff
|   |   |   |– GmarketSansBold.woff2
|   |   |   |– GmarketSansLight.woff
|   |   |   |– GmarketSansLight.woff2
|   |   |   |– GmarketSansMedium.woff
|   |   |   └─GmarketSansMedium.woff2
|   |   |– neurimboGothicRegular.woff2
|   |   └─Pretendard/		# 프리텐다드 폰트
|   |       |– Pretendard-Black.subset.woff
|   |       |– Pretendard-Black.subset.woff2
|   |       |– Pretendard-Bold.subset.woff
|   |       |– Pretendard-Bold.subset.woff2
|   |       |– Pretendard-Medium.subset.woff
|   |       |– Pretendard-Medium.subset.woff2
|   |       |– Pretendard-Regular.subset.woff
|   |       └─Pretendard-Regular.subset.woff2
|   |– images/				# 이미지 파일들
|   |   |– favicon/			# 파비콘
|   |   |   |– apple-icon-152x152.png
|   |   |   |– favicon-16x16.png
|   |   |   |– Favicon.png
|   |   |   |– Favicon.svg
|   |   |   └─mainfest.json
|   |   └─img/				# 일반 이미지
|   └─js/					# 컴파일된 JS 파일들
|       |– plugin/			# 플러그인 JS
|       |   |– aos.min.js
|       |   |– gsap.min.js
|       |   |– jquery-3.7.0.min.js
|       |   |– jquery.marquee.min.js
|       |   |– lenis.min.js
|       |   |– ScrollToPlugin.min.js
|       |   |– ScrollTrigger.min.js
|       |   |– swiper-bundle.min.js
|       |   └─tui-date-picker.min.js
|       └─ui.common.min.js	# 커스텀 JS (압축)
|– src/						# 소스 작업 파일들
|   |– html/					# HTML 소스
|   |   |– _partials/		# HTML 파셜 파일들
|   |   |   |– _head.html
|   |   |   |– _header.html
|   |   |   └─_meta_social_tag.html
|   |   └─main/
|   |       └─main.html		# 메인 HTML 소스
|   |– js/					# JS 소스
|   |   └─ui.common.js		# 커스텀 JS 소스
|   └─scss/					# SCSS 소스
|       |– abstracts/		# SCSS 추상화 파일들
|       |   |– _functions.scss
|       |   |– _mixins.scss
|       |   └─_variables.scss
|       |– base/			# 기본 스타일
|       |   |– _animations.scss
|       |   |– _fonts.scss
|       |   └─_reset.scss
|       |– layout/			# 레이아웃 스타일
|       |   └─_header.scss
|       |– page/			# 페이지별 스타일
|       |   |– _about.scss
|       |   |– _common.scss
|       |   |– _contact.scss
|       |   |– _portfolio.scss
|       |   |– _skills.scss
|       |   └─_visual.scss
|       └─style.scss		# 메인 스타일 SCSS
|– index.html				# Vercel 배포용 메인 파일 (src/html/main/main.html에서 빌드)
|– gulpfile.mjs			# Gulp 빌드 설정
|– package.json			# 프로젝트 의존성 및 스크립트
|– node_modules/			# Node.js 의존성 패키지들

## 🚀 빌드 및 배포

### 개발 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트: 3009)
gulp

# 또는 watch 모드로 실행
gulp watch
```

### 빌드 명령어
```bash
# 프로덕션 빌드
gulp build
```

### 배포 구조
- **Vercel 배포**: `index.html`이 루트에 위치하여 자동 배포
- **빌드 과정**: 
  1. `src/html/main/main.html` → `index.html` (루트)
  2. `src/scss/style.scss` → `assets/css/` (SCSS 컴파일)
  3. `src/js/ui.common.js` → `assets/js/ui.common.min.js` (JS 압축)
  4. `src/html/` → `html/` (HTML 컴파일, main.html 제외)

### 주요 기능
- **SCSS 컴파일**: Dart Sass 사용, 소스맵 생성, 압축 모드
- **JS 압축**: `.min.js` 확장자로 압축
- **HTML 파셜**: `@@include` 문법으로 모듈화
- **자동 새로고침**: BrowserSync로 실시간 개발 (포트: 3009)
- **크로스브라우징**: Autoprefixer 자동 적용
- **코드 포맷팅**: HTML 코드 자동 정리 (탭 4칸)

### 사용된 라이브러리
- **jQuery 3.7.0**: DOM 조작
- **GSAP 3.11.5**: 애니메이션
- **Swiper 11.0.3**: 슬라이더
- **AOS**: 스크롤 애니메이션
- **Lenis**: 부드러운 스크롤
- **TUI Date Picker**: 날짜 선택기
- **jQuery Marquee**: 텍스트 마퀴

### SCSS 구조
- **abstracts/**: 변수, 믹스인, 함수
- **base/**: 리셋, 폰트, 애니메이션
- **layout/**: 헤더, 푸터 등 레이아웃
- **page/**: 페이지별 스타일 (about, contact, portfolio, skills, visual)
|
