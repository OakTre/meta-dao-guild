const fakeData = {
  totalPages: 3,
  items: [
    {
      img: "img/data-jpegs/partners/1.webp",
      name: "Wonder Hero",
      genre: ["PVP", "RPG", "Breeding"],
      blockchain: ["bsc"],
      device: ["apple", "android", "windows"],
      status: "Live",
      f2p: "No",
      p2e: ["NFT", "Token"],
      social24h: {users: 561, percent: 12.1},
      days: [100, 130, 510, 0, 30, 200, 1000]
    }, {
      img: "img/data-jpegs/partners/2.webp",
      name: "The Walking Dead Empires",
      genre: ["Breeding", "card", "pVP"],
      blockchain: ["ethereum", "bsc"],
      device: ["windows"],
      status: "Dev.",
      f2p: "Yes",
      p2e: ["NFT"],
      social24h: {users: 561, percent: -6.6},
      days: [90, 130, 510, 440, 320, 400, 561, 90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/3.webp",
      name: "Last Expedition",
      genre: ["Action", "Adventure", "Shooter"],
      blockchain: ["bsc"],
      device: ["apple", "windows"],
      status: "Presale",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 261, percent: -1.6},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/4.webp",
      name: "Bullieverse",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/5.webp",
      name: "PinupWarlords",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/7.webp",
      name: "Basketball Legends",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/6.webp",
      name: "Uninterest Unicorns",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/8.webp",
      name: "MyKingdom",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/2.webp",
      name: "The Walking Dead Empires",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/3.webp",
      name: "Last Expedition",
      genre: ["Action", "Adventure", "Shooter"],
      blockchain: ["bsc"],
      device: ["apple", "windows"],
      status: "Presale",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 261, percent: -1.6},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/4.webp",
      name: "Bullieverse",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/5.webp",
      name: "PinupWarlords",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/7.webp",
      name: "Basketball Legends",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/6.webp",
      name: "Uninterest Unicorns",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }, {
      img: "img/data-jpegs/partners/8.webp",
      name: "MyKingdom",
      genre: ["Minigame", "Strategy", "VR"],
      blockchain: ["ethereum"],
      device: ["apple", "android"],
      status: "Live",
      f2p: "Yes",
      p2e: ["Yes"],
      social24h: {users: 322, percent: 20.5},
      days: [90, 130, 510, 440, 320, 400, 561]
    }
  ],
};

export default fakeData;
