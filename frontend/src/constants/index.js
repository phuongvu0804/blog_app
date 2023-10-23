import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';

export const MAX_WIDTH_DEFAULT_LAYOUT = 'lg';
export const MAX_WIDTH_BLOG_DETAILS = 'md';
export const HEADER_HEIGHT_DEFAULT_LAYOUT = '7.5rem';
export const LOCAL_STORAGE_KEY = 'blog_user';
export const NUMBER_OF_TRENDING_BLOGS = 6;
export const navbarListWithoutUser = [
    {
        name: 'Blogs',
        link: '/blogs',
    },
    {
        name: 'Users',
        link: '/users',
    },
    {
        name: 'Write',
        link: '/write',
    },
    {
        name: 'Log In',
        link: '/login',
    },
];

export const navbarListWithUser = [
    {
        name: 'Blogs',
        icon: BookIcon,
        link: '/blogs',
        className: '',
    },
    {
        name: 'Users',
        icon: PeopleIcon,
        link: '/users',
        className: '',
    },
    {
        name: 'Write',
        icon: CreateIcon,
        link: '/write',
        className: '',
    },
];
