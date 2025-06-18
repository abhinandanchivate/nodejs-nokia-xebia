const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) resolve("Promise resolved");
  else reject("Promise rejected");
});

promise
  .then((result) => console.log(result, arg2))
  .catch((error) => console.log(error));
// then : success function
// catch : error function
