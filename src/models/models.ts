export type Categories = {
  id: string;
  value: string;
};

export type CategoriesMenu = Categories & { icon: JSX.Element };

export type Types = CategoriesMenu & { label: string };

export type Platform = CategoriesMenu;
