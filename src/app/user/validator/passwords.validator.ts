import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordsValidator(targetControl: AbstractControl) {
    return function repassValidator(control: AbstractControl): ValidationErrors | null {
        const areEqual = targetControl.value === control.value;
        return areEqual ? null : {repassValidator: true}
    }
}