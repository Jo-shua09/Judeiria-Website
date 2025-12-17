const useScrollToTop = () => {
  const scrollToTop = (behavior: "smooth" | "auto" = "smooth") => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  return scrollToTop;
};

export default useScrollToTop;
