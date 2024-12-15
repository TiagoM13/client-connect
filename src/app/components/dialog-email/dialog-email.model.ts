import { Category } from "@app/services/category/category.model";
import { Email } from "@app/services/email/email.model";

export type ActionType = 'create' | 'update' | 'delete';

export interface DialogData {
  action: ActionType;
  data?: Email;
  categories: Category[];
  isDisabled?: boolean;
}
