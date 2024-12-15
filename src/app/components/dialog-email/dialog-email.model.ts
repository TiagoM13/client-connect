import { Categorie } from "@app/services/client/client.model";
import { Email } from "@app/services/email/email.model";

export type ActionType = 'create' | 'update' | 'delete';

export interface DialogData {
  action: ActionType;
  data?: Email;
  categories: Categorie[];
  isDisabled?: boolean;
}
