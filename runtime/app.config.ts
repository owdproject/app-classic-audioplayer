export default {
  id: 'org.owdproject.classic-audioplayer',
  title: 'Player',
  singleton: false,
  icon: 'mdi:volume-high',
  provides: {
    name: 'audio-player',
    entry: 'player',
  },
  windows: {
    main: {
      component: () => import('./components/Window/WindowAudioPlayer.vue'),
      resizable: false,
      size: {
        width: 'auto',
        height: 'auto',
      },
      position: {
        x: 400,
        y: 240,
        z: 0,
      },
    },
  },
  entries: {
    player: {
      command: 'classic-audioplayer',
    },
  },
  commands: {
    'classic-audioplayer': (app: IApplicationController, args: any) => {
      const path = args._[1];
      const autoplay = args.autoplay
      const loop = args.loop

      const meta = args ? {
        path,
        autoplay,
        loop,
      } : {
        path: '/',
        autoplay: false,
        loop: false,
      }

      app.openWindow('main', undefined, meta)
    },
  },
}
