import React from 'react';
import { Download, Copy, FileText } from 'lucide-react';
import { FormData } from '../../types';
import { generatePrivacyManifest, downloadPrivacyManifest } from '../../utils/privacyManifest';

interface FinalStepProps {
  formData: FormData;
}

export const FinalStep = ({ formData }: FinalStepProps) => {
  const privacyManifest = generatePrivacyManifest(formData);
  const { language } = formData;

  const handleDownload = () => {
    downloadPrivacyManifest(privacyManifest);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(privacyManifest, null, 2));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'en' ? 'Privacy Manifest Preview' : '隐私清单预览'}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Review your PrivacyInfo.xcprivacy manifest before downloading'
            : '在下载之前检查您的 PrivacyInfo.xcprivacy 清单'}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">PrivacyInfo.xcprivacy</span>
          </div>
        </div>
        <div className="p-4 h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
            {JSON.stringify(privacyManifest, null, 2)}
          </pre>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Copy className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Copy to Clipboard' : '复制到剪贴板'}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Download Privacy Manifest' : '下载隐私清单'}
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              {language === 'en'
                ? 'Add this file to your Xcode project to declare your app\'s privacy practices. Place it in your project\'s root directory.'
                : '将此文件添加到您的 Xcode 项目中以声明应用的隐私实践。请将其放置在项目的根目录中。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};