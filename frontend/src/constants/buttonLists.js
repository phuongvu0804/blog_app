import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

export const buttonListNoUser = [
    {
        text: 'Write',
        icon: NoteAltOutlinedIcon,
        to: '/new-story',
        variant: 'text',
        className: 'mr-32',
    },
    {
        text: 'Sign up',
        icon: null,
        to: '/signup',
        variant: 'contained',
        className: 'header__nav-item--contained hide-on-tablet-mobile',
    },
    {
        text: 'Sign in',
        icon: null,
        to: '/login',
        variant: 'text',
        className: 'header__nav-item--text mr-32 hide-on-tablet-mobile',
    },
];

export const buttonListWithUser = [
    {
        text: 'Write',
        icon: NoteAltOutlinedIcon,
        to: '/new-story',
        variant: 'text',
        className: 'mr-32',
    },
];
