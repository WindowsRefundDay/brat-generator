
import React, { forwardRef } from 'react';
import type { StyleState } from '../App';

interface PreviewProps {
  styles: StyleState;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ styles }, ref) => {
  const previewStyle: React.CSSProperties = {
    backgroundColor: styles.backgroundColor,
  };

  const downscaleFactor = styles.pixelation > 1 ? styles.pixelation : 1;

  const textStyle: React.CSSProperties = {
    fontFamily: "'Arial Narrow', 'Archivo Narrow', Arial, sans-serif",
    textTransform: 'lowercase',
    color: styles.textColor,
    fontSize: `${styles.fontSize / downscaleFactor}px`,
    letterSpacing: `${styles.letterSpacing / downscaleFactor}px`,
    filter: `blur(${styles.blur / downscaleFactor}px)`,
    transform: `scaleX(${styles.width / 100})`,
    transformOrigin: 'left',
    display: 'inline-block',
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  const wrapperStyle: React.CSSProperties = {
    transform: `scale(${downscaleFactor})`,
    transformOrigin: 'center',
    imageRendering: 'pixelated',
  };

  return (
    <div
      ref={ref}
      style={previewStyle}
      className="flex items-center justify-center min-h-[400px] p-8 rounded-b-lg lg:rounded-lg overflow-hidden transition-colors duration-200"
    >
        <div style={wrapperStyle}>
            <div style={textStyle}>
                {styles.text || 'type something...'}
            </div>
        </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;
