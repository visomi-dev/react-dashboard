export type MenuItem = {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  iconClass?: string;
  label: string;
  link: string;
  extraClass?: string;
  queryParams?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};
