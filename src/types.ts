export enum ContentLanguage {
  English = 'en',
  Japanese = 'ja',
  Vietnamese = 'vi',
  Korean = 'ko',
}

export type I18nRecord = Partial<Record<ContentLanguage, string>>;

export const validLanguages = Object.values(ContentLanguage);
