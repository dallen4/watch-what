export const ASPECT_RATIOS = {
    videos: {
        embeds: {
            square: '100%', // Perfect square 1:1
            standard: '43.75%', // 1280 x 560 to fit modal dimensions,
            featured: '62.5%', // 3200 x 2000 to fit modal dimensions,
            banner: '62.5%', // 3200 x 2000 pixels
        },
        teasers: {
            square: '100%', // Perfect square 1:1
            standard: '56.25%', //16:9,
            featured: '62.5%', // 3200 x 2000 to fit modal dimensions,
            banner: '62.5%', // 3200 x 2000 pixels
        },
    },
    images: {
        teasers: {
            standard: '67.08%', // roughly 160 x 240 but tweaked a bit
        },
    },
};
