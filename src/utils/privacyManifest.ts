import { FormData, PrivacyManifest } from '../types';

const generateXML = (manifest: PrivacyManifest): string => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <${manifest.NSPrivacyTracking}/>
  ${Object.entries(manifest.NSPrivacyCollectedDataTypes).map(([type, data]) => `
  <key>${type}</key>
  <dict>
    <key>NSPrivacyCollectedDataPurposes</key>
    <array>
      ${data.purposes.map(purpose => `<string>${purpose}</string>`).join('\n      ')}
    </array>
  </dict>`).join('\n  ')}
  ${manifest.NSPrivacyAccessedAPITypes ? `
  <key>NSPrivacyAccessedAPITypes</key>
  <dict>
    ${Object.entries(manifest.NSPrivacyAccessedAPITypes).map(([api, data]) => `
    <key>${api}</key>
    <dict>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        ${data.purposes.map(purpose => `<string>${purpose}</string>`).join('\n        ')}
      </array>
    </dict>`).join('\n    ')}
  </dict>` : ''}
</dict>
</plist>`;

  return xmlContent;
};

export const generatePrivacyManifest = (formData: FormData): PrivacyManifest => {
  const manifest: PrivacyManifest = {
    NSPrivacyTracking: formData.thirdPartyServices.includes('advertising'),
    NSPrivacyCollectedDataTypes: {}
  };

  // Map data types to Apple's privacy manifest format
  const dataTypeMapping: { [key: string]: string } = {
    personal: 'NSPrivacyCollectedDataUserID',
    device: 'NSPrivacyCollectedDataDeviceID',
    location: 'NSPrivacyCollectedDataLocation',
    usage: 'NSPrivacyCollectedDataUsageData',
    health: 'NSPrivacyCollectedDataHealthData',
    photos: 'NSPrivacyCollectedDataPhotoLibrary'
  };

  // Map usage purposes to Apple's privacy manifest format
  const purposeMapping: { [key: string]: string } = {
    core: 'NSPrivacyCollectedDataPurposeAppFunctionality',
    personalization: 'NSPrivacyCollectedDataPurposePersonalization',
    analytics: 'NSPrivacyCollectedDataPurposeAnalytics',
    advertising: 'NSPrivacyCollectedDataPurposeThirdPartyAdvertising',
    communication: 'NSPrivacyCollectedDataPurposeUserCommunication',
    improvement: 'NSPrivacyCollectedDataPurposeProductPersonalization'
  };

  // Add collected data types and their purposes
  formData.dataTypes.forEach(type => {
    const manifestType = dataTypeMapping[type];
    if (manifestType) {
      manifest.NSPrivacyCollectedDataTypes[manifestType] = {
        purposes: formData.usagePurposes.map(purpose => purposeMapping[purpose]).filter(Boolean)
      };
    }
  });

  // Add API access based on data types and third-party services
  manifest.NSPrivacyAccessedAPITypes = {};
  
  if (formData.dataTypes.includes('location')) {
    manifest.NSPrivacyAccessedAPITypes['NSPrivacyAccessedAPICoreLocation'] = {
      purposes: formData.usagePurposes.map(purpose => purposeMapping[purpose]).filter(Boolean)
    };
  }

  if (formData.dataTypes.includes('photos')) {
    manifest.NSPrivacyAccessedAPITypes['NSPrivacyAccessedAPIPhotoLibrary'] = {
      purposes: formData.usagePurposes.map(purpose => purposeMapping[purpose]).filter(Boolean)
    };
  }

  return manifest;
};

export const downloadPrivacyManifest = (manifest: PrivacyManifest) => {
  const xmlContent = generateXML(manifest);
  const element = document.createElement('a');
  const file = new Blob([xmlContent], { type: 'application/xml' });
  element.href = URL.createObjectURL(file);
  element.download = 'PrivacyInfo.xcprivacy';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};