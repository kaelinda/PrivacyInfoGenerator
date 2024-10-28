import React from 'react';
import { translations } from '../../translations';
import { FormData } from '../../types';

interface DataCollectionStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const DataCollectionStep = ({ formData, updateFormData }: DataCollectionStepProps) => {
  const { language } = formData;

  const handleDataTypeToggle = (dataTypeId: string) => {
    const currentTypes = formData.dataTypes || [];
    const newTypes = currentTypes.includes(dataTypeId)
      ? currentTypes.filter(id => id !== dataTypeId)
      : [...currentTypes, dataTypeId];
    updateFormData({ dataTypes: newTypes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {translations.steps.dataCollection[language]}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Enter your app details and select the types of data your app collects'
            : '输入应用详情并选择您的应用收集的数据类型'}
        </p>
        
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700">
              {language === 'en' ? 'App Name' : '应用名称'}
            </label>
            <input
              type="text"
              id="appName"
              value={formData.appName}
              onChange={(e) => updateFormData({ appName: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={language === 'en' ? 'Enter your app name' : '输入应用名称'}
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              {language === 'en' ? 'Company Name' : '公司名称'}
            </label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={language === 'en' ? 'Enter your company name' : '输入公司名称'}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">
          {language === 'en' ? 'Data Collection Types' : '数据收集类型'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'en' 
            ? 'Select the types of data your app collects from users'
            : '选择您的应用从用户收集的数据类型'}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(translations.dataTypes).map(([typeId, type]) => (
            <div
              key={typeId}
              className={`relative rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md
                ${formData.dataTypes?.includes(typeId)
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500'
                  : 'border-gray-200 hover:border-indigo-300'
                }`}
              onClick={() => handleDataTypeToggle(typeId)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {type.label[language]}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {type.description[language]}
                  </p>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    type="checkbox"
                    checked={formData.dataTypes?.includes(typeId)}
                    onChange={() => handleDataTypeToggle(typeId)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};