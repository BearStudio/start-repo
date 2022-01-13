import React from 'react';

import { useTranslation } from 'react-i18next';
import { FiAward, FiUsers } from 'react-icons/fi';
import { GoBook } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components';

export const AdminNav = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isActive = (to) => pathname.startsWith(to);
  return (
    <Nav>
      <NavGroup title={t('admin:nav.administration')}>
        <NavItem
          as={Link}
          to="/admin/users"
          isActive={isActive('/admin/users')}
          icon={FiUsers}
        >
          {t('admin:nav.users')}
        </NavItem>
        <NavItem
          as={Link}
          to="/admin/courses"
          isActive={isActive('/admin/courses')}
          icon={FiAward}
        >
          {t('admin:nav.courses')}
        </NavItem>
      </NavGroup>
    </Nav>
  );
};
