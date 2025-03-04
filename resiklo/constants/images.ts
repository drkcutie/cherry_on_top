const IMAGE_LENGTH = 20;

const taskImages: Record<string, any[]> = {
    plastic: Array.from({ length: IMAGE_LENGTH }, (_, i) =>
        require(`@/assets/images/trash_type/plastic/${i + 1}.png`)
    ),
    paper: Array.from({ length: IMAGE_LENGTH }, (_, i) =>
        require(`@/assets/images/trash_type/paper/${i + 1}.png`)
    ),
    metal: Array.from({ length: IMAGE_LENGTH }, (_, i) =>
        require(`@/assets/images/trash_type/metal/${i + 1}.png`)
    ),
    glass: Array.from({ length: IMAGE_LENGTH }, (_, i) =>
        require(`@/assets/images/trash_type/glass/${i + 1}.png`)
    ),
    cardboard: Array.from({ length: IMAGE_LENGTH }, (_, i) =>
        require(`@/assets/images/trash_type/cardboard/${i + 1}.png`)
    ),

};



export const getRandomizedImageWithType = (taskType: string) => {
    const images = taskImages[taskType];
    if (!images) return null; // Handle unknown types
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};

export default taskImages;