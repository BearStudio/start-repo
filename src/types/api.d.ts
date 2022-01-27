type PageinatedResponse<Type> = {
  data: Array<Type>;
  pagination: {
    total: number;
  };
};

type UniqueResponse<Type> = {
  data: Type;
};
