import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'app-classic-audioplayer-playground-launch',
  dependsOn: ['desktop-app-classic-audioplayer-register'],
  setup(nuxtApp) {
    autoStartPlaygroundApps(nuxtApp, [
      { id: 'org.owdproject.classic-audioplayer', entry: 'classic-audioplayer /mnt/test/demo.mp3', windowModel: 'main' },
    ])
  },
})
