const x = [
  { insertOne: { document: { name: "Mike", age: 32, wife: true } } },
  { deleteOne: { filter: { age: 23 } } },
  { updateOne: { filter: { age: 37 }, update: { $set: { name: "Dod" } } } },
  { replaceOne: { filter: { name: "Bob" }, replacement: { name: "BoBik" } } },
];
