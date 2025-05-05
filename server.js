import express from "express";
const app = express();

// Section 1
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});


// Section 2
// Route to roll a number
app.get('/roll/:number', (req, res) => {
  const { number } = req.params;

  // check is number is not a number, if isNaN is true, respond with "You must specify a number"
  if (isNaN(number)) {
      return res.send("You must specify a number.");
  }

  // Generate a random whole number between 0 and the provided number
  const maxNumber = parseInt(number, 10);
  const rolledValue = Math.floor(Math.random() * (maxNumber + 1));

  res.send(`You rolled a ${rolledValue}.`);
});

//Section 3
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Route to fetch a collectible by index
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);

  // Check if index is within array quantity
  if (index < 0 || index >= collectibles.length || isNaN(index)) {
      return res.send("This item is not yet in stock. Check back soon!");
  }

  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

//Section 4
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
// Route to filter shoes
app.get('/shoes', (req, res) => {
  const { minPrice, maxPrice, type } = req.query;

  let filteredShoes = shoes;

  if (minPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }
  if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  res.json(filteredShoes);
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
