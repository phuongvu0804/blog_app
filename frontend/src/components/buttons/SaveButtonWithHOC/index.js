import { actSaveBlog } from '@/reducers/userReducer';
import withInteractiveButton from '@/HOC/withInteractiveButton';

import { IconButton, Skeleton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const SaveButtonSkeleton = ({ className }) => {
    return (
        <Skeleton
            className={className}
            variant="rounded"
            width={15}
            height={15}
        />
    );
};

const SaveButton = ({ isActive, onClick, className, ...props }) => {
    return (
        <IconButton className={className} onClick={onClick} {...props}>
            {isActive ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

const SaveButtonWithHOC = withInteractiveButton(
    SaveButton,
    'savedBlogs',
    actSaveBlog,
);
export default SaveButtonWithHOC;
