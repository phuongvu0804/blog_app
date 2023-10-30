import withInteractiveButton from '@/HOC/withInteractiveButton';
import { actLikeBlog } from '@/reducers/userReducer';

import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Button, Skeleton } from '@mui/material';

import './LikeButtonWithHOC.scss';

export const LikeButtonSkeleton = ({ className, ...props }) => {
    return (
        <Skeleton
            className={`icon-btn like-btn  ${className ? className : ''}`}
            variant="text"
            sx={{ fontSize: '1.4rem' }}
            width={20}
            {...props}
        />
    );
};

const LikeButton = ({ isActive, onClick, className, children, ...props }) => {
    return (
        <Button
            className={`icon-btn like-btn ${className}`}
            onClick={onClick}
            {...props}
        >
            {isActive ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
            {children}
        </Button>
    );
};

const LikeButtonWithHOC = withInteractiveButton(
    LikeButton,
    'likedBlogs',
    actLikeBlog,
);
export default LikeButtonWithHOC;
