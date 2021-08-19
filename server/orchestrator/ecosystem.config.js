module.exports = {
  apps : [{
    name: "orchestrator",
    script: "node ./app.js",
    env: {
      PORT: 80,
    }
  }]
}
