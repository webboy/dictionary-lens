import { ref } from 'vue';

const cameraFeed = ref<HTMLVideoElement | null>(null);
const canvas = document.createElement('canvas');

export function useCamera() {
  async function initializeCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Use the back camera
        },
      });

      if (cameraFeed.value) {
        cameraFeed.value.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }

  function capturePhoto(): string {
    if (!cameraFeed.value) {
      console.error('Camera feed is not initialized');
      return '';
    }

    const video = cameraFeed.value;
    if (!video.videoWidth || !video.videoHeight) {
      console.error('Video dimensions are not ready');
      return '';
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Canvas context is not available');
      return '';
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }

  return {
    cameraFeed,
    initializeCamera,
    capturePhoto
  };
}
