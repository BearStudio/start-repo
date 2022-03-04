import {
  Code as ChakraCode,
  Heading as ChakraHeading,
  Td as ChakraTd,
  Th as ChakraTh,
  Tr as ChakraTr,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';

const Heading = (props) => <ChakraHeading my="2" {...props} />;
const H1 = ({ node, ...props }) => (
  <Heading as="h1" fontSize="4xl" {...props} />
);
const H2 = ({ node, ...props }) => (
  <Heading as="h2" fontSize="2xl" {...props} />
);
const H3 = ({ node, ...props }) => <Heading as="h3" fontSize="lg" {...props} />;
const H4 = ({ node, ...props }) => <Heading as="h4" fontSize="md" {...props} />;
const H5 = ({ node, ...props }) => <Heading as="h5" fontSize="sm" {...props} />;
const H6 = ({ node, ...props }) => <Heading as="h6" fontSize="xs" {...props} />;
const A = ({ node, ...props }) => (
  <Link color="brand.600" _dark={{ color: 'brand.400' }} {...props} />
);

const Paragraph = ({ node, ...props }) => <Text py="2" {...props} />;

const Ol = ({ node, ...props }) => <OrderedList {...props} />;
const Ul = ({ node, ...props }) => <UnorderedList {...props} />;
const Li = ({ node, ...props }) => <ListItem {...props} />;

const Td = ({ node, ...props }) => <ChakraTd {...props} />;
const Th = ({ node, ...props }) => <ChakraTh {...props} />;
const Tr = ({ node, ...props }) => <ChakraTr {...props} />;

const Code = ({ node, ...props }) => <ChakraCode fontSize="0.9em" {...props} />;

export const components: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: Code,
  p: Paragraph,
  ol: Ol,
  ul: Ul,
  li: Li,
  a: A,
  td: Td,
  th: Th,
  tr: Tr,
};
