<script setup lang="ts">
import { fs } from '@zenfs/core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  window: Window
}>()

const { t } = useI18n()

const filePath = loadAudioUrl(props.window.meta.path)

function loadAudioUrl(path: string) {
  if (!path) {
    return
  }

  try {
    const buffer = fs.readFileSync(path)
    const blob = new Blob([buffer], { type: 'audio/mp3' })
    return URL.createObjectURL(blob)
  } catch (err) {
    console.error("Error while loading the audio", err)
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
