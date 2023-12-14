import { createPlugin } from '@/utils';
import { t } from '@/i18n';

export default createPlugin({
  name: () => t('plugins.audio-reverb.name'),
  description: () => t('plugins.audio-reverb.description'),

  renderer() {
    document.addEventListener(
      'audioCanPlay',
      async ({ detail: { audioSource, audioContext } }) => {
        const convolver = audioContext.createConvolver();

        // Load an impulse response
        const response = await fetch('impulses/imp1.wav');
        const arrayBuffer = await response.arrayBuffer();
        audioContext.decodeAudioData(arrayBuffer, (buffer) => {
          convolver.buffer = buffer;
        });

        // Connect the audio source to the convolver, and then to the destination
        audioSource.connect(convolver);
        convolver.connect(audioContext.destination);
      },
      { once: true, passive: true },
    );
  },
});
