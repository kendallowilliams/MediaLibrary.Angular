import { SelectOption } from "../interfaces/SelectOption.interface";

export const options = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Option ${num}`,
  value: num
})) as SelectOption[];

export const groups = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Group ${num}`,
  value: num
})) as SelectOption[];

export const categories = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Category ${num}`,
  value: num
})) as SelectOption[];