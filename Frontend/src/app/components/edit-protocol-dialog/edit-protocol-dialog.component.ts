// edit-protocol-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-protocol-dialog',
  standalone:true,
    imports: [   MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './edit-protocol-dialog.component.html',
  styleUrls: ['./edit-protocol-dialog.component.css']
})
export class EditProtocolDialogComponent implements OnInit {
  protocolForm: FormGroup;
  activeTab = 'assessment';


  painLocationOptions = [
    'Head/Neck',
    'Chest',
    'Abdomen',
    'Back',
    'Arms/Legs',
    'Multiple Locations'
  ];
protocolName!: FormGroup<any>;

  constructor(
    public dialogRef: MatDialogRef<EditProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.protocolForm = this.fb.group({
      protocolDescription: ['Protocol for managing symptoms in patients with advanced cancer'],
      painLevel: [0],
      painLocation: [[]],
      nauseaVomiting: [''],
      // Add other form controls for different assessment sections
      respiratoryAssessment: this.fb.array([]),
      infectionAssessment: this.fb.array([]),
      nutritionalAssessment: this.fb.array([]),
      psychologicalAssessment: this.fb.array([]),
      generalAssessment: this.fb.array([]),
      medicationAssessment: this.fb.array([]),
      neurologicalAssessment: this.fb.array([]),
      socialAssessment: this.fb.array([]),
      overallAssessment: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Initialize form with default values
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onPainLocationChange(option: string, checked: boolean): void {
    const currentLocations = this.protocolForm.get('painLocation')?.value || [];
    if (checked) {
      if (!currentLocations.includes(option)) {
        currentLocations.push(option);
      }
    } else {
      const index = currentLocations.indexOf(option);
      if (index > -1) {
        currentLocations.splice(index, 1);
      }
    }
    this.protocolForm.patchValue({ painLocation: currentLocations });
  }

  isPainLocationSelected(option: string): boolean {
    const currentLocations = this.protocolForm.get('painLocation')?.value || [];
    return currentLocations.includes(option);
  }

  onSaveAsDraft(): void {
    console.log('Saving as draft:', this.protocolForm.value);
    // Implement save as draft logic
  }

  onCreateProtocol(): void {
    console.log('Creating protocol:', this.protocolForm.value);
    // Implement create protocol logic
    this.dialogRef.close(this.protocolForm.value);
  }

  onDiscard(): void {
    this.dialogRef.close();
  }
}