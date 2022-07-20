import { Character } from "models/Character";

export const getAll = async (): Promise<Character[]> => {
  if (localStorage.getItem("data")) {
    return JSON.parse(localStorage.getItem("data") || "");
  }
  const response = await fetch("https://hp-api.herokuapp.com/api/characters");
  const data = await response.json();
  localStorage.setItem("data", JSON.stringify(data));
  return data;
};

export const getByName = (name: string): Character => {
  const data = JSON.parse(localStorage.getItem("data") || "");
  const result = data.filter((e: Character) => e.name === name);
  return result.length >= 1 ? result[0] : null;
};

export const searchCharacter = (search: string): Character[] => {
  const data = JSON.parse(localStorage.getItem("data") || "");
  const result = data.filter((e: Character) => e.name.toLowerCase().includes(search.toLowerCase()));
  return result.length >= 1 ? result : null;
};