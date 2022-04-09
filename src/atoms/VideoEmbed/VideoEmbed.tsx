import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';

const VideoEmbed = (props: VideoEmbedPropTypes) => {
    const { videoUrl, aspectRatio, autoplay } = props;
    const classes = useStyles();

    const youTubeIframeProps = {
        frameBorder: 0,
        allow:
            'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        allowFullScreen: true,
    };

    const vimeoIframeProps = {
        frameBorder: '0',
        allow: 'autoplay; fullscreen',
        allowFullScreen: true,
    };

    const getVariant = (): VideoEmbedVariant => {
        try {
            const url = new URL(videoUrl);

            if (url.host === 'www.youtube.com') {
                return 'YouTube';
            } else if (url.host === 'player.vimeo.com') {
                return 'Vimeo';
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const variant: VideoEmbedVariant = getVariant();
    const iframeProps = variant === 'YouTube' ? youTubeIframeProps : vimeoIframeProps;

    return (
        <div
            className={clsx(
                classes.container,
                classes[`${aspectRatio}AspectRatio` as keyof typeof classes],
            )}
        >
            <iframe
                src={videoUrl + '?autoplay=' + (autoplay ? '1' : '0')}
                className={classes.iframe}
                {...iframeProps}
            />
        </div>
    );
};

VideoEmbed.defaultProps = {
    aspectRatio: 'standard',
};

export type VideoEmbedPropTypes = {
    videoUrl: string;
    autoplay?: boolean;
    aspectRatio: 'standard' | 'featured';
};

export type VideoEmbedVariant = 'YouTube' | 'Vimeo' | null;

export default VideoEmbed;
