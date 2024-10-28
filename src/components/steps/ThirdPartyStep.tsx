import React from 'react';

interface ThirdPartyStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ThirdPartyStep = ({ formData, updateFormData }: ThirdPartyStepProps) => {
  const thirdPartyServices = [
    {
      id: 'analytics',
      label: 'Analytics Services',
      examples: 'Google Analytics, Firebase Analytics',
      description: 'Track app usage and performance metrics'
    },
    {
      id: 'advertising',
      label: 'Advertising Networks',
      examples: 'Google AdMob, Facebook Ads',
      description: 'Display advertisements in your app'
    },
    {
      id: 'authentication',
      label: 'Authentication Services',
      examples: 'Sign in with Apple, Google Sign-In',
      description: 'User authentication and account management'
    },
    {
      id: 'crash',
      label: 'Crash Reporting',
      examples: 'Crashlytics, Sentry',
      description: 'Monitor app stability and track errors'
    },
    {
      id: 'payment',
      label: 'Payment Processing',
      examples: 'Stripe, PayPal',
      description: 'Handle in-app purchases and payments'
    },
    {
      id: 'social',
      label: 'Social Media Integration',
      examples: 'Facebook SDK, Twitter Kit',
      description: 'Share content and social features'
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    const currentServices = formData.thirdPartyServices || [];
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter((id: string) => id !== serviceId)
      : [...currentServices, serviceId];
    updateFormData({ thirdPartyServices: newServices });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
        <p className="mt-1 text-sm text-gray-600">
          Select the third-party services integrated in your app
        </p>

        <div className="mt-6 space-y-4">
          {thirdPartyServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-lg border p-4 cursor-pointer transition-colors
                ${formData.thirdPartyServices?.includes(service.id)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
                }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{service.label}</h3>
                    <div className="ml-3 flex h-5 items-center">
                      <input
                        type="checkbox"
                        checked={formData.thirdPartyServices?.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{service.description}</p>
                  <p className="mt-1 text-xs text-indigo-600">Examples: {service.examples}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              Each third-party service may have its own privacy policy. Make sure to review their policies and include relevant information in your privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};