import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { LanguageSwitch } from './components/LanguageSwitch';
import { DataCollectionStep } from './components/steps/DataCollectionStep';
import { UsageStep } from './components/steps/UsageStep';
import { ThirdPartyStep } from './components/steps/ThirdPartyStep';
import { FinalStep } from './components/steps/FinalStep';
import { FormData } from './types';
import { translations } from './translations';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    appName: '',
    companyName: '',
    dataTypes: [],
    usagePurposes: [],
    thirdPartyServices: [],
    language: 'en'
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DataCollectionStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <UsageStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ThirdPartyStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <FinalStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header language={formData.language} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-end mb-4">
            <LanguageSwitch
              language={formData.language}
              onChange={(language) => updateFormData({ language })}
            />
          </div>

          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            language={formData.language}
          />
          
          <div className="mt-8">
            {renderStep()}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors
                ${currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {translations.buttons.back[formData.language]}
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors
                ${currentStep === totalSteps
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
              {translations.buttons.next[formData.language]}
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;