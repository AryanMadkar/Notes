export const validEmail = (Email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(Email);
};

export const getinitials = (name) => {
  if (!name) return "";
  const word = name.split(" ");
  let initials = "";
  for(let i=0; i<Math.min(word.length,2);i++){
    initials+=word[i][0];
  }
  return initials.toUpperCase();
};
