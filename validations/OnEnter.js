const ondragenter = (e, func) => {
  if (e.key === "Enter") {
    // Action to perform on Enter press
    e.stopPropagation();
    e.preventDefault();
    func();
    // Add your logic here, e.g., submit form, trigger search, etc.
  }
};

export default ondragenter
