function Logo(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 7A12 12 0 006 19v6a6 6 0 006 6h6a12 12 0 000-24zm0 5a7 7 0 100 14 7 7 0 000-14z"
        fill="#222"
      />
      <path d="M4 5.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0z" fill="#222" />
    </svg>
  )
}

export default Logo
