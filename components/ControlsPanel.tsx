
import React from 'react';
import type { StyleState } from '../App';

interface SliderControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({ label, value, min, max, step, unit, onChange }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-neutral-300">{label}</label>
            <span className="text-xs font-mono px-2 py-1 bg-neutral-900 rounded-md text-brat-green">
                {value}{unit}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-brat-green"
        />
    </div>
);

interface ColorControlProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorControl: React.FC<ColorControlProps> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-300">{label}</label>
        <div className="relative">
            <input
                type="color"
                value={value}
                onChange={onChange}
                className="w-10 h-10 p-0 border-none appearance-none cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-2 [&::-webkit-color-swatch]:border-neutral-500"
            />
        </div>
    </div>
);

interface ControlsPanelProps {
  styles: StyleState;
  setStyles: React.Dispatch<React.SetStateAction<StyleState>>;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ styles, setStyles }) => {
  const handleStyleChange = (key: keyof StyleState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'range' ? parseFloat(e.target.value) : e.target.value;
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-neutral-300 mb-2">Text</label>
        <textarea
          id="text-input"
          value={styles.text}
          onChange={handleStyleChange('text')}
          className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-md focus:ring-2 focus:ring-brat-green focus:border-brat-green transition duration-200 resize-y"
          rows={3}
        />
      </div>

      <SliderControl 
        label="Font Size"
        value={styles.fontSize}
        min={10} max={300} step={1} unit="px"
        onChange={handleStyleChange('fontSize')}
      />

      <SliderControl 
        label="Width"
        value={styles.width}
        min={50} max={150} step={1} unit="%"
        onChange={handleStyleChange('width')}
      />

      <SliderControl 
        label="Letter Spacing"
        value={styles.letterSpacing}
        min={-10} max={20} step={0.1} unit="px"
        onChange={handleStyleChange('letterSpacing')}
      />
      
      <SliderControl 
        label="Blur"
        value={styles.blur}
        min={0} max={5} step={0.1} unit="px"
        onChange={handleStyleChange('blur')}
      />

      <SliderControl 
        label="Pixelation"
        value={styles.pixelation}
        min={1} max={20} step={1} unit=""
        onChange={handleStyleChange('pixelation')}
      />

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-700/50">
        <ColorControl 
            label="Text Color"
            value={styles.textColor}
            onChange={handleStyleChange('textColor')}
        />
        <ColorControl 
            label="Background"
            value={styles.backgroundColor}
            onChange={handleStyleChange('backgroundColor')}
        />
      </div>
    </div>
  );
};

export default ControlsPanel;
