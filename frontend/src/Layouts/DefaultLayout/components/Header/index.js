import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@mui/system';
import { Button } from '@mui/material';

import './Header.scss';
import images from '@/assets/images';

import Image from '@/components/Image';
import MainButton from '@/components/MainButton';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

const Header = () => {
    const navbarList = [
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
            name: 'Sign In',
            link: '/sign-in',
        },
    ];

    const [onScroll, setOnScroll] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const offsetY = window.pageYOffset;

            if (offsetY > 0) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
        };
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div
            className={`default-layout__header ${
                onScroll ? 'on-scroll' : 'no-scroll'
            }`}
        >
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                sx={{
                    paddingY: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Link to="/" className="default-layout__header-logo">
                    <Image src={images.logo} />
                </Link>
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                    }}
                    className="default-layout__navbar"
                >
                    {navbarList.map((item, index) => (
                        <Button
                            component={Link}
                            to={item.link}
                            key={index}
                            className="default-layout__navbar-item"
                        >
                            {item.name}
                        </Button>
                    ))}
                    <MainButton className="default-layout__navbar-button">
                        Get started
                    </MainButton>
                </Container>
            </Container>
        </div>
    );
};

export default Header;
