import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitchProps {
  language: 'en' | 'zh';
  onChange: (language: 'en' | 'zh') => void;
}

export const LanguageSwitch = ({ language, onChange }: LanguageSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={language}
        onChange={(e) => onChange(e.target.value as 'en' | 'zh')}
        className="form-select text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};