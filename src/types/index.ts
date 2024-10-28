export interface FormData {
  appName: string;
  companyName: string;
  dataTypes: string[];
  usagePurposes: string[];
  thirdPartyServices: string[];
  language: 'en' | 'zh';
}

export interface PrivacyManifest {
  NSPrivacyTracking: boolean;
  NSPrivacyTrackingDomains?: string[];
  NSPrivacyCollectedDataTypes: {
    [key: string]: {
      purposes: string[];
      linkedTo?: string[];
    };
  };
  NSPrivacyAccessedAPITypes?: {
    [key: string]: {
      purposes: string[];
    };
  };
}

export interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}