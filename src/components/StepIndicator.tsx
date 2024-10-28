import React from 'react';
import { translations } from '../translations';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  language: 'en' | 'zh';
}

export const StepIndicator = ({ currentStep, totalSteps, language }: StepIndicatorProps) => {
  const getStepLabel = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return translations.steps.dataCollection[language];
      case 2:
        return translations.steps.usage[language];
      case 3:
        return translations.steps.thirdParty[language];
      case 4:
        return translations.steps.generate[language];
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
      <div className="relative flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 font-medium text-sm
                  ${isActive ? 'bg-indigo-600 text-white' : ''}
                  ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                `}
              >
                {stepNumber}
              </div>
              <span className={`mt-2 text-xs font-medium
                ${isActive ? 'text-indigo-600' : ''}
                ${!isActive ? 'text-gray-500' : ''}
              `}>
                {getStepLabel(stepNumber)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};