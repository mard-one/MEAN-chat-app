import { MessageThreadEffects } from "./messageThread.effect"
import { ContactThreadEffects } from "./contactThread.effect";

export const effects: any[] = [MessageThreadEffects, ContactThreadEffects];

export * from "./messageThread.effect";
export * from "./contactThread.effect";