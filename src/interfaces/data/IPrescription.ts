export interface IPrescription{
    drug?: string;
    dose?: string;
    issueUnit?: string;
    refill?: boolean;
    "$class"?: string,
    "prescriptionuuid"?: string,
    "description"?: string,
    "creatorreferencenumber"?: string,
    "owner"?: string,
    "prescriber"?: string,
    "creationdate"?: string,
    "expirationdate"?: string,
    "pharmaitemuuid"?: string,
    "refillinstructions"?: string,
    "substitutions"?: string,
    "notes"?: string,
    "electronicsignature"?: string,
    "inscription"?: string
}