export interface InitiativeCMS {
  title: string;
  description: string;
  date: string;
  body: string;
}

export interface Initiative extends InitiativeCMS {
  slug: string;
}
