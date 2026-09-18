// Retain all six original Arwes sound assets and their shared volume.
export const sounds = {
  master: { volume: 0.5 },
  bleeps: Object.fromEntries(
    ['click', 'typing', 'deploy', 'success', 'abort', 'warning'].map((name) => [
      name,
      {
        sources: [{ src: `/sound/${name}.mp3`, type: 'audio/mpeg' }],
        ...(name === 'success' ? { volume: 0.2 } : {}),
      },
    ]),
  ),
};
