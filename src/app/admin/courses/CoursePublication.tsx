import { Badge, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiX } from 'react-icons/fi';

import { Icon } from '@/components';

export const CoursePublication = ({ isPublished = false, ...rest }) => {
  const { t } = useTranslation();
  return isPublished ? (
    <Badge size="sm" colorScheme="success" {...rest}>
      <Box as="span" d={{ base: 'none', md: 'block' }}>
        {t('courses:data.published')}
      </Box>
      <Icon
        icon={FiCheck}
        aria-label={t('courses:data.published')}
        d={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  ) : (
    <Badge size="sm" colorScheme="warning" {...rest}>
      <Box as="span" d={{ base: 'none', md: 'block' }}>
        {t('courses:data.draft')}
      </Box>
      <Icon
        icon={FiX}
        aria-label={t('courses:data.draft')}
        d={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  );
};
