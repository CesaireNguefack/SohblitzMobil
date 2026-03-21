"use client"

import {createContext, useContext} from "react";

const TranslationContext = createContext<any>(null);

export function TranslationProvider({messages, children}: any){

  return (
    <TranslationContext.Provider value={messages}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(){
  return useContext(TranslationContext);
}