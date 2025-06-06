export const ChevronUpIcon = (
  props: React.SVGAttributes<SVGElement> | undefined = {}
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-default-400"
        d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"
      ></path>
    </svg>
  );
};
