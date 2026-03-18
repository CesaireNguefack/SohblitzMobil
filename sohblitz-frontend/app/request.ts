import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";


console.log("REQUEST CONFIG LOADED");

export default getRequestConfig(async ({requestLocale}) => {

  const locale =
    (await requestLocale) ?? routing.defaultLocale;

     console.log("LOCALE DETECTED:", locale);

  return {
    locale,
    messages: (await import(`../../languages/${locale}.json`)).default
  };

});