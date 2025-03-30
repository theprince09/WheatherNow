import { useState, useEffect } from "react";

const cities = [
  "Bangalore", "Delhi", "Mumbai", "Chennai", "Pune",
  "Hyderabad", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
  "Surat", "Bhopal", "Chandigarh", "Visakhapatnam", "Indore",
  "Nagpur", "Patna", "Coimbatore", "Vadodara", "Ludhiana"
];

export const useAnimatedPlaceholder = () => {
  const [text, setText] = useState("Enter city name...");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    const city = cities[cityIdx];
    let delay;

    if (!isDeleting && index <= city.length) {
      delay = setTimeout(() => {
        setText(city.slice(0, index));
        setIndex(index + 1);
      }, 150);
    } else if (!isDeleting && index > city.length) {
      delay = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && index > 0) {
      delay = setTimeout(() => {
        setText(city.slice(0, index - 1));
        setIndex(index - 1);
      }, 75);
    } else {
      delay = setTimeout(() => {
        setIsDeleting(false);
        setCityIdx((prev) => (prev + 1) % cities.length);
      }, 500);
    }

    return () => clearTimeout(delay);
  }, [index, isDeleting, cityIdx]);

  return text;
};
