import { MessageThreadEffects } from "./messageThread.effect"
import { ContactThreadEffects } from "./contactThread.effect";
import { MessageEffects } from "./message.effect";

export const effects: any[] = [MessageThreadEffects, ContactThreadEffects, MessageEffects];

export * from "./messageThread.effect";
export * from "./contactThread.effect";
export * from "./message.effect";