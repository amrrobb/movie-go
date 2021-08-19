module.exports = {
  apps : [{
    name: "movies",
    script: "node ./app.js",
    env: {
      PORT: 80,
    }
  }]
}
