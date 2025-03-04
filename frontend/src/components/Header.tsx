const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">
        {title}
      </h1>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default Header;
