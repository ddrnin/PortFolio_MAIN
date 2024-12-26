import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
// html 코드 정리
import beautifycode from 'gulp-beautify-code';
import browserSync from 'browser-sync';
// sass 관련 라이브러리
import sass from 'gulp-dart-sass';
import sourcemaps from 'gulp-sourcemaps';
// 파일 이름을 변경
// import rename from 'gulp-rename';
// css 파일 압축
// import cssmin from 'gulp-cssmin';
// 변경사항을 감지 - 변경될 때마다 특정 작업 실행
import watch from 'gulp-watch';
// 벤더 프리픽서 - css 크로스브라우징 자동으로 되도록 속성 추가해줌 ex)'-webkit-'
import autoprefixer from 'gulp-autoprefixer';
// import babel from 'gulp-babel';

// APP, MO
const dir = {
	src: './src/',
	dist: './'
}
const src = {
	html: dir.src + 'html/',
	css: dir.src + 'scss/',
	js: dir.src + 'js/'
}
const dist = {
	html: dir.dist + 'html/',
	css: dir.dist + 'assets/mo/css/',
	js: dir.dist + 'assets/mo/js/'
}
// PC
const pcDir = {
	src: './pc_src/',
	dist: './'
}
const pcSrc = {
	html: pcDir.src + 'html/',
	css: pcDir.src + 'scss/',
	js: pcDir.src + 'js/'
}
const pcDist = {
	html: pcDir.dist + 'pc_html/',
	css: pcDir.dist + 'assets/pc/css/',
	js: pcDir.dist + 'assets/pc/js/'
}

// scssOptions
const scssOptions = {
	sass: {
		outputStyle: 'compressed',
		indentType: 'tab',
		indentWidth: 1
	}
};
// pxtoviewport
// const processors = [
// 	pxtoviewport({
// 		viewportWidth: 375,
// 		unitToConvert: 'px',
// 		propList: ['*', '!border', '!border-top', '!border-left', '!border-bottom', '!border-right'],
// 		unitPrecision: 5,
// 		minPixelValue: 1
// 	})
// ];

// mo:html 처리
gulp.task('mo:html', function(){
	return gulp
	.src([
		src.html + '*.html',
		src.html + '**/*.html',
		src.html + '**/*.css',
		'!' +  src.html + '/_partials/*.html'
		// '!' +  src.html + '/guide/_partials/*.html'
	])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file',
		context: {}
	}))
	.pipe(beautifycode({
		indent_size: 4,
		indent_width_tabs: true
	}))
	// 처리된 html파일을 /html에 저장
	.pipe(gulp.dest(dist.html))
	.pipe(browserSync.reload({ stream: true }))
})

// mo:css 처리
gulp.task('mo:sass', () => {
	return gulp
	.src([
		src.css + '/**/*.scss', 
		src.css + 'style.scss', 
		'!' + src.css + '/vendors/*.scss'
		// '!' + src.css + '/tenant-style.scss',
		// '!' + src.css + '/traveler-style.scss'
	])
	.pipe(sourcemaps.init())
	.pipe(sass(scssOptions).on('error', sass.logError))
	.pipe(autoprefixer())
	// .pipe(postcss(processors))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(dist.css))
	// .pipe(rename('style.min.css'))
	// .pipe(cssmin())
	// .pipe(gulp.dest(dist.css))
	.pipe(browserSync.reload({ stream: true }))
})
// // tenant css
// gulp.task('tenant:sass', () => {
// 	return gulp
// 		.src([
// 			src.css + '/**/*.scss', 
// 			src.css + 'tenant-style.scss', 
// 			'!' + src.css + '/vendors/*.scss', 
// 			'!' + src.css + '/style.scss',
// 			'!' + src.css + '/traveler-style.scss'
// 		])
// 		.pipe(sourcemaps.init())
// 		.pipe(sass(scssOptions).on('error', sass.logError))
// 		.pipe(autoprefixer())
// 		.pipe(sourcemaps.write('./'))
// 		.pipe(gulp.dest(dist.css))
// 		.pipe(rename('tenant-style.min.css'))
// 		.pipe(cssmin())
// 		.pipe(gulp.dest(dist.css))
// 		.pipe(browserSync.reload({ stream: true }));
// });
// js
gulp.task('mo:js', () => {
	return gulp
		.src([
			src.js + '/**/*.js', 
			src.js + '*.js'
		])
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.reload({ stream: true }))
});

// PC html
gulp.task('pc:html', () => {
	return gulp
		.src([
			pcSrc.html + '*.html', 
			pcSrc.html + '/**/*.html', 
			pcSrc.html + '/**/*.css', '!' +  
			pcSrc.html + '/_partials/*.html', 
			'!' +  pcSrc.html + '/guide/_partials/*.html'
		])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			context: {}
		}))
		.pipe(beautifycode({
			indent_size: 4,
			indent_with_tabs: true
		}))
		.pipe(gulp.dest(pcDist.html))
		.pipe(browserSync.reload({ stream: true }));
});
// PC css
gulp.task('pc:sass', () => {
	return gulp
		.src([pcSrc.css + '/**/*.scss', pcSrc.css + '*.scss', '!' + pcSrc.css + '/vendors/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass(scssOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		// .pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(pcDist.css))
		// .pipe(rename('style.min.css'))
		// .pipe(cssmin())
		// .pipe(gulp.dest(pcDist.css))
		.pipe(browserSync.reload({ stream: true }))
});
// PC js
gulp.task('pc:js', () => {
	return gulp
		.src([
			pcSrc.js + '/**/*.js', 
			pcSrc.js + '*.js'
		])
		.pipe(gulp.dest(pcDist.js))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function(){
	browserSync.init({
		port:3003,
		server: {
			index: "/pc_html/index.html"
		}
	});

	watch(src.html, gulp.series('mo:html'));
	watch(src.css, gulp.series(['mo:sass'/* , 'tenant:sass' */]));
	watch(src.js, gulp.series('mo:js'));

	watch(pcSrc.html, gulp.series('pc:html'));
	watch(pcSrc.css, gulp.series(['pc:sass']));
	watch(pcSrc.js, gulp.series('pc:js'));
});

// default start
gulp.task('default', gulp.series(['watch']));