/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Login', icon: 'pi pi-fw pi-lock' },
    { label: 'Register', icon: 'pi pi-fw pi-key' },
  ];

  useEffect(() => {
    if (activeIndex === 1) {
      return navigate('/login');
    } if (activeIndex === 2) {
      return navigate('/register');
    }
    return navigate('/');
  }, [activeIndex]);
  return (
    <nav>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />

    </nav>
  );
}

export default Header;
