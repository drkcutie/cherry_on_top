import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/services/utils/storage';

interface Image {
  image_id: number;
  created_at: string;
  image_url: string;
  total_points: number;
  post_id: number;
}

interface ImageFormType {
  total_points: number;
  post_id: number;
  image: File | null;
}

export const getImages = async () => {
  const { data: image, error } = await supabase.from('image').select('*');

  if (error) {
    console.log(error);
    return [];
  }

  return image as Image[];
};

export const uploadImage = async (inputImage: ImageFormType): Promise<Image | null> => {
  let processedimage = {
    image_url: '',
    total_points: inputImage.total_points,
    post_id: inputImage.post_id
  };

  if (inputImage.image) {
    const filePath = 'images/posts';
    const fileName = `${inputImage.post_id}_${Date.now()}.${inputImage.image.type.split('/')[1]}`;
    const signedImageUrl = await uploadFile(filePath, fileName, inputImage.image, true);

    if (signedImageUrl) {
      processedimage.image_url = signedImageUrl;
    }
  }

  const { data, error } = await supabase.from('image').insert([processedimage]).select().single();

  if (error) {
    console.log(error);
    return null;
  }

  return data as Image;
};
