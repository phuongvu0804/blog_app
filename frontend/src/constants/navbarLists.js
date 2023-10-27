import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import CreateIcon from '@mui/icons-material/Create';

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
