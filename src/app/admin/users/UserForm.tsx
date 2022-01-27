import React from 'react';

import { Stack } from '@chakra-ui/react';
import { isEmail, isMaxLength, isMinLength } from '@formiz/validations';
import { Role } from '@prisma/client';
import { useTranslation } from 'react-i18next';

import { FieldInput, FieldRadios, FieldSelect } from '@/components';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_KEY } from '@/constants/i18n';
import { useDarkMode } from '@/hooks/useDarkMode';

export const UserForm = () => {
  const { t } = useTranslation();
  const { colorModeValue } = useDarkMode();
  const authorities = Object.values(Role).map((value) => ({ value }));
  return (
    <Stack
      direction="column"
      bg={colorModeValue('white', 'gray.900')}
      p="6"
      borderRadius="lg"
      spacing="6"
      shadow="md"
    >
      <Stack direction={{ base: 'column', sm: 'row' }} spacing="6">
        <FieldInput name="name" label={t('users:data.name.label')} />
      </Stack>
      <FieldInput
        name="email"
        label={t('users:data.email.label')}
        required={t('users:data.email.required') as string}
        validations={[
          {
            rule: isMinLength(5),
            message: t('users:data.email.tooShort', { min: 5 }),
          },
          {
            rule: isMaxLength(254),
            message: t('users:data.email.tooLong', { min: 254 }),
          },
          {
            rule: isEmail(),
            message: t('users:data.email.invalid'),
          },
        ]}
      />
      <FieldSelect
        name="langKey"
        label={t('users:data.language.label')}
        options={AVAILABLE_LANGUAGES.map(({ key }) => ({
          label: t(`languages.${key}`),
          value: key,
        }))}
        defaultValue={DEFAULT_LANGUAGE_KEY}
      />
      <FieldRadios
        name="role"
        label={t('users:data.authorities.label')}
        options={authorities}
        required={t('users:data.authorities.required') as string}
      />
    </Stack>
  );
};
