import React, { useEffect, useState } from 'react';
import { getBlobUrl } from '../../utils/blobUrl'; // ✅ make sure the function is correctly exported

export default function VideoPreview({ mediaUrl }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = await getBlobUrl(mediaUrl);
        setBlobUrl(url);
      } catch (error) {
        console.error('Error loading video blob:', error);
      }
    };

    if (mediaUrl) load();
  }, [mediaUrl]);

  if (!blobUrl) {
    return <p className="text-white/50">Loading video...</p>;
  }

  return (
    <video
      controls
      className="w-full max-h-64 rounded-lg bg-black/20"
      preload="metadata"
    >
      <source src={blobUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
