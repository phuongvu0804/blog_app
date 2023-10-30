import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function withInteractiveButton(WrappedButton, dataType, actFetchData) {
    const InteractiveComponent = ({ blogId, className, children }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const userData = useSelector((state) => state.user?.data);

        const [isActive, setActive] = useState(false);

        useEffect(() => {
            let isExisted = false;

            if (userData) {
                userData[dataType].forEach((blog) => {
                    if (blog.id === blogId) {
                        return (isExisted = true);
                    }
                });

                if (isExisted) {
                    setActive(true);
                }
            }
        }, [userData]);

        const handleClick = async () => {
            if (!userData) {
                return navigate('/login');
            }

            await dispatch(actFetchData(userData.id, blogId));
            setActive(!isActive);
        };

        return (
            <WrappedButton
                onClick={handleClick}
                isActive={isActive}
                className={className}
            >
                {children}
            </WrappedButton>
        );
    };

    return InteractiveComponent;
}

export default withInteractiveButton;
