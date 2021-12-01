const mix = require('laravel-mix');

const buildDir = mix.inProduction() ? 'docs' : 'build'

mix.browserSync({
    proxy: false,
    open: false,
    notify: false,
    files: ['src/**/*', 'build/css/*'],
    server: './build',
})

mix.disableSuccessNotifications()

mix.options({
    processCssUrls: true,
    terser: {
        extractComments: false,
    },
})

mix.setPublicPath(buildDir)

mix.js('src/js/app.js', buildDir + '/js')
    .sass('src/scss/app.scss', buildDir + '/css')
    .copyDirectory('src/images', buildDir + '/images')
    .copy('src/index.html', buildDir)

if (mix.inProduction()) {
    mix.version()
} else {
    mix.copy('src/storage.json', buildDir)
    mix.sourceMaps()
}
