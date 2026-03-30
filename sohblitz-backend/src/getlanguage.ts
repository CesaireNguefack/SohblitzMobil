import { translations } from '../languages/translations';

export function getLang(lang: string) {
        return translations[lang] || translations['de'];
    }