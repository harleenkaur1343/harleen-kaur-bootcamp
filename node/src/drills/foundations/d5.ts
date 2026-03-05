function processUsers(users: string[]) {
  users.forEach((user, index) => {
      console.log(user);
  });
}

for(let i=1; i<=4; i++){
  console.log(`value of i ${i}`);
}

processUsers(['Alice', 'Bob', 'Charlie']);

