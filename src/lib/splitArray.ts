export default function splitArray(array: [], parts: number) {
    let result = [];
    let j = 0;
    for (let k = 0; k < parts + 1; k++) {
      result.push([])
    }
    for (let i = 0; i < array.length; i++) {
      result[j].push(array[i]);
      j++;
      if (j > parts - 1) {
        j = 0
      }
    }
    return result;
}