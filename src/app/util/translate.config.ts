import { TranslateServiceProvider } from './translate.provider';
import translations from '../../translations';

config.$inject = [TranslateServiceProvider.iid]
function config(translateProvider:TranslateServiceProvider) {
  translateProvider.setPreferredLanguage('en');
  translateProvider.setTranslations(translations);
}

export default config;
