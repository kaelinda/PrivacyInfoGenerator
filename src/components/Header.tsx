import React from 'react';
import { Shield } from 'lucide-react';
import { translations } from '../translations';

interface HeaderProps {
  language: 'en' | 'zh';
}

export const Header = ({ language }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <Shield className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {translations.header[language]}
            </h1>
            <p className="text-sm text-gray-600">
              {translations.subheader[language]}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};