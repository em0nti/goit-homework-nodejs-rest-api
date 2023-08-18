const app = require("./app");
const { PORT } = require("./helpers/constants");

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
