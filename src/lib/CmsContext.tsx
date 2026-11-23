import { createContext, useContext, type ReactNode } from "react";
import type { CmsContent } from "../hooks/useCmsContent";

const CmsContext = createContext<CmsContent>({
  ready: false,
  texts: {},
  media: {},
  shop: [],
});

export function CmsProvider({ value, children }: { value: CmsContent; children: ReactNode }) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
