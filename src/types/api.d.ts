type PaginatedResponse<Type> = {
  data: Array<Type>;
  pagination: {
    total: number;
  };
};

type UniqueResponse<Type> = {
  data: Type;
};
