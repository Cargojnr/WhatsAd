const ListItem = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="block px-4 py-2 hover:bg-gray-100 rounded-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </a>
);
export default ListItem;
