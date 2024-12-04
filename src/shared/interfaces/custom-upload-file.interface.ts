export interface ICustomUploadFile extends Express.Multer.File {
  storeDestination?: string;
}
