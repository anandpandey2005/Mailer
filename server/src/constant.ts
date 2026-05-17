interface UserConfig {
  id: string;
  appName: string;
  appPassword: string;
  userEmail: string;
  subject: string;
  emailBody: string;
  data: any[]; 
}

export const user: UserConfig[] = [{
  id: '',
  appName: '',
  appPassword: '',
  userEmail: '',
  subject: '',
  emailBody: '',
  data: []
}];