import React from 'react';

interface UsageStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const UsageStep = ({ formData, updateFormData }: UsageStepProps) => {
  const usagePurposes = [
    {
      id: 'core',
      label: 'Core Functionality',
      description: 'Essential features and services of the app'
    },
    {
      id: 'personalization',
      label: 'Personalization',
      description: 'Customizing content and user experience'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Understanding app usage and performance'
    },
    {
      id: 'advertising',
      label: 'Advertising',
      description: 'Delivering targeted advertisements'
    },
    {
      id: 'communication',
      label: 'Communication',
      description: 'Sending notifications and updates'
    },
    {
      id: 'improvement',
      label: 'Product Improvement',
      description: 'Research and development of new features'
    }
  ];

  const handlePurposeToggle = (purposeId: string) => {
    const currentPurposes = formData.usagePurposes || [];
    const newPurposes = currentPurposes.includes(purposeId)
      ? currentPurposes.filter((id: string) => id !== purposeId)
      : [...currentPurposes, purposeId];
    updateFormData({ usagePurposes: newPurposes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Data Usage Purposes</h2>
        <p className="mt-1 text-sm text-gray-600">
          Select how your app uses the collected data
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {usagePurposes.map((purpose) => (
            <div
              key={purpose.id}
              className={`relative rounded-lg border p-4 cursor-pointer transition-colors
                ${formData.usagePurposes?.includes(purpose.id)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }`}
              onClick={() => handlePurposeToggle(purpose.id)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{purpose.label}</h3>
                  <p className="mt-1 text-xs text-gray-500">{purpose.description}</p>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    type="checkbox"
                    checked={formData.usagePurposes?.includes(purpose.id)}
                    onChange={() => handlePurposeToggle(purpose.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Make sure to accurately describe how you use the collected data. This helps build trust with your users and ensures compliance with privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};