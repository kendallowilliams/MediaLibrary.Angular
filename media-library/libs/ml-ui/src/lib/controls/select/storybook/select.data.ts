import { SelectOption, SelectOptionGroup } from "../types/select.types";

export const options = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Option ${num}`,
  value: num
})) as SelectOption[];

export const groups = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Group ${num}`,
  value: num + 100
})) as SelectOption[];

export const categories = [0,1,2,3,4,5,6,7,8,9].map(num => ({
  text: `Category ${num}`,
  value: num + 200
})) as SelectOption[];

export const optionGroups = [{
  name: 'Options',
  options: options.map(option => ({...option}))
}, {
  name: 'Groups',
  options: groups.map(group => ({...group}))
}, {
  name: 'Categories',
  options: categories.map(category => ({...category}))
}] as SelectOptionGroup[];