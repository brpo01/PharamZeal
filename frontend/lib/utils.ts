import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
});

export const formatDate = (inputDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date: Date = new Date(inputDate);
  return date.toLocaleDateString("en-GB", options);
};

export const calculateAge = (birthDate: string): number => {
  const currentDate: Date = new Date();
  const [birthYear, birthMonth, birthDay]: number[] = birthDate
    .split("-")
    .map(Number);
  const age: number = currentDate.getFullYear() - birthYear;
  const isBirthdayPassed: boolean =
    currentDate.getMonth() > birthMonth - 1 ||
    (currentDate.getMonth() === birthMonth - 1 &&
      currentDate.getDate() >= birthDay);
  return isBirthdayPassed ? age : age - 1;
};
