
export class TranslateService {
  private currentLanguage= this.preferred;

  constructor(private translations: {key: string, lang: string, value: string}[],
              private preferred: string) {}

  setLanguage(language:string) {
    this.currentLanguage= language;
  }

  translate(key: string) {
    // get translations
    let translations = this.translations.filter(trans => trans.key === key);

    if (translations.length > 0) {
      let translation = translations.find(trans => trans.lang === this.currentLanguage);

      if (!translation) {
        translation =  translations.find(trans => trans.lang === this.preferred);
      }

      if (!translation) {
        return '';
      }

      return translation.value;
    }

    return '';
  }
}
TranslateService.iid = 'TranslateService';

export class TranslateServiceProvider {

  private preferred : string = "en";
  private translations: {key:string, lang:string, value:string}[];

  setPreferredLanguage(preferredLanguage:string) {
    this.preferred = preferredLanguage;
  }

  setTranslations(translations: {key:string, lang:string, value:string}[]) {
    this.translations= translations;
  }

  // this function will execute once we inject LanguageService
  // during run phase (controllers/service/filter/...)
  $get() {
    return new TranslateService(this.translations, this.preferred);
  }

}

TranslateServiceProvider.iid = "TranslateServiceProvider";
