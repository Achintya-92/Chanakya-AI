const generateGoalHash = ({
  title,
  age,
  currentState,
  availableTime,
}) => {
  return `${title}-${age}-${currentState}-${availableTime}`
    .toLowerCase()
    .trim();
};

export default generateGoalHash;