<script setup lang="ts">
import { fs } from '@zenfs/core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  window: Window
}>()

const { t } = useI18n()

const filePath = loadAudioUrl(props.window.meta.path)

function loadAudioUrl(pathString: string) {
  if (!pathString) {
    return
  }

  if (pathString.startsWith('http')) {
    return pathString
  }

  try {
    const buffer = fs.readFileSync(pathString)
    const lastDotIndex = pathString.lastIndexOf('.')
    const lastSlashIndex = pathString.lastIndexOf('/')
    let ext = ''
    if (lastDotIndex > lastSlashIndex) {
      ext = pathString.substring(lastDotIndex).toLowerCase()
    }

    let mimeType

    switch (ext) {
      case '.mp3':
        mimeType = 'audio/mp3'
        break
      case '.wav':
        mimeType = 'audio/wav'
        break
      default:
        console.warn(`File is not supported: ${ext}`)
        return
    }

    const blob = new Blob([buffer], { type: mimeType })
    return URL.createObjectURL(blob)
  } catch (err) {
    console.error('Error while loading the audio', err)
    return
  }
}
</script>

<template>
  <Window v-bind="$props">
    <audio
      :src="filePath"
      :controls="!props.window.meta.noControls"
      :autoplay="props.window.meta.autoplay"
      :loop="props.window.meta.loop"
      class="m-2"
    />
  </Window>
</template>
