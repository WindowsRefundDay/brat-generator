
import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import Preview from './components/Preview';
import Footer from './components/Footer';
import { DownloadIcon, CopyIcon } from './components/icons';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';

export interface StyleState {
  text: string;
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  width: number;
  letterSpacing: number;
  blur: number;
  pixelation: number;
}

const App: React.FC = () => {
  const [styles, setStyles] = useState<StyleState>({
    text: "brat",
    textColor: '#32ff32',
    backgroundColor: '#171717',
    fontSize: 150,
    width: 92,
    letterSpacing: 0,
    blur: 0.5,
    pixelation: 1,
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const [isCopied, handleCopy] = useCopyToClipboard();

  const generateCss = useCallback(() => {
    return `
/*
 * NOTE: The pixelation effect is a rendering trick achieved by
 * downscaling and then upscaling the text element. This is not
 * easily replicable with a single CSS class and requires a specific
 * HTML structure. The CSS below provides the base style.
 */
.brat-text {
  font-family: 'Arial Narrow', 'Archivo Narrow', Arial, sans-serif;
  text-transform: lowercase;
  color: ${styles.textColor};
  font-size: ${styles.fontSize}px;
  letter-spacing: ${styles.letterSpacing}px;
  filter: blur(${styles.blur}px);
  /* For transform to work correctly */
  display: inline-block;
  transform: scaleX(${styles.width / 100});
  transform-origin: left;
}
    `.trim();
  }, [styles]);

  const handleDownload = useCallback(() => {
    if (previewRef.current === null) {
      return;
    }
    toPng(previewRef.current, { 
        cacheBust: true, 
        backgroundColor: styles.backgroundColor,
        pixelRatio: 2,
     })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${styles.text.replace(/\s+/g, '-') || 'brat'}-style.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }, [styles.backgroundColor, styles.text]);

  const handleCopyCss = useCallback(() => {
    handleCopy(generateCss());
  }, [generateCss, handleCopy]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-neutral-800/50 rounded-lg p-6 shadow-lg h-fit">
            <ControlsPanel styles={styles} setStyles={setStyles} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-neutral-800/50 rounded-lg shadow-lg relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                        onClick={handleCopyCss}
                        className="p-2 rounded-full bg-neutral-700 hover:bg-brand-green hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-neutral-800"
                        title="Copy CSS"
                    >
                        {isCopied ? <span className="text-xs px-2">Copied!</span> : <CopyIcon />}
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="p-2 rounded-full bg-neutral-700 hover:bg-brand-green hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-neutral-800"
                        title="Download as PNG"
                    >
                        <DownloadIcon />
                    </button>
                </div>
                <Preview ref={previewRef} styles={styles} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
