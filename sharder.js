const { ClusterManager } = require('discord-hybrid-sharding');
const { token } = require("./config.js")
            
const manager = new ClusterManager(`index.js`, {
    totalShards: 4,
    shardsPerClusters: 2,
    mode: 'process', 
    token: token,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });