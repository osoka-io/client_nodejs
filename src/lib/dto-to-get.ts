export const dtoToGet = (dto:Record<string, unknown>):string =>{
  return '?'+Object.entries<unknown>(dto).map(([key,value])=>`${key}=${value}`).join('&');
}
