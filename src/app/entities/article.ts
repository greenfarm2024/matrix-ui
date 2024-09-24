export interface ArticleDTO {
    articleId: number; 
    clientId: number;
    skuInt: string;
    skuExt: string;
    artNameDe: string;
    artNameEn: string;
    artNameTh: string;
    saleUnit: number; 
    salePrice: number; 
    tva: number; 
    undelSupp1: number;
    undelSupp2: number; 
    undelSupp3: number; 
    active: boolean;
    createdDate: string; 
    createdBy: number;
    lastUpdatedDate: string; 
    updatedBy: number; 
  }