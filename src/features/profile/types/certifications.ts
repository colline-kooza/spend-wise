export type Certification = {
  title: string;
  issuer: string;
  issuerLogoURL?: string;
  issuerIconName?: string;
  issueDate: string;
  credentialID: string;
  credentialURL: string;
};
export type OtherProject = {
  title: string;
  description: string;
  appURL: string;
  createdDate: string;
  appLogoURL?: string;
  appIconName?: string;
};
