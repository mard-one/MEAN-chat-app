import { MessageThreadEffects } from "./messageThread.effect"
import { ContactThreadEffects } from "./contactThread.effect";
import { MessageEffects } from "./message.effect";
import { UserEffects } from "./user.effect"

export const effects: any[] = [MessageThreadEffects, ContactThreadEffects, MessageEffects, UserEffects];

export * from "./messageThread.effect";
export * from "./contactThread.effect";
export * from "./message.effect";
export * from "./user.effect";