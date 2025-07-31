import React, { useEffect, useState } from 'react';
import { getBlobUrl } from '../../utils/blobUrl'; // Same utility you use for video

export default function AudioPreview({ mediaUrl }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = await getBlobUrl(mediaUrl);
        setBlobUrl(url);
      } catch (err) {
        console.error("Error loading audio blob:", err);
      }
    };

    if (mediaUrl) load();
  }, [mediaUrl]);

  if (!blobUrl) return <p className="text-white/50">Loading audio...</p>;

  return (
    <audio
      controls
      className="w-full"
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        outline: 'none',
      }}
    >
      <source src={blobUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
