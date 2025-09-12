// // gulp 및 라이브러리 연결
import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
// html 코드 정리
import beautifycode from 'gulp-beautify-code';
import browserSync from 'browser-sync';
// sass 관련 라이브러리
import sass from 'gulp-dart-sass';
import sourcemaps from 'gulp-sourcemaps';
// 파일 이름을 변경
import rename from 'gulp-rename';
// css 파일 압축
// import cssmin from 'gulp-cssmin';
// 변경사항을 감지 - 변경될 때마다 특정 작업 실행
import watch from 'gulp-watch';
// 벤더 프리픽서 - css 크로스브라우징 자동으로 되도록 속성 추가해줌 ex)'-webkit-'
import autoprefixer from 'gulp-autoprefixer';

// BrowserSync 인스턴스 생성
// const bs = browserSync.create();
// 경로 변수 지정
const dir = {
	src: './src/',
	dist: './'
};
const src = {
	html: dir.src + 'html/',
	css: dir.src + 'scss/',
	js: dir.src + 'js/',
	// img: dir.src + 'html/**/img/'
}
const dist = {
	html: dir.dist + 'html/',
	css: dir.dist + 'assets/css/',
	js: dir.dist + 'assets/js/',
	// img: dir.dist + 'assets/img/'
}


// html 처리
gulp.task('html', function(){
	return gulp.src([
		src.html + '*.html',
		src.html + '**/*.html',
		src.html + '**/*.css',
		// src.img + "**/*",
		'!' + src.html + '_partials/*.html'
	])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(beautifycode({
		indent_size: 4,
		indent_width_tabs: true
	}))
	// 처리된 html파일을 /html에 저장
	.pipe(gulp.dest(dist.html))
	// .pipe(gulp.dest(dist.img))
	.pipe(browserSync.reload({ stream: true }))
});


// css 처리
gulp.task('sass', function(){
	const scssOption = {
		sass: {
			outputStyle: 'compressed',
			indentType: 'tab',
			indentWidth: 1
		}
	};
	return gulp.src([src.css + '*.scss', src.css + '/**/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass(scssOption).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('./'))
	// .pipe(cssmin())
	// 처리된 sass파일을 assets/css/에 1차 저장
	.pipe(gulp.dest(dist.css))
	// .pipe(rename('style.min.css'))
	// 1차 저장된 css들을 이름을 바꾸고 압축해서 2차저장
	// .pipe(gulp.dest(dist.css))
	.pipe(browserSync.reload({ stream: true }))
});

// js 처리
gulp.task('js', function(){
	return gulp.src([
		src.js + '*.js', 
		src.js + '/**/*.js',
		'!' + src.js + 'plugin/**'
	])
	.pipe(rename({ extname: '.min.js'}))
	.pipe(gulp.dest(dist.js))
	.pipe(browserSync.reload({ stream: true }));
});

// // img 처리
// gulp.task('img', function(){
// 	return gulp.src([
// 		src.img + '*.*',
// 		src.img + '/**/*.*',
// 		src.img + '/**/**/*.*'
// 	])
// 	.pipe(gulp.dest(dist.img))
// 	.pipe(browserSync.reload({ stream: true }));
// })

gulp.task('watch', function(){
	browserSync.init({
		port: 3009,
		server: {
			index: "./html/main/main.html"
		}
	});
	watch(src.html, gulp.series('html'));
	watch(src.css, gulp.series('sass'));
	watch(src.js, gulp.series('js'));
	// watch(src.img, gulp.series('img'));
});

// default - 터미널에 gulp 명령어 입력하면 실행되는 작업. 여기서는 watch가 실행
gulp.task('default', gulp.series(['watch']));

gulp.task('build', gulp.series(['html', 'sass', 'js']));