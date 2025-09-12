// edit-protocol-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';

export interface Intervention {
  id: string;
  name: string;
  description?: string; // optional
  // add more fields as needed
}


@Component({
  selector: 'app-edit-protocol-dialog',
  standalone:true,
    imports: [   MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,NgIf,NgFor,FormsModule,MatFormField],
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
  protocoldescription = new FormControl('');
 
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
    // Implement save as draft logic
  }
 
  onCreateProtocol(): void {
 
    // Implement create protocol logic
    this.dialogRef.close(this.protocolForm.value);
  }
 
  onDiscard(): void {
    this.dialogRef.close();
  }




  // Edit states for each question
  editStates = {
    painQuestion1: false,
    painQuestion2: false,
    symptomQuestion1: false
  };

  // Question data
  painAssessment = {
    question1: {
      text: 'Rate your current pain level from 0-10. (1 lowest) to 10 (highest)',
      answerType: 'Numeric Range',
      range: { min: 0, max: 10 },
      symptom: 'Pain'
    },
    question2: {
      text: 'Where is your pain located?',
      answerType: 'Multi - Choice',
      symptom: 'Pain'
    }
  };

  symptomAssessment = {
    question1: {
      text: 'Are you experiencing nausea or vomiting?',
      answerType: 'Yes / No',
      symptom: 'Nausea'
    }
  };



  // Toggle edit mode for specific questions


toggleEdit(questionKey: keyof typeof this.editStates) {
  this.editStates[questionKey] = !this.editStates[questionKey];
}


  // Save changes for specific questions
  saveChanges(questionKey: keyof typeof this.editStates) {
    this.editStates[questionKey] = false;
    // Here you would typically save to backend
    console.log('Saving changes for:', questionKey);
  }

  // Discard changes for specific questions
  discardChanges(questionKey: keyof typeof this.editStates) {
    this.editStates[questionKey] = false;
    // Here you would typically reset to original values
    console.log('Discarding changes for:', questionKey);
  }

  // Add new choice option for multi-choice questions
  addChoice() {
    this.painLocationOptions.push('New Option');
  }

  // Remove choice option
  removeChoice(index: number) {
    if (this.painLocationOptions.length > 1) {
      this.painLocationOptions.splice(index, 1);
    }
  }


  // ---------------------------------Intervation section---


edit: { [key: string]: boolean } = {};
  
  prioritySections = {
    urgent: {
      name: 'Urgent Priority',
      expanded: true,
      interventions: [
        {
          id: 'urgent1',
          name: 'Emergency Response',
          description: 'Call 911 or seek immediate emergency care',
          instructions: 'Severe symptoms requiring immediate medical attention',
          symptom: 'Emergency'
        },
        {
          id: 'urgent2', 
          name: 'Emergency Response',
          description: 'Call 911 or seek immediate emergency care',
          instructions: 'Severe symptoms requiring immediate medical attention',
          symptom: 'Emergency'
        }
      ]
    },
    high: {
      name: 'High Priority',
      expanded: false,
      interventions: []
    },
    medium: {
      name: 'Medium Priority', 
      expanded: false,
      interventions: []
    }
  };

  private originalData: { [key: string]: any } = {};

//  edit: { [priority: string]: { [id: string]: boolean } } = {};



toggle(interventionId: string) {
  const isCurrentlyEditing = this.edit[interventionId];

  if (!isCurrentlyEditing) {
    const intervention = this.findIntervention(interventionId);
    if (intervention) {
      this.originalData[interventionId] = { ...intervention };
    }
    this.edit[interventionId] = true;
  } else {
    this.discard(interventionId);
  }
}


  findIntervention(id: string): Intervention | null {
    for (const section of Object.values(this.prioritySections)) {
      const intervention = section.interventions.find(i => i.id === id);
      if (intervention) return intervention;
    }
    return null;
  }

  discard(interventionId: string) {
    if (this.originalData[interventionId]) {
      const intervention = this.findIntervention(interventionId);
      if (intervention) {
        Object.assign(intervention, this.originalData[interventionId]);
      }
      delete this.originalData[interventionId];
    }
    this.edit[interventionId] = false;
  }

  save(interventionId: string) {
    // Here you would typically save to a service/API
    console.log('Saving intervention changes...', interventionId);
    
    // Clear the original data since changes are saved
    delete this.originalData[interventionId];
    this.edit[interventionId] = false;
    
    // Show success message or handle API response
  }

  hasInterventions(): boolean {
    return Object.values(this.prioritySections).some(section => 
      section.interventions && section.interventions.length > 0
    );
  }
}