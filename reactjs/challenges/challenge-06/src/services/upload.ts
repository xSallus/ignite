import { AxiosRequestConfig } from 'axios';
import { api } from './api';

type UploadImageProps = {
  formData: FormData;
  endpoint: string;
  config: AxiosRequestConfig;
};
type UploadImageFunction = (props: UploadImageProps) => Promise<any>;

export const uploadImage: UploadImageFunction = async ({
  formData,
  endpoint,
  config,
}) => {
  const { data } = await api.post(endpoint, formData, config);
  return data;
};
