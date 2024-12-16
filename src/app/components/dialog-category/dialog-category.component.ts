import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '@app/services/category/category.model';
import { CategoryService } from '@app/services/category/category.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent {
  categories: Category[];
  category: Category = {
    nome: '',
  };

  isEditable: boolean = false;
  isCreating: boolean = false

  constructor(
    private dialogRef: MatDialogRef<DialogCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {
      categories: Category[]
    },
    private categoryService: CategoryService
  ) {
    this.categories = this.dialogData.categories
  }

  saveCategory() {
    if (!this.category.nome) return;

    if (this.isCreating) {
      this.createCategory()
    } else {
      this.updateCategory()
    }
  }

  createCategory(): void {
    this.categoryService.createCategory(this.category).subscribe((category) => {
      this.categories.push(category)
      this.onCancel()
    });
  }

  updateCategory(): void {
    if (!this.category?.id) return;
    this.categoryService.updateCategory(this.category).subscribe(category => {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      if (index !== -1) {
        this.categories[index] = category
      }
      this.onCancel()
    })
  }

  deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onAddCategory(): void {
    this.isCreating = true
  }

  onEditCategory(category?: Category): void {
    if (!category.id) return;
    this.categoryService.getCatetory(category?.id).subscribe((category) => {
      this.category = category;
      this.isEditable = true;
      this.isCreating = false;
    })
  }

  onCancel(): void {
    this.isCreating = false
    this.isEditable = false
    this.category = { nome: '' }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
