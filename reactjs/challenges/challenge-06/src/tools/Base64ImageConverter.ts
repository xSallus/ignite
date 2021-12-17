type CallbackFunction = (response: string | ArrayBuffer) => void;
type ImageToBase64 = (file: File, callback: CallbackFunction) => Promise<void>;

const imageToBase64: ImageToBase64 = (file, callback) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const response = reader.result;
    callback(response);
  };
};

export { imageToBase64 };
