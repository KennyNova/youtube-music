import '@total-typescript/ts-reset';

import type { ipcRenderer as electronIpcRenderer } from 'electron';
import type is from 'electron-is';

import type config from './config';
import type { VideoDataChanged } from '@/types/video-data-changed';
import type { t } from '@/i18n';

declare global {
  interface Compressor {
    audioSource: MediaElementAudioSourceNode;
    audioContext: AudioContext;
  }

  interface DocumentEventMap {
    audioCanPlay: CustomEvent<Compressor>;
    videodatachange: CustomEvent<VideoDataChanged>;
  }

  interface Window {
    ipcRenderer: typeof electronIpcRenderer;
    mainConfig: typeof config;
    electronIs: typeof is;
    ELECTRON_RENDERER_URL: string | undefined;
    /**
     * YouTube Music internal variable (Last interaction time)
     */
    _lact: number;
    navigation: Navigation;
    download: () => void;
    togglePictureInPicture: () => void;
    reload: () => void;
    i18n: {
      t: typeof t;
    };
  }
}

// import { Howl as _Howl } from 'howler';
declare module 'howler' {
  interface Howl {
    _sounds: {
      _paused: boolean;
      _ended: boolean;
      _id: string;
      _node: HTMLMediaElement;
    }[];
  }
}
