const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const getURLfromFile = (file) => new Promise((resolve, reject) => {
  const fileName = file.name.toLowerCase();
  const isTypeMatch = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isTypeMatch) {
    reject(new Error('File type mismatch'));
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => resolve(reader.result));

  reader.addEventListener('error', () => reject(new Error(reader.error)));

  reader.readAsDataURL(file);
});

export const loadImage = (file, imageNode) => getURLfromFile(file)
  .then((url) => new Promise((resolve, reject) => {
    imageNode.addEventListener('load', onImageNodeLoad);
    imageNode.addEventListener('error', onImageNodeError);

    imageNode.src = url;

    function onImageNodeLoad() {
      imageNode.removeEventListener('load', onImageNodeLoad);
      imageNode.removeEventListener('error', onImageNodeError);
      resolve();
    }

    function onImageNodeError() {
      imageNode.removeEventListener('load', onImageNodeLoad);
      imageNode.removeEventListener('error', onImageNodeError);
      reject(new Error('Image load error'));
    }
  }));
