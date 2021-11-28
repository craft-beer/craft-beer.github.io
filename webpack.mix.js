const mix = require('laravel-mix');

const buildDir = mix.inProduction() ? 'docs' : 'build'

mix.browserSync({
    proxy: false,
    open: false,
    notify: false,
    files: ['src/**/*'],
    server: './build',
})

mix.disableSuccessNotifications()

mix.options({
    processCssUrls: false,
    terser: {
        extractComments: false,
    },
})

mix.setPublicPath(buildDir)

mix.js('src/js/app.js', buildDir + '/js')
    .sass('src/scss/app.scss', buildDir + '/css')
    .copyDirectory('src/images', buildDir + '/images')
    .copy('src/index.html', buildDir)
    .copy('src/storage.json', buildDir)

if (mix.inProduction()) {
    mix.version()
} else {
    mix.sourceMaps()
}
